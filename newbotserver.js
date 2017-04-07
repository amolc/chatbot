        require('use-strict');
        var app = require('express')();
        var http = require('http').Server(app);
        var io = require('socket.io')(http);
        var connect = require('connect');
        var serveStatic = require('serve-static');
        var bodyParser = require('body-parser');
        var nodemailer = require('nodemailer');
        var serverport = 2001;
        var web = connect();
        web.use(serveStatic('web'));
        app.use('/',web);
        http.listen(serverport, function(){
          console.log('listening on *:'+serverport);
        });

      //  var google_api_key = "AIzaSyCBEc0eXgs0pXlPRuP4zPzQTi60-AzHpAc";
          var google_api_key =   "AIzaSyCbQ_Hk3eqc7UB-fqKqYqUDFtjDjDBe2V8" ;
        var google_output_format = "json";

        var TextSearch = require("./api/TextSearch.js");

        var textSearch = new TextSearch(google_api_key, google_output_format);

        var parameters = {
            query: "airports in singapore"
        };

        textSearch(parameters, function (error, response) {
            console.log(response);
          //  console.log(response.results[0].geometry);
            // if (error) throw error;
            // assert.notEqual(response.results.length, 0, "Text search must not return 0 results");
            if(response.results.length==0){
              console.log("No Airport Found");
            }
            else{

              var airports = {}, airportsnames = [];

              for(var index = 0; index < response.results.length; index++) {
                    //  airportsnames[index] = "name: "+response.results[index].name;
                       airportsnames.push({name:response.results[index].name});
                      console.log(response.results[index].name);
                  }
            }

            var jsonairports = JSON.parse(JSON.stringify(airportsnames))
             airports.results = jsonairports ;
            console.log(airports);

            /* Test json array */
            // console.log(airports.results.length);
            // for(var index = 0; index < airports.results.length; index++) {
            //         console.log(airports.results[index].name);
            //     }
        });








        io.on('connection', function(socket){
          console.log('socket id is :',socket.id);

        socket.on('apicall', function(data){

              console.log(data);
              /*001 - Need to add intelligence here */

              if(data.label=="whereto"){

                var query = "airports in"+data.msg ;


                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "fromwhere" ;
                response.msg = "From Where?";
              }
              else if(data.label=="fromwhere"){

                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "startdate" ;
                response.msg = "When would you like to start?";
              }
              else if(data.label=="startdate"){

                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "starttime" ;
                response.msg = "Whats the best time you would prefer?";
              }
              else if(data.label=="starttime"){

                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "whichplane" ;
                response.msg = "Which Plane would you like to choose?";
              }
              else if(data.label=="whichplane"){

                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "returnboolen" ;
                response.msg = "Would you like to book a return?";
              }
              else if(data.label=="returnboolen"){
                var response = {};
                if(data.msg=="no"){

                  response.sessionId = data.sessionId ;
                  response.nextlabel = "email" ;
                  response.msg = "Can I get your email";
                }else{

                  response.sessionId = data.sessionId ;
                  response.nextlabel = "returndate" ;
                  response.msg = "What date?";
                }

              }
              else if(data.label=="returndate"){

                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "email" ;
                response.msg = "Can I get your email?";
              }
              else if(data.label=="email"){
                console.log(data);
                var agentemail = "ceo@80startups.com";
                var officeremail = "naim.jeem@80startups.com";

                var subject ="New Client Lead - Private Jet Booking" ;
                var mailbody = "Hello,</br><p>Flight Booking Quote is requested : </p>"
                                  +"</br><p><b>To:</b> "+data.whereto+"</p>"
                                  +"</br><p><b> From :</b> "+data.fromwhere+"</p>"
                                  +"</br><p><b> Departure date:</b> "+data.startdate+"</p>"
                                  +"</br><p><b> At time:</b> "+data.starttime+"</p>"
                                  +"</br><p><b> Flight Type:</b> "+data.whichplane+"</p>"
                                  +"Thanks, Chatbot";

                send_mail(agentemail,subject,mailbody);
                send_mail(officeremail,subject,mailbody);

                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "summary" ;
                response.msg = "Thank You, we should email you a quote soon.";
              }
              else if(data.label=="summary"){

                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "whereto" ;
                response.msg = "Where would you like to fly?";
              }
              else {
                var response = {};
                route.returndate = data.msg ;
                response.sessionId = data.sessionId ;
                response.nextlabel = "last" ;
                response.msg = route ;
              }
              io.sockets.connected[socket.id].emit('getresponse',response);

          });

        io.on('disconnect', function () {
          console.log('A user disconnected');
          });


          var transporter = nodemailer.createTransport({
              host : 'in-v3.mailjet.com',
              port: '587',
              auth: {
                user: '66ca4479851e0bd9cedc629bdff36ee6',
                pass: 'a3ec60f55a89f7fab98891e86818c8db'
              }
            });
          function send_mail(usermail, subject,mailbody) {
            var mailOptions = {
                from: '<operations@80startups.com>', // sender address
                to: usermail, // list of receivers
                subject: subject, // Subject line
                html: mailbody // html body
            };


            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Message sent: ' + info.response);
                }
                //jsonp(response);
            });
          };


        });
