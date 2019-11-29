export default class Storage {
    constructor(name) {
        this.name = name;
    }

    get(key) {
        const storage = JSON.parse(localStorage.getItem(this.name)) || {};
        return key ? storage[key] : storage;
    }

    set(key, value) {
        const storage = { ...this.get(), [key]: value };
        localStorage.setItem(this.name, JSON.stringify(storage));
    }

    del(key) {
        const storage = this.get();
        delete storage[key];
        localStorage.setItem(this.name, JSON.stringify(storage));
    }

    clean() {
        localStorage.removeItem(this.name);
    }
}
