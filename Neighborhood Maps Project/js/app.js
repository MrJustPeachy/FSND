var map;

// Create a new blank array for all the listing markers.
var markers = [];

function getData(){

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

    return restaurants;
}

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