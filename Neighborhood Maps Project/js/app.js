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

    console.log(response["best_rated_restaurant"]);

    restaurantList = response["best_rated_restaurant"];

    for (var i = 0; i < restaurantList.length; i++){
        console.log(restaurantList[i]["restaurant"]);
        restaurantName = response[i]["restaurant"]["name"];
        costForTwo = response[i]["restaurant"]["average_cost_for_two"];
        imageURL = response[i]["restaurant"]["featured_image"];
        coords = {"latitude": response[i]["restaurant"]["location"]["latitude"], "longitude": response[i]["restaurant"]["location"]["longitude"]};
        cuisines = response[i]["restaurant"]
        restaurants[i] = {
            name: restaurantName,
            costForTwo: costForTwo,
            imageURL: imageURL,
            coords: coords,
            cuisines: cuisines
        };
    }

});

console.log(restaurants);