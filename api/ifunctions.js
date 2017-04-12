var express = require('express');
var app = express();
var querystring = require("querystring");
var TextSearch = require("./TextSearch.js");
var https = require('https');

global.privateairports = {} ;

exports.gethi = function (req,res) {
  console.log("Calling simple get call.....");
  // var returnv = {} ;
  // returnv.name = "Amol" ;
  // return returnv ;
//  res.jsonp(returnv) ;
};

exports.PrivateAirports = function(res) {
      // continue your code here
  console.log("PrivateAirports Function");
  console.log(privateairports);
  return privateairports ;
};

exports.privateairportfunc = function(req, res){
 //var key = req.query.key;
 //var location = encodeURIComponent(req.query.location);
var TextSearch = require("./TextSearch.js");
 var radius = 16000;
 var sensor = false;
 var types = "restaurant";
 var query = "fast";
 var https = require("https");
 var parameters = {
                  query: "private airports in "+req
              };
 parameters.key = "AIzaSyBfRKuwq8c3ETUxdC7jMvhh3iN_x0SHRWQ";
 parameters.query = parameters.query || "airports";
 parameters.sensor = parameters.sensor || false;
 if (typeof parameters.location === "object") parameters.location = parameters.location.toString();
 var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" +querystring.stringify(parameters)
   console.log(url);
 var locations = {} ;
 // var returnv = {} ;
 // returnv.name = "Amol" ;
 // return returnv ;


 TextSearch(parameters, function (error, response) {
       //console.log(response);
       if(response.results.length==0){
         console.log("No Airport Found");
       }
       else{
         var airports = {}, airportsnames = [];
         for(var index = 0; index < response.results.length; index++) {
                 var srno = index+1 ;
                  airportsnames.push({id:srno, name:response.results[index].name});
                }
            airship = airports ;
            var jsonairports = JSON.parse(JSON.stringify(airportsnames))
            airports.results = jsonairports ;
            airship = airports;
            //console.log(airship);
            ifunctions.PrivateAirports()
          }

        });
};
//

exports.gettest = function(callback) {

  var parameters = {
                   query: "private airports in dubai"
               };
  parameters.key = "AIzaSyBfRKuwq8c3ETUxdC7jMvhh3iN_x0SHRWQ";
  parameters.query = parameters.query || "airports";
  parameters.sensor = parameters.sensor || false;
  if (typeof parameters.location === "object") parameters.location = parameters.location.toString();
  var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" +querystring.stringify(parameters)

      var datam = https.get(url, function(response) {
      var body ='';
      response.setEncoding("utf8");
      response.on('data', function(chunk) {
        body += chunk;
        //console.log(body);
      });

    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    }).on('response',function(f){

    }).on('end', function() {
       var places = JSON.parse(body);
         locations = places.results;
         console.log(locations);
         callback({locations});


     });;
    console.log(callback); // No response outside the function.

};
//
