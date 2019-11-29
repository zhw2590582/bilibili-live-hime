function mergeBuffer(...buffers) {
    const Cons = buffers[0].constructor;
    return buffers.reduce((pre, val) => {
        const merge = new Cons((pre.byteLength | 0) + (val.byteLength | 0));
        merge.set(pre, 0);
        merge.set(val, pre.byteLength | 0);
        return merge;
    }, new Cons());
}

function readBufferSum(array, uint = true) {
    return array.reduce((totle, num, index) => totle + (uint ? num : num - 128) * 256 ** (array.length - index - 1), 0);
}

function getTagTime(tag) {
    const ts2 = tag[4];
    const ts1 = tag[5];
    const ts0 = tag[6];
    const ts3 = tag[7];
    return ts0 | (ts1 << 8) | (ts2 << 16) | (ts3 << 24);
}

function durationToTime(duration) {
    const m = String(Math.floor(duration / 60)).slice(-5);
    const s = String(duration % 60);
    return `${m.length === 1 ? `0${m}` : m}:${s.length === 1 ? `0${s}` : s}`;
}

class Flv {
    constructor() {
        this.index = 0;
        this.tasks = [];
        this.timer = null;
        this.loading = false;
        this.running = false;
        this.tagLength = 0;
        this.tagStartTime = 0;
        this.resultDuration = 0;
        this.data = new Uint8Array();
        this.header = new Uint8Array();
        this.scripTag = new Uint8Array();
        this.videoAndAudioTags = [];

        (function loop() {
            this.timer = setTimeout(() => {
                if (this.running && this.loading) {
                    this.report();
                }
                loop.call(this);
            }, 1000);
        }.call(this));
    }

    get resultData() {
        const resultSize = this.resultSize;
        const buffers = [this.header, this.scripTag, ...this.videoAndAudioTags];
        const result = [new Uint8Array()];

        for (let i = 0; i < buffers.length; i += 1) {
            const item = buffers[i];
            const last = result[result.length - 1];

            try {
                result[result.length - 1] = mergeBuffer(last, item);
            } catch (error) {
                result[result.length] = item;
            }

            const mergeSize = result.reduce((pre, val) => {
                return pre + val.byteLength;
            }, 0);

            postMessage({
                type: 'merging',
                data: `${Math.floor((mergeSize / resultSize || 0) * 100)}%`,
            });
        }

        return result;
    }

    get resultSize() {
        return (
            this.header.byteLength +
            this.scripTag.byteLength +
            this.videoAndAudioTags.reduce((result, item) => {
                return result + item.byteLength;
            }, 0)
        );
    }

    report() {
        postMessage({
            type: 'report',
            data: {
                duration: durationToTime(Math.floor(this.resultDuration / 1000)),
                size: `${(this.resultSize / 1024 / 1024).toFixed(2).slice(-8)}M`,
            },
        });
    }

    readable(length) {
        return this.data.length - this.index >= length;
    }

    read(length) {
        const end = this.index + length;
        const uint8 = this.data.subarray(this.index, end);
        this.index = end;
        return uint8;
    }

    load(uint8) {
        this.loading = true;
        this.tasks.push(this.demuxer.bind(this, uint8));
        if (!this.running) {
            (function loop() {
                const task = this.tasks.shift();
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

    demuxer(uint8) {
        return new Promise((resolve, reject) => {
            if (!this.loading) {
                resolve();
                return;
            }

            this.data = mergeBuffer(this.data, uint8);

            if (!this.header.length && this.readable(13)) {
                this.header = this.read(13);
            }

            while (this.index < this.data.length) {
                let tagSize = 0;
                let tagType = 0;
                let tagData = new Uint8Array();
                const restIndex = this.index;

                if (this.readable(11)) {
                    tagData = mergeBuffer(tagData, this.read(11));
                    tagType = tagData[0];
                    tagSize = readBufferSum(tagData.subarray(1, 4));
                } else {
                    this.index = restIndex;
                    resolve();
                    return;
                }

                if (this.readable(tagSize + 4)) {
                    tagData = mergeBuffer(tagData, this.read(tagSize));
                    const prevTag = this.read(4);
                    tagData = mergeBuffer(tagData, prevTag);
                    const prevTagSize = readBufferSum(prevTag);
                    if (prevTagSize !== tagSize + 11) {
                        this.stop();
                        const msg = `Bilibili 录播姬: 视频流发生变化，已自动停止录制`;
                        postMessage({
                            type: 'error',
                            data: msg,
                        });
                        reject(new Error(msg));
                        return;
                    }
                } else {
                    this.index = restIndex;
                    resolve();
                    return;
                }

                this.tagLength += 1;
                if (tagType === 18) {
                    this.scripTag = tagData;
                } else {
                    const tagTime = getTagTime(tagData);
                    if (!this.tagStartTime) {
                        this.tagStartTime = tagTime;
                    }
                    const tagDuration = tagTime - this.tagStartTime;
                    if (this.tagLength <= 10 && tagDuration - this.resultDuration >= 1000) {
                        this.tagStartTime = tagTime;
                    }
                    this.resultDuration = tagTime - this.tagStartTime;
                    const lastTagData = this.videoAndAudioTags[this.videoAndAudioTags.length - 1];
                    if (lastTagData) {
                        if (lastTagData.byteLength >= 10 * 1024 * 1024) {
                            this.videoAndAudioTags.push(tagData);
                        } else {
                            this.videoAndAudioTags[this.videoAndAudioTags.length - 1] = mergeBuffer(
                                lastTagData,
                                tagData,
                            );
                        }
                    } else {
                        this.videoAndAudioTags.push(tagData);
                    }
                }

                this.data = this.data.subarray(this.index);
                this.index = 0;
            }
            resolve();
        });
    }

    stop() {
        this.loading = false;
        clearTimeout(this.timer);
        this.report();
    }

    download() {
        postMessage({
            type: 'download',
            data: URL.createObjectURL(new Blob(this.resultData)),
        });
    }
}

const flv = new Flv();
onmessage = event => {
    const { type, data } = event.data;
    switch (type) {
        case 'load':
            flv.load(data);
            break;
        case 'stop':
            flv.stop();
            break;
        case 'download':
            flv.download();
            break;
        default:
            break;
    }
};
