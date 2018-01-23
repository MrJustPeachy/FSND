import media
import fresh_tomatoes

forrest_gump = media.Movie('https://www.youtube.com/watch?v=uPIEn0M8su0', 'Forrest Gump',
                           'https://images-na.ssl-images-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYm'
                           'EyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_UY268_CR1,0,182,268_AL_.jpg')

radio_flyer = media.Movie('https://www.youtube.com/watch?v=PP6-G0t7LFU', 'Radio Flyer',
                          'https://i.ytimg.com/vi/ZJ6mUHsCTPQ/movieposter.jpg')

secondhand_lions = media.Movie('https://www.youtube.com/watch?v=kESuY24Luds', 'Secondhand Lions',
                               'https://ireportdaily.com/wp-content/uploads/2017/12/Secondhand-Lions.jpg')

movies = [forrest_gump, radio_flyer, secondhand_lions]

fresh_tomatoes.open_movies_page(movies)
