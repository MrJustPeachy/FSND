# Catalog Website Application

### Setting up software
There are multiple programs that you will have to install before you can run this project.

#### Python and modules
 * [Python 2.7.14](https://www.python.org/downloads/)
 * Flask
 * SQLAlchemy
 * httplib2
 * json
 * oauth2client

##### Installation
 1. Install Python 2.7.14 and the modules with pip.
 2. Download this repo or clone it.
 3. Place the repo inside of your vagrant directory. If you don't have vagrant set up, look at the [README on my logs analysis project](https://github.com/MrJustPeachy/FSND/blob/master/Logs%20Analysis/README.md) for help getting it running.
 4. Open your terminal and enter in the following commands:
 
        vagrant up
 7. After that runs enter in the next command:

        vagrant ssh

 8. You are now running your VM. Enter:

        cd /vagrant
        cd /catalog
    in order to get into the catalog application and see your files.
 
##### Creating the database and running the project
1. Enter:

        python database_setup.py
   to create the local database.
2. Enter:

        python data.py
   to populate the database with some basic values.
3. Finally, enter:
 
        python catalog.py
   to get the application running. 
4. Type the following URL into your browser:
      
        localhost:5000
   to start using the catalog app. Enjoy!

#### Here are three links to get you started (the JSON endpoints)
 * [Categories JSON endpoint](localhost:5000/categories.json)
 * [CategoryItems JSON endpoint](localhost:5000/categoryitems.json)
 * [Catalog JSON endpoint](localhost:5000/catalog.json)
