import './index.scss';
import {
    debug,
    query,
    sleep,
    openTab,
    onMessage,
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

        this.$start.addEventListener('click', () => {
            this.start();
        });

        this.$stop.addEventListener('click', async () => {
            await this.stop();
            await this.close();
        });

        onMessage(request => {
            const { type } = request;
            switch (type) {
                case 'close':
                    this.close();
                    break;
                default:
                    break;
            }
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
            this.$rtmp.value = config.rtmp || 'rtmp://bvc.live-send.acg.tv/live-bvc/';
            this.$streamname.value = config.streamname || '';
            this.$socket.value = config.socket || 'http://localhost:8080';
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
        const config = await getStorage('config');
        if (recording && config) {
            const tab = await findTabById(config.tab);
            if (tab) {
                this.$container.classList.add('recording');
                this.$rtmp.disabled = true;
                this.$streamname.disabled = true;
                this.$socket.disabled = true;
                this.$resolution.disabled = true;
                this.$videoBitsPerSecond.disabled = true;
            } else {
                await this.stop();
                await this.close();
            }
        } else {
            await debug.clean();
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
    }

    async close() {
        await debug.log('正在关闭连接...');
        await sleep(1000);
        await setStorage('recording', false);
        await debug.clean();
        chrome.runtime.reload();
        window.close();
    }
}

export default new Popup();
