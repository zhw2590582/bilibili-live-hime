const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const spawn = require('child_process').spawn;

module.exports = rtmpUrl => {
    var ops = [
        '-i',
        '-',
        '-c:v',
        'libx264',
        '-preset',
        'veryfast',
        '-tune',
        'zerolatency', // video codec config: low latency, adaptive bitrate
        '-c:a',
        'aac',
        '-ar',
        '44100',
        '-b:a',
        '64k', // audio codec config: sampling frequency (11025, 22050, 44100), bitrate 64 kbits
        '-y', //force to overwrite
        '-use_wallclock_as_timestamps',
        '1', // used for audio sync
        '-async',
        '1', // used for audio sync
        //'-filter_complex', 'aresample=44100', // resample audio to 44100Hz, needed if input is not 44100
        //'-strict', 'experimental',
        '-bufsize',
        '1000',
        '-f',
        'flv',
        rtmpUrl,
    ];

    return spawn('ffmpeg', ops);
};
