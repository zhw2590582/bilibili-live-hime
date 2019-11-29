export default class Storage {
    get(key, defaultValue) {
        return new Promise(resolve => {
            chrome.storage.local.get([key], result => {
                if (result[key]) {
                    resolve(result[key]);
                } else if (defaultValue) {
                    this.set(key, defaultValue).then(value => {
                        resolve(value);
                    });
                } else {
                    resolve();
                }
            });
        });
    }

    set(key, value) {
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
}
