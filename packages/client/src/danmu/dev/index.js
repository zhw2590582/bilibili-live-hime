class Danmu {
    constructor() {
        const $script = document.createElement('script');
        $script.src = chrome.extension.getURL('injected/index.js');
        $script.onload = () => $script.remove();
        document.documentElement.appendChild($script);

        window.addEventListener('message', event => {
            try {
                chrome.runtime.sendMessage(event.data);
            } catch (error) {
                //
            }
        });
    }
}

export default new Danmu();
