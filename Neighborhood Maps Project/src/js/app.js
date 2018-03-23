var map;
var restaurant_data = {"businesses": [{"id": "frijoles-colorado-cuban-cafe-lakewood", "name": "Frijoles Colorado Cuban Cafe", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/H49vEgkBJ0VxiUiWcMt4Iw/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/frijoles-colorado-cuban-cafe-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 677, "categories": [{"alias": "cafes", "title": "Cafes"}, {"alias": "cuban", "title": "Cuban"}], "rating": 4.5, "coordinates": {"latitude": 39.7084831383495, "longitude": -105.135432986479}, "transactions": [], "price": "$", "location": {"address1": "12095 W Alameda Pkwy", "address2": "", "address3": "", "city": "Lakewood", "zip_code": "80228", "country": "US", "state": "CO", "display_address": ["12095 W Alameda Pkwy", "Lakewood, CO 80228"]}, "phone": "+13037164587", "display_phone": "(303) 716-4587", "distance": 1668.026377835968}, {"id": "hana-matsuri-sushi-ii-lakewood", "name": "Hana Matsuri Sushi II", "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/WcuuLmcxL5vJxjNtfyDNaA/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/hana-matsuri-sushi-ii-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 248, "categories": [{"alias": "japanese", "title": "Japanese"}, {"alias": "sushi", "title": "Sushi Bars"}, {"alias": "asianfusion", "title": "Asian Fusion"}], "rating": 4.5, "coordinates": {"latitude": 39.7138, "longitude": -105.13279}, "transactions": [], "price": "$$", "location": {"address1": "150 S Union Blvd", "address2": "Ste 103", "address3": "", "city": "Lakewood", "zip_code": "80228", "country": "US", "state": "CO", "display_address": ["150 S Union Blvd", "Ste 103", "Lakewood, CO 80228"]}, "phone": "+13032841278", "display_phone": "(303) 284-1278", "distance": 1557.1077582460598}, {"id": "citizen-thai-bistro-golden", "name": "Citizen Thai Bistro", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/-Ifmr-KxsV2LpI52xtHbNA/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/citizen-thai-bistro-golden?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 156, "categories": [{"alias": "thai", "title": "Thai"}, {"alias": "desserts", "title": "Desserts"}, {"alias": "soup", "title": "Soup"}], "rating": 4.5, "coordinates": {"latitude": 39.7239890398977, "longitude": -105.165102198242}, "transactions": ["pickup", "delivery"], "price": "$$", "location": {"address1": "14799 W 6th Ave Frontage Rd", "address2": "Ste B6", "address3": "", "city": "Golden", "zip_code": "80401", "country": "US", "state": "CO", "display_address": ["14799 W 6th Ave Frontage Rd", "Ste B6", "Golden, CO 80401"]}, "phone": "+13032178010", "display_phone": "(303) 217-8010", "distance": 1428.438300150638}, {"id": "tellers-taproom-and-kitchen-lakewood", "name": "Teller's Taproom & Kitchen", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/ozqkU21YzqZpoILQ48UBNg/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/tellers-taproom-and-kitchen-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 382, "categories": [{"alias": "tradamerican", "title": "American (Traditional)"}, {"alias": "bars", "title": "Bars"}, {"alias": "burgers", "title": "Burgers"}], "rating": 4.0, "coordinates": {"latitude": 39.7471, "longitude": -105.14205}, "transactions": [], "price": "$$", "location": {"address1": "1990 Youngfield St", "address2": null, "address3": "", "city": "Lakewood", "zip_code": "80215", "country": "US", "state": "CO", "display_address": ["1990 Youngfield St", "Lakewood, CO 80215"]}, "phone": "+13032371002", "display_phone": "(303) 237-1002", "distance": 3257.6666992404794}, {"id": "blue-sky-cafe-and-juice-bar-lakewood", "name": "Blue Sky Cafe & Juice Bar", "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/jIxMtXGfAlzdfuwJC5ahRw/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/blue-sky-cafe-and-juice-bar-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 291, "categories": [{"alias": "breakfast_brunch", "title": "Breakfast & Brunch"}, {"alias": "sandwiches", "title": "Sandwiches"}, {"alias": "juicebars", "title": "Juice Bars & Smoothies"}], "rating": 4.0, "coordinates": {"latitude": 39.7330291, "longitude": -105.1630068}, "transactions": [], "price": "$$", "location": {"address1": "14403 W Colfax Ave", "address2": "", "address3": "", "city": "Lakewood", "zip_code": "80401", "country": "US", "state": "CO", "display_address": ["14403 W Colfax Ave", "Lakewood, CO 80401"]}, "phone": "+13032162670", "display_phone": "(303) 216-2670", "distance": 2045.5663654524699}, {"id": "bonfire-burritos-golden", "name": "Bonfire Burritos", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/-GdOkMvIstSyReqZfv-_TQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/bonfire-burritos-golden?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 189, "categories": [{"alias": "foodstands", "title": "Food Stands"}, {"alias": "mexican", "title": "Mexican"}], "rating": 4.5, "coordinates": {"latitude": 39.7374570315623, "longitude": -105.191691893052}, "transactions": [], "price": "$", "location": {"address1": "17025 S Golden Rd", "address2": null, "address3": "", "city": "Golden", "zip_code": "80401", "country": "US", "state": "CO", "display_address": ["17025 S Golden Rd", "Golden, CO 80401"]}, "phone": "+17205566269", "display_phone": "(720) 556-6269", "distance": 4142.883558875564}, {"id": "the-keg-steakhouse-bar-lakewood", "name": "The Keg Steakhouse + Bar", "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/B5vA3mxuU6tIWkrUsLI6RQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/the-keg-steakhouse-bar-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 235, "categories": [{"alias": "steak", "title": "Steakhouses"}, {"alias": "bars", "title": "Bars"}, {"alias": "seafood", "title": "Seafood"}], "rating": 4.0, "coordinates": {"latitude": 39.7360476, "longitude": -105.157949}, "transactions": [], "price": "$$$", "location": {"address1": "14065 W Colfax Dr", "address2": "", "address3": "", "city": "Lakewood", "zip_code": "80232", "country": "US", "state": "CO", "display_address": ["14065 W Colfax Dr", "Lakewood, CO 80232"]}, "phone": "+13032387500", "display_phone": "(303) 238-7500", "distance": 2074.857938974238}, {"id": "kazoku-sushi-lakewood", "name": "Kazoku Sushi", "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/TZrTKdDaM8V1Hn-pG7r2IA/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/kazoku-sushi-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 279, "categories": [{"alias": "sushi", "title": "Sushi Bars"}, {"alias": "japanese", "title": "Japanese"}], "rating": 4.0, "coordinates": {"latitude": 39.7410306988514, "longitude": -105.117939189076}, "transactions": [], "price": "$$", "location": {"address1": "10665 W Colfax Ave", "address2": "", "address3": "", "city": "Lakewood", "zip_code": "80215", "country": "US", "state": "CO", "display_address": ["10665 W Colfax Ave", "Lakewood, CO 80215"]}, "phone": "+13032381199", "display_phone": "(303) 238-1199", "distance": 3725.4060100557836}, {"id": "yard-house-lakewood-2", "name": "Yard House", "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/J_vDdsEk4GPjejzqjvXoMQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/yard-house-lakewood-2?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 367, "categories": [{"alias": "bars", "title": "Bars"}, {"alias": "vegetarian", "title": "Vegetarian"}, {"alias": "newamerican", "title": "American (New)"}], "rating": 3.5, "coordinates": {"latitude": 39.7329462849452, "longitude": -105.155579483575}, "transactions": ["delivery", "pickup"], "price": "$$", "location": {"address1": "14500 West Colfax Ave", "address2": "Unit 341", "address3": "", "city": "Lakewood", "zip_code": "80401", "country": "US", "state": "CO", "display_address": ["14500 West Colfax Ave", "Unit 341", "Lakewood, CO 80401"]}, "phone": "+13032789273", "display_phone": "(303) 278-9273", "distance": 1684.751387298134}, {"id": "d-deli-golden", "name": "D'deli", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/4-N_O6lWbNojcJhYSYkRwg/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/d-deli-golden?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 387, "categories": [{"alias": "sandwiches", "title": "Sandwiches"}], "rating": 4.5, "coordinates": {"latitude": 39.7552824143017, "longitude": -105.22094202267}, "transactions": [], "price": "$", "location": {"address1": "1207 Washington Ave", "address2": "", "address3": "", "city": "Golden", "zip_code": "80401", "country": "US", "state": "CO", "display_address": ["1207 Washington Ave", "Golden, CO 80401"]}, "phone": "+13032798020", "display_phone": "(303) 279-8020", "distance": 7317.774977247892}, {"id": "thai-diamond-cafe-lakewood", "name": "Thai Diamond Cafe", "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/r5uma-lI8A2AtC_YG6e00A/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/thai-diamond-cafe-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 204, "categories": [{"alias": "thai", "title": "Thai"}], "rating": 4.5, "coordinates": {"latitude": 39.7408668, "longitude": -105.109535}, "transactions": [], "price": "$", "location": {"address1": "1560 Kipling St", "address2": "", "address3": "", "city": "Lakewood", "zip_code": "80215", "country": "US", "state": "CO", "display_address": ["1560 Kipling St", "Lakewood, CO 80215"]}, "phone": "+13034620435", "display_phone": "(303) 462-0435", "distance": 4272.300771696282}, {"id": "modern-market-eatery-lakewood", "name": "Modern Market Eatery", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/YtJXaXQcWm_wzAvyjxAvkA/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/modern-market-eatery-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 237, "categories": [{"alias": "breakfast_brunch", "title": "Breakfast & Brunch"}, {"alias": "salad", "title": "Salad"}, {"alias": "sandwiches", "title": "Sandwiches"}], "rating": 3.5, "coordinates": {"latitude": 39.7320285557104, "longitude": -105.164124340083}, "transactions": ["delivery", "pickup"], "price": "$$", "location": {"address1": "14630 W Colfax", "address2": "Ste 130", "address3": "", "city": "Lakewood", "zip_code": "80401", "country": "US", "state": "CO", "display_address": ["14630 W Colfax", "Ste 130", "Lakewood, CO 80401"]}, "phone": "+13032788283", "display_phone": "(303) 278-8283", "distance": 1934.478368943054}, {"id": "westrail-tap-and-grill-lakewood", "name": "Westrail Tap & Grill", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/bMBgBuZvlZO5fqGw0hxP7w/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/westrail-tap-and-grill-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 232, "categories": [{"alias": "tradamerican", "title": "American (Traditional)"}, {"alias": "sportsbars", "title": "Sports Bars"}], "rating": 4.0, "coordinates": {"latitude": 39.7123812608442, "longitude": -105.13418700546}, "transactions": ["delivery", "pickup"], "price": "$$", "location": {"address1": "195 S Union Blvd", "address2": "", "address3": "", "city": "Lakewood", "zip_code": "80228", "country": "US", "state": "CO", "display_address": ["195 S Union Blvd", "Lakewood, CO 80228"]}, "phone": "+13039862200", "display_phone": "(303) 986-2200", "distance": 1513.98946882053}, {"id": "cafe-jordano-lakewood", "name": "Cafe Jordano", "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/VpHQz-SbqtcgZx_yUH7oaw/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/cafe-jordano-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 354, "categories": [{"alias": "italian", "title": "Italian"}], "rating": 4.0, "coordinates": {"latitude": 39.680876, "longitude": -105.121556}, "transactions": [], "price": "$$", "location": {"address1": "11068 W Jewell Ave", "address2": "Ste C9", "address3": "", "city": "Lakewood", "zip_code": "80232", "country": "US", "state": "CO", "display_address": ["11068 W Jewell Ave", "Ste C9", "Lakewood, CO 80232"]}, "phone": "+13039886863", "display_phone": "(303) 988-6863", "distance": 4833.094570083329}, {"id": "bobs-atomic-burgers-golden", "name": "Bob's Atomic Burgers", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/Z-cMw_ASbsXfd0ju-KvkxA/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/bobs-atomic-burgers-golden?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 482, "categories": [{"alias": "burgers", "title": "Burgers"}], "rating": 4.5, "coordinates": {"latitude": 39.7555826604366, "longitude": -105.218337625265}, "transactions": [], "price": "$", "location": {"address1": "1310 Ford St", "address2": "", "address3": "", "city": "Golden", "zip_code": "80401", "country": "US", "state": "CO", "display_address": ["1310 Ford St", "Golden, CO 80401"]}, "phone": "+13032781601", "display_phone": "(303) 278-1601", "distance": 7162.01182159057}, {"id": "woodys-woodfired-pizza-and-watering-hole-golden", "name": "Woody's Woodfired Pizza & Watering Hole", "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/TSmjkygwNX6ko5P-h6rOZw/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/woodys-woodfired-pizza-and-watering-hole-golden?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 556, "categories": [{"alias": "pizza", "title": "Pizza"}, {"alias": "burgers", "title": "Burgers"}, {"alias": "sandwiches", "title": "Sandwiches"}], "rating": 4.0, "coordinates": {"latitude": 39.7544760997358, "longitude": -105.220231929571}, "transactions": [], "price": "$$", "location": {"address1": "1305 Washington Ave", "address2": "", "address3": "", "city": "Golden", "zip_code": "80401", "country": "US", "state": "CO", "display_address": ["1305 Washington Ave", "Golden, CO 80401"]}, "phone": "+13032770443", "display_phone": "(303) 277-0443", "distance": 7217.382761238652}, {"id": "applewood-vietnamese-restaurant-golden", "name": "Applewood Vietnamese Restaurant", "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/ahLMfakwvyVBUbMHNzl22A/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/applewood-vietnamese-restaurant-golden?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 102, "categories": [{"alias": "vietnamese", "title": "Vietnamese"}, {"alias": "hotdogs", "title": "Fast Food"}], "rating": 4.5, "coordinates": {"latitude": 39.74624, "longitude": -105.14404}, "transactions": [], "price": "$", "location": {"address1": "1901 Youngfield St", "address2": "Ste 106", "address3": "", "city": "Golden", "zip_code": "80401", "country": "US", "state": "CO", "display_address": ["1901 Youngfield St", "Ste 106", "Golden, CO 80401"]}, "phone": "+17204764237", "display_phone": "(720) 476-4237", "distance": 3133.497412837618}, {"id": "szechuan-restaurant-denver", "name": "Szechuan Restaurant", "image_url": "https://s3-media2.fl.yelpcdn.com/bphoto/ojqRp8fJC-x9LwCyMRZcxQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/szechuan-restaurant-denver?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 198, "categories": [{"alias": "chinese", "title": "Chinese"}], "rating": 4.0, "coordinates": {"latitude": 39.7251351, "longitude": -105.0987249}, "transactions": [], "price": "$$", "location": {"address1": "9090 W 6th Ave", "address2": "", "address3": "", "city": "Denver", "zip_code": "80215", "country": "US", "state": "CO", "display_address": ["9090 W 6th Ave", "Denver, CO 80215"]}, "phone": "+13032324558", "display_phone": "(303) 232-4558", "distance": 4481.1334621996175}, {"id": "jose-o-sheas-lakewood", "name": "Jose O'Sheas", "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/VYl6aUxnLRdPQtCsEBkkYQ/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/jose-o-sheas-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 312, "categories": [{"alias": "mexican", "title": "Mexican"}], "rating": 3.5, "coordinates": {"latitude": 39.72245, "longitude": -105.1331}, "transactions": [], "price": "$$", "location": {"address1": "385 Union Blvd", "address2": "", "address3": "", "city": "Lakewood", "zip_code": "80228", "country": "US", "state": "CO", "display_address": ["385 Union Blvd", "Lakewood, CO 80228"]}, "phone": "+13039887333", "display_phone": "(303) 988-7333", "distance": 1526.865650584052}, {"id": "himalaya-house-lakewood", "name": "Himalaya House", "image_url": "https://s3-media3.fl.yelpcdn.com/bphoto/WukeKBYNYoaKTR4wRzuarw/o.jpg", "is_closed": false, "url": "https://www.yelp.com/biz/himalaya-house-lakewood?adjust_creative=es3XHwSvyIrdVI8Mm10rvw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=es3XHwSvyIrdVI8Mm10rvw", "review_count": 129, "categories": [{"alias": "indpak", "title": "Indian"}, {"alias": "himalayan", "title": "Himalayan/Nepalese"}], "rating": 4.0, "coordinates": {"latitude": 39.7271517253259, "longitude": -105.129388487657}, "transactions": ["restaurant_reservation"], "price": "$$", "location": {"address1": "11903 W 6th Ave", "address2": "", "address3": "", "city": "Lakewood", "zip_code": "80401", "country": "US", "state": "CO", "display_address": ["11903 W 6th Ave", "Lakewood, CO 80401"]}, "phone": "+13032385904", "display_phone": "(303) 238-5904", "distance": 2018.275397890182}], "total": 960, "region": {"center": {"longitude": -105.1500635, "latitude": 39.718401}}}

// Create a new blank array for all the listing markers.
var markers = [];

function initMap() {

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 39.718401, lng: -105.1500635},
      zoom: 13
    });

}

