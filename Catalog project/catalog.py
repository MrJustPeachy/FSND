#!/usr/bin/env python2

from flask import Flask, render_template, \
    request, redirect, url_for, flash, jsonify
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Category, CategoryItem, User

from flask import session as login_session
import random
import string

from oauth2client.client import flow_from_clientsecrets
from oauth2client.client import FlowExchangeError
import httplib2
import json
from flask import make_response
import requests

CLIENT_ID = json.loads(open('client_secrets.json', 'r')
                       .read())['web']['client_id']
APPLICATION_NAME = "Catalog App"

app = Flask(__name__)
engine = create_engine('sqlite:///catalogwebsite.db')
Base.metadata.bind = engine
DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route('/')
@app.route('/categories')
def categoriesMenu():

    categories = session.query(Category).all()
    items = session.query(CategoryItem).all()
    return render_template('index.html',
                           categories=categories,
                           categoryItems=items)


@app.route('/categories.json')
def categoriesJSON():

    categories = session.query(Category).all()

    return jsonify(Categories=[category.serialize for category in categories])


@app.route('/categoryitems.json')
def categoryItemsJSON():

    categoryItems = session.query(CategoryItem).all()

    return jsonify(CategoryItems=[item.serializeItem for item in categoryItems])


@app.route('/catalog.json')
def catalogJSON():

    categories = session.query(Category).all()

    catalog = []

    # Adds each categoryItem if it's in the corresponding category.
    for category in categories:
        catalog.append(category.name)

        categoryItems = session.query(CategoryItem).filter_by(
            category_id=category.id).all()

        catalog.append([item.serializeItem for item in categoryItems])

    print catalog

    return jsonify(Catalog=catalog)


@app.route('/login')
def login():
    
    # Creates random state string for security
    state = ''.join(random.choice
                    (string.ascii_uppercase + string.digits)
                    for x in xrange(32))
    login_session['state'] = state
    return render_template('login.html', STATE=state)


