var express = require( 'express' );
var app = express();
var querystring = require( "querystring" );

var https = require( 'https' );

global.privateairports = {};

var radius = 16000;
var sensor = false;
var types = "restaurant";
var query = "fast";
var https = require( "https" );
var distance = require('google-distance');


var querystring = require( "querystring" );
var https = require( "https" );

var HttpResponseProcessor = require( "./HttpResponseProcessor.js" );

var validate = require( "./validate.js" );

exports.gethi = function ( req, res ) {
  console.log( "Calling simple get call....." );
  // var returnv = {} ;
  // returnv.name = "Amol" ;
  // return returnv ;
  //  res.jsonp(returnv) ;
};

exports.PrivateAirports = function ( res ) {
  // continue your code here
  console.log( "PrivateAirports Function" );
  console.log( privateairports );
  return privateairports;
};

exports.privateairportfunc = function ( req, callback ) {


  var parameters = {
    query: "private airports in " + req.msg
  };


  //parameters.key = "AIzaSyCbQ_Hk3eqc7UB-fqKqYqUDFtjDjDBe2V8";
  parameters.key = "AIzaSyBfRKuwq8c3ETUxdC7jMvhh3iN_x0SHRWQ";
  parameters.query = parameters.query || "airports";
  parameters.sensor = parameters.sensor || false;
  parameters.type = "airport";
  if ( typeof parameters.location === "object" ) parameters.location = parameters.location.toString();
  var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + querystring.stringify( parameters )


  var outputFormat = 'json';


  validate.apiKey( parameters.key );

  // validate.outputFormat( outputFormat );

  parameters.query = parameters.query || "restaurant";

  parameters.sensor = parameters.sensor || false;

  if ( typeof parameters.location === "object" ) parameters.location = parameters.location.toString();

  var options = {
    hostname: "maps.googleapis.com",
    path: "/maps/api/place/textsearch/" + outputFormat + "?" + querystring.stringify( parameters )
  };

  var request = https.request( options, new HttpResponseProcessor( outputFormat === "json", callback ) );

  //console.log(request);
  request.on( 'response', function ( response, body ) {

    //  console.log('response', response);

    callback( null, body );


  } );

  request.on( "error", function ( error ) {

    callback(  error, null  );

  } );

  request.end();


};
//

exports.planetypes = function (res) {
      var planes = { results: 
      [ 
       
        { id: 1, name: 'Very light jets (4-6 PAX Max)', speed: 400, range: 1200 , costperhr:4000 },
        { id: 2, name: 'Turbo Prop(7-9 PAX Max)', speed: 300, range: 1400 , costperhr:4000 },
        { id: 3, name: 'Light Jets (6-8 PAX Max)', speed: 480, range: 2000 , costperhr:5000 },
        { id: 4, name: 'MidSize Jets (7-9 PAX Max)', speed: 500, range: 2500 , costperhr:6000 },
        { id: 5, name: 'Super MidSize Jets (7-9 PAX Max)', speed: 525, range: 3000 , costperhr:7000 },
        { id: 6, name: 'Heavy Jets (7-9 PAX Max)', speed: 525, range: 5000 , costperhr:10000 },
        { id: 7, name: 'Jumbo Jets jets (200 PAX Max)', speed: 525, range: 8000 , costperhr:15000 },  
      ] 
    };

      return planes ;
  

};
//

exports.distancefunc = function ( data, callback ) {

    var gps = require('gps-manager');
    
    var lat1 = data.fromairportlat ;
    var lat2 = data.toairportlat ;
    var lon1 = data.fromairportlng ;
    var lon2 = data.toairportlng ;
    var distance = gps.getDistance(lat1,lon1,lat2,lon2);
   
    distance = distance/1000 ;
    distance = distance.toFixed(2);
    var distanceMiles = distance*0.621371 ;
      distanceMiles = distanceMiles.toFixed(2);
    console.log('distance',distance);
    console.log('distanceMiles',distanceMiles);

    
    var estimatedhrs = distance/data.planespeed ;
        estimatedhrs = estimatedhrs.toFixed(2);
    var estimatedcost = (estimatedhrs)*data.planecostperhr ;
        estimatedcost = estimatedcost.toFixed(2);
    console.log('estimatedhrs' ,estimatedhrs);
    console.log('estimatedcost' ,estimatedcost);
    callback(null,distanceMiles,estimatedhrs,estimatedcost);
    
   

  
};

exports.estimatedcostfunc = function ( data ,distance, callback ) {
    console.log('data',data.distance);
    var estimatedhrs = distance/data.planespeed
    var estimatedcost = (estimatedhrs)*data.planecostperhr ;
    console.log('estimatedcost' ,estimatedcost);
    callback(null,estimatedhrs,estimatedcost);

};


 