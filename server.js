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

//NOTE API ROUTES BELOW

// error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("Error: " + reason);
  res.status(code || 500).json({"error": message});
}

/* "/notes"
 * GET: finds all notes
 * POST: creates a new note
 */

// GET
 app.get("/notes", function(req, res) {

 });

// Post
 app.post("/notes", function(req, res) {
   var newNote = req.body;
   newNote.createDate = new Date();

   if(!(req.body.title || req.body.value)) {
     handleError(res, "Invalid user input", "Must provide a title or value.", 400);
   }

   db.collection(NOTES_COLLECTION).insertOne(newNote, function(err, doc) {
     if(err) {
       handleError(res, err.message, "Failed to create new note");
     } else {
       res.status(201).json(doc.ops[0]);
     }
   });
 });

 /*   "/notes/:id"
  *   GET find notes by id
  *   PUT: update notes by id
  *   DELETE: deletes notes by id
  */

// GET NOTES/:ID
app.get("/notes/:id", function(req, res) {

});

//PUT NOTES/:ID
app.put("/notes/:id", function(req, res) {

});

//DELETE/:ID
app.delete("notes/:id", function(req, res) {

});
