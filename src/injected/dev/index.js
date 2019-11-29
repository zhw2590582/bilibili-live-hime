import './index.scss';
import { sleep, download } from '../../share';
import Storage from '../../share/storage';

class Injected {
    constructor() {
        this.name = 'bilibili-live-recorder';
        this.storage = new Storage(this.name);
        this.worker = new Worker('./worker.js');
        this.loading = false;

        this.worker.onmessage = event => {
            const { type, data } = event.data;
            switch (type) {
                case 'report':
                    if (this.$container) {
                        this.$duration.textContent = data.duration;
                        this.$size.textContent = data.size;
                    }
                    break;
                case 'download':
                    download(data, `${document.title}.flv`);
                    this.changeState('before-record');
                    this.worker.terminate();
                    this.$duration.textContent = '00:00';
                    this.$size.textContent = '0.00M';
                    this.$wait.textContent = '0%';
                    break;
                case 'merging':
                    this.$wait.textContent = data;
                    break;
                case 'error':
                    this.loading = false;
                    this.changeState('after-record');
                    break;
                default:
                    break;
            }
        };

        if (this.storage.get(location.href)) {
            this.storage.del(location.href);
            this.loading = true;
            this.intercept();
        }

        sleep(1000).then(() => {
            this.createUI();
            this.analysis();
        });
    }

    createUI() {
        if (!document.body) {
            return sleep(100).then(() => {
                return this.createUI();
            });
        }

        this.$container = document.createElement('div');
        this.$container.classList.add(this.name);
        this.$container.innerHTML = `
            <div class="blr-states">
                <div class="blr-state blr-state-before-record blr-active">开始</div>
                <div class="blr-state blr-state-recording">停止</div>
                <div class="blr-state blr-state-after-record">下载</div>
                <div class="blr-state blr-state-wait">0%</div>
            </div>
            <div class="blr-monitors">
                <div class="blr-monitor blr-monitor-top">
                    <div class="blr-monitor-name">时长：</div>
                    <div class="blr-monitor-value blr-duration">00:00</div>
                </div>
                <div class="blr-monitor blr-monitor-bottom">
                    <div class="blr-monitor-name">大小：</div>
                    <div class="blr-monitor-value blr-size">0.00M</div>
                </div>
            </div>
        `;
        this.$states = Array.from(this.$container.querySelectorAll('.blr-state'));
        this.$beforeRecord = this.$container.querySelector('.blr-state-before-record');
        this.$recording = this.$container.querySelector('.blr-state-recording');
        this.$afterRecord = this.$container.querySelector('.blr-state-after-record');
        this.$wait = this.$container.querySelector('.blr-state-wait');
        this.$duration = this.$container.querySelector('.blr-duration');
        this.$size = this.$container.querySelector('.blr-size');
        this.$monitor = this.$container.querySelector('.blr-monitor');

        if (this.loading) {
            this.changeState('recording');
        } else if (location.href.includes('blr')) {
            this.storage.clean();
            this.$container.classList.add('blr-focus');
            sleep(10000).then(() => {
                this.$container.classList.remove('blr-focus');
            });
        }

        const x = this.storage.get('x');
        const y = this.storage.get('y');
        if (x && y) {
            this.$container.style.left = `${x}px`;
            this.$container.style.top = `${y}px`;
        }

        document.body.appendChild(this.$container);
        this.bindEvent();
    }

    changeState(state) {
        this.$states.forEach(item => {
            if (item.classList.contains(`blr-state-${state}`)) {
                item.classList.add('blr-active');
            } else {
                item.classList.remove('blr-active');
            }
        });
    }

    bindEvent() {
        this.$beforeRecord.addEventListener('click', () => {
            const $video = document.querySelector('video');
            if ($video) {
                this.storage.set(location.href, Date.now());
                location.reload();
            }
        });

        this.$recording.addEventListener('click', () => {
            this.loading = false;
            this.changeState('after-record');
            this.worker.postMessage({
                type: 'stop',
            });
        });

        this.$afterRecord.addEventListener('click', () => {
            this.loading = false;
            this.changeState('wait');
            this.worker.postMessage({
                type: 'download',
            });
        });

        let isDroging = false;
        let lastPageX = 0;
        let lastPageY = 0;
        let lastPlayerLeft = 0;
        let lastPlayerTop = 0;

        this.$monitor.addEventListener('mousedown', () => {
            isDroging = true;
            lastPageX = event.pageX;
            lastPageY = event.pageY;
            lastPlayerLeft = this.$container.offsetLeft;
            lastPlayerTop = this.$container.offsetTop;
        });

        document.addEventListener('mousemove', event => {
            if (isDroging) {
                const x = event.pageX - lastPageX;
                const y = event.pageY - lastPageY;
                this.$container.style.transform = `translate(${x}px, ${y}px)`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDroging) {
                isDroging = false;
                this.$container.style.transform = 'translate(0, 0)';
                const x = lastPlayerLeft + event.pageX - lastPageX;
                const y = lastPlayerTop + event.pageY - lastPageY;
                this.$container.style.left = `${x}px`;
                this.$container.style.top = `${y}px`;
                this.storage.set('x', x);
                this.storage.set('y', y);
            }
        });
    }

    intercept() {
        const that = this;
        const { read } = ReadableStreamDefaultReader.prototype;
        ReadableStreamDefaultReader.prototype.read = function() {
            const promiseResult = read.call(this);
            promiseResult.then(({ done, value }) => {
                if (done || !that.loading) return;
                that.worker.postMessage({
                    type: 'load',
                    data: value,
                });
            });
            return promiseResult;
        };

        const B = window.Blob;
        window.Blob = function(array, options) {
            let data = array[0];
            if (options && options.type === 'text/javascript') {
                data = `var read=ReadableStreamDefaultReader.prototype.read;ReadableStreamDefaultReader.prototype.read=function(){var e=read.call(this);return e.then(function(e){postMessage({type:"blr-load",data:e})}),e};\n${data}`;
            }
            return new B([data], options);
        };

        const W = window.Worker;
        window.Worker = function(...args) {
            if (args[0].slice(0, 5) === 'data:') return;
            const worker = new W(...args);
            worker.onmessage = event => {
                const { type, data } = event.data;
                switch (type) {
                    case 'blr-load':
                        if (data.done || !that.loading) return;
                        that.worker.postMessage({
                            type: 'load',
                            data: data.value,
                        });
                        break;
                    default:
                        break;
                }
            };
            return worker;
        };
    }

    analysis() {
        window._hmt = window._hmt || [];
        const hm = document.createElement('script');
        hm.src = 'https://hm.baidu.com/hm.js?3c93ca28120f48d2a27889d0623cd7b7';
        const s = document.getElementsByTagName('script')[0];
        s.parentNode.insertBefore(hm, s);
    }
}

export default new Injected();
