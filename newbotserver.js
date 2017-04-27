require( 'use-strict' );
var path = require('path');
var app = require( 'express' )();
var http = require( 'http' ).Server( app );
var io = require( 'socket.io' )( http );
var connect = require( 'connect' );
var serveStatic = require( 'serve-static' );
var bodyParser = require( 'body-parser' );
var nodemailer = require( 'nodemailer' );
var chrono = require('chrono-node')
var mysql =require('mysql');
var serverport = 2001;
var web = connect();
web.use( serveStatic( 'web' ) );
app.use( '/', web );

var systemadmin = connect();
systemadmin.use( serveStatic( 'systemadmin' ) );
app.use( '/systemadmin', systemadmin );

var getdata = require('./api/getdata.js');
 

http.listen( serverport, function () {
  console.log( 'listening on port ' + serverport );
} );

var TextSearch = require( "./api/TextSearch.js" );
var ifunctions = require( './api/ifunctions' );
var query = require('./api/query.js');

var connection = mysql.createConnection({
    database : 'pravola-chatbot',
		user : 'ftdev',
    password : '10gXWOqeaf',
		host :'apps.fountaintechies.com',
    });

app.get('/api/quotes',ifunctions.quotes);



//var admin = require('./systemadmin/app/login.js');

//ifunctions.getUserInput("Michael", "Fassbender", "Man", ifunctions.genericPoemMaker);

////
var google_api_key = "AIzaSyCbQ_Hk3eqc7UB-fqKqYqUDFtjDjDBe2V8";
// var google_api_key = "AIzaSyBKDSx_T1NPT6POTrShPCed43ULC1mx9U8";
var google_output_format = "json";
var textSearch = new TextSearch( google_api_key, google_output_format );
///


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
                  
                    var response = {};
                    response.sessionId = data.sessionId;
                    response.nextlabel = "toairports";
                    response.status = "success";
                    response.msg = output;
                    response.custommessage = "I am getting the nearest airports. Help select one." ;
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
             
                    var response = {};
                    response.sessionId = data.sessionId;
                    response.nextlabel = "fromairports";
                    response.status = "success";
                    response.msg = output;
                    response.custommessage = "I am getting the nearest airports. Help select one." ;
                   // console.log('fromairports',airports);
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
    // else if ( data.label == "startdate" ) {
       
    
    //   var response = {};
    //   response.sessionId = data.sessionId;
    //   response.nextlabel = "whichplane";
    //   response.msg = "Please select the best private jet.?";
    //    io.sockets.connected[socket.id].emit( 'getresponse', response );
    // }
    else if ( data.label == "startdate" ) {
      console.log('startdate-planetype');
      var planes = ifunctions.planetypes() ;
    

      var response = {};
      response.sessionId = data.sessionId;
      response.nextlabel = "whichplane";
      response.status = "success";
      response.msg = planes ;
      response.custommessage = "Please Select a plane" ;
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
     // var officeremail = "david.northcutt@genacom.com";
     
     /* Todo : Let's do some distance calculation here */ 
       ifunctions.distancefunc( data, function (error,distanceMiles,estimatedhrs,estimatedcost ,startdate) {
      
      if(error){
          console.log(error)
      }else{
           data.distance = distanceMiles ;
           data.estimatedhrs = estimatedhrs ;
           data.estimatedcost = estimatedcost ;
           data.startdate = startdate ;
           console.log('data.distance', distanceMiles);
           console.log('data.estimatedhrs', estimatedhrs);
           console.log('data.estimatedcost', estimatedcost);
           var subject = "New Client Lead - Private Jet Booking";
           var mailbody = "Hello,</br><p>Flight Booking Quote is requested : </p>"
            + "</br><p><b> Start City :</b> " + data.fromwhere + "</p>"
            + "</br><p><b> Start Airport :</b> " + data.fromairport + "</p>"
            + "</br><p><b>To City:</b> " + data.whereto + "</p>"
            + "</br><p><b>To Airport:</b> " + data.toairport + "</p>"
            + "</br><p><b> Departure date:</b> " + data.startdate + "</p>"
            + "</br><p><b> Plane Type:</b> " + data.planetype + "</p>"
            + "</br><p><b> Distance:</b> " + data.distance + "Miles</p>"
            + "</br><p><b> Flight Time Hours:</b> " + data.estimatedhrs + "Hrs.</p>"
            + "</br><p><b> Estimated Cost:</b> " + data.planecostperhr + "</p>"
            + "</br><p><b> Estimated Cost:</b> " + data.estimatedcost + "</p>"
            + "</br><p><b></p>"
            + "</br><p><b> Returne:</b> " + data.returnboolen + "</p>"
            + "</br><p><b> Email:</b> " + data.email + "</p>"
            + "Thanks, Chatbot";
          
          
          //ifunctions.insertquotereq(data);

//insert
         var quote_data = {
            to_country: data.whereto,
            to_airport: data.toairport,
            from_country: data.fromwhere,
            from_airport: data.fromairport,
            planetype: data.planetype,
            startdate: data.startdate,
            email: data.email,
            distance: data.distance,
            planecostperhr: data.planecostperhr,
            estimatedcost: data.estimatedcost

        };

        connection.query("INSERT INTO quote SET ?", quote_data, function(err, res){
            if(err){
                console.log(err);
            } else {
                console.log(res);
            }
        });
// end insert




          send_mail( agentemail, subject, mailbody );
  //        send_mail( officeremail, subject, mailbody );
          send_mail( data.email, subject, mailbody );

          var response = {};
          response.sessionId = data.sessionId;
          response.nextlabel = "email";
          response.msg = "Thank You, we should email you a quote soon.";
          io.sockets.connected[socket.id].emit( 'getresponse', response );
      }
       

          
     });

     
    }
    else if ( data.label == "summary" ) {
      console.log(data.label);
      var response = {};
      response.sessionId = data.sessionId;
      response.nextlabel = "email";
      response.msg = "Where would you like to fly?";
       io.sockets.connected[socket.id].emit( 'getresponse', response );
    }
    else {
      var response = {};
      var returndate = data.msg;
      response.sessionId = data.sessionId;
      response.nextlabel = "email";
      response.msg = "Some issue, leave us your email and we get back to you.";
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

//TODO: Change the messages in array to simple questions
//TODO: See why the drop down is not immediately updated.
//TODO: Change the when you want to travel to a - calendar response.
