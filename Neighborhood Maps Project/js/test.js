var initMap = function () {
    'use strict';

    // create a new map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 30.04442, lng: 31.235712},
        zoom: 12
    });

    // Add infoWindow to display on each marker
    infoWindow = new google.maps.InfoWindow({maxWidth: 350});

    // Add boundaries to fit any view for responsive
    bounds = new google.maps.LatLngBounds();

    // create an array of markers
    markers = [];
    for (var i = 0; i < initialLocations.length; i++) {
        var title = initialLocations[i].title;
        var position = initialLocations[i].location;
        var id = initialLocations[i].id;

        // Create a marker per location
        var marker = new google.maps.Marker({
            title: title,
            position: position,
            animation: google.maps.Animation.DROP,
            id: id
        });
        // Push the marker to our array of markers.
        markers.push(marker);
    }

    // Make sure to close the current infowindow if user click at any point of the map
    map.addListener('click', function() {
        if (infoWindow) {
            infoWindow.close();
            infoWindow = new google.maps.InfoWindow({maxWidth: 350});
        }

        // Close Side Menu
        VM.closeMenu();
    });
};

var viewModel = function () {
    'use strict';

    var self = this;

    // store locations in an observable Array
    self.locationList = ko.observableArray([]);

    self.filter = ko.observable('');

    initialLocations.forEach(function (val) {
        self.locationList.push(val);
    });

    // Show all markers when map loaded
    self.showMarkers = function () {
        // Extend the boundaries of the map for each marker and display the marker
        for (var i = 0; i < markers.length; i++) {
            markers[i].setAnimation(google.maps.Animation.DROP);
            markers[i].setMap(map);

            // Create an onclick event to open an infowindow at each marker.
            markers[i].addListener('click', self.openInfoWindow(markers[i]));

            bounds.extend(markers[i].position);
        }
        map.fitBounds(bounds);
    };

    // Show current marker info when selecting a location from the list
    self.showCurrentMarker = function (location) {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].id === location.id) {
                self.populateInfoWindow(markers[i]);
            }
        }
    };

    // open the infowindow
    self.openInfoWindow = function (marker) {
        return function () {
            self.populateInfoWindow(marker);
            self.closeMenu();
        };
    };

    // close the current opend infowindow
    self.closeInfoWindow = function () {
        if (infoWindow) {
            infoWindow.close();
            infoWindow = new google.maps.InfoWindow({maxWidth: 350});
        }
    };

    // This function populates the infowindow when the marker is clicked. We'll only allow
    // one infowindow which will open at the marker that is clicked, and populate based
    // on that markers position.
    self.populateInfoWindow = function (marker) {
        // Check to make sure the infowindow is not already opened on this marker.
        if (infoWindow.marker !== marker) {

            marker.setAnimation(4);  // 4 >> Is for one bounce (jump) instead of using normal BOUNCE animation
            infoWindow.marker = marker;

            // load Wikipedia API data
            var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=' + marker.title;

            $.ajax({
                url: wikiUrl,
                dataType: 'jsonp'
            }).done(function (response) {
                // console.log(response);
                var articleStr = response[1]; // Name of each article founded
                var articleSummary = response[2];  // First snippet of summary of each article founded
                var articleUrl = response[3];  // URL of each article founded

                for (var i = 0; i < articleStr.length; i++) {
                    infoWindow.setContent('<h4 class="iw-title">' + marker.title + '</h4>' +
                        '<h5>Relevant Wikipedia Summary</h5>' +
                        '<p>' + articleSummary[i] + '</p>' +
                        '<h5>Relevant Wikipedia Links</h5>' +
                        '<a target="_blank" href="' + articleUrl[i] + '">' + articleStr[i] + '</a>' +
                        '<h6 class="text-right center-block">Powered by ' +
                        '<img src="img/mediawikiwiki.png" width="30px"> Wikipedia</h6>');
                }
            }).fail(function () {
                // Handling Wikipedia API errors
                window.console.log('Could not load Wikipedia API');
                infoWindow.setContent('<div class="alert alert-danger">' +
                    '<strong>Error! </strong><span>Could not load Wikipedia API</span>' +
                    '</div>');
            });

            infoWindow.open(map, marker);

            // Make sure the marker property is cleared if the infowindow is closed.
            infoWindow.addListener('closeclick', function() {
                infoWindow.marker = null;
            });
        }
    };

    // Filtering the list using arrayFilter utility function
    self.filterLocationList = ko.computed(function () {
        var filter = self.filter().toLowerCase();
        if (!filter) {
            self.closeInfoWindow();  // close the current infowindow

            // Make sure that google maps api script successfully loaded
            // before executing any of its functions
            if (map) {
                self.showMarkers();
            } else {
              setTimeout(function () {
                  self.showMarkers();
              }, 1000);
            }
            return self.locationList();
        } else {
            return ko.utils.arrayFilter(self.locationList(), function (val, index) {
                var checkMatch = stringStartsWith(val.title.toLowerCase(), filter);
                if (!checkMatch) {
                    self.closeInfoWindow();  // close the current infowindow
                    markers[index].setMap(null);
                } else {
                    self.closeInfoWindow();  // close the current infowindow
                    markers[index].setAnimation(google.maps.Animation.DROP);
                    markers[index].setMap(map);
                }
                return checkMatch;
            });
        }
    }, self);

    // toggle Side Menu
    self.toggleMenu = function () {
        $('.navbar-nav').toggleClass('slide-in');
        $('.side-body').toggleClass('body-slide-in');
    };

    // Close Side Menu
    self.closeMenu = function () {
        $('.navbar-nav').removeClass('slide-in');
        $('.side-body').removeClass('body-slide-in');
    };

};

var VM = new viewModel();
ko.applyBindings(VM);