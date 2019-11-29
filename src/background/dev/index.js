import 'crx-hotreload';
import ChangeCSP from './changeCSP';
import Capture from './capture';

class Background {
    constructor() {
        this.changeCSP = new ChangeCSP(this);
        this.capture = new Capture(this);
    }
}

export default new Background();
