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
var chrono = require('chrono-node');
var mysql =require('mysql');
var crud = require('mysql-crud');


var querystring = require( "querystring" );
var https = require( "https" );

var HttpResponseProcessor = require( "./HttpResponseProcessor.js" );

var validate = require( "./validate.js" );

var connection = mysql.createConnection({
    database : 'pravola-chatbot',
		user : 'ftdev',
    password : '10gXWOqeaf',
		host :'apps.fountaintechies.com',
    });


exports.quotes = function(req,res) {
    connection.query('SELECT * FROM quote ORDER BY id desc',function(err, data){
      if(err)
      {
      res.send(err);
      }
      res.json(data);
      //res.render('pacientes',{data:data});
      console.log(data);
    });
    return
};

exports.insertquotereq = function(req, res){
    
        var quote_data = {
            to_country: "new york",
            to_airport: "airport",
//            to_country: req.whereto,
//            to_airport: req.toairport,
            from_country: req.fromwhere,
            from_airport: req.fromairport,
            planetype: req.planetype,
            startdate: req.startdate,
            starttime: req.starttime,
            returndate: req.returndate,
            returntime: req.returndate,
            email: req.email,
            distance: req.distance,
            estimatedhrs: req.estimatedhrs,
            planecostperhr: req.planecostperhr,
            estimatedcost: req.estimatedcost,
            estimated_time: req.estimated_time
        };
        //console.log('chat_data',chat_data);


        var insert = connection.query("INSERT INTO chat SET ?", quote_data, function(err, result){
            if(err) throw err;
            console.log('data inserted'+insert);
            return;
        });

};

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


  parameters.key = "AIzaSyCbQ_Hk3eqc7UB-fqKqYqUDFtjDjDBe2V8";
  //parameters.key = "AIzaSyBfRKuwq8c3ETUxdC7jMvhh3iN_x0SHRWQ";
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
       
        { id: 1, name: 'Very Light Jet $4000/hr', speed: 400, range: 1200 , costperhr:4000 },
        { id: 2, name: 'Turbo Prop Jet $4000/hr', speed: 300, range: 1400 , costperhr:4000 },
        { id: 3, name: 'Light Jet$ 5000/hr', speed: 480, range: 2000 , costperhr:5000 },
        { id: 4, name: 'MidSize Jet $6000/hr', speed: 500, range: 2500 , costperhr:6000 },
        { id: 5, name: 'Super Jet $7000/hr', speed: 525, range: 3000 , costperhr:7000 },
        { id: 6, name: 'Heavy Jet $10000/hr', speed: 525, range: 5000 , costperhr:10000 },
        { id: 7, name: 'Jumbo Jets Jet $15000/hr', speed: 525, range: 8000 , costperhr:15000 },  
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
    
   // var startdate = chrono.parseDate(data.startdate) ;
    var startdate = data.startdate ;
    console.log('startdate',startdate);

    callback(null,distanceMiles,estimatedhrs,estimatedcost,startdate);
    
   

  
};

exports.estimatedcostfunc = function ( data ,distance, callback ) {
    console.log('data',data.distance);
    var estimatedhrs = distance/data.planespeed
    var estimatedcost = (estimatedhrs)*data.planecostperhr ;
    console.log('estimatedcost' ,estimatedcost);
    callback(null,estimatedhrs,estimatedcost);

};


