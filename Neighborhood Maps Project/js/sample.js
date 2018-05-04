'use strict';

// Array containing all of the restaurants
var restaurants;
var markers = [];
var map;
var infowindow;

function createMarkers(locations){

    infowindow = new google.maps.InfoWindow();

    for (var i = 0; i < locations.length; i++) {

        var restaurantInfo = locations[i]["restaurant"];
        // Get the position from the location array.
        var position = {"lat": Number(restaurantInfo["location"]["latitude"]), "lng": Number(restaurantInfo["location"]["longitude"])};
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
        marker.setMap(map);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
        populateInfoWindow(this, infowindow);
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
    createMarkers(restaurants);

}).fail(function(){

    alert("Zomato API call failed. Try again.");

});

// global var for initMap()



// Async callback to Google Maps API
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 39.718401, lng: -105.1500635}
    });

}

var viewModel = function(){

    var self = this;

    self.locations = ko.observableArray([]);

};

// alerts the user if Google Maps fails to load
function googleError() {
    alert('Google Maps has failed to load. Please check your internet connection or try again later.');
}
