// Include the axios package for performing HTTP requests (promise based alternative to request)
var axios = require('axios');

// Geocoder API
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// Helper Functions (in this case the only one is runQuery)
var helpers = {

	runQuery: function(location){

		console.log(location);

		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";


		return axios.get(queryURL)
			.then(function(response){

				console.log(response);
				return response.data.results[0].formatted;
		})

	}

}

// ------------------------------------------------------------


// Array to hold the various article info
var articleCounter = 0;

// FUNCTIONS
// ==========================================================


// This runQuery function expects two parameters (the number of articles to show and the final URL to download data from)
function runQuery(numArticles, queryURL){

	// The AJAX function uses the URL and Gets the JSON data associated with it. The data then gets stored in the variable called: "NYTData"
	$.ajax({url: queryURL, method: "GET"}) 
		.done(function(NYTData) {

			// Here we are logging the URL so we have access to it for troubleshooting
			console.log("------------------------------------")
			console.log("URL: " + queryURL);
			console.log("------------------------------------")

			// Here we then log the NYTData to console, where it will show up as an object.
			console.log(NYTData);
			console.log("------------------------------------")

			// Loop through and provide the correct number of articles
			for (var i=0; i<numArticles; i++) {

					// Add to the Article Counter (to make sure we show the right number)
					articleCounter++;
 








// --------------------------------------------------------------




// We export the helpers function (which contains getGithubInfo)
module.exports = helpers;
