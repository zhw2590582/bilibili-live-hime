import './index.scss';
import { onMessage } from '../../share';
import { DANMU, GIFT } from '../../share/constant';

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
            console.log(JSON.stringify(data));
            switch (type) {
                case DANMU:
                    break;
                case GIFT:
                    break;
                default:
                    break;
            }
        });
    }
}

export default new Content();
