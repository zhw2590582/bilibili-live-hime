import './index.scss';

class Injected {
    constructor() {
        console.log('Injected');
    }
}

export default new Injected();
