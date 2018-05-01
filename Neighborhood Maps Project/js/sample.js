
// use strict
'use strict';

// Model START
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
        restaurants[i] = response["best_rated_restaurant"]["restaurant"][i];
    }

});
// Model END


// global var for initMap()
var map;

// Async callback to Google Maps API
function initMap() {

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 39.718401, lng: -105.1500635}
    });
}

// Constructor for each location i.e. venue displayed on the map
var Location = function(data) {
    this.name = data.name;
    this.position = data.position;
    this.venueID = data.venueID;
    this.marker = null;
    this.favourite = false;
};


// alerts the user if Google Maps fails to load
function googleError() {
    alert('Google Maps has failed to load. Please check your internet connection or try again later.');
}


// ViewModel START
var ViewModel = function() {

    var self = this;

    // config for FourSquare ajax request
    var fsqClient = '?client_id=';
    var fsqClientID = 'IUPLCEDVWLKOD5HK2MGBV2AX3LUXULEBJ3R5SBBHWNYLPM5T';
    var fsqClientSecret = '&client_secret=FHY1LCHZ0K5OG3WRPZHF4VRR4WFMH304FA2ICGTD4SENJRUR';
    var vParam = '&v=20170215';
    var mParam = '&m=foursquare';

    var infowindow = new google.maps.InfoWindow({
        maxWidth: 250,
    });

    // standard array to render markers and for Foursquare ajax request
    self.attractions = [];

    // Instantiate objects using the 'Location' Constructor i.e.
    // creates each locationItem using the 'Location' Constructor
    locations.forEach(function(locationItem) {
        self.attractions.push(new Location(locationItem));
    });

    // creates location markers for each object in the attractions array
    self.attractions.forEach(function(locationItem) {

        locationItem.marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: locationItem.position,
        });

        // FourSquare ajax request for venue info
        $.ajax({
            url: 'https://api.foursquare.com/v2/venues/' + locationItem.venueID + fsqClient + fsqClientID + fsqClientSecret + vParam + mParam,
            dataType: "json"
        }).done(function (data) {

            // helpers: shortener and confirm valid json responses
            var venueInfo = data.response.venue;

            var description = venueInfo.hasOwnProperty("description") ? venueInfo.description : "";

            var openStatus = venueInfo.hasOwnProperty("hours") ? venueInfo.hours.status : "Foursquare has no info at present";

            var address = venueInfo.location.hasOwnProperty("formattedAddress") ? venueInfo.location.formattedAddress : "Foursquare has no info at present";

            var rating = venueInfo.hasOwnProperty("rating") ? venueInfo.rating + ' / 10' : "No rating available";

            var tips = venueInfo.tips.hasOwnProperty("groups") ? venueInfo.tips.groups[0].items[0].text : "No tip available at present";

            // content for the infowindow if API callback is successful
            locationItem.contentString = '<div class="infowindow">' +
                '<div class="info_wrapper">' +
                    '<h2>' + locationItem.name + '</h2>' +
                    '<p>' + description + '</p>' +
                    '<p>Opening hours: ' + openStatus + '</p>' +
                    '<p>Location: ' + address + '</p>' +
                    '<p>Rating: ' + rating + '</p>' +
                    '<p>Best Tip: ' + tips + '</p>' +
                    '<p>Click to read more on <a href="' + venueInfo.canonicalUrl + '?ref=' + fsqClientID + '" target="_blank">Foursquare</a></p>' +
                    '<p class="foursquare-attribution">Information powered by Foursquare</p>' +
                '</div>' +  // end info_wrapper
                '</div>'; // end infowindow div class

            // config for infowindow if successful
            locationItem.infowindow = new google.maps.InfoWindow({
                content: locationItem.contentString
            });

        // error handling for foursquare ajax request
        }).fail(function() {
            document.getElementById('js_foursquare-error').innerHTML = 'Failed to get ' +
            'venue information from Foursquare. Please check your internet connection, or try again later.';
        });

        // listens for clicks on the marker and then executes...
        google.maps.event.addDomListener(locationItem.marker, 'click', function() {
            bounceMarker(this);
            infowindow.open(map, locationItem.marker);
            infowindow.setContent(locationItem.contentString);
        });

        // listens for right clicks on the marker
        google.maps.event.addDomListener(locationItem.marker, 'rightclick', function() {
            self.favouriteAttractions(locationItem);
        });

    });

    this.displayInfo = function(locationItem) {
        var marker = locationItem.marker;
        bounceMarker(marker);
        infowindow.open(map, locationItem.marker);
        infowindow.setContent(locationItem.contentString);
    };

    function bounceMarker(marker) {
        if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
        } else {
            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function() {
                marker.setAnimation(null);
            }, 2100);  // 3 bounces then stops
        }
    }

    // search and filter an array based on user input

    // set-up empty observable array for visible attractions
    self.filteredAttractions = ko.observableArray();

    // populate visible attractions array with objects from attractions array
    self.attractions.forEach(function(locationItem) {
        self.filteredAttractions.push(locationItem);
    });

    // set user filter as ko observable
    self.userFilter = ko.observable('');

    // filter function: updates observableArray and
    // sets visibility of location markers
    self.runAttractionFilter = function() {
        var searchFilter = self.userFilter().toLowerCase();

        // 1. clear the array
        self.filteredAttractions.removeAll();

        // 2. run the filter and only add to the array if a match
        self.attractions.forEach(function(locationItem) {

            // set marker to false i.e. invisible
            locationItem.marker.setVisible(false);

            if(locationItem.name.toLowerCase().indexOf(searchFilter) !== -1) {
                self.filteredAttractions.push(locationItem);
            }
        });

        // for each item in the array, set visibility to true i.e. visible
        self.filteredAttractions().forEach(function(locationItem) {
            locationItem.marker.setVisible(true);
        });
    };

    // Used to toggle CSS class '.open' - false means '.open'
    // is not applied to the menu element.
    this.toggleDrawer = ko.observable(false);

    // Sets CSS class '.open' to true if false and vice versa.
    this.openDrawer = function() {
        self.toggleDrawer( !self.toggleDrawer() );
    };

    // manage favourites

    // set-up empty observable array for favourite attractions
    self.favAttractions = ko.observableArray();

    // this.favourite = ko.observable(false);

    this.favouriteAttractions = function(locationItem) {

        self.favAttractions.removeAll();

        // toggle favourite from truthy to falsy, or vice versa
        if (locationItem.favourite == false) {
            locationItem.favourite = true;
        } else {
            locationItem.favourite = false;
        }

        // add to observable array if favourite is truthy
        self.attractions.forEach(function(locationItem) {

            if(locationItem.favourite == true) {
                self.favAttractions.push(locationItem);
            }
        });
    };

};
// ViewModel END


// Maps API callback is to initApp
// This function controls execution of the app
var initApp = function() {
    initMap();
    ko.applyBindings(new ViewModel());
};