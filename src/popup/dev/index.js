import './index.scss';
import {
    log,
    sleep,
    query,
    openTab,
    getStorage,
    setStorage,
    sendMessage,
    getActiveTab,
    storageChange,
} from '../../share';

class Popup {
    constructor() {
        this.manifest = chrome.runtime.getManifest();
        this.$container = query('.container');
        this.$name = query('.name');
        this.$feedback = query('.feedback');
        this.$rtmpUrl = query('.rtmpUrl');
        this.$liveUrl = query('.liveUrl');
        this.$resolution = query('.resolution');
        this.$debug = query('.debug');
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
        this.updateLog();
        storageChange(() => {
            this.updateLog();
        });
    }

    async init() {
        this.recording = await getStorage('recording');
        this.config = await getStorage('config');
        this.debug = await getStorage('debug');
        this.activeTab = await getActiveTab();
        this.$name.textContent = `${this.manifest.name} ${this.manifest.version}`;

        if (this.config) {
            this.$rtmpUrl.value = this.config.rtmpUrl;
            this.$liveUrl.value = this.config.liveUrl;
            this.$resolution.value = this.config.resolution;
        }

        if (this.recording) {
            this.$container.classList.add('recording');
            this.$rtmpUrl.disabled = true;
            this.$liveUrl.disabled = true;
            this.$resolution.disabled = true;
        } else {
            await setStorage('debug', '');
        }
    }

    async start() {
        const config = {
            recordId: this.activeTab.id,
            rtmpUrl: this.$rtmpUrl.value.trim(),
            liveUrl: this.$liveUrl.value.trim(),
            resolution: this.$resolution.value,
        };

        if (!config.rtmpUrl || !config.rtmpUrl.startsWith(this.$rtmpUrl.placeholder)) {
            return await log('请输入正确的 rtmp 推流地址');
        }

        if (!config.liveUrl || !config.liveUrl.startsWith(this.$liveUrl.placeholder)) {
            return await log('请输入正确的 https 直播地址');
        }

        this.$container.classList.add('recording');
        this.$rtmpUrl.disabled = true;
        this.$liveUrl.disabled = true;
        this.$resolution.disabled = true;
        await setStorage('recording', true);
        await setStorage('config', config);
        const liveTab = await openTab(config.liveUrl);
        config.config = liveTab.id;
        await log('已打开直播间：' + config.liveUrl);
        await sendMessage('start', config);
        await log('请保持当前页面激活状态，否则无法推流');
        await log(config);
    }

    async stop() {
        this.$container.classList.remove('recording');
        await setStorage('recording', false);
        await setStorage('debug', '');
        this.$debug.innerHTML = '';
        await sendMessage('stop');
        await log('正在关闭推流...');
        await sleep(1000);
        window.close();
    }

    async updateLog() {
        const logs = (await getStorage('debug')) || [];
        this.$debug.innerHTML = logs.map(item => `<p>${item}</p>`).join('');
        this.$debug.scrollTo(0, this.$debug.scrollHeight);
    }
}

export default new Popup();
