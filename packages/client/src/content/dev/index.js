import './index.scss';

export default class Content {
    constructor(type) {
        if (type === 'live') {
            this.initLive();
        }
        if (type === 'active') {
            this.initActive();
        }
    }

    initLive() {
        console.log('live');
    }

    initActive() {
        console.log('active');
    }
}
