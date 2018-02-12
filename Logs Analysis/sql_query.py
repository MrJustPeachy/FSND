import psycopg2

DBNAME = "news"

'''
Table columns:
    Authors: Name, Bio, Id
    Articles: Author, Title, Slug, Lead, Body, Time, ID
    Log: Path, IP, Method, Status, Time, ID
'''


def get_posts():
    """
    Return the three most popular articles.
    """
    db = psycopg2.connect(database=DBNAME)
    c = db.cursor()
    c.execute("SELECT articles.title, COUNT(log.Path) "
              "FROM log inner join articles on "
              "concat('/article/', articles.slug) = log.Path "
              "WHERE log.Status = '200 OK' AND log.Path != '/'"
              " GROUP BY log.Path, articles.title "
              "ORDER BY COUNT(log.Path) desc "
              "limit 3;")
    posts = c.fetchall()
    db.close()
    return posts


def get_authors():
    """
    Return the most popular authors of all time.
    """
    db = psycopg2.connect(database=DBNAME)
    c = db.cursor()
    c.execute("SELECT  authors.name, COUNT(*) as hits "
              "FROM log "
              "INNER JOIN articles ON "
              "concat('/article/', articles.slug) = log.path "
              "INNER JOIN authors ON articles.author = authors.id "
              "WHERE status = '200 OK' "
              "GROUP BY authors.name "
              "ORDER BY hits desc;")
    posts = c.fetchall()
    db.close()
    return posts


def get_errors():
    """
    Return days where more than 1% of requests lead to errors.
    """
    db = psycopg2.connect(database=DBNAME)
    c = db.cursor()

    c.execute("SELECT to_char(Time, 'FMMonth FMDD, YYYY'), "
              "round((count(*) filter (where status = '404 NOT FOUND') "
              "* 100.0) / count(status), 2) "
              "FROM log "
              "GROUP BY 1 "
              "HAVING round((count(*) filter (where status = '404 NOT FOUND') "
              "* 100.0) / count(status), 2) > 1.0"
              "ORDER BY 1;")
    posts = c.fetchall()
    db.close()
    return posts


top_posts = get_posts()
top_authors = get_authors()
request_errors = get_errors()


def most_popular_results(data, question):
    """
    Prints out the three most popular articles and the most popular authors.
    """
    result = question
    for i in range(len(data)):
        result += "\t" + data[i][0] + " - " + str(data[i][1]) + " views\n"

    result += '\n'

    return result


def error_results(data, question):
    """
    Prints out the days where more than 1% of requests lead to errors.
    """
    result = question
    for i in range(len(data)):
        result += "\t" + data[i][0] + " - " + str(data[i][1]) + "%"

    return result


f = open('results.txt', 'w')

f.write(most_popular_results
        (top_posts, "The three most popular articles of all time: \n"))
f.write(most_popular_results
        (top_authors, "The most popular authors of all time: \n"))
f.write(error_results
        (get_errors(),
         "The days which more than 1% of requests lead to errors: \n"))
