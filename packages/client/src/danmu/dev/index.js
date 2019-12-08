class Danmu {
    constructor() {
        const $script = document.createElement('script');
        $script.src = chrome.extension.getURL('injected/index.js');
        $script.onload = () => $script.remove();
        document.documentElement.appendChild($script);

        window.addEventListener('message', event => {
            chrome.runtime.sendMessage(event.data);
        });
    }
}

export default new Danmu();
