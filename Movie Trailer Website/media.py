class Movie:
    """ This class holds all of the data for each
     movie that appears on the website. """

    def __init__(self, trailer_url, title, poster_url):
        """ The constructor sets the parameters that are passed
        (a youtube trailer url, the movie title, and the poster image url)
        to the correct movie. This gives each movie its own set of unique
        instance variables. """

        self.trailer_youtube_url = trailer_url
        self.title = title
        self.poster_image_url = poster_url
