'use strict';

// Intantiate all local variables
var restaurants;
var map;
var infowindow;
var markers = [];
var bounds;


// Create the map and call the API to show the markers
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 16,
        center: {lat: 39.735183, lng: -105.158941}
    });

    bounds = new google.maps.LatLngBounds();

    // Call the API to create the markers
    ViewModel.callAPI();

}

// Handles an error in the google maps API
function googleError() {
    alert('Google Maps has failed to load. Please check your internet connection or try again later.');
}



var viewModel = function(){

    var self = this;

    self.knockoutRestaurants = ko.observableArray();
    self.filteredRestaurants = ko.observableArray();

    // Function creates the actual marker and places it on the map
    self.createMarkers = function(locations){

        infowindow = new google.maps.InfoWindow();

        for (var i = 0; i < locations.length; i++) {

            // Get all of the markers data needed
            var restaurantInfo = locations[i]["restaurant"];
            var position = {"lat": Number(restaurantInfo["location"]["latitude"]), "lng": Number(restaurantInfo["location"]["longitude"])};
            var title = restaurantInfo["name"];
            var cuisines = restaurantInfo["cuisines"];
            var restaurantLink = restaurantInfo["url"];
            var thumbnailImage = restaurantInfo["thumb"];
            var rating = Number(restaurantInfo["user_rating"]["aggregate_rating"]);

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

            // Adds marker to the markers array
            markers.push(marker);

            // Places the marker on the map
            marker.setMap(map);

            // Extends the map bounds in case the marker is out of view
            bounds.extend(marker.position);

            // Create an onclick event to open the large infowindow at each marker.
            marker.addListener('click', function() {
                self.populateInfoWindow(this, infowindow);
            });

            // Add the restaurant to the restaurants array
            self.knockoutRestaurants.push(marker);

            // Add the initial marker to filtered restaurants too
            self.filteredRestaurants.push(marker);

            // Makes the map bounds the bounds var value
            map.fitBounds(bounds);
        }

    };

    // Function that calls the API
    self.callAPI = function(){


        // Create the settings of the AJAX call
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://developers.zomato.com/api/v2.1/location_details?entity_id=36388&entity_type=group",
            "method": "GET",
            "headers": {
                "user-key": "20c48f3be1cb3d5555d26d949ac56258"
            }
         };

        // Using jQuery, make an ajax call with the settings
        $.ajax(settings).done(function (response) {

            // Get all of the restaurants and pass the array into the createMarkers method
            restaurants = response["best_rated_restaurant"];
            self.createMarkers(restaurants);


          // Alert the user if the API call fails
        }).fail(function(){

            alert("Zomato API call failed. Try again.");

        });

    };

    // Creates the infowindow with all of the API information, and extends the map bounds
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

    // Creates the rating variable
    self.rating = ko.observable(0);

    // Displays the infowindow if the marker is clicked on the list of names
    self.clickedMarker = function(marker){

        self.populateInfoWindow(marker, infowindow);

    }

    // Hides/Shows markers based on the user's rating
    self.ratingFilter = ko.computed(function(){

        for (var i = 0; i < self.knockoutRestaurants().length; i++){

            var restaurantRating = self.knockoutRestaurants()[i]["rating"];

            if (restaurantRating < self.rating()){

              self.knockoutRestaurants()[i].setMap(null);

            }
            else {

              self.knockoutRestaurants()[i].setMap(map);

            }

        }

        // Returns an array of the restaurants that have a higher or equal rating to the users selection
        return ko.utils.arrayFilter(self.knockoutRestaurants(), function(restaurantArg){

            return restaurantArg.rating >= self.rating();

        });

    });

};

var ViewModel = new viewModel();
ko.applyBindings(ViewModel);

// Calls the ratingFilter function whenever the slider value changes
ViewModel.rating.subscribe(function(){

    ViewModel.ratingFilter();

});
