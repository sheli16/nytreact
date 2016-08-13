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




// Main Route. This route will redirect to our rendered React application
app.get('/', function(req, res){
  res.sendFile('./public/index.html');
})

// This is the route we will send GET requests to retrieve our most recent search data.
// We will call this route the moment our page gets rendered
app.get('/api/saved', function(req, res) {

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
app.post('/api/saved', function(req, res){
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

// This is the route we will send POST requests to save each search.
app.delete('/api/saved', function(req, res){
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