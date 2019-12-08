import './index.scss';
import { onMessage } from '../../share';
import { DANMU, GIFT, GUARD } from '../../share/constant';

class Content {
    constructor() {
        if (!window.BilibiliLiveHimeContentInit) {
            this.init();
        }
    }

    init() {
        window.BilibiliLiveHimeContentInit = true;
        onMessage(request => {
            const { type, data } = request;
            window.postMessage(request);
            console.log(JSON.stringify(data));
            switch (type) {
                case DANMU:
                    break;
                case GIFT:
                    break;
                case GUARD:
                    break;
                default:
                    break;
            }
        });
    }
}

export default new Content();
