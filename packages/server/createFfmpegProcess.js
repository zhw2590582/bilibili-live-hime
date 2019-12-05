const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const spawn = require('child_process').spawn;

module.exports = rtmpUrl => {
    return spawn(ffmpegPath, [
        '-i',
        '-',
        '-c:v',
        'libx264',
        '-preset',
        'veryfast',
        '-tune',
        'zerolatency',
        '-c:a',
        'aac',
        '-ar',
        '44100',
        '-b:a',
        '64k',
        '-y',
        '-use_wallclock_as_timestamps',
        '1',
        '-async',
        '1',
        '-bufsize',
        '1000',
        '-f',
        'flv',
        rtmpUrl,
    ]);
};
