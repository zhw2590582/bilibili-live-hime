import './index.scss';
import { onMessage } from '../../share';

class Content {
    constructor() {
        if (!window.BilibiliLiveHimeContentInit) {
            this.init();
        }
    }

    init() {
        window.BilibiliLiveHimeContentInit = true;
        onMessage(request => {
            console.log(request);
            const { type, data } = request;
            switch (type) {
                case 'danmu':
                    console.log(data);
                    break;
                case 'gift':
                    console.log(data);
                    break;
                default:
                    break;
            }
        });
    }
}

export default new Content();
