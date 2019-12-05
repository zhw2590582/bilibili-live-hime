import { addScript, addStyle } from '../../share';

class Content {
    constructor() {
        this.isInit = false;
        chrome.runtime.onMessage.addListener(async request => {
            const { type } = request;
            switch (type) {
                case 'record@init':
                    console.log(type);
                    if (!this.isInit) {
                        this.isInit = true;
                        addScript(chrome.extension.getURL('injected/index.js'));
                        addStyle(chrome.extension.getURL('injected/index.css'));
                    }
                    break;
                case 'record@start': {
                    console.log(type);
                    break;
                }
                case 'record@ing':
                    console.log(type);
                    break;
                case 'record@stop':
                    console.log(type);
                    break;
                case 'record@download':
                    console.log(type);
                    break;
                default:
                    break;
            }
        });
    }
}

export default new Content();
