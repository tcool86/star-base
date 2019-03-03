var app = require('express')();
var server = app.listen(3000, () => {
	console.log("I'm listening....");
});

var io = require('socket.io')(server);
io.on('connection', function(){ 
	console.log('connected');
	/* … */
});