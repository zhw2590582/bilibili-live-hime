import { REG_FUNCTION } from '../../share/constant';

function getDanmuOption() {
    const initTime = Date.now();
    (function loop() {
        if (window.DanmakuWebSocket) {
            const DWS = window.DanmakuWebSocket;
            window.DanmakuWebSocket = function f(option) {
                const dws = new DWS(option);
                window.postMessage({
                    type: 'danmu_option',
                    data: Object.keys(option).reduce((obj, key) => {
                        if (typeof option[key] !== 'function') {
                            obj[key] = option[key];
                        }
                        return obj;
                    }, {}),
                });
                return dws;
            };
        } else if (Date.now() - initTime >= 60000) {
            window.postMessage({
                type: 'danmu_error',
            });
        } else {
            setTimeout(loop, 10);
        }
    })();
}

class Danmu {
    constructor() {
        const $script = document.createElement('script');
        $script.type = 'text/javascript';
        $script.text = getDanmuOption.toString().match(REG_FUNCTION)[3];
        document.documentElement.appendChild($script);
        $script.onload = document.documentElement.removeChild($script);

        window.addEventListener('message', event => {
            chrome.runtime.sendMessage(event.data);
        });
    }
}

export default new Danmu();
