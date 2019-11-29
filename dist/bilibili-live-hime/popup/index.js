/*!
 * bilibili-live-recorder v1.0.0
 * Github: undefined
 * (c) 2018-2019 Harvey Zack
 * Released under the MIT License.
 */

!function(){"use strict";var e=chrome.runtime.getManifest(),t=document.querySelector(".name"),c=document.querySelector(".feedback"),n=document.querySelector(".donate"),o=document.querySelector(".footer");t.textContent="".concat(e.name," ").concat(e.version),n.src=chrome.extension.getURL("icons/donate.png"),t.addEventListener("click",(function(){chrome.tabs.create({url:"https://chrome.google.com/webstore/detail/nagmkdppcmenlcgelpgkjoknakghllml"})})),c.addEventListener("click",(function(){chrome.tabs.create({url:"https://github.com/zhw2590582/bilibili-live-recorder"})})),o.addEventListener("click",(function(){chrome.tabs.create({url:"https://live.bilibili.com?blr"})}))}();
