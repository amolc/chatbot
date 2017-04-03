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
              var route = {};
              route.whereto = '' ;
              route.fromwhere = '' ;
              route.startdate = '' ;
              route.whichplane = '' ;
              

              /*001 - Need to add intelligence here */
              if(data.label=="whereto"){
                route.whereto = data.msg ;
                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "fromwhere" ;
                response.msg = "From Where?";
              }
              else if(data.label=="fromwhere"){
                route.fromwhere = data.msg ;
                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "startdate" ;
                response.msg = "When would you like to start?";
              }
              else if(data.label=="startdate"){
                route.startdate = data.msg ;
                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "whichplane" ;
                response.msg = "Which Plane would you like to choose?";
              }
              else if(data.label=="whichplane"){
                route.whichplane = data.msg ;
                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "returnboolen" ;
                response.msg = "Would you like to book a return?";
              }
              else if(data.label=="returnboolen"){
                var response = {};
                if(data.msg=="no"){
                  route.returnboolen = data.msg ;
                  response.sessionId = data.sessionId ;
                  response.nextlabel = "summary" ;
                  response.msg = "Great,give us a moment we are calculating the fare.";
                }else{
                  route.returnboolen = data.msg ;
                  response.sessionId = data.sessionId ;
                  response.nextlabel = "returndate" ;
                  response.msg = "What date?";
                }

              }
              else if(data.label=="returndate"){
                route.returndate = data.msg ;
                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "email" ;
                response.msg = "Your email address please, our quote is on the way.";
              }
              else if(data.label=="email"){
                route.email = data.msg ;
                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "summary" ;
                response.msg = "We should email you a quote soon.";
              }
              else if(data.label=="summary"){

                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "summary" ;
                response.msg = "Thank You";
              }
              else {
                var response = {};
                route.returndate = data.msg ;
                response.sessionId = data.sessionId ;
                response.nextlabel = "last" ;
                response.msg = route ;
              }
              io.sockets.connected[socket.id].emit('getresponse',response);
              console.log(route);
          });

        io.on('disconnect', function () {
          console.log('A user disconnected');
          });
        });
