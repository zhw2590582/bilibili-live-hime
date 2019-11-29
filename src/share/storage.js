export default class Storage {
    constructor(name, isLocal = true) {
        this.name = name;
        this.storage = isLocal ? localStorage : sessionStorage;
    }

    get(key) {
        const storage = JSON.parse(this.storage.getItem(this.name)) || {};
        return key ? storage[key] : storage;
    }

    set(key, value) {
        const storage = { ...this.get(), [key]: value };
        this.storage.setItem(this.name, JSON.stringify(storage));
    }

    del(key) {
        const storage = this.get();
        delete storage[key];
        this.storage.setItem(this.name, JSON.stringify(storage));
    }

    clean() {
        this.storage.removeItem(this.name);
    }
}
