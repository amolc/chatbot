// socket.io implementation for chatbot
var app = require('express')();
//app = require('./api/api');
// var apiai = require('apiai');
// var apiapp = apiai("d3bf36baa23f41d29d41e6e0619641ae");//developer access token
var http = require('http').Server(app);
var chatsocket = require('socket.io')(http);
//Whenever someone connects this gets executed
chatsocket.on('connection', function(socket){
  console.log('socket id is :',socket.id);

chatsocket.on('apicall', function(data){
      console.log(data);
      var msg ="I love you" ;
      var response = {};
      response.msg = msg;
      response.sessionId = data.sessionId ;
      io.sockets.connected[socket.id].emit('getresponse',response);
  });
chatsocket.on('disconnect', function () {
  console.log('A user disconnected');
  });
});

module.exports = chatsocket;
