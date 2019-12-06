import ots from 'obj-to-string';

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

export function has(result, key) {
    return Object.prototype.hasOwnProperty.call(result, key);
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
            if (has(result, key)) {
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

export function openTab(url, active = true) {
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

export function findTabById(id = 0) {
    return new Promise(resolve => {
        chrome.tabs.get(id, tab => {
            resolve(tab);
        });
    });
}

export const debug = {
    async log(msg) {
        const logs = (await getStorage('debug')) || [];
        logs.push({
            type: 'log',
            data: ots(msg),
        });
        await setStorage('debug', logs);
    },
    async err(msg) {
        const logs = (await getStorage('debug')) || [];
        logs.push({
            type: 'error',
            data: ots(msg),
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

export function onMessage(callback) {
    chrome.runtime.onMessage.addListener(callback);
}

export function setBadge(text = '', color = 'red') {
    return new Promise(resolve => {
        chrome.browserAction.setBadgeBackgroundColor(
            {
                color,
            },
            () => {
                chrome.browserAction.setBadgeText(
                    {
                        text,
                    },
                    () => {
                        resolve();
                    },
                );
            },
        );
    });
}