@app.route('/gconnect', methods=['POST'])
def gconnect():

    # Valid state token
    if request.args.get('state') != login_session['state']:
        response = make_response(json.dumps('Invalid state parameter'), 401)
        response.header['Content-Type'] = 'application/json'
        return response

    # Obtain authorization code
    code = request.data

    try:
        # Upgrade the authorization code into a credentials object
        oauth_flow = flow_from_clientsecrets('client_secrets.json', scope='')
        oauth_flow.redirect_uri = 'postmessage'
        credentials = oauth_flow.step2_exchange(code)
    except FlowExchangeError:
        response = make_response(
            json.dumps('Failed to upgrade the authorization code.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Check that the access token is valid.
    access_token = credentials.access_token
    url = ('https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=%s'
           % access_token)
    h = httplib2.Http()
    result = json.loads(h.request(url, 'GET')[1])
    # If there was an error in the access token info, abort.
    if result.get('error') is not None:
        response = make_response(json.dumps(result.get('error')), 500)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Verify that the access token is used for the intended user.
    gplus_id = credentials.id_token['sub']
    if result['user_id'] != gplus_id:
        response = make_response(
            json.dumps("Token's user ID doesn't match given user ID."), 401)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Verify that the access token is valid for this app.
    if result['issued_to'] != CLIENT_ID:
        response = make_response(
            json.dumps("Token's client ID does not match app's."), 401)
        print "Token's client ID does not match app's."
        response.headers['Content-Type'] = 'application/json'
        return response

    stored_access_token = login_session.get('access_token')
    stored_gplus_id = login_session.get('gplus_id')
    if stored_access_token is not None and gplus_id == stored_gplus_id:
        response = make_response(json.dumps
                                 ('Current user is already connected.'),
                                 200)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Store the access token in the session for later use.
    login_session['access_token'] = credentials.access_token
    login_session['gplus_id'] = gplus_id

    # Get user info
    userinfo_url = "https://www.googleapis.com/oauth2/v1/userinfo"
    params = {'access_token': credentials.access_token, 'alt': 'json'}
    answer = requests.get(userinfo_url, params=params)

    data = answer.json()

    login_session['username'] = data['name']
    login_session['picture'] = data['picture']
    login_session['email'] = data['email']

    user_id = getUserID(login_session['email'])
    if not user_id:
        user_id = createUser(login_session)
    login_session['user_id'] = user_id

    # See if a user exists, if it doesn't make a new one
    output = ''
    output += '<h1>Welcome, '
    output += login_session['username']
    output += '!</h1>'
    output += '<img src="'
    output += login_session['picture']
    output += '"style = "width: 300px; height: 300px;'
    output += 'border-radius: 150px;-webkit-border-radius: 150px'
    output += ';-moz-border-radius: 150px;">'
    flash("You are now logged in as %s" % login_session['username'])
    print "done!"
    return output


@app.route('/gdisconnect')
def gdisconnect():
    access_token = login_session.get('access_token')
    
    # If the user has no access token no one is connected.
    if access_token is None:
        print 'Access Token is None'
        response = make_response(json.dumps
                                 ('Current user not connected.'), 401)
        response.headers['Content-Type'] = 'application/json'
        return response

    # Revoke the user's access_token
    url = 'https://accounts.google.com/o/oauth2/revoke?token=%s'\
          % login_session['access_token']
    h = httplib2.Http()
    result = h.request(url, 'GET')[0]
    
    # If user is successfully logged out remove there session info
    if result['status'] == '200':
        del login_session['access_token']
        del login_session['gplus_id']
        del login_session['username']
        del login_session['email']
        del login_session['picture']
        response = make_response(json.dumps('Successfully disconnected.'), 200)
        response.headers['Content-Type'] = 'application/json'
        flash("You have been logged out.")
        return redirect(url_for('categoriesMenu'))
    else:
        response = make_response(json.dumps
                                 ('Failed to revoke token for given user.',
                                  400))
        response.headers['Content-Type'] = 'application/json'
        return response


@app.route('/catalog/additem', methods=['GET', 'POST'])
def addItem():

    if 'username' not in login_session:
        return redirect('/login')

    categories = session.query(Category).all()
    new_item = CategoryItem()

    if request.method == 'POST':
        if request.form['name']:
            new_item.name = request.form['name']
        if request.form['description']:
            new_item.description = request.form['description']
        if request.form['category']:
            new_item.category_id = request.form['category']

        new_item.user_id = login_session['user_id']

        session.add(new_item)
        session.commit()
        flash("Category item created!")

        category = session.query(Category).filter_by(
            id=new_item.category_id).one()

        return redirect(url_for('categoryItemPage',
                                category_name=category.name,
                                categoryitem_name=new_item.name))
    else:
        return render_template('addcategoryitem.html',
                               categories=categories)


@app.route('/catalog/<string:category_name>/<string:categoryitem_name>/')
def categoryItemPage(category_name, categoryitem_name):
    
    category = session.query(Category).filter_by(name=category_name).one()
    categoryItem = session.query(CategoryItem).filter_by(
        category_id=category.id, name=categoryitem_name).one()

    if 'username' in login_session:
        user = session.query(User).filter_by(
            email=login_session['email']).one()
    else:
        user = 0

    return render_template('categoryitem.html',
                           category_name=category.name,
                           categoryItem=categoryItem,
                           user=user)


@app.route('/catalog/<string:category_name>/')
def categoryPage(category_name):
    categories = session.query(Category).all()
    selectedCategory = session.query(Category).filter_by(
        name=category_name).one()
    categoryItems = session.query(CategoryItem).filter_by(
        category_id=selectedCategory.id)

    return render_template('categorypage.html',
                           categories=categories,
                           category_name=selectedCategory.name,
                           categoryItems=categoryItems)


@app.route('/catalog/<string:categoryitem_name>/edit', methods=['GET', 'POST'])
def editCategoryItem(categoryitem_name):

    if 'username' not in login_session:
        return redirect('/login')

    categories = session.query(Category).all()
    categoryItem = session.query(CategoryItem).filter_by(
        name=categoryitem_name).one()
    category = session.query(Category).filter_by(
        id=categoryItem.category_id).one()

    if categoryItem.user_id != login_session['user_id']:
        flash("You have to be the owner to edit this item!")
        return redirect(url_for('categoryItemPage',
                                category_name=category.name,
                                categoryitem_name=categoryitem_name))

    if request.method == 'POST':
        if request.form['name']:
            categoryItem.name = request.form['name']
        if request.form['description']:
            categoryItem.description = request.form['description']
        if request.form['category']:
            categoryItem.category_id = request.form['category']
        session.add(categoryItem)
        session.commit()
        flash("Category Item edited!")
        return redirect(url_for('categoryItemPage',
                                category_name=categoryItem.category.name,
                                categoryitem_name=categoryItem.name))
    else:
        return render_template('editcategoryitem.html',
                               item=categoryItem,
                               categories=categories)


@app.route('/catalog/<string:categoryitem_name>/delete',
           methods=['GET', 'POST'])
def deleteCategoryItem(categoryitem_name):

    if 'username' not in login_session:
        return redirect('/login')

    categoryItem = session.query(CategoryItem).filter_by(
        name=categoryitem_name).one()
    category = session.query(Category).filter_by(
        id=categoryItem.category_id).one()

    if categoryItem.user_id != login_session['user_id']:
        flash("You have to be the owner to delete this item!")
        return redirect(url_for('categoryItemPage',
                                category_name=category.name,
                                categoryitem_name=categoryitem_name))

    if request.method == 'POST':
        session.delete(categoryItem)
        session.commit()
        flash("menu item deleted!")
        return redirect(url_for('categoryPage', category_name=category.name))
    else:
        return render_template('deletecategoryitem.html', item=categoryItem)


def getUserID(email):
    try:
        user = session.query(User).filter_by(email=email).one()
        return user.id
    except:
        return None


def getUserInfo(user_id):
    user = session.query(User).filter_by(id=user_id).one()
    return user


def createUser(login_session):
    newUser = User(name=login_session['username'],
                   email=login_session['email'],
                   picture=login_session['picture'])
    session.add(newUser)
    session.commit()
    user = session.query(User).filter_by(email=login_session['email']).one()
    return user.id


if __name__ == '__main__':
    app.secret_key = 'super_secret_key'
    app.debug = True
    app.run(host='0.0.0.0', port=5000)
