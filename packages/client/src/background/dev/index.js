import 'crx-hotreload';
import io from 'socket.io-client/dist/socket.io';
import './csp';
import { log, download, sendMessageToTab } from '../../share';

class Background {
    constructor() {
        this.blobs = [];
        this.config = null;
        this.stream = null;
        this.socket = null;
        this.mediaRecorder = null;

        chrome.runtime.onMessage.addListener(request => {
            const { type, data } = request;
            switch (type) {
                case 'start':
                    this.config = {
                        ...Background.config,
                        ...data,
                    };
                    this.start();
                    break;
                case 'stop':
                    this.stop();
                    break;
                default:
                    break;
            }
        });
    }

    static get config() {
        return {
            liveTab: null,
            recordId: null,
            rtmpUrl: '',
            socketUrl: '',
            liveUrl: '',
            timeslice: 1000,
            resolution: 1920,
            videoBitsPerSecond: 2500000,
            downloadAfterStop: true,
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
            mimeType: 'video/webm; codecs="vp8, opus"',
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

    sendMessage(type, data) {
        if (this.config.recordId) {
            sendMessageToTab(this.config.recordId, type, data);
        }
    }

    connectSocket(socketUrl) {
        return new Promise((revolve, reject) => {
            const socket = io(socketUrl);
            socket.on('connect_error', error => {
                log(`socket 连接出错: ${error.message.trim()}`);
                reject(error);
            });

            socket.on('connect', () => {
                log(`socket 连接成功`);
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
                    log('无法获取标签的视频流');
                    reject(new Error('无法获取标签的视频流'));
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
                log('当前环境不支持录制');
                reject(new Error('当前环境不支持录制'));
            }
        });
    }

    async start() {
        const { timeslice, socketUrl, rtmpUrl, resolution, videoBitsPerSecond, downloadAfterStop } = this.config;

        this.socket = await this.connectSocket(socketUrl);
        if (!this.socket) return this.stop();

        this.socket.emit('rtmpUrl', rtmpUrl);

        this.stream = await this.tabCapture(resolution);
        if (!this.socket) return this.stop();

        this.mediaRecorder = await this.recorder(this.stream, videoBitsPerSecond);
        if (!this.mediaRecorder) return this.stop();

        this.mediaRecorder.ondataavailable = event => {
            if (event.data && event.data.size > 0) {
                this.socket.emit('binarystream', event.data);
                if (downloadAfterStop) {
                    this.blobs.push(event.data);
                }
            }
        };

        log('开始录制');
        this.mediaRecorder.start(timeslice);

        return this;
    }

    async stop() {
        log('结束录制');
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
        if (this.socket) {
            this.socket.close();
        }
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
        }
        if (this.config.downloadAfterStop) {
            log('开始下载');
            download(this.blobs, `${Date.now()}.webm`);
            this.blobs = [];
        }
    }
}

export default new Background();
