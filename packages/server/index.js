var io = require('socket.io')(8080);

io.on('connection', function(socket) {
    socket.on('rtmpUrl', data => {
        console.log(data);
    });

    socket.on('binarystream', data => {
        console.log(data);
    });
});
