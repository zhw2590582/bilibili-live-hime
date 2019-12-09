import './index.scss';
import {
    debug,
    query,
    openTab,
    injected,
    getStorage,
    setStorage,
    sendMessage,
    findTabById,
    getActiveTab,
    storageChange,
} from '../../share';
import {
    BLH,
    STOP,
    START,
    DEBUG,
    CONFIG,
    REG_RTMP,
    REG_HTTP,
    REG_LIVE,
    RECORDING,
    RTMP_ERROR,
    DEFAULT_RTMP,
    SOCKET_ERROR,
    OPEN_SUCCESS,
    CURRENT_PAGE,
    DEFAULT_SOCKET,
    DEFAULT_BITSPER,
    PUSH_STREAM_END,
    LIVE_ROOM_ERROR,
    CAN_NOT_FIND_TAB,
    STREAM_NAME_ERROR,
    DEFAULT_RESOLUTION,
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
    }

    async saveInput(name) {
        const config = (await getStorage(CONFIG)) || {};
        config[name] = this[`$${name}`].value.trim();
        await setStorage(CONFIG, config);
    }

    async init() {
        const recording = await getStorage(RECORDING);
        const config = (await getStorage(CONFIG)) || {};
        const activeTab = await findTabById(config.activeTab);
        if (config) {
            this.$rtmp.value = config.rtmp || DEFAULT_RTMP;
            this.$streamname.value = config.streamname || '';
            this.$socket.value = config.socket || DEFAULT_SOCKET;
            this.$live.value = config.live || '';
            this.$resolution.value = config.resolution || DEFAULT_RESOLUTION;
            this.$videoBitsPerSecond.value = config.videoBitsPerSecond || DEFAULT_BITSPER;
        }
        if (!recording || !activeTab) {
            debug.clean();
            setStorage(RECORDING, false);
        }
    }

    async updateDebug() {
        const logs = (await getStorage(DEBUG)) || [];
        this.$debug.innerHTML = logs.map(item => `<p class="${item.type}">${item.data}</p>`).join('');
        this.$debug.scrollTo(0, this.$debug.scrollHeight);
    }

    async updateRecording() {
        const recording = await getStorage(RECORDING);
        const config = (await getStorage(CONFIG)) || {};
        const activeTab = await findTabById(config.activeTab);
        if (recording && activeTab) {
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

        if (config.live) {
            if (!REG_LIVE.test(config.live)) {
                await debug.err(LIVE_ROOM_ERROR);
                return;
            }
            const url = new URL(config.live);
            url.searchParams.append(BLH, 1);
            const liveTab = await openTab(url.href, false);
            if (liveTab) {
                await debug.log(OPEN_SUCCESS);
                config.liveTab = liveTab.id;
                await injected('content/index.js');
                await injected('content/index.css');
            }
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
        await debug.log(PUSH_STREAM_END);
    }
}

export default new Popup();
