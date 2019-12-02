class Test {
    constructor() {
        this.loading = false;
        this.running = false;
        this.fetchTasks = [];
    }

    recording(blobUrl) {
        this.loading = true;
        this.fetchTasks.push(this.fetchUrl.bind(this, blobUrl));
        if (!this.running) {
            (function loop() {
                const task = this.fetchTasks.shift();
                if (task && this.loading) {
                    this.running = true;
                    task().then(() => {
                        setTimeout(loop.bind(this), 0);
                    });
                } else {
                    this.running = false;
                }
            }.call(this));
        }
    }

    fetchUrl(blobUrl) {
        return new Promise(resolve => {
            return fetch(blobUrl)
                .then(res => res.arrayBuffer())
                .then(buf => {
                    URL.revokeObjectURL(blobUrl);
                    resolve(buf);
                    console.log(buf.byteLength);
                });
        });
    }
}

const test = new Test();
onmessage = event => {
    const { type, data } = event.data;
    switch (type) {
        case 'recording':
            test.recording(data);
            break;
        default:
            break;
    }
};
