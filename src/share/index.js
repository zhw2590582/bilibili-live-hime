import objToString from 'obj-to-string';

export function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function query(el, doc = document) {
    return doc.querySelector(el);
}

export function download(url, name) {
    const elink = document.createElement('a');
    elink.style.display = 'none';
    elink.href = url;
    elink.download = name;
    document.body.appendChild(elink);
    elink.click();
    document.body.removeChild(elink);
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

export function storageChange(callback) {
    chrome.storage.onChanged.addListener(callback);
}

export function openTab(url, active = false) {
    return new Promise(resolve => {
        chrome.tabs.query({}, function(tabs) {
            const findTab = tabs.find(tab => tab.url === url);
            if (findTab) {
                chrome.tabs.update(
                    findTab.id,
                    {
                        active,
                        url: url,
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
