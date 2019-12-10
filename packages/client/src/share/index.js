import ots from 'obj-to-string';
import { DEBUG, LOG, ERROR } from './constant';

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

export function setActiveTab(tabId) {
    return new Promise(resolve => {
        chrome.tabs.update(
            tabId,
            {
                active: true,
            },
            tab => {
                resolve(tab);
            },
        );
    });
}

export function getCapturedTab() {
    return new Promise(resolve => {
        chrome.tabCapture.getCapturedTabs(tabs => {
            resolve(tabs[0]);
        });
    });
}

export function findTabById(id) {
    return new Promise(resolve => {
        chrome.tabs.get(id, tab => {
            resolve(tab);
        });
    });
}

export const debug = {
    async log(msg) {
        const logs = (await getStorage(DEBUG)) || [];
        logs.push({
            type: LOG,
            data: ots(msg),
        });
        await setStorage(DEBUG, logs);
    },
    async err(msg) {
        const logs = (await getStorage(DEBUG)) || [];
        logs.push({
            type: ERROR,
            data: ots(msg),
        });
        await setStorage(DEBUG, logs);
    },
    async clean() {
        await setStorage(DEBUG, []);
    },
};

export function sendMessage(data) {
    chrome.runtime.sendMessage(data);
}

export function onMessage(callback) {
    chrome.runtime.onMessage.addListener(callback);
}

export function sendMessageToTab(tabId, data) {
    chrome.tabs.sendMessage(tabId, data);
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

export function injectedScript(file) {
    return new Promise(resolve => {
        chrome.tabs.executeScript(
            {
                file,
            },
            () => {
                resolve();
            },
        );
    });
}

export function runScript(code) {
    return new Promise(resolve => {
        chrome.tabs.executeScript(
            {
                code,
            },
            () => {
                resolve();
            },
        );
    });
}

export function insertCSS(file) {
    return new Promise(resolve => {
        chrome.tabs.insertCSS(
            {
                file,
            },
            () => {
                resolve();
            },
        );
    });
}

export function runCss(code) {
    return new Promise(resolve => {
        chrome.tabs.insertCSS(
            {
                code,
            },
            () => {
                resolve();
            },
        );
    });
}
