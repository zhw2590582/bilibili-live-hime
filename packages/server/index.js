const port = Number(process.argv[2]) || 8080;
const io = require('socket.io')(port);
const FFmpeg = require('./FFmpeg');

console.log(`中转地址：http://localhost:${port}`);

io.on('connection', function(socket) {
    // 来自浏览器：开启ffmpeg进程
    socket.on('rtmp', rtmp => {
        const ffmpeg = FFmpeg.getInstance(socket) || new FFmpeg(rtmp, socket);

        ffmpeg.close(code => {
            ffmpeg.destroy();

            const msg = 'FFmpeg进程退出：' + code;

            // 告知浏览器：重连
            socket.emit('reconnect', msg);

            // 告知浏览器：终止
            // socket.emit('fail', msg);

            console.log(msg);
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
    });
});

io.on('error', error => {
    console.log(error);
});

process.on('uncaughtException', error => {
    console.log(error);
});
