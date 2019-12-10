const port = Number(process.argv[2]) || 8080;
const io = require('socket.io')(port);
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const spawn = require('child_process').spawn;

function createFFmpegProcess(rtmp) {
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
        rtmp,
    ]);
}

let ffmpeg = null;
console.log(`中转地址：http://localhost:${port}`);

io.on('connection', function(socket) {
    // 来自浏览器：开启ffmpeg进程
    socket.on('rtmp', rtmp => {
        console.log('来自浏览器：开启ffmpeg进程');
        
        if (ffmpeg) {
            try {
                ffmpeg.stdin.end();
                ffmpeg.kill('SIGINT');
                ffmpeg = null;
            } catch (err) {
                console.log(err);
            }
        }

        ffmpeg = createFFmpegProcess(rtmp);

        // 告知浏览器：打印
        socket.emit('log', '创建FFmpeg进程成功');

        ffmpeg.stdout.on('data', data => {
            console.log(String(data));
        });

        ffmpeg.stderr.on('data', data => {
            console.log(String(data));
        });

        ffmpeg.on('close', code => {
            // 告知浏览器：重连
            const msg = 'FFmpeg进程退出：' + code;
            socket.emit('reconnect', msg);
            // 告知浏览器：终止
            // socket.emit('fail', msg);
            console.log(msg);
        });
    });

    // 来自浏览器：推流
    socket.on('binary_stream', data => {
        if (ffmpeg) {
            ffmpeg.stdin.write(data);
        }
    });

    // 来自浏览器：终止
    socket.on('stream_disconnect', () => {
        console.log('来自浏览器：终止');
        if (ffmpeg) {
            try {
                ffmpeg.stdin.end();
                ffmpeg.kill('SIGINT');
                ffmpeg = null;
            } catch (err) {
                console.log(err);
            }
        }
    });

    socket.on('error', err => {
        console.log(err);
    });
});

io.on('error', err => {
    console.log(err);
});

process.on('uncaughtException', err => {
    console.log(err);
});
