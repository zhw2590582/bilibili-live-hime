import 'crx-hotreload';
import io from 'socket.io-client/dist/socket.io';
import {
    sleep,
    debug,
    setBadge,
    onMessage,
    setStorage,
    getStorage,
    storageChange,
    sendMessageToTab,
} from '../../share';
import {
    LOG,
    FAIL,
    RTMP,
    STOP,
    GIFT,
    START,
    DANMU,
    GUARD,
    MIME_TYPE,
    RECORDING,
    RECONNECT,
    SOCKET_FAIL,
    BINARY_STREAM,
    RECORDER_FAIL,
    RECONNECT_TIME,
    SOCKET_SUCCESS,
    RECONNECT_INFO,
    PUSH_STREAM_ING,
    RECORDER_SUCCESS,
    STREAM_DISCONNECT,
    DEFAULT_RESOLUTION,
    TAB_VIDEO_STREAM_FAIL,
    DEFAULT_VIDEO_BITSPER,
    DEFAULT_AUDIO_BITSPER,
    TAB_VIDEO_STREAM_SUCCESS,
} from '../../share/constant';

class Background {
    constructor() {
        this.stream = null;
        this.socket = null;
        this.reconnect = 0;
        this.mediaRecorder = null;
        this.config = Background.Config;

        onMessage((request, sender) => {
            const { type, data } = request;
            switch (type) {
                case START:
                    this.config = {
                        ...Background.Config,
                        ...data,
                    };
                    this.start();
                    break;
                case STOP:
                    this.stop();
                    break;
                case DANMU:
                case GIFT:
                case GUARD:
                    if (this.config && sender) {
                        const { activeTab, liveTab } = this.config;
                        const { tab } = sender;
                        if (activeTab && liveTab && tab && liveTab === tab.id) {
                            sendMessageToTab(activeTab, request);
                        }
                    }
                    break;
                default:
                    break;
            }
        });

        storageChange(async changes => {
            if (changes[RECORDING]) {
                if (changes[RECORDING].newValue) {
                    setBadge('ON');
                } else {
                    setBadge('');
                }
            }
        });
    }

    static get Config() {
        return {
            rtmp: '',
            socket: '',
            liveTab: null,
            streamname: '',
            activeTab: null,
            resolution: DEFAULT_RESOLUTION,
            videoBitsPerSecond: DEFAULT_VIDEO_BITSPER,
        };
    }

    static get CaptureOptions() {
        return {
            audio: true,
            video: true,
            videoConstraints: {
                mandatory: {
                    chromeMediaSource: 'tab',
                    maxWidth: 1280,
                    minWidth: 1280,
                    maxHeight: 720,
                    minHeight: 720,
                },
            },
            audioConstraints: {
                mandatory: {
                    echoCancellation: true,
                },
            },
        };
    }

    static get RecorderOptions() {
        return {
            audioBitsPerSecond: DEFAULT_AUDIO_BITSPER,
            videoBitsPerSecond: DEFAULT_VIDEO_BITSPER,
            mimeType: MIME_TYPE,
        };
    }

    static get Resolution() {
        return {
            1920: {
                width: 1920,
                height: 1080,
            },
            720: {
                width: 1280,
                height: 720,
            },
            480: {
                width: 640,
                height: 480,
            },
            360: {
                width: 640,
                height: 360,
            },
            240: {
                width: 320,
                height: 240,
            },
        };
    }

    connectSocket(url) {
        return new Promise((revolve, reject) => {
            const socket = io(url);

            socket.on('connect_error', error => {
                reject(error);
            });

            socket.on('connect', () => {
                revolve(socket);
            });
        });
    }

    tabCapture(res) {
        return new Promise((revolve, reject) => {
            const captureOptions = Background.CaptureOptions;
            const resolution = Background.Resolution[res];
            captureOptions.videoConstraints.mandatory.maxWidth = resolution.width;
            captureOptions.videoConstraints.mandatory.minWidth = resolution.width;
            captureOptions.videoConstraints.mandatory.maxHeight = resolution.height;
            captureOptions.videoConstraints.mandatory.minHeight = resolution.height;
            chrome.tabCapture.capture(captureOptions, stream => {
                if (stream) {
                    revolve(stream);
                } else {
                    reject();
                }
            });
        });
    }

    recorder(stream, videoBitsPerSecond) {
        return new Promise((revolve, reject) => {
            const recorderOptions = Background.RecorderOptions;
            recorderOptions.videoBitsPerSecond = videoBitsPerSecond;
            if (MediaRecorder && MediaRecorder.isTypeSupported(recorderOptions.mimeType)) {
                const mediaRecorder = new MediaRecorder(stream, recorderOptions);
                revolve(mediaRecorder);
            } else {
                reject();
            }
        });
    }

    async start() {
        const { socket, rtmp, streamname, resolution, videoBitsPerSecond } = this.config;

        try {
            const rtmpFullUrl = rtmp + streamname;
            this.socket = await this.connectSocket(socket);
            await debug.log(SOCKET_SUCCESS);
            // 告知服务器命令：开启ffmpeg进程
            this.socket.emit(RTMP, rtmpFullUrl);
            // 来自服务器命令：打印
            this.socket.on(LOG, async info => {
                await debug.log(info);
            });
            // 来自服务器命令：重连
            this.socket.on(RECONNECT, async info => {
                await debug.err(info);
                const recording1 = await getStorage(RECORDING);
                if (this.reconnect >= RECONNECT_TIME || !recording1) {
                    await this.stop();
                } else {
                    await sleep(1000);
                    const recording2 = await getStorage(RECORDING);
                    if (recording2) {
                        this.reconnect += 1;
                        await debug.log(RECONNECT_INFO + this.reconnect);
                        this.socket.emit(RTMP, rtmpFullUrl);
                    } else {
                        await this.stop();
                    }
                }
            });
            // 来自服务器命令：终止
            this.socket.on(FAIL, async info => {
                await debug.err(info);
                await this.stop();
            });
        } catch (error) {
            await debug.err(`${SOCKET_FAIL}: ${error.message.trim()}`);
            await this.stop();
            return;
        }

        try {
            this.stream = await this.tabCapture(resolution);
            await debug.log(TAB_VIDEO_STREAM_SUCCESS);
        } catch (error) {
            await debug.err(TAB_VIDEO_STREAM_FAIL);
            await this.stop();
            return;
        }

        try {
            this.mediaRecorder = await this.recorder(this.stream, videoBitsPerSecond);
            await debug.log(RECORDER_SUCCESS);
            this.mediaRecorder.ondataavailable = event => {
                if (event.data && event.data.size > 0) {
                    // 告知服务器命令：推流
                    this.socket.emit(BINARY_STREAM, event.data);
                }
            };
            this.mediaRecorder.start(1000);
        } catch (error) {
            await debug.err(RECORDER_FAIL);
            await this.stop();
        }

        await debug.log(PUSH_STREAM_ING);
    }

    async stop() {
        this.reconnect = 0;
        setStorage(RECORDING, false);
        this.config = Background.Config;

        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }

        if (this.socket) {
            this.socket.emit(STREAM_DISCONNECT);
            this.socket.close();
        }

        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
        }
    }
}

export default new Background();
