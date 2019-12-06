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
    // rtmp 事件用于告知服务器初始化ffmpeg
    socket.on('rtmp', rtmp => {
        // 假如已经有 ffmpeg 进程就先停止
        if (ffmpeg) {
            try {
                ffmpeg.stdin.end();
                ffmpeg.kill('SIGINT');
                ffmpeg = null;
            } catch (err) {
                console.log(err);
            }
        }

        // 创建 ffmpeg 进程
        ffmpeg = createFFmpegProcess(rtmp);

        // log 事件可以告知浏览器打印消息
        socket.emit('log', '创建ffmpeg进程成功');

        ffmpeg.stdout.on('data', data => {
            console.log(String(data));
        });

        ffmpeg.stderr.on('data', data => {
            console.log(String(data));
        });

        ffmpeg.on('close', code => {
            // fail 事件可以告知浏览器关闭推流
            const msg = 'ffmpeg进程退出：' + code;
            socket.emit('fail', msg);
            console.log(msg);
        });
    });

    // binarystream 事件用于告知服务器接收数据流
    socket.on('binarystream', data => {
        if (ffmpeg) {
            ffmpeg.stdin.write(data);
        }
    });

    // disconnect 事件用于告知服务器关闭ffmpeg进程
    socket.on('disconnect', () => {
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
