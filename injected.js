const $script = document.createElement('script');
$script.type = 'text/javascript';
$script.text = `!function e(){if(window.DanmakuWebSocket){const e=window.DanmakuWebSocket;window.DanmakuWebSocket=function(n){const t=new e(n);return window.postMessage({type:"DANMU_OPTION",data:Object.keys(n).reduce((e,t)=>("function"!=typeof n[t]&&(e[t]=n[t]),e),{})}),t}}else setTimeout(e,10)}();`;
document.documentElement.appendChild($script);
$script.onload = document.documentElement.removeChild($script);
