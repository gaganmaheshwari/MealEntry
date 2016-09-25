//declaring express on the server.js file
var express = require("express");
var bodyParser = require('body-parser').json();
var app = express();

var mongoose = require('mongoose');

mongoose.connect( 'mongodb://togetherly:togetherly2016@ds046549.mlab.com:46549/mealtally', function (err) { //TODO: config
 if (err) console.log('Error: Failed to connect to mongoose!', err);
 else console.log('Connected to mongodb!');
});

var mealSchema = mongoose.Schema({
  "date": Date,
  "siteName": String,
  "meal": {
    "type": String,
    "vendorReceived": Number,
    "carryOver": Number,
    "consumed": {
      "child": Number,
      "adult": Number,
      "volunteer": Number
    },
    "damaged": Number,
    "wasted": Number
  }
}, {collection: 'meal'});

var meal = mongoose.model('meal', mealSchema);﻿


app.listen(process.env.PORT || 3000);
console.log("Server running on port 3000");

app.get("/meal", function(req, res) {
  meal.find({}, function(err, result) {
    if(err) res.status(500).json(err);
    else res.status(200).json(result);
  });
});

app.post('/meal', bodyParser, function(req, res) {
  console.log('request body', req.body);
  new meal(req.body).save(function(err, result){
            if(err) res.status(500).json(err);
            else res.status(200).json(result);
  });
});

app.use(express.static(__dirname + "/public"));
