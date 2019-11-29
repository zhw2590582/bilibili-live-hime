import 'crx-hotreload';
import ChangeCSP from './changeCSP';
import Capture from './capture';

class Background {
    constructor() {
        this.changeCSP = new ChangeCSP(this);
        this.capture = new Capture(this);

        chrome.runtime.onMessage.addListener(request => {
            switch (request.type) {
                case 'start':
                    console.log('start');
                    break;
                case 'stop':
                    console.log('stop');
                    break;
                default:
                    break;
            }
        });
    }
}

export default new Background();
