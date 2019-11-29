import 'crx-hotreload';
import './csp';
import Recorder from './recorder';

class Background {
    constructor() {
        this.recorder = new Recorder(this);
        chrome.runtime.onMessage.addListener(request => {
            const { type, data } = request;
            switch (type) {
                case 'start':
                    this.recorder.start(data);
                    break;
                case 'stop':
                    this.recorder.stop(data);
                    break;
                default:
                    break;
            }
        });
    }

    postMessage(data) {
        //
    }
}

export default new Background();
