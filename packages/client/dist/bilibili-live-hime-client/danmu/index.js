/*!
 * bilibili-live-hime v1.0.3
 * Github: https://github.com/zhw2590582/bilibili-live-hime
 * (c) 2018-2019 Harvey Zack
 * Released under the MIT License.
 */

var BilibiliLiveHimeDanmu=function(){"use strict";var e=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")},n=/^function\s*([\w$]*)\s*\(([\w\s,$]*)\)\s*\{([\w\W\s\S]*)\}$/;function t(){var e=Date.now();!function n(){if(window.DanmakuWebSocket){var t=window.DanmakuWebSocket;window.DanmakuWebSocket=function(e){var n=new t(e);return window.postMessage({type:"danmu_option",data:Object.keys(e).reduce((function(n,t){return"function"!=typeof e[t]&&(n[t]=e[t]),n}),{})}),n}}else Date.now()-e>=6e4?window.postMessage({type:"danmu_error"}):setTimeout(n,10)}()}return new function o(){e(this,o);var a=document.createElement("script");a.type="text/javascript",a.text=t.toString().match(n)[3],document.documentElement.appendChild(a),a.onload=document.documentElement.removeChild(a),window.addEventListener("message",(function(e){chrome.runtime.sendMessage(e.data)}))}}();
