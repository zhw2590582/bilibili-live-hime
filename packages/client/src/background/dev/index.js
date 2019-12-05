import 'crx-hotreload';
import io from 'socket.io-client/dist/socket.io';
import './csp';
import { log, download, getLiveTab, sendMessageToTab } from '../../share';

class Background {
    constructor() {
        this.blobs = [];
        this.config = null;
        this.stream = null;
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
        sendMessageToTab(this.config.recordId, type, data);
    }

    async start() {
        const captureOptions = Background.CaptureOptions;
        const resolution = Background.Resolution[this.config.resolution];
        captureOptions.videoConstraints.mandatory.maxWidth = resolution.width;
        captureOptions.videoConstraints.mandatory.minWidth = resolution.width;
        captureOptions.videoConstraints.mandatory.maxHeight = resolution.height;
        captureOptions.videoConstraints.mandatory.minHeight = resolution.height;

        const recorderOptions = Background.RecorderOptions;
        recorderOptions.videoBitsPerSecond = this.config.videoBitsPerSecond;

        const socket = io('http://localhost:8080');
        socket.emit('test', 'Background');

        chrome.tabCapture.capture(captureOptions, stream => {
            if (stream && MediaRecorder && MediaRecorder.isTypeSupported(recorderOptions.mimeType)) {
                this.stream = stream;
                this.mediaRecorder = new MediaRecorder(stream, recorderOptions);
                this.mediaRecorder.ondataavailable = event => {
                    if (event.data && event.data.size > 0) {
                        const blobUrl = URL.createObjectURL(event.data);
                        this.sendMessage('record@ing', blobUrl);
                        if (this.config.downloadAfterStop) {
                            this.blobs.push(event.data);
                        }
                    }
                };
                log('开始录制');
                this.sendMessage('record@start');
                this.mediaRecorder.start(this.config.timeslice);
            } else {
                this.stop();
            }
        });
    }

    async stop() {
        log('结束录制');
        this.sendMessage('record@stop');
        const tab = await getLiveTab();
        if (tab && tab.status === 'active' && this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        if (this.mediaRecorder) {
            this.mediaRecorder.stop();
            this.mediaRecorder = null;
        }
        if (this.config.downloadAfterStop) {
            log('开始下载');
            this.sendMessage('record@download');
            download(this.blobs, `${Date.now()}.webm`);
            this.blobs = [];
        }
    }
}

export default new Background();
