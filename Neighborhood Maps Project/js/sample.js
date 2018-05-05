'use strict';

var restaurants;
var map;
var infowindow;
var bounds;

function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: {lat: 39.735183, lng: -105.158941}
    });

    bounds = new google.maps.LatLngBounds();

    ViewModel.callAPI();

}

// alerts the user if Google Maps fails to load
function googleError() {
    alert('Google Maps has failed to load. Please check your internet connection or try again later.');
}



var viewModel = function(){

    var self = this;

    self.filteredLocations = ko.observableArray([]);

    self.createMarkers = function(locations){

        infowindow = new google.maps.InfoWindow();

        for (var i = 0; i < locations.length; i++) {

            var restaurantInfo = locations[i]["restaurant"];
            var position = {"lat": Number(restaurantInfo["location"]["latitude"]), "lng": Number(restaurantInfo["location"]["longitude"])};
            var title = restaurantInfo["name"];
            var cuisines = restaurantInfo["cuisines"];
            var restaurantLink = restaurantInfo["url"];
            var thumbnailImage = restaurantInfo["thumb"];
            var rating = restaurantInfo["user_rating"]["aggregate_rating"];

            // Create a marker per location, and put into markers array.
            var marker = new google.maps.Marker({

                position: position,
                title: title,
                animation: google.maps.Animation.DROP,
                cuisines: cuisines,
                restaurantLink: restaurantLink,
                thumbnail: thumbnailImage,
                rating: rating,
                id: i

            });

            // Push the marker to our array of markers.
            self.locations.push(marker);
            marker.setMap(map);
            bounds.extend(marker.position);
            // Create an onclick event to open the large infowindow at each marker.
            marker.addListener('click', function() {
                self.populateInfoWindow(this, infowindow);
            });

            map.fitBounds(bounds);
        }

    };

    self.callAPI = function(){

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
            self.createMarkers(restaurants);

        }).fail(function(){

            alert("Zomato API call failed. Try again.");

        });

    };

    self.populateInfoWindow = function(marker, infowindow){

        if (infowindow.marker != marker){
            infowindow.marker = marker;
            var htmlString = '';
            htmlString += '<div>Restaurant Name: ' + marker.title + "</div>";
            htmlString += '<div>Cuisine Option(s): ' + marker.cuisines + "</div>";
            htmlString += '<div>Restaurant rating: ' + marker.rating + "</div><br>";
            htmlString += '<div> <a href="' + marker.restaurantLink + '" target="_blank">' + '<img src="' + marker.thumbnail + '"/></a></div>';
            infowindow.setContent(htmlString);
            infowindow.open(map, marker);

            infowindow.addListener('closeclick', function(){
                infowindow.marker = null;
            });

        }

        map.fitBounds(bounds);

    };

    self.rating = ko.observable(0);

    self.ratingFilter = function(){

    };

};

var ViewModel = new viewModel();
ko.applyBindings(ViewModel);

ViewModel.rating.subscribe(function(){

    ViewModel.ratingFilter();

});