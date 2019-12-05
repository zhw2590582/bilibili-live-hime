import objToString from 'obj-to-string';

export function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function query(el, doc = document) {
    return doc.querySelector(el);
}

export function getActiveTab() {
    return new Promise(resolve => {
        chrome.tabs.query(
            {
                active: true,
                currentWindow: true,
            },
            tabs => {
                resolve(tabs[0]);
            },
        );
    });
}

export function setStorage(key, value) {
    return new Promise(resolve => {
        chrome.storage.local.set(
            {
                [key]: value,
            },
            () => {
                resolve(value);
            },
        );
    });
}

export function getStorage(key, defaultValue) {
    return new Promise(resolve => {
        chrome.storage.local.get([key], result => {
            if (result[key]) {
                resolve(result[key]);
            } else if (defaultValue) {
                setStorage(key, defaultValue).then(value => {
                    resolve(value);
                });
            } else {
                resolve();
            }
        });
    });
}

export function storageChange(callback) {
    chrome.storage.onChanged.addListener(callback);
}

export function openTab(url, active = false) {
    return new Promise(resolve => {
        chrome.tabs.query({}, tabs => {
            const findTab = tabs.find(tab => tab.url === url);
            if (findTab) {
                chrome.tabs.update(
                    findTab.id,
                    {
                        active,
                        url,
                    },
                    tab => {
                        resolve(tab);
                    },
                );
            } else {
                chrome.tabs.create({ url, active }, tab => {
                    resolve(tab);
                });
            }
        });
    });
}

export async function log(msg) {
    return new Promise(async resolve => {
        msg = msg instanceof Error ? msg.message.trim() : objToString(msg);
        const logs = (await getStorage('debug')) || [];
        logs.push(msg);
        await setStorage('debug', logs);
        resolve(logs);
    });
}

export function sendMessage(type, data) {
    chrome.runtime.sendMessage({
        type,
        data,
    });
}

export function sendMessageToTab(tabId, type, data) {
    chrome.tabs.sendMessage(tabId, {
        type,
        data,
    });
}

export function getLiveTab() {
    return new Promise(resolve => {
        chrome.tabCapture.getCapturedTabs(tabs => {
            resolve(tabs[0]);
        });
    });
}

export function download(data, name) {
    const blob = new Blob(Array.isArray(data) ? data : [data]);
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = name;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function addScript(url) {
    return new Promise(resolve => {
        const $script = document.createElement('script');
        $script.onload = () => {
            $script.remove();
            resolve();
        };
        $script.src = url;
        document.documentElement.appendChild($script);
    });
}

export function addStyle(url) {
    return new Promise(resolve => {
        const $style = document.createElement('link');
        $style.rel = 'stylesheet';
        $style.type = 'text/css';
        $style.onload = () => {
            resolve();
        };
        $style.href = url;
        document.head.appendChild($style);
    });
}
