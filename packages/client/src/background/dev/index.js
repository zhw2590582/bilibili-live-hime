import 'crx-hotreload';
import io from 'socket.io-client/dist/socket.io';
import { debug, setBadge, setStorage, onMessage, storageChange, sendMessageToTab } from '../../share';
import {
    LOG,
    FAIL,
    RTMP,
    STOP,
    GIFT,
    START,
    DANMU,
    GUARD,
    RECORDING,
    SOCKET_FAIL,
    BINARY_STREAM,
    RECORDER_FAIL,
    SOCKET_SUCCESS,
    PUSH_STREAM_ING,
    RECORDER_SUCCESS,
    STREAM_DISCONNECT,
    TAB_VIDEO_STREAM_FAIL,
    TAB_VIDEO_STREAM_SUCCESS,
} from '../../share/constant';

class Background {
    constructor() {
        this.stream = null;
        this.socket = null;
        this.mediaRecorder = null;
        this.config = Background.config;

        onMessage((request, sender) => {
            const { type, data } = request;
            switch (type) {
                case START:
                    this.config = {
                        ...Background.config,
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
            if (changes.recording) {
                if (changes.recording.newValue) {
                    setBadge('ON');
                } else {
                    setBadge('');
                }
            }
        });
    }

    static get config() {
        return {
            rtmp: '',
            socket: '',
            liveTab: null,
            streamname: '',
            activeTab: null,
            resolution: 1920,
            videoBitsPerSecond: 2500000,
        };
    }

    static get CaptureOptions() {
        return {
            audio: true,
            video: true,
            videoConstraints: {
                mandatory: {
                    chromeMediaSource: 'tab',
                    maxWidth: 1920,
                    minWidth: 1920,
                    maxHeight: 1080,
                    minHeight: 1080,
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
            audioBitsPerSecond: 128000,
            videoBitsPerSecond: 2500000,
            mimeType: 'video/webm; codecs="h264, opus"',
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
            this.socket = await this.connectSocket(socket);
            await debug.log(SOCKET_SUCCESS);
            this.socket.emit(RTMP, rtmp + streamname);
            this.socket.on(FAIL, async info => {
                await debug.err(info);
                await this.stop();
            });
            this.socket.on(LOG, async info => {
                await debug.log(info);
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
        setStorage(RECORDING, false);
        this.config = Background.config;

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
