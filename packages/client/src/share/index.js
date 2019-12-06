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

export const debug = {
    async log(msg) {
        const logs = (await getStorage('debug')) || [];
        logs.push({
            type: 'log',
            data: objToString(msg),
        });
        await setStorage('debug', logs);
    },
    async err(msg) {
        const logs = (await getStorage('debug')) || [];
        logs.push({
            type: 'error',
            data: objToString(msg),
        });
        await setStorage('debug', logs);
    },
    async clean() {
        await setStorage('debug', []);
    },
};

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
