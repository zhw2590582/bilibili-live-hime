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

export function openTab(url) {
    return new Promise(resolve => {
        chrome.tabs.query({}, function(tabs) {
            const findTab = tabs.find(tab => tab.url === url);
            if (findTab) {
                chrome.tabs.update(
                    findTab.id,
                    {
                        active: false,
                        url: url,
                    },
                    tab => {
                        resolve(tab);
                    },
                );
            } else {
                chrome.tabs.create({ url, active: false }, tab => {
                    resolve(tab);
                });
            }
        });
    });
}

export function openWindowTab(url) {
    return new Promise(resolve => {
        chrome.windows.create(
            {
                url,
                focused: true,
            },
            win => {
                resolve(win);
            },
        );
    });
}

export function activeTab(id) {
    return new Promise(resolve => {
        chrome.tabs.update(
            id,
            {
                active: true,
            },
            tab => {
                resolve(tab);
            },
        );
    });
}
