var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://api.yelp.com/v3/businesses/search?latitude=39.718401&longitude=-105.1500635&radius=10000",
		"method": "GET",
		"headers": {
			"Authorization": "Bearer cMYxnvWYIymPp-wzNBjk4RjOCrU9JksqVFwU6BhjZJiUaVIZu_YkOctV8w8XagW73guiL8xCA-d38w7_MM85y18Q3M_Q-mO66buzKU0z7GnI4_7EDIkoD49fsAWwWnYx",
			"Cache-Control": "no-cache",
			"Postman-Token": "ba6482bb-16be-4ae4-8ec0-9f5d9bc81b2d"
		}
	};

$.ajax(settings).done(function (response) {
  	console.log(response);
});