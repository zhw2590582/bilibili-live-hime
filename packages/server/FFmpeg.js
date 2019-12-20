const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const spawn = require('child_process').spawn;

class FFmpeg {
    constructor(rtmp, socket) {
        this.socket = socket;
        this.ff = this.create(rtmp);
        this.ff.stdout.on('data', data => console.log(String(data)));
        this.ff.stderr.on('data', data => console.log(String(data)));
        FFmpeg.instances.set(socket, this);
    }

    static getInstance(socket) {
        return FFmpeg.instances.get(socket);
    }

    create(rtmp) {
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

    write(data) {
        if (this.ff) {
            this.ff.stdin.write(data);
        }
    }

    onClose(callback) {
        if (this.ff) {
            this.ff.on('close', callback);
        }
    }

    destroy() {
        if (this.ff) {
            this.ff.stdin.end();
            this.ff.kill('SIGINT');
            this.ff = null;
        }
        FFmpeg.instances.delete(this.socket);
    }
}

Object.defineProperty(FFmpeg, 'instances', {
    value: new Map(),
});

module.exports = FFmpeg;
