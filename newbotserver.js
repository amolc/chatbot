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
var mg = require('nodemailer-mailgun-transport');
var serverport = 2001;
var web = connect();
web.use( serveStatic( 'web' ) );
app.use( '/web', web );

var pravolaw = connect();
pravolaw.use( serveStatic( 'pravolaw' ) );
app.use( '/pravolaw', pravolaw );

var systemadmin = connect();
systemadmin.use( serveStatic( 'systemadmin' ) );
app.use( '/systemadmin', systemadmin );


var www = connect();
www.use( serveStatic( 'www' ) );
app.use( '/', www );

var mobile = connect();
mobile.use( serveStatic( 'mobile/www' ) );
app.use( '/mobile', mobile );

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

app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
      res.header('Access-Control-Allow-Credentials', false);
      next();
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

var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
});


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
                    response.nextlabel = "fromwhere";
                    response.status = "success";
                    response.msg = output;
                    response.custommessage = "From Where?" ;
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
                    response.nextlabel = "startdate";
                    response.status = "success";
                    response.msg = output;
                    response.custommessage = "When would you like to travel?" ;
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
      response.custommessage = "Select your Jet." ;
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

        ifunctions.distancefunc( data, function (error,distanceMiles,estimatedhrs,estimatedcost ,startdate,estimatedcostfrom,estimatedcostto) {

          if(error){
            console.log(error)
          }else{

            var estimatedcostUSD = formatter.format(estimatedcost) ;
            console.log('currency',estimatedcostUSD);
            var estimatedcostfromUSD = formatter.format(estimatedcostfrom) ;
            console.log('currency',estimatedcostfromUSD);
            var estimatedcosttoUSD = formatter.format(estimatedcostto) ;
            console.log('currency',estimatedcosttoUSD);

           data.distance = distanceMiles ;
           data.estimatedhrs = estimatedhrs ;
           data.estimatedcost = estimatedcostUSD ;
           data.estimatedcostfrom = estimatedcostfromUSD ;
           data.estimatedcostto = estimatedcosttoUSD ;
           data.startdate = startdate ;
            var webmsg = "<b> Here is a summary of your booking: </b></br>"
            + "<b> Depart: </b> " + data.fromwhere + "</br>"
            + "<b> Destination: </b> " + data.whereto + "</br>"
            + "<b> Departure Date: </b> " + data.startdate + "</br>"
            + "<b> Plane: </b>" + data.planetype + "</br>"
            + "<b> Distance: </b> " + data.distance + " Miles</br>"
            + "<b> Flight Time Hours: </b> " + data.estimatedhrs + "</br>"
            + "<b> Estimated Cost: </b> " + data.estimatedcost +"</br>";

                var quotesummary = ""
                var response = {};
                response.sessionId = data.sessionId;
                response.status = "success";
                response.nextlabel = "formalquote";
                response.msg = webmsg ;
                io.sockets.connected[socket.id].emit( 'getresponse', response );
                   }
                });
      } else {
        console.log(data.label);
        response.sessionId = data.sessionId;
        response.nextlabel = "returndate";
        response.msg = "What date?";
         io.sockets.connected[socket.id].emit( 'getresponse', response );
      }

    } else if ( data.label == "returndate" ) {
      console.log(data.label);
      console.log(data.label);
      console.log(data.msg);

        ifunctions.distancefunc( data, function (error,distanceMiles,estimatedhrs,estimatedcost ,startdate,estimatedcostfrom,estimatedcostto) {

          if(error){
            console.log(error)
          }else{
              var estimatedcostUSD = formatter.format(estimatedcost) ;
              var estimatedcostfromUSD = formatter.format(estimatedcostfrom) ;
              console.log('currency',estimatedcostfromUSD);
              var estimatedcosttoUSD = formatter.format(estimatedcostto) ;
              console.log('currency',estimatedcosttoUSD);

              var returncost = estimatedcost*2 ;
              var estimatedcosttotalUSD = formatter.format(returncost) ;
              var returncostfrom = estimatedcostfrom*2 ;
              var estimatedcosttotalfromUSD = formatter.format(returncostfrom) ;
              var returncostto = estimatedcostto*2 ;
              var estimatedcosttotaltoUSD = formatter.format(returncostto) ;
             data.distance = distanceMiles ;
             data.estimatedhrs = estimatedhrs ;
             data.estimatedcost = estimatedcostUSD ;
             data.estimatedcostfrom = estimatedcostfromUSD ;
             data.estimatedcostto = estimatedcosttoUSD ;
             data.estimatedcosttotal = estimatedcosttotalUSD ;
             data.estimatedcosttotalfrom = estimatedcosttotalfromUSD ;
             data.estimatedcosttotalto = estimatedcosttotaltoUSD ;
             data.startdate = startdate ;
            var webmsg = "<b> Here is a summary of your booking: </b></br>"
            + "<b> Depart: </b> " + data.fromwhere + "</br>"
            + "<b> Destination: </b> " + data.whereto + "</br>"
            + "<b> Departure Date: </b> " + data.startdate + "</br>"
            + "<b> Return Date: </b> " + data.returndate + "</br>"
            + "<b> Plane: </b>" + data.planetype + "</br>"
            + "<b> Distance: </b> " + data.distance + " Miles</br>"
            + "<b> Flight Time Hours: </b> " + data.estimatedhrs + "</br>"
            + "<b> Estimated Cost/Each: </b> " + data.estimatedcost + "</br>"
            + "<b> Total Cost: </b> " + estimatedcosttotalUSD + "</br>";

                var quotesummary = ""
                var response = {};
                response.sessionId = data.sessionId;
                response.nextlabel = "formalquote";
                response.msg = webmsg ;
                io.sockets.connected[socket.id].emit( 'getresponse', response );
                   }
                });


    }
      else if ( data.label == "formalquote" ) {
      console.log(data.label);
      console.log('formalquote',data.formalquote);
      var needquote = data.formalquote ;
          needquote = needquote.toUpperCase();
      if (needquote == "NO") {
             var response = {};
            response.sessionId = data.sessionId;
            response.status = "success";
            response.nextlabel = "anotherquote";
            response.msg = "Would you like another quote?";
            io.sockets.connected[socket.id].emit( 'getresponse', response );
      }
      else{
            var response = {};
            response.sessionId = data.sessionId;
            response.status = "success";
            response.nextlabel = "specialneed";
            response.msg = "Do you have any specific criteria for your aircraft or special requests?";
            io.sockets.connected[socket.id].emit( 'getresponse', response );
      }

    }
    else if ( data.label == "specialneed" ) {
    console.log(data.label);
    console.log('specialneed',data.specialneed);
    var specialneed = data.specialneed ;
        specialneed = specialneed.toUpperCase();
    if (specialneed == "NO") {
           var response = {};
          response.sessionId = data.sessionId;
          response.status = "success";
          response.nextlabel = "name";
          response.msg = "Can I get your name?";
          io.sockets.connected[socket.id].emit( 'getresponse', response );
    }
    else{
          var response = {};
          response.sessionId = data.sessionId;
          response.status = "success";
          response.nextlabel = "specialneedreq";
          response.msg = "Please explain:";
          io.sockets.connected[socket.id].emit( 'getresponse', response );
    }

    }
    else if ( data.label == "specialneedreq" ) {
     console.log(data.label);
     console.log('specialneedreq',data.specialneedreq);
           var response = {};
           response.sessionId = data.sessionId;
           response.status = "success";
           response.nextlabel = "name";
           response.msg = "Can I get your name?";
           io.sockets.connected[socket.id].emit( 'getresponse', response );
   }
    else if ( data.label == "specialneed" ) {
     console.log(data.label);
     console.log('name',data.name);
           var response = {};
           response.sessionId = data.sessionId;
           response.status = "success";
           response.nextlabel = "name";
           response.msg = "Can I get your name?";
           io.sockets.connected[socket.id].emit( 'getresponse', response );
   }
     else if ( data.label == "name" ) {
      console.log(data.label);
      console.log('name',data.name);
            var response = {};
            response.sessionId = data.sessionId;
            response.status = "success";
            response.nextlabel = "email";
            response.msg = "Can I get your email?";
            io.sockets.connected[socket.id].emit( 'getresponse', response );
    }
    else if ( data.label == "email" ) {
      console.log(data.label);
      console.log('email',data.email);
      var emailformat = data.email ;
          var n=0 ;
           n = emailformat.search("@");
           console.log("n",n);
      if (n<=0) {
            var response = {};
            response.sessionId = data.sessionId;
            response.status = "success";
            response.nextlabel = "email";
            response.msg = "Please provide a valid email address.";
            io.sockets.connected[socket.id].emit( 'getresponse', response );
      }
      else{
        var response = {};
        response.sessionId = data.sessionId;
        response.status = "success";
        response.nextlabel = "phone";
        response.msg = "And just in case we need to call you a phone number?";
        io.sockets.connected[socket.id].emit( 'getresponse', response );
      }

    }


    else if ( data.label == "phone" ) {
      console.log( data );
      console.log('phone',data.phone);
      var agentemail = "ceo@80startups.com";
      var officeremail = "david.northcutt@genacom.com";

       ifunctions.distancefunc( data, function (error,distanceMiles,estimatedhrs,estimatedcost ,startdate,estimatedcostfrom,estimatedcostto) {

      if(error){
          console.log(error)
      }else{
          var estimatedcostUSD = formatter.format(estimatedcost) ;
          var estimatedcostfromUSD = formatter.format(estimatedcostfrom) ;
          var estimatedcosttoUSD = formatter.format(estimatedcostto) ;
          var returnestimatedcostfromUSD = formatter.format(estimatedcostfrom*2) ;
          var returnestimatedcosttoUSD = formatter.format(estimatedcostto*2) ;
          var returnestimatedcosttotalUSD = formatter.format(estimatedcost*2) ;
           data.distance = distanceMiles ;
           data.estimatedhrs = estimatedhrs ;
           data.estimatedcost = estimatedcostUSD ;
           data.estimatedcosttotalUSD = returnestimatedcosttotalUSD ;
           data.estimatedcostfromUSD = estimatedcostfromUSD ;
           data.estimatedcosttoUSD = estimatedcosttoUSD ;
           data.returnestimatedcostfromUSD = returnestimatedcostfromUSD ;
           data.returnestimatedcosttoUSD = returnestimatedcosttoUSD ;
           data.returnestimatedcostUSD = returnestimatedcosttotalUSD ;
           data.startdate = startdate ;
           console.log('data.distance', distanceMiles);
           console.log('data.estimatedhrs', estimatedhrs);
           console.log('data.estimatedcost', estimatedcost);
           var subject = "New Client Lead - Private Jet Booking";
           var mailbody = "Hello,</br><p>Flight Booking Quote is requested : </p>"
            + "</br><p><b> Depart: </b> " + data.fromwhere + "</p>"
            + "</br><p><b> Start Airport :</b> " + data.fromairport + "</p>"
            + "</br><p><b> Destination: </b> " + data.whereto + "</p>"
            + "</br><p><b>To Airport:</b> " + data.toairport + "</p>"
            + "</br><p><b> Departure date:</b> " + data.startdate + "</p>"
            + "</br><p><b> Plane Type:</b> " + data.planetype + "</p>"
            + "</br><p><b> Distance:</b> " + data.distance + "Miles</p>"
            + "</br><p><b> Flight Time Hours:</b> " + data.estimatedhrs + "</p>"
            + "</br><p><b> Estimated Cost:</b> " + estimatedcostUSD + "</p>"
            + "</br><p><b> Special Needs:</b> " + data.specialneedreq + "</p>"
            + "</br><p><b></p>"
            + "</br><p><b> Return:</b> " + data.returnboolen + "</p>"
            + "</br><p><b> Return Date:</b> " + data.returndate + "</p>"
            + "</br><p><b> Total Cost:</b> " +  data.returnestimatedcostUSD + "</p>"
            + "</br><p><b></p>"
            + "</br><p><b> Name:</b> " + data.name + "</p>"
            + "</br><p><b> Email:</b> " + data.email + "</p>"
            + "</br><p><b> Phone:</b> " + data.phone + "</p>"
            + "Thanks, Chatbot";


          //ifunctions.insertquotereq(data);

//insert
         //var estimatedrange = data.estimatedcostfromUSD+"-"+data.estimatedcosttoUSD ;
         var quote_data = {
            to_country: data.whereto,
            to_airport: data.toairport,
            from_country: data.fromwhere,
            from_airport: data.fromairport,
            planetype: data.planetype,
            startdate: data.startdate,
            distance: data.distance,
            planecostperhr: data.planecostperhr,
            estimatedhrs:data.estimatedhrs,
            estimatedcost: data.estimatedcost,
            returndate:  data.returndate,
            estimatedcosttotalUSD: data.returnestimatedcostUSD,
            email: data.email,
            name: data.name,
            phone: data.phone,
            specialneeds : data.specialneedreq
        };

        connection.query("INSERT INTO quote SET ?", quote_data, function(err, res){
            if(err){
                console.log(err);
            } else {
                console.log(res);
            }
        });
// end insert



          console.log(mailbody);
          send_mail( agentemail, subject, mailbody );
          send_mail( officeremail, subject, mailbody );
          send_mail( data.email, subject, mailbody );

          var quotesummary = ""
          var response = {};
          response.sessionId = data.sessionId;
          response.nextlabel = "end";
          response.msg = "Thanks, we will get back to you shortly." ;
          io.sockets.connected[socket.id].emit( 'getresponse', response );
      }



     });


    }
    else if ( data.label == "end" ) {

           var response = {};
          response.sessionId = data.sessionId;
          response.status == 'success';
          response.nextlabel = "whereto";
          response.msg = "Good Bye.";
          io.sockets.connected[socket.id].emit( 'getresponse', response );
    }
    else if ( data.label == "anotherquote" ) {
      console.log(data.label);
       var needquote = data.msg ;
          needquote = needquote.toUpperCase();
      if (needquote == "NO") {
             var response = {};
            response.sessionId = data.sessionId;
            response.status = "success";
            response.nextlabel = "startover";
            response.msg = "Thank you goodbye.";
            io.sockets.connected[socket.id].emit( 'getresponse', response );
      }else{
           var response = {};
          response.sessionId = data.sessionId;
          response.status == 'success';
          response.nextlabel = "whereto";
          response.msg = "Where would you like to fly?";
          io.sockets.connected[socket.id].emit( 'getresponse', response );
          console.log("whereto fired");
      }

    }
    else {
      var response = {};
      var returndate = data.msg;
      response.sessionId = data.sessionId;
      response.nextlabel = "issue";
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
    // var mailOptions = {
    //   from: '<operations@80startups.com>', // sender address
    //   to: usermail, // list of receivers
    //   subject: subject, // Subject line
    //   html: mailbody // html body
    // };
    //
    //
    // transporter.sendMail( mailOptions, function ( error, info ) {
    //   if ( error ) {
    //     console.log( error );
    //   } else {
    //     console.log( 'Message sent: ' + info.response );
    //   }
    //   //jsonp(response);
    // } );

    var auth = {
      auth: {
        api_key: 'key-b4687b67307cb2598abad76006bd7a4a',
        domain: '80startups.com'
      }
    }

    var nodemailerMailgun = nodemailer.createTransport(mg(auth));

    nodemailerMailgun.sendMail({
      from: 'operations@80startups.com',
      to: usermail, // An array if you have multiple recipients.
      subject: subject,
      'h:Reply-To': 'operations@80startups.com',
      //You can use "html:" to send HTML email content. It's magic!
      html: mailbody,
      //You can use "text:" to send plain-text content. It's oldschool!
      text: mailbody
    }, function (err, info) {
      if (err) {
        console.log('Error: ' + err);
      }
      else {
        console.log('Response: ' + info);
      }
    });
  };


} );
//TODO: We need to make the currency proper
//TODO: We need to show the One way cost and return cost properly.
