import './index.scss';
import { getActiveTab, getStorage, setStorage } from '../../share';

class Popup {
    constructor() {
        this.manifest = chrome.runtime.getManifest();
        this.$container = document.querySelector('.container');
        this.$name = document.querySelector('.name');
        this.$feedback = document.querySelector('.feedback');
        this.$tab = document.querySelector('.tab');
        this.$rtmpUrl = document.querySelector('.rtmpUrl');
        this.$liveUrl = document.querySelector('.liveUrl');
        this.$resolution = document.querySelector('.resolution');
        this.$frameRate = document.querySelector('.frameRate');
        this.$bitsPerSecond = document.querySelector('.bitsPerSecond');
        this.$info = document.querySelector('.info');
        this.$start = document.querySelector('.start');
        this.$stop = document.querySelector('.stop');

        this.$name.addEventListener('click', () => {
            chrome.tabs.create({ url: 'https://chrome.google.com/webstore/detail/nagmkdppcmenlcgelpgkjoknakghllml' });
        });

        this.$feedback.addEventListener('click', () => {
            chrome.tabs.create({ url: 'https://github.com/zhw2590582/bilibili-live-hime' });
        });

        this.$start.addEventListener('click', () => {
            this.start();
        });
        this.$stop.addEventListener('click', () => {
            this.stop();
        });

        this.init();
    }

    async init() {
        this.live = await getStorage('live');
        this.config = await getStorage('config');
        this.activeTab = await getActiveTab();
        this.$tab.value = `${this.activeTab.title} - ${this.activeTab.url}`;
        this.$name.textContent = `${this.manifest.name} ${this.manifest.version}`;
        if (this.config) {
            this.$rtmpUrl.value = this.config.rtmpUrl;
            this.$liveUrl.value = this.config.liveUrl;
            this.$resolution.value = this.config.resolution;
            this.$frameRate.value = this.config.frameRate;
            this.$bitsPerSecond.value = this.config.bitsPerSecond;
            if (this.live) {
                this.$tab.value = this.config.tab;
            }
        }
        if (this.live) {
            this.$container.classList.add('live');
        }
    }

    async start() {
        const config = {
            id: this.activeTab.id,
            tab: this.$tab.value.trim(),
            rtmpUrl: this.$rtmpUrl.value.trim(),
            liveUrl: this.$liveUrl.value.trim(),
            resolution: this.$resolution.value.trim(),
            frameRate: this.$frameRate.value.trim(),
            bitsPerSecond: this.$bitsPerSecond.value.trim(),
        };

        if (!config.rtmpUrl || !config.rtmpUrl.startsWith(this.$rtmpUrl.placeholder)) {
            this.info = '请输入正确的 rtmp 推流地址';
            return;
        }

        if (!config.liveUrl || !config.liveUrl.startsWith(this.$liveUrl.placeholder)) {
            this.info = '请输入正确的 https 直播地址';
            return;
        }

        this.info = false;
        this.$container.classList.add('live');

        await setStorage('live', true);
        await setStorage('config', config);
        chrome.tabs.create({ url: config.liveUrl });
        chrome.runtime.sendMessage({
            type: 'start',
            data: config,
        });
    }

    async stop() {
        this.$container.classList.remove('live');
        await setStorage('live', false);
        chrome.runtime.sendMessage({
            type: 'stop',
        });
    }

    set info(msg) {
        if (msg) {
            this.$info.style.display = 'block';
            this.$info.textContent = msg;
        } else {
            this.$info.style.display = 'none';
            this.$info.textContent = '';
        }
    }
}

export default new Popup();
