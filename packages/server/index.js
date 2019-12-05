const io = require('socket.io')(8080);
const cfp = require('./createFFmpegProcess');

let ffmpeg = null;
io.on('connection', function(socket) {
    socket.on('rtmpUrl', rtmpUrl => {
        ffmpeg = cfp(rtmpUrl);

        ffmpeg.stderr.on('data', error => {
            socket.emit('fatal', String(error));
        });

        ffmpeg.on('error', error => {
            socket.emit('fatal', String(error));
            socket.disconnect();
        });

        ffmpeg.on('exit', error => {
            socket.emit('fatal', String(error));
            socket.disconnect();
        });
    });

    socket.on('binarystream', data => {
        if (ffmpeg) {
            ffmpeg.stdin.write(data);
        }
    });

    socket.on('disconnect', () => {
        if (ffmpeg) {
            ffmpeg.stdin.end();
            ffmpeg.kill('SIGINT');
            ffmpeg = null;
        }
    });
});
