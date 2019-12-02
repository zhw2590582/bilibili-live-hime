import { sleep, addScript, addStyle } from '../../share';

class Content {
    constructor() {
        const scriptUrl = chrome.extension.getURL('injected/index.js');
        const styleUrl = chrome.extension.getURL('injected/index.css');
        sleep().then(() => addStyle(styleUrl));
        addScript(scriptUrl);
        this.init();
    }

    async init() {
        chrome.runtime.onMessage.addListener(async request => {
            const { type, data } = request;
            switch (type) {
                case 'recordInit':
                    this.recordInit();
                    break;
                case 'liveInit':
                    this.liveInit();
                    break;
                case 'recording':
                    this.recording(data);
                    break;
                case 'recordStop':
                    this.recordStop();
                    break;
                default:
                    break;
            }
        });
    }

    async recordInit() {
        console.log('recordInit');
    }

    async liveInit() {
        console.log('liveInit');
    }

    async recording() {
        const buf = await fetch(data).then(res => res.arrayBuffer());
        URL.revokeObjectURL(data);
        console.log(buf.byteLength);
    }

    async recordStop() {
        console.log('recordStop');
    }
}

export default new Content();
