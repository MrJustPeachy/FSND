// Array containing all of the restaurants
var restaurants;

createMarkers(locations){

    for (var i = 0; i < restaurants.length; i++) {

        restaurantInfo = locations[i]["restaurants"];
        // Get the position from the location array.
        var position = {"lat": restaurantInfo["location"]["latitude"], "lng": restaurantInfo["location"]["longitude"]};
        var title = restaurantInfo["name"];
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
        position: position,
        title: title,
        animation: google.maps.Animation.DROP,
        id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
        populateInfoWindow(this, largeInfowindow);
        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
        this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
        this.setIcon(defaultIcon);
        });
    }

}

// Model
var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://developers.zomato.com/api/v2.1/location_details?entity_id=36388&entity_type=group",
		"method": "GET",
		"headers": {
			"user-key": "20c48f3be1cb3d5555d26d949ac56258"
		}
	};

$.ajax(settings).done(function (response) {

    restaurants = response["best_rated_restaurant"];
    console.log(response["best_rated_restaurant"]);
    console.log(restaurants);

    createMarkers(restaurants);

}).fail(function(){
    alert("Zomato API call failed. Try again.");

});

// global var for initMap()
var map;
var markers = [];

// Async callback to Google Maps API
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 39.718401, lng: -105.1500635}
    });

    var largeInfowindow = new google.maps.InfoWindow();

    console.log(restaurants);
//    console.log(restaurants[0]);
//    console.log(Object.keys(restaurants).length);



}

// alerts the user if Google Maps fails to load
function googleError() {
    alert('Google Maps has failed to load. Please check your internet connection or try again later.');
}


// ViewModel START
//var ViewModel = function() {
//
//    var largeInfowindow = new google.maps.InfoWindow();
//
//    for (var i = 0; i < restaurants.length; i++) {
//      // Get the position from the location array.
//      var position = restaurants[i].coords;
//      var title = restaurants[i].name;
//      // Create a marker per location, and put into markers array.
//      var marker = new google.maps.Marker({
//        position: position,
//        title: title,
//        animation: google.maps.Animation.DROP,
//        icon: defaultIcon,
//        id: i
//      });
//      // Push the marker to our array of markers.
//      markers.push(marker);
//      // Create an onclick event to open the large infowindow at each marker.
//      marker.addListener('click', function() {
//        populateInfoWindow(this, largeInfowindow);
//      });
//      // Two event listeners - one for mouseover, one for mouseout,
//      // to change the colors back and forth.
//      marker.addListener('mouseover', function() {
//        this.setIcon(highlightedIcon);
//      });
//      marker.addListener('mouseout', function() {
//        this.setIcon(defaultIcon);
//      });
//    }
//
//};

//var initApp = function() {
//    initMap();
//    ko.applyBindings(new ViewModel());
//};