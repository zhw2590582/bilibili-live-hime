import { sleep } from '../../share';

const $script = document.createElement('script');
$script.src = chrome.extension.getURL('injected/index.js');
$script.onload = () => $script.remove();
document.documentElement.appendChild($script);

const $style = document.createElement('link');
$style.rel = 'stylesheet';
$style.type = 'text/css';
$style.href = chrome.extension.getURL('injected/index.css');
sleep().then(() => document.head.appendChild($style));
