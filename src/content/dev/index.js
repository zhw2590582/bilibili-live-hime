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

chrome.runtime.onMessage.addListener(async request => {
    const { type, data } = request;
    switch (type) {
        case 'recording':
            try {
                const buf = await fetch(data).then(res => res.arrayBuffer());
                URL.revokeObjectURL(data);
                console.log(buf.byteLength);
            } catch (error) {}
            break;
        case 'recordStop':
            console.log('recordStop');
            break;
        default:
            break;
    }
});
