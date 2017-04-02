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
              msg = '';
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
                response.nextlabel = "whichtype" ;
                response.msg = "When would you like to start?";
              }
              else if(data.label=="whichtype"){
                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "return" ;
                response.msg = "Which Plane would you like to choose?";
              }
              else if(data.label=="return"){
                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "returnboolen" ;
                response.msg = "Would you like to book a return?";
              }
              else if(data.label=="returnboolen"){
                var response = {};
                if(data.msg=="no"){
                  response.sessionId = data.sessionId ;
                  response.nextlabel = "summary" ;
                  response.msg = "Great,give us a moment we are calculating the fare.";
                }else{
                  response.sessionId = data.sessionId ;
                  response.nextlabel = "returndate" ;
                  response.msg = "What date?";
                }

              }
              else if(data.label=="returndate"){
                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "summary" ;
                response.msg = "Your email address please, our quote is on the way.";
              }
              else {
                var response = {};
                response.sessionId = data.sessionId ;
                response.nextlabel = "last" ;
                response.msg = "I guess, let me get a human to talk with you";
              }

              io.sockets.connected[socket.id].emit('getresponse',response);
          });
        io.on('disconnect', function () {
          console.log('A user disconnected');
          });
        });
