require( 'use-strict' );
var app = require( 'express' )();
var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );
var connect = require( 'connect' );
var serveStatic = require( 'serve-static' );
var bodyParser = require( 'body-parser' );
var nodemailer = require( 'nodemailer' );
var serverport = 2001;
var web = connect();
web.use( serveStatic( 'web' ) );
app.use( '/', web );
http.listen( serverport, function () {
  console.log( 'listening on *:' + serverport );
} );

var TextSearch = require( "./api/TextSearch.js" );
var ifunctions = require( './api/ifunctions' );

//var cityname = "Bangalore" ;


////
var google_api_key = "AIzaSyCbQ_Hk3eqc7UB-fqKqYqUDFtjDjDBe2V8";
// var google_api_key = "AIzaSyBKDSx_T1NPT6POTrShPCed43ULC1mx9U8";
var google_output_format = "json";
var textSearch = new TextSearch( google_api_key, google_output_format );
///

function goOn() {
  // continue your code here

  console.log( global.airship );
  return global.airship;
}

io.on( 'connection', function ( socket ) {


  // console.log( 'socket id is :', socket.id );

  socket.on( 'apicall', function ( data ) {

    if ( data.label == "whereto" ) {

      ifunctions.privateairportfunc( data, function ( error, output ) {

        if ( error ) {

          console.log( 'error', error );

          var response = {};
          response.sessionId = data.sessionId;
          response.nextlabel = "whereto";
          response.msg = "Something is wrong";
          io.sockets.connected[socket.id].emit( 'getresponse', response );

        } else {
          if ( output ) {
            if ( output.results.length == 0 ) {

              var response = {};
              response.sessionId = data.sessionId;
              response.nextlabel = "whereto";
              response.msg = "Sorry! No Airport Found";
              response.status = "error";
              io.sockets.connected[socket.id].emit( 'getresponse', response );

              console.log( "No Airport Found" );

            }
            else {
              var airports = {}, airportsnames = [];
                    //console.log( 'output', output );
                    for ( var index = 0; index < output.results.length; index++ ) {
                      var srno = index + 1;
                      airportsnames.push( { id: srno, name: output.results[index].name } );
                    }
                    var jsonairports = JSON.parse( JSON.stringify( airportsnames ) )
                    airports.results = jsonairports;
                    //airports = JSON.parse(airports);
                    //console.log('airport names',airports );
                    console.log(airports.results.length);
                    var response = {};
                    response.sessionId = data.sessionId;
                    response.nextlabel = "toairports";
                    response.status = "success";
                    response.msg = airports;
                    io.sockets.connected[socket.id].emit( 'getresponse', response );
            }
          }

        }

      });

    

    }
    else if ( data.label == "toairports" ) {
      console.log('data.label',"toairports");
      var response = {};
      response.sessionId = data.sessionId;
      response.nextlabel = "fromwhere";
      response.msg = "From Where?";
      io.sockets.connected[socket.id].emit( 'getresponse', response );

    }
    else if ( data.label == "fromwhere" ) {
      console.log('data.label',"fromwhere");
         ifunctions.privateairportfunc( data, function ( error, output ) {

        if ( error ) {

          console.log( 'error', error );

          var response = {};
          response.sessionId = data.sessionId;
          response.nextlabel = "fromwhere";
          response.msg = "Something is wrong";
          io.sockets.connected[socket.id].emit( 'getresponse', response );

        } else {
          if ( output ) {
            if ( output.results.length == 0 ) {

              var response = {};
              response.sessionId = data.sessionId;
              response.nextlabel = "fromwhere";
              response.msg = "Sorry! No Airport Found";
              response.status = "error";
              io.sockets.connected[socket.id].emit( 'getresponse', response );
              console.log( 'output',output );
              console.log( "No Airport Found" );

            }
            else {
              var airports = {}, airportsnames = [];
                    //console.log( 'output', output );
                    for ( var index = 0; index < output.results.length; index++ ) {
                      var srno = index + 1;
                      airportsnames.push( { id: srno, name: output.results[index].name } );
                    }
                    var jsonairports = JSON.parse( JSON.stringify( airportsnames ) )
                    airports.results = jsonairports;
                    //airports = JSON.parse(airports);
                    //console.log('airport names',airports );
                    console.log(airports.results.length);
                    var response = {};
                    response.sessionId = data.sessionId;
                    response.nextlabel = "fromairports";
                    response.status = "success";
                    response.msg = airports;
                    console.log('fromairports',airports);
                    io.sockets.connected[socket.id].emit( 'getresponse', response );
            }
          }

        }

      });

    }
    else if ( data.label == "fromairports" ) {
      console.log('fromairport');
      var response = {};
      response.sessionId = data.sessionId;
      response.nextlabel = "startdate";
      response.msg = "When would you like to travel?";
       io.sockets.connected[socket.id].emit( 'getresponse', response );
    }
    else if ( data.label == "startdate" ) {

      var response = {};
      response.sessionId = data.sessionId;
      response.nextlabel = "starttime";
      response.msg = "Whats the best time you would prefer?";
       io.sockets.connected[socket.id].emit( 'getresponse', response );
    }
    else if ( data.label == "starttime" ) {

       planes = { results: 
      [ 
        { id: 0, name: 'Please do choose a plane' },
        { id: 1, name: 'Very light jets (2 Pax Max.)' },
        { id: 2, name: 'Light jets (8 Pax Max.)' },
        { id: 3, name: 'Mid-size jets (9 Pax Max.)' },
        { id: 4, name: 'Super mid-size jets (11 Pax Max.)' },
        { id: 5, name: 'Large jets (14 Pax Max.)' }
      ] 
    };

      var response = {};
      response.sessionId = data.sessionId;
      response.nextlabel = "whichplane";
      response.status = "success";
      response.msg = planes ;
       io.sockets.connected[socket.id].emit( 'getresponse', response );
    }
    else if ( data.label == "whichplane" ) {

      var response = {};
      response.sessionId = data.sessionId;
      response.nextlabel = "returnboolen";
      response.msg = "Would you like to book a return?";
       io.sockets.connected[socket.id].emit( 'getresponse', response );
    }
    else if ( data.label == "returnboolen" ) {
      console.log(data.label);
      console.log(data.msg);
      var response = {};
      var returnboolen = data.msg ;
          returnboolen = returnboolen.toUpperCase();
      if (returnboolen == "NO") {

        response.sessionId = data.sessionId;
        response.nextlabel = "email";
        response.msg = "Can I get your email";
         io.sockets.connected[socket.id].emit( 'getresponse', response );
      } else {
        console.log(data.label);
        response.sessionId = data.sessionId;
        response.nextlabel = "returndate";
        response.msg = "What date?";
         io.sockets.connected[socket.id].emit( 'getresponse', response );
      }

    }
    else if ( data.label == "returndate" ) {
      console.log(data.label);
      var response = {};
      response.sessionId = data.sessionId;
      response.nextlabel = "email";
      response.msg = "Can I get your email?";
       io.sockets.connected[socket.id].emit( 'getresponse', response );
    }
    else if ( data.label == "email" ) {
      console.log( data );
      var agentemail = "ceo@80startups.com";
      var officeremail = "david.northcutt@genacom.com";


      var subject = "New Client Lead - Private Jet Booking";
      var mailbody = "Hello,</br><p>Flight Booking Quote is requested : </p>"
        + "</br><p><b> Start City :</b> " + data.fromwhere + "</p>"
        + "</br><p><b> Start Airport :</b> " + data.fromairport + "</p>"
        + "</br><p><b>To City:</b> " + data.whereto + "</p>"
        + "</br><p><b>To Airport:</b> " + data.toairport + "</p>"
        + "</br><p><b> Departure date:</b> " + data.startdate + "</p>"
        + "</br><p><b> At time:</b> " + data.starttime + "</p>"
        + "</br><p><b> Flight Type:</b> " + data.whichplane + "</p>"
        + "</br><p><b></p>"
        + "</br><p><b> Returne:</b> " + data.returnboolen + "</p>"
        + "Thanks, Chatbot";

      send_mail( agentemail, subject, mailbody );
      //send_mail( officeremail, subject, mailbody );

      var response = {};
      response.sessionId = data.sessionId;
      response.nextlabel = "summary";
      response.msg = "Thank You, we should email you a quote soon.";
       io.sockets.connected[socket.id].emit( 'getresponse', response );
    }
    else if ( data.label == "summary" ) {
      console.log(data.label);
      var response = {};
      response.sessionId = data.sessionId;
      response.nextlabel = "whereto";
      response.msg = "Where would you like to fly?";
       io.sockets.connected[socket.id].emit( 'getresponse', response );
    }
    else {
      var response = {};
      var returndate = data.msg;
      response.sessionId = data.sessionId;
      response.nextlabel = "last";
      response.msg = "Success";
       io.sockets.connected[socket.id].emit( 'getresponse', response );
    }




  } );

  io.on( 'disconnect', function () {
    console.log( 'A user disconnected' );
  } );


  var transporter = nodemailer.createTransport( {
    host: 'in-v3.mailjet.com',
    port: '587',
    auth: {
      user: '66ca4479851e0bd9cedc629bdff36ee6',
      pass: 'a3ec60f55a89f7fab98891e86818c8db'
    }
  } );
  function send_mail( usermail, subject, mailbody ) {
    var mailOptions = {
      from: '<operations@80startups.com>', // sender address
      to: usermail, // list of receivers
      subject: subject, // Subject line
      html: mailbody // html body
    };


    transporter.sendMail( mailOptions, function ( error, info ) {
      if ( error ) {
        console.log( error );
      } else {
        console.log( 'Message sent: ' + info.response );
      }
      //jsonp(response);
    } );
  };


} );
