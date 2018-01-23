# Create a class for movies that contains the trailer, title, and poster
class Movie:

    def __init__(self, trailer_url, title, poster_url):
        self.trailer_youtube_url = trailer_url
        self.title = title
        self.poster_image_url = poster_url
