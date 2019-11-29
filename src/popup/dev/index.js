import './index.scss';
import Storage from '../../share/storage';
import { getActiveTab } from '../../share';

class Popup {
    constructor() {
        const storage = new Storage('popup');
        const live = storage.get('live');
        const config = storage.get('config');
        const manifest = chrome.runtime.getManifest();
        const $container = document.querySelector('.container');
        const $name = document.querySelector('.name');
        const $feedback = document.querySelector('.feedback');
        const $tab = document.querySelector('.tab');
        const $rtmpUrl = document.querySelector('.rtmpUrl');
        const $liveUrl = document.querySelector('.liveUrl');
        const $resolution = document.querySelector('.resolution');
        const $frameRate = document.querySelector('.frameRate');
        const $bitsPerSecond = document.querySelector('.bitsPerSecond');
        const $info = document.querySelector('.info');
        const $start = document.querySelector('.start');
        const $stop = document.querySelector('.stop');

        $name.textContent = `${manifest.name} ${manifest.version}`;

        $name.addEventListener('click', () => {
            chrome.tabs.create({ url: 'https://chrome.google.com/webstore/detail/nagmkdppcmenlcgelpgkjoknakghllml' });
        });

        $feedback.addEventListener('click', () => {
            chrome.tabs.create({ url: 'https://github.com/zhw2590582/bilibili-live-hime' });
        });

        getActiveTab().then(tab => {
            $tab.value = `${tab.title} - ${tab.url}`;
            if (config) {
                $rtmpUrl.value = config.rtmpUrl;
                $liveUrl.value = config.liveUrl;
                $resolution.value = config.resolution;
                $frameRate.value = config.frameRate;
                $bitsPerSecond.value = config.bitsPerSecond;
            }
            if (live) {
                $tab.value = config.tab;
                $container.classList.add('live');
            }
        });

        function info(msg) {
            $info.style.display = 'block';
            $info.textContent = msg;
        }

        function start() {
            const tab = $tab.value.trim();
            const rtmpUrl = $rtmpUrl.value.trim();
            const liveUrl = $liveUrl.value.trim();
            const resolution = $resolution.value.trim();
            const frameRate = $frameRate.value.trim();
            const bitsPerSecond = $bitsPerSecond.value.trim();
            if (!rtmpUrl || !rtmpUrl.startsWith($rtmpUrl.placeholder)) {
                return info('请输入正确的 rtmp 推流地址');
            }
            if (!liveUrl || !liveUrl.startsWith($liveUrl.placeholder)) {
                return info('请输入正确的 https 直播地址');
            }
            $info.style.display = 'none';
            $container.classList.add('live');
            storage.set('live', true);
            chrome.tabs.create({ url: liveUrl });
            const configData = {
                tab,
                rtmpUrl,
                liveUrl,
                resolution,
                frameRate,
                bitsPerSecond,
            };
            storage.set('config', configData);
            chrome.runtime.sendMessage({
                type: 'start',
                data: configData,
            });
        }

        function stop() {
            $container.classList.remove('live');
            storage.del('live', true);
            chrome.runtime.sendMessage({
                type: 'stop',
            });
        }

        $start.addEventListener('click', start);
        $stop.addEventListener('click', stop);
    }
}

export default new Popup();
