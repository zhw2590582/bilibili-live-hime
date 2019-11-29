export default class Capture {
    constructor(bg) {
        this.bg = bg;
        this.ms = null;
    }

    static get constraints() {
        return {
            audio: true,
            video: true,
            videoConstraints: {
                mandatory: {
                    chromeMediaSource: 'tab',
                    maxWidth: 3840,
                    maxHeight: 2160,
                },
            },
            audioConstraints: {
                mandatory: {
                    echoCancellation: true,
                },
            },
        };
    }

    getActiveTab() {
        return new Promise(resolve => {
            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true,
                },
                tabs => {
                    resolve(tabs[0]);
                },
            );
        });
    }

    tabCapture() {
        chrome.tabCapture.capture(Capture.constraints, stream => {
            this.ms = new MediaStream();
            stream.getTracks().forEach(track => {
                console.log(track);
                this.ms.addTrack(track);
            });
        });
    }
}
