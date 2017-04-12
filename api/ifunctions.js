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



  parameters.key = "AIzaSyBfRKuwq8c3ETUxdC7jMvhh3iN_x0SHRWQ";
  parameters.query = parameters.query || "airports";
  parameters.sensor = parameters.sensor || false;
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

  // console.log('parameters', parameters);

  //  var TextSearch = require( "./TextSearch.js" );

  //  console.log('TextSearch', TextSearch);

  //  TextSearch( parameters, function ( error, response ) {

  //   console.log('error', error);

  //   console.log('i am inside funnnn');

  //   console.log('response', response);

  // } );


};
//

exports.gettest = function ( callback ) {

  var parameters = {
    query: "private airports in dubai"
  };
  parameters.key = "AIzaSyBfRKuwq8c3ETUxdC7jMvhh3iN_x0SHRWQ";
  parameters.query = parameters.query || "airports";
  parameters.sensor = parameters.sensor || false;
  if ( typeof parameters.location === "object" ) parameters.location = parameters.location.toString();
  var url = "https://maps.googleapis.com/maps/api/place/textsearch/json?" + querystring.stringify( parameters )

  var datam = https.get( url, function ( response ) {
    var body = '';
    response.setEncoding( "utf8" );
    response.on( 'data', function ( chunk ) {
      body += chunk;
      //console.log(body);
    } );

  } ).on( 'error', function ( e ) {
    console.log( "Got error: " + e.message );
  } ).on( 'response', function ( f ) {

  } ).on( 'end', function () {
    var places = JSON.parse( body );
    locations = places.results;
    console.log( locations );
    callback( { locations } );


  } );;
  console.log( callback ); // No response outside the function.

};
//
