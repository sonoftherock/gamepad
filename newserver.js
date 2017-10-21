var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http');
var server = http.createServer(app);

server.listen(process.env.PORT || 3000)

// views is directory for all template files
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));

/*********************************************
GAME PAD TYPES
*********************************************/
//
var pad_1 = [{ id: 'up', press: 'q'}, { id: 'down', press: 'w'},
			{ id: 'left', press: 'e'}, { id: 'right', press: 'r'},
		{ id: 'a', press: 't'}, { id: 'b', press: 'y'}];

var pad_2 = [{ id: 'up', press: 'o'}, { id: 'down', press: 'p'},
			{ id: 'left', press: 'a'}, { id: 'right', press: 's'},
		{ id: 'a', press: 'd'}, { id: 'b', press: 'f'}];

/*var pad_1 = [
        { up: 'q'}, { down: 'w'}, { left: 'e'}, { right: 'r'},
        { action_one: 't'}, { action_two: 'y'}, { action_three: 'y'},
        { action_four: 'u'}
    ];

var pad_2 = [
        { up: 'a'}, { down: 's'}, { left: 'd'}, { right: 'f'},
        { action_one: 'g'}, { action_two: 'h'}, { action_three: 'j'},
        { action_four: 'k'}
    ];*/

/*********************************************
SERVE EJS FILES
*********************************************/
app.get('/', function(request, response) {
  response.render('index.ejs');
});

app.get('/demo', function(request, response) {
  response.render('demo.ejs');
});

app.post('/player_one', function(req, res) {
	res.render('controller_one.ejs');
	console.log('player one added');
});

app.post('/player_two', function(req, res) {
	res.render('controller_two.ejs');
	console.log('player two added');
});

/*********************************************
SOCKET IO
*********************************************/
var io = require('socket.io').listen(server);

io.on('connection', function(socket) {
	console.log('a user connected');

/*
	socket.on('controller-key', function(msg) {
		console.log('received message from webpage: ' + msg.key);
		io.emit('key', msg);
	});*/

	socket.on('controller-one-key', function(message) {
		if (message.key == 'up') {
			msg = {key: 'w'};
		} else if (message.key == 'down') {
			msg = {key: 's'};
		} else if (message.key == 'left') {
			msg = {key: 'a'};
		}
		else if (message.key == "right") {
			msg = {key: 'd'};
		}
		else if (message.key == 'a') {
			msg = {key: 'j'};
		}
		else {
			msg = {key: 'k'};
		}
		console.log(message);
		io.emit('key', msg);
	});

	socket.on('controller-two-key', function(message) {
		if (message.key == 'up') {
			msg = {key: 't'};
		} else if (message.key == 'down') {
			msg = {key: 'g'};
		} else if (message.key == 'left') {
			msg = {key: 'f'};
		}
		else if (message.key == "right") {
			msg = {key: 'h'};
		}
		else if (message.key == 'a') {
			msg = {key: 'n'};
		}
		else {
			msg = {key: 'm'};
		}
		console.log(message);
		io.emit('key', msg);
	});

	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});
