import './index.scss';
import {
    debug,
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
        this.$name.textContent = `${this.manifest.name} ${this.manifest.version}`;

        this.$rtmp = query('.rtmp');
        this.$streamname = query('.streamname');
        this.$socket = query('.socket');
        this.$resolution = query('.resolution');
        this.$videoBitsPerSecond = query('.videoBitsPerSecond');
        this.$debug = query('.debug');
        this.$start = query('.start');
        this.$stop = query('.stop');

        this.bindEvent();
        this.updateConfig();
        this.updateDebug();
        this.updateRecording();
        storageChange(changes => {
            if (changes.debug) {
                this.updateDebug();
            }
            if (changes.recording) {
                this.updateRecording();
            }
        });
    }

    async bindEvent() {
        this.$name.addEventListener('click', () => {
            openTab(`https://chrome.google.com/webstore/detail/${chrome.runtime.id}`, true);
        });

        this.$feedback.addEventListener('click', () => {
            openTab('https://github.com/zhw2590582/bilibili-live-hime', true);
        });

        this.$rtmp.addEventListener('input', () => {
            this.saveInput('rtmp');
        });

        this.$streamname.addEventListener('input', () => {
            this.saveInput('streamname');
        });

        this.$socket.addEventListener('input', () => {
            this.saveInput('socket');
        });

        this.$start.addEventListener('click', () => {
            this.start();
        });

        this.$stop.addEventListener('click', () => {
            this.stop();
        });
    }

    async saveInput(name) {
        const config = (await getStorage('config')) || {};
        config[name] = this[`$${name}`].value.trim();
        await setStorage('config', config);
    }

    async updateConfig() {
        const config = await getStorage('config');
        if (config) {
            this.$rtmp.value = config.rtmp || '';
            this.$streamname.value = config.streamname || '';
            this.$socket.value = config.socket || '';
            this.$resolution.value = config.resolution || '1920';
            this.$videoBitsPerSecond.value = config.videoBitsPerSecond || '2500000';
        }
    }

    async updateDebug() {
        const logs = (await getStorage('debug')) || [];
        this.$debug.innerHTML = logs.map(item => `<p class="${item.type}">${item.data}</p>`).join('');
        this.$debug.scrollTo(0, this.$debug.scrollHeight);
    }

    async updateRecording() {
        const recording = await getStorage('recording');
        if (recording) {
            this.$container.classList.add('recording');
            this.$rtmp.disabled = true;
            this.$streamname.disabled = true;
            this.$socket.disabled = true;
            this.$resolution.disabled = true;
            this.$videoBitsPerSecond.disabled = true;
        } else {
            await debug.clean();
            await debug.log('欢迎使用 Bilibili 直播姬');
        }
    }

    async start() {
        const activeTab = await getActiveTab();

        if (!activeTab) {
            await debug.err('未获取到当前激活的标签');
            return;
        }

        const config = {
            tab: activeTab.id,
            rtmp: this.$rtmp.value.trim(),
            streamname: this.$streamname.value.trim(),
            socket: this.$socket.value.trim(),
            resolution: Number(this.$resolution.value),
            videoBitsPerSecond: Number(this.$videoBitsPerSecond.value),
        };

        if (!config.rtmp || !/^rtmp:\/\/.+/i.test(config.rtmp)) {
            await debug.err('请输入正确的rtmp推流地址');
            return;
        }

        if (!config.streamname) {
            await debug.err('请输入正确的直播码');
            return;
        }

        if (!config.socket || !/^https?:\/\/.+/i.test(config.socket)) {
            await debug.err('请输入正确的中转地址');
            return;
        }

        await setStorage('recording', true);
        await setStorage('config', config);
        sendMessage('start', config);
    }

    async stop() {
        sendMessage('stop');
        await setStorage('recording', false);
        await setStorage('debug', []);
        await sleep(1000);
        chrome.runtime.reload();
        window.close();
    }
}

export default new Popup();
