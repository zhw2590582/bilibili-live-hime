/*!
 * bilibili-live-hime v1.0.1
 * Github: https://github.com/zhw2590582/bilibili-live-hime
 * (c) 2018-2019 Harvey Zack
 * Released under the MIT License.
 */

var BilibiliLiveHimeDanmu=function(){"use strict";var e=function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")};return new function n(){e(this,n);var t=document.createElement("script");t.src=chrome.extension.getURL("injected/index.js"),t.onload=function(){return t.remove()},document.documentElement.appendChild(t),window.addEventListener("message",(function(e){try{chrome.runtime.sendMessage(e.data)}catch(e){}}))}}();
