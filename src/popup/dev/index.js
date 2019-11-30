import './index.scss';
import { getActiveTab, getStorage, setStorage, query, openTab } from '../../share';

class Popup {
    constructor() {
        this.manifest = chrome.runtime.getManifest();
        this.$container = query('.container');
        this.$name = query('.name');
        this.$feedback = query('.feedback');
        this.$tab = query('.tab');
        this.$rtmpUrl = query('.rtmpUrl');
        this.$liveUrl = query('.liveUrl');
        this.$resolution = query('.resolution');
        this.$frameRate = query('.frameRate');
        this.$bitsPerSecond = query('.bitsPerSecond');
        this.$info = query('.info');
        this.$start = query('.start');
        this.$stop = query('.stop');

        this.$name.addEventListener('click', () => {
            openTab('https://chrome.google.com/webstore/detail/' + chrome.runtime.id);
        });

        this.$feedback.addEventListener('click', () => {
            openTab('https://github.com/zhw2590582/bilibili-live-hime');
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
        this.isRecording = await getStorage('isRecording');
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
            if (this.isRecording) {
                this.$tab.value = this.config.tab;
            }
        }
        if (this.isRecording) {
            this.$container.classList.add('isRecording');
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
        this.$container.classList.add('isRecording');

        await setStorage('isRecording', true);
        await setStorage('config', config);
        await openTab(config.liveUrl);
        chrome.runtime.sendMessage({
            type: 'start',
            data: config,
        });
    }

    async stop() {
        this.$container.classList.remove('isRecording');
        await setStorage('isRecording', false);
        chrome.runtime.sendMessage({
            type: 'stop',
        });
        window.close();
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
