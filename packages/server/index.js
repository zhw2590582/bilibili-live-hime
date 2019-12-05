const io = require('socket.io')(8080);
const cfp = require('./createFfmpegProcess');

let ffmpeg_process = null;
io.on('connection', function(socket) {
    socket.on('rtmpUrl', rtmpUrl => {
        ffmpeg_process = cfp(rtmpUrl);

        ffmpeg_process.stderr.on('data', error => {
            socket.emit('fatal', String(error));
        });

        ffmpeg_process.on('error', error => {
            socket.emit('fatal', String(error));
            socket.disconnect();
        });

        ffmpeg_process.on('exit', error => {
            socket.emit('fatal', String(error));
            socket.disconnect();
        });
    });

    socket.on('binarystream', data => {
        if (ffmpeg_process) {
            ffmpeg_process.stdin.write(data);
        }
    });

    socket.on('disconnect', () => {
        console.log('disconnect');
        if (ffmpeg_process) {
            try {
                ffmpeg_process.stdin.end();
                ffmpeg_process.kill('SIGINT');
            } catch (error) {
                console.warn('killing ffmpeg process attempt failed...');
            }
        }
    });
});
