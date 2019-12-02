import { log, getLiveTab } from '../../share';

export default class Recorder {
    constructor(bg) {
        this.bg = bg;
        this.stream = null;
        this.mediaRecorder = null;
        this.chunkHandle = this.chunkHandle.bind(this);
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
            mimeType: 'video/webm;codecs=h264',
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

    async chunkHandle(event) {
        console.log(event);
    }

    async recordError(error) {
        log('调用MediaRecorder错误');
        log(Recorder.RecorderOptions);
        log(error);
    }

    async start(config) {
        const captureOptions = Recorder.CaptureOptions;
        const resolution = Recorder.Resolution[config.resolution];
        captureOptions.videoConstraints.mandatory.maxWidth = resolution.width;
        captureOptions.videoConstraints.mandatory.minWidth = resolution.width;
        captureOptions.videoConstraints.mandatory.maxHeight = resolution.height;
        captureOptions.videoConstraints.mandatory.minHeight = resolution.height;
        chrome.tabCapture.capture(captureOptions, stream => {
            if (stream) {
                this.stream = stream;
                this.mediaRecorder = new MediaRecorder(stream, Recorder.RecorderOptions);
                this.mediaRecorder.addEventListener('dataavailable', this.chunkHandle);
                this.mediaRecorder.addEventListener('error', this.recordError);
                this.mediaRecorder.start(1000);
            } else {
                log('调用chrome.tabCapture.capture错误');
                log(captureOptions);
            }
        });
    }

    async stop() {
        const tab = await getLiveTab();
        if (tab && tab.status === 'active' && this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.mediaRecorder.removeEventListener('dataavailable', this.chunkHandle);
            this.mediaRecorder.removeEventListener('error', this.recordError);
        }
    }
}
