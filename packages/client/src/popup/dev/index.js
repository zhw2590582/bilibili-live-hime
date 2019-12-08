import './index.scss';
import {
    debug,
    query,
    openTab,
    injected,
    getStorage,
    setStorage,
    sendMessage,
    getActiveTab,
    findTabById,
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
        this.$live = query('.live');
        this.$resolution = query('.resolution');
        this.$videoBitsPerSecond = query('.videoBitsPerSecond');
        this.$debug = query('.debug');
        this.$start = query('.start');
        this.$stop = query('.stop');

        this.init();
        this.bindEvent();
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
            openTab(`https://chrome.google.com/webstore/detail/${chrome.runtime.id}`);
        });

        this.$feedback.addEventListener('click', () => {
            openTab('https://github.com/zhw2590582/bilibili-live-hime');
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

        this.$live.addEventListener('input', () => {
            this.saveInput('live');
        });

        this.$resolution.addEventListener('change', () => {
            this.saveInput('resolution');
        });

        this.$videoBitsPerSecond.addEventListener('change', () => {
            this.saveInput('videoBitsPerSecond');
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

    async init() {
        const recording = await getStorage('recording');
        const config = (await getStorage('config')) || {};
        const activeTab = await findTabById(config.activeTab);
        if (config) {
            this.$rtmp.value = config.rtmp || 'rtmp://bvc.live-send.acg.tv/live-bvc/';
            this.$streamname.value = config.streamname || '';
            this.$socket.value = config.socket || 'http://localhost:8080';
            this.$live.value = config.live || '';
            this.$resolution.value = config.resolution || '1920';
            this.$videoBitsPerSecond.value = config.videoBitsPerSecond || '2500000';
        }
        if (!recording || !activeTab) {
            debug.clean();
            setStorage('recording', false);
        }
    }

    async updateDebug() {
        const logs = (await getStorage('debug')) || [];
        this.$debug.innerHTML = logs.map(item => `<p class="${item.type}">${item.data}</p>`).join('');
        this.$debug.scrollTo(0, this.$debug.scrollHeight);
    }

    async updateRecording() {
        const recording = await getStorage('recording');
        const config = (await getStorage('config')) || {};
        const activeTab = await findTabById(config.activeTab);
        if (recording && activeTab) {
            this.$container.classList.add('recording');
            this.$rtmp.disabled = true;
            this.$streamname.disabled = true;
            this.$socket.disabled = true;
            this.$live.disabled = true;
            this.$resolution.disabled = true;
            this.$videoBitsPerSecond.disabled = true;
        } else {
            this.$container.classList.remove('recording');
            this.$rtmp.disabled = false;
            this.$streamname.disabled = false;
            this.$socket.disabled = false;
            this.$live.disabled = false;
            this.$resolution.disabled = false;
            this.$videoBitsPerSecond.disabled = false;
        }
    }

    async start() {
        const activeTab = await getActiveTab();

        if (!activeTab) {
            await debug.err('未获取到当前激活的标签');
            return;
        }

        const config = {
            activeTab: activeTab.id,
            rtmp: this.$rtmp.value.trim(),
            streamname: this.$streamname.value.trim(),
            socket: this.$socket.value.trim(),
            live: this.$live.value.trim(),
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

        if (config.live) {
            if (!/^https?:\/\/live\.bilibili\.com/i.test(config.live)) {
                await debug.err('不是有效B站直播间地址');
                return;
            }
            const liveTab = await openTab(config.live, false);
            if (liveTab) {
                await debug.log('打开直播间页面成功，保持该页面打开既可以获取弹幕');
                config.liveTab = liveTab.id;
            }
        }

        await injected('content/index.js');
        await injected('content/index.css');
        await debug.log(`当前页面：${activeTab.title}`);
        await setStorage('recording', true);
        await setStorage('config', config);
        sendMessage('start', config);
    }

    async stop() {
        sendMessage('stop');
        setStorage('recording', false);
        await debug.log('已停止推流...');
    }
}

export default new Popup();
