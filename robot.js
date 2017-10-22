var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var robot = require("robotjs");

var io = require('socket.io-client')('http://35.196.132.21:3000');

io.on('connection', function(socket) {
	console.log('a user connected');

  socket.on('controller-one-key', function(msg) {
    console.log(msg.key);
    // if (msg.key.length() == 1){
    //
    // }

  });

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});
// Type "Hello World".
// robot.typeString("Hello World");
//
// // Press enter.
// robot.keyTap("enter");
