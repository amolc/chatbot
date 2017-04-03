        require('use-strict');
        var app = require('express')();
        var http = require('http').Server(app);
        var io = require('socket.io')(http);
        var connect = require('connect');
        var serveStatic = require('serve-static');
        var bodyParser = require('body-parser');

        var serverport = 2001;
        var web = connect();
        web.use(serveStatic('web'));
        app.use('/',web);
        http.listen(serverport, function(){
          console.log('listening on *:'+serverport);
        });
        io.on('connection', function(socket){
          console.log('socket id is :',socket.id);

        socket.on('apicall', function(data){

              console.log(data);
              /*001 - Need to add intelligence here */
              if(data.label=="whereto"){
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
        });
