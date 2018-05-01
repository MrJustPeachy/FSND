var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://developers.zomato.com/api/v2.1/location_details?entity_id=36388&entity_type=group",
		"method": "GET",
		"headers": {
			"user-key": "20c48f3be1cb3d5555d26d949ac56258"
		}
	};

var restaurants = [];

$.ajax(settings).done(function (response) {

    for (var i = 0; i < response["best_rated_restaurant"].length; i++){
        restaurants[i] = response["best_rated_restaurant"][i];
    }

});

console.log(restaurants);
