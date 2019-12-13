import './index.scss';
import {
    sleep,
    debug,
    query,
    runCss,
    openTab,
    runScript,
    insertCSS,
    getStorage,
    setStorage,
    sendMessage,
    getActiveTab,
    storageChange,
    injectedScript,
    getCapturedTab,
    sendMessageToTab,
} from '../../share';
import {
    STOP,
    START,
    DEBUG,
    CONFIG,
    REG_RTMP,
    REG_HTTP,
    REG_LIVE,
    RECORDING,
    RTMP_ERROR,
    DANMU_OPTION,
    DEFAULT_RTMP,
    SOCKET_ERROR,
    OPEN_SUCCESS,
    CURRENT_PAGE,
    DEFAULT_SOCKET,
    PUSH_STREAM_END,
    LIVE_ROOM_ERROR,
    INJECTED_SUCCESS,
    CAN_NOT_FIND_TAB,
    STREAM_NAME_ERROR,
    DEFAULT_RESOLUTION,
    DEFAULT_VIDEO_BITSPER,
} from '../../share/constant';

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
            if (changes[DEBUG]) {
                this.updateDebug();
            }
            if (changes[RECORDING]) {
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

        this.$container.addEventListener('dragover', event => {
            event.preventDefault();
        });

        this.$container.addEventListener('drop', async event => {
            event.preventDefault();
            const files = Array.from(event.dataTransfer.files);
            await debug.log(INJECTED_SUCCESS + files.map(f => f.name).join(','));
            files.forEach(file => {
                const reader = new FileReader();
                reader.addEventListener('load', () => {
                    const code = reader.result;
                    switch (file.type) {
                        case 'text/javascript':
                            runScript(code);
                            break;
                        case 'text/css':
                            runCss(code);
                            break;
                        default:
                            break;
                    }
                });
                reader.readAsText(file);
            });
        });
    }

    async saveInput(name) {
        const config = (await getStorage(CONFIG)) || {};
        config[name] = this[`$${name}`].value.trim();
        await setStorage(CONFIG, config);
    }

    async init() {
        const recording = await getStorage(RECORDING);
        const config = (await getStorage(CONFIG)) || {};
        const danmu_option = await getStorage(DANMU_OPTION);
        const capturedTab = await getCapturedTab();

        if (config) {
            this.$rtmp.value = config.rtmp || DEFAULT_RTMP;
            this.$streamname.value = config.streamname || '';
            this.$socket.value = config.socket || DEFAULT_SOCKET;
            this.$live.value = config.live || '';
            this.$resolution.value = config.resolution || DEFAULT_RESOLUTION;
            this.$videoBitsPerSecond.value = config.videoBitsPerSecond || DEFAULT_VIDEO_BITSPER;
        }

        if (recording && capturedTab && danmu_option && config.activeTab) {
            await injectedScript(config.activeTab, 'active/index.js');
            await insertCSS(config.activeTab, 'active/index.css');
            await sleep(100);
            sendMessageToTab(config.activeTab, danmu_option);
        } else {
            debug.clean();
            setStorage(RECORDING, false);
            sendMessage({
                type: STOP,
            });
        }
    }

    async updateDebug() {
        const logs = (await getStorage(DEBUG)) || [];
        this.$debug.innerHTML = logs.map(item => `<p class="${item.type}">${item.data}</p>`).join('');
        this.$debug.scrollTo(0, this.$debug.scrollHeight);
    }

    async updateRecording() {
        const recording = await getStorage(RECORDING);
        const capturedTab = await getCapturedTab();
        if (recording && capturedTab) {
            this.$container.classList.add(RECORDING);
            this.$rtmp.disabled = true;
            this.$streamname.disabled = true;
            this.$socket.disabled = true;
            this.$live.disabled = true;
            this.$resolution.disabled = true;
            this.$videoBitsPerSecond.disabled = true;
        } else {
            this.$container.classList.remove(RECORDING);
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
            await debug.err(CAN_NOT_FIND_TAB);
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

        if (!config.rtmp || !REG_RTMP.test(config.rtmp)) {
            await debug.err(RTMP_ERROR);
            return;
        }

        if (!config.streamname) {
            await debug.err(STREAM_NAME_ERROR);
            return;
        }

        if (!config.socket || !REG_HTTP.test(config.socket)) {
            await debug.err(SOCKET_ERROR);
            return;
        }

        if (REG_LIVE.test(config.live)) {
            await injectedScript(config.activeTab, 'active/index.js');
            await insertCSS(config.activeTab, 'active/index.css');
            await sleep(100);
            const liveTab = await openTab(config.live, false);
            config.liveTab = liveTab.id;
            await debug.log(OPEN_SUCCESS);
            await injectedScript(config.liveTab, 'danmu/index.js');
        } else {
            await debug.err(LIVE_ROOM_ERROR);
        }

        await debug.log(`${CURRENT_PAGE}：${activeTab.title}`);
        await setStorage(RECORDING, true);
        await setStorage(CONFIG, config);
        sendMessage({
            type: START,
            data: config,
        });
    }

    async stop() {
        sendMessage({
            type: STOP,
        });
        setStorage(RECORDING, false);
        setStorage(DANMU_OPTION, false);
        await debug.log(PUSH_STREAM_END);
    }
}

export default new Popup();
