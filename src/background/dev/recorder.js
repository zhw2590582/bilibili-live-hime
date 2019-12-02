import { download, getLiveTab, sendMessageToTab } from '../../share';

export default class Recorder {
    constructor() {
        this.blobs = [];
        this.config = null;
        this.stream = null;
        this.mediaRecorder = null;
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

    async recordStop() {
        sendMessageToTab(this.config.recordId, 'recordStop');
        this.download();
    }

    async recordDataavailable(event) {
        if (event.data && event.data.size > 0) {
            this.blobs.push(event.data);
            const blobUrl = URL.createObjectURL(event.data);
            sendMessageToTab(this.config.recordId, 'recording', blobUrl);
        }
    }

    async start(config) {
        this.config = config;

        const captureOptions = Recorder.CaptureOptions;
        const resolution = Recorder.Resolution[config.resolution];
        captureOptions.videoConstraints.mandatory.maxWidth = resolution.width;
        captureOptions.videoConstraints.mandatory.minWidth = resolution.width;
        captureOptions.videoConstraints.mandatory.maxHeight = resolution.height;
        captureOptions.videoConstraints.mandatory.minHeight = resolution.height;

        const recorderOptions = Recorder.RecorderOptions;
        recorderOptions.videoBitsPerSecond = config.videoBitsPerSecond;

        chrome.tabCapture.capture(captureOptions, stream => {
            if (stream) {
                this.stream = stream;
                this.mediaRecorder = new MediaRecorder(stream, recorderOptions);
                this.mediaRecorder.ondataavailable = this.recordDataavailable.bind(this);
                this.mediaRecorder.onstop = this.recordStop.bind(this);
                this.mediaRecorder.start(1000);
            }
        });
    }

    async stop() {
        const tab = await getLiveTab();
        if (tab && tab.status === 'active' && this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.mediaRecorder.stop();
            this.stream = null;
            this.mediaRecorder = null;
        }
    }

    download() {
        if (this.blobs.length) {
            download(this.blobs, `${Date.now()}.webm`);
            this.blobs = [];
        }
    }
}
