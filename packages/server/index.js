var io = require('socket.io')(8080);

io.on('connection', function(socket) {
    socket.on('test', function(msg) {
        console.log(msg);
    });
});
