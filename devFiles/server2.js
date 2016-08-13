/* Scraper: Server #2  (18.9) 
 * ========================= */

// Initialize Express app
var express = require('express');
var app = express();
var exphbs = require('express3-handlebars');

// Require request and cheerio. This makes the scraping possible
var request = require('request');

// Database configuration
var mongojs = require('mongojs');
var databaseUrl = "nytreact";
var collections = ["headlines"];
var db = mongojs(databaseUrl, collections);


// first, tell the console what server2.js is doing
console.log("\n******************************************\n" +
            "Grabbing every article headline and link\n" +
            "from the nytimes:" +
            "\n******************************************\n")


// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
// app.set('view engine', 'handlebars');
 
app.get('/', function (req, res) {
    res.render('home');
});



// this makes sure that any errors are logged if mongodb runs into an issue



// Main route (simple Hello World Message)
app.get('/', function(req, res) {
  res.send("nytimes");
});

app.use('/views', express.static('prototype.html'));

// make a request call for NYC 

// This variable will be pre-programmed with our authentication key (the one we received when we registered)
var authKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

// These variables will hold the results we get from the user's inputs via HTML
var queryTerm 	= "";
var numResults 	= 0;
var startYear 	= 0;
var endYear		= 0;

// Based on the queryTerm we will create a queryURL 
var queryURLBase = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey + "&q=";

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

					// Create the HTML Well (Section) and Add the Article content for each
					var wellSection = $("<div>");
					wellSection.addClass('well');
					wellSection.attr('id', 'articleWell-' + articleCounter)
					$('#wellSection').append(wellSection);

					// Confirm that the specific JSON for the article isn't missing any details
					// If the article has a headline include the headline in the HTML
					if(NYTData.response.docs[i].headline != "null")
					{
						$("#articleWell-"+ articleCounter).append('<h3 class="articleHeadline"><span class="label label-primary">' + articleCounter + '</span><strong>   ' + NYTData.response.docs[i].headline.main + "</strong></h3>");
						
						// Log the first article's Headline to console.
						console.log(NYTData.response.docs[i].headline.main);
					}
					
					// If the article has a Byline include the headline in the HTML
					if( NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original"))
					{
						$("#articleWell-"+ articleCounter).append('<h5>' + NYTData.response.docs[i].byline.original + "</h5>");

						// Log the first article's Author to console.
						console.log(NYTData.response.docs[i].byline.original);
					}

					// Then display the remaining fields in the HTML (Section Name, Date, URL)
					$("#articleWell-"+ articleCounter).append('<h5>Section: ' + NYTData.response.docs[i].section_name + "</h5>");
					$("#articleWell-"+ articleCounter).append('<h5>' + NYTData.response.docs[i].pub_date + "</h5>");
					$("#articleWell-"+ articleCounter).append("<a href='" + NYTData.response.docs[i].web_url + "'>" + NYTData.response.docs[i].web_url + "</a>");

					// Log the remaining fields to console as well
					console.log(NYTData.response.docs[i].pub_date);
					console.log(NYTData.response.docs[i].section_name);
					console.log(NYTData.response.docs[i].web_url);	
			}
		});

}

// -------------------------------------------------

// MongoDB Configuration configuration (Change this URL to your own DB)
mongoose.connect('mongodb://admin:codingrocks@ds023664.mlab.com:23664/reactlocate');
var db = mongoose.connection;

db.on('error', function (err) {
  console.log('Mongoose Error: ', err);
});

db.once('open', function () {
  console.log('Mongoose connection successful.');
});


// -------------------------------------------------

// Main Route. This route will redirect to our rendered React application
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get('/api/', function(req, res) {

  // We will find all the records, sort it in descending order, then limit the records to 5
  History.find({}).sort([['date', 'descending']]).limit(5)
    .exec(function(err, doc){

      if(err){
        console.log(err);
      }
      else {
        res.send(doc);
      }
    })
});

// This is the route we will send POST requests to save each search.
app.post('/api/', function(req, res){
  var newSearch = new History(req.body);
  console.log("BODY: " + req.body.location);

  // Here we'll save the location based on the JSON input. 
  // We'll use Date.now() to always get the current date time
  History.create({"location": req.body.location, "date": Date.now()}, function(err){
    if(err){
      console.log(err);
    }
    else {
      res.send("Saved Search");
    }
  })
});


// -------------------------------------------------

// Listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});