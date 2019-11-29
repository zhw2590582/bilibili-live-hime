import './index.scss';

const manifest = chrome.runtime.getManifest();
const $name = document.querySelector('.name');
const $feedback = document.querySelector('.feedback');
const $donate = document.querySelector('.donate');
const $footer = document.querySelector('.footer');

$name.textContent = `${manifest.name} ${manifest.version}`;

$donate.src = chrome.extension.getURL('icons/donate.png');

$name.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://chrome.google.com/webstore/detail/nagmkdppcmenlcgelpgkjoknakghllml' });
});

$feedback.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://github.com/zhw2590582/bilibili-live-recorder' });
});

$footer.addEventListener('click', () => {
    chrome.tabs.create({ url: 'https://live.bilibili.com?blr' });
});
