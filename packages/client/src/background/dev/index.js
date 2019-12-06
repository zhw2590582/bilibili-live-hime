import 'crx-hotreload';
import io from 'socket.io-client/dist/socket.io';
import { debug, sendMessage } from '../../share';

class Background {
    constructor() {
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
            tab: null,
            rtmp: '',
            streamname: '',
            socket: '',
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

    connectSocket(socketUrl) {
        return new Promise((revolve, reject) => {
            const socket = io(socketUrl);

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
        const { socket, rtmp, resolution, videoBitsPerSecond } = this.config;

        await debug.log('欢迎使用 Bilibili 直播姬，欢迎反馈问题');

        try {
            this.socket = await this.connectSocket(socket);
            this.socket.emit('rtmp', rtmp);
            this.socket.on('err', async info => {
                await debug.err(info.trim());
                await this.stop();
            });
            this.socket.on('log', async info => {
                await debug.log(info.trim());
            });
        } catch (error) {
            await debug.err(`socket连接失败，请检查中转地址: ${error.message.trim()}`);
            await this.stop();
            return;
        }

        try {
            this.stream = await this.tabCapture(resolution);
            await debug.log('获取标签的视频流成功');
        } catch (error) {
            await debug.err('无法获取标签的视频流，请重试');
            await this.stop();
            return;
        }

        try {
            this.mediaRecorder = await this.recorder(this.stream, videoBitsPerSecond);
            await debug.log('录制标签的视频流成功');
            this.mediaRecorder.ondataavailable = event => {
                if (event.data && event.data.size > 0) {
                    this.socket.emit('binarystream', event.data);
                }
            };
            this.mediaRecorder.start();
        } catch (error) {
            await debug.err('无法录制标签的视频流，请重试');
            await this.stop();
        }
    }

    async stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }
        if (this.socket) {
            this.socket.emit('disconnect');
            this.socket.close();
        }
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
        }
        sendMessage('close');
    }
}

export default new Background();
