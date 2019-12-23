const port = Number(process.argv[2]) || 8080;
const io = require('socket.io')(port);
const FFmpeg = require('./FFmpeg');

console.log(`中转地址：http://localhost:${port}`);

io.on('connection', socket => {
    // 来自浏览器：开启进程
    socket.on('rtmp', rtmp => {
        // 销毁旧的重复进程
        const ffmpeg_old = FFmpeg.getInstance(socket);
        if (ffmpeg_old) {
            ffmpeg_old.destroy();

            // 告知浏览器：打印
            socket.emit('log', `销毁旧的重复FFmpeg进程: ${FFmpeg.instances.size}`);
        }

        // 创建新进程
        const ffmpeg = new FFmpeg(rtmp, socket);

        // 进程关闭时
        ffmpeg.onClose(code => {
            const msg = 'FFmpeg进程退出码：' + code;

            // 告知浏览器：重连
            socket.emit('reconnect', msg);

            // 告知浏览器：不重连直接终止
            // socket.emit('fail', msg);

            console.log(msg);

            // 每次关闭都销毁进程
            ffmpeg.destroy();
        });

        // 告知浏览器：打印
        socket.emit('log', `创建FFmpeg进程成功: ${FFmpeg.instances.size}`);
    });

    // 来自浏览器：推流
    socket.on('binary_stream', data => {
        const ffmpeg = FFmpeg.getInstance(socket);
        if (ffmpeg) {
            ffmpeg.write(data);
        }
    });

    // 来自浏览器：终止
    socket.on('stream_disconnect', () => {
        console.log('来自浏览器：终止');
        const ffmpeg = FFmpeg.getInstance(socket);
        if (ffmpeg) {
            ffmpeg.destroy();
        }
    });

    socket.on('error', error => {
        console.log(error);
        const ffmpeg = FFmpeg.getInstance(socket);
        if (ffmpeg) {
            ffmpeg.destroy();
        }
    });
});

io.on('error', error => {
    FFmpeg.destroy();
    console.log(error);
});

process.on('uncaughtException', error => {
    FFmpeg.destroy();
    console.log(error);
});
