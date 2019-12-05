const io = require('socket.io')(8080);
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const spawn = require('child_process').spawn;
const exec = require('child_process').exec;

function createFFmpegProcess(rtmpUrl) {
    return spawn(ffmpegPath, [
        '-re',
        '-i',
        '-',
        '-vcodec',
        'copy',
        '-acodec',
        'aac',
        '-b:a',
        '192k',
        '-f',
        'flv',
        rtmpUrl,
    ]);
}

let ffmpeg = null;
io.on('connection', function(socket) {
    socket.on('rtmpUrl', rtmpUrl => {
        ffmpeg = createFFmpegProcess(rtmpUrl);

        ffmpeg.stdout.on('data', data => {
            console.log(String(data));
        });

        ffmpeg.stderr.on('data', data => {
            console.log(String(data));
        });

        ffmpeg.on('close', code => {
            console.log(`子进程退出，退出码 ${code}`);
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
