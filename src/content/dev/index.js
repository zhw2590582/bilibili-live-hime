import { sleep } from '../../share';

const $script = document.createElement('script');
$script.src = chrome.extension.getURL('injected/index.js');
$script.onload = () => $script.remove();
document.documentElement.appendChild($script);

const $style = document.createElement('link');
$style.rel = 'stylesheet';
$style.type = 'text/css';
$style.href = chrome.extension.getURL('injected/index.css');
sleep().then(() => document.head.appendChild($style));

sleep(1000).then(() => {
    const video = document.createElement('video');
    document.body.insertAdjacentElement('afterbegin', video);

    var mediaSource = new MediaSource();

    mediaSource.addEventListener('sourceopen', () => {
        var sourceBuffer = mediaSource.addSourceBuffer('video/webm; codecs="vp8, opus"');
        chrome.runtime.onMessage.addListener(async request => {
            const { type, data } = request;
            switch (type) {
                case 'recording':
                    try {
                        const buf = await fetch(data).then(res => res.arrayBuffer());
                        URL.revokeObjectURL(data);
                        console.log(mediaSource.readyState, buf.byteLength);
                        sourceBuffer.appendBuffer(new Uint8Array(buf));
                    } catch (error) {}
                    break;
                case 'recordStop':
                    console.log('recordStop');
                    mediaSource.endOfStream();
                    break;
                default:
                    break;
            }
        });
    });

    video.src = URL.createObjectURL(mediaSource);

    var isPlaying = false;
    video.addEventListener('canplay', function() {
        if (!isPlaying) {
            isPlaying = true;
            video.play();
        }
    });
});