var largeInfowindow = new google.maps.InfoWindow();

// Create a constructor for the marker
var marker = function(marker_info){

    this.latitude = marker_info.coordinates.latitude;
    this.longitude = marker_info.coordinates.longitude;
    this.title = marker_info.name;
    this.image = marker_info.image_url;
    this.url = marker_info.url;
    this.rating = marker_info.rating;
    this.price = marker_info.price;

    var marker = new google.maps.Marker({

        map: map,
        position: {'lat': latitude, 'lng': longitude},
        title: title,
        animation: google.maps.Animation.DROP,
        image: image,
        url: url,
        price: price,
        rating: rating,
        id: i

    });
    // Push the marker to our array of markers.
    markers.push(marker);
    // Create an onclick event to open an infowindow at each marker.
    marker.addListener('click', function() {
        // Stop any other markers from bouncing
        for (var i = 0; i < markers.length; i++){
            markers[i].setAnimation(null);
        }

        populateInfoWindow(this, largeInfowindow);
    });
}

// MARKER

// These are the real estate listings that will be shown to the user.
// Normally we'd have these in a database instead.
var locations = [];

function walk(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var val = obj[key];
      console.log(val);
      locations.push(val);
    }
  }
}
walk(restaurant_data[0]);

// Set locations array to the list of restaurants
locations = locations[0];



// MARKER

function googleError(){
    alert('The map did not load. Try refreshing the page or visit the page at a later date.');
}

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
// Check to make sure the infowindow is not already opened on this marker.

  var contentString = '<div>'
  contentString += '<div><p>' + marker.title + '</p></div>';
  contentString += '<div><p>Price: <span class="money">' + marker.price + '</span></p></div>';
  contentString += '<div><p>Rating: <span class="rating">' + marker.rating + '</span></p></div>';
  contentString += '<div> <a target=_blank href="' + marker.url + '">';
  contentString += '<img class="infoWindowImage" src="' + marker.image + '">';
  contentString += '</a></div></div>';

  infowindow.setContent(contentString);
  infowindow.open(map, marker);

    infowindow.addListener('closeclick',function(){
        marker.setAnimation(null);
    });

  if (marker.getAnimation() !== null){
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}

// This function will loop through the markers array and display them all.
function showListings() {
var bounds = new google.maps.LatLngBounds();
// Extend the boundaries of the map for each marker and display the marker
for (var i = 0; i < markers.length; i++) {
  markers[i].setMap(map);
  bounds.extend(markers[i].position);
}
map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hideListings() {
for (var i = 0; i < markers.length; i++) {
  markers[i].setMap(null);
}
}