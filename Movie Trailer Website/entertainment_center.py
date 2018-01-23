import media
import fresh_tomatoes

# Forrest gump movie: Trailer URL, Title, and Poster image URL
forrest_gump = media.Movie('https://www.youtube.com/watch?v=uPIEn0M8su0',
                           'Forrest Gump',
                           'https://images-na.ssl-images-'
                           'amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Y'
                           'zg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQ'
                           'xNzMzNDI@._V1_UY268_CR1,0,182,268_AL_.jpg')

# Radio flyer movie: Trailer URL, Title, and Poster image URL
radio_flyer = media.Movie('https://www.youtube.com/watch?v=PP6-G0t7LFU',
                          'Radio Flyer',
                          'https://i.ytimg.com/vi/ZJ6mUHsCTPQ/movieposter.jpg')

# Secondhand lions movie: Trailer URL, Title, and Poster image URL
secondhand_lions = media.Movie('https://www.youtube.com/watch?v=kESuY24Luds',
                               'Secondhand Lions',
                               'https://ireportdaily.com/wp-content/uploads'
                               '/2017/12/Secondhand-Lions.jpg')

# All of the movies that will be displayed dynamically on the webpage
movies = [forrest_gump, radio_flyer, secondhand_lions]

# Run the code to create the webpage
fresh_tomatoes.open_movies_page(movies)
