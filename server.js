var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongod.ObjectID;

var NOTES_COLLECTION = "notes";

var app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Create a db variable outside of the db connection callback to reuse the connection pool in app
var db;

//Connect to database before starting the application server.
mongodb.MongoClient.connect(process.env.MONGODB_URI, function(err, database) {
  if(err) {
    console.log(err);
    process.exit(1);
  }

  //save database boject from the callback for reuse.
  db = database;
  console.log("Database connection ready, commence world domination.")

  //Initialize the app.
  var server = app.listen(process.env.PORT || 3500, function () {
    var port = server.address().port;
    console.log("Caskit api now alive on port", port);
  });
});

//CONTACT API ROUTES BELOW
