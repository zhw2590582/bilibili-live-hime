(function () {
    'use strict';

    var manifest = chrome.runtime.getManifest();
    var $name = document.querySelector('.name');
    var $feedback = document.querySelector('.feedback');
    var $donate = document.querySelector('.donate');
    var $footer = document.querySelector('.footer');
    $name.textContent = "".concat(manifest.name, " ").concat(manifest.version);
    $donate.src = chrome.extension.getURL('icons/donate.png');
    $name.addEventListener('click', function () {
      chrome.tabs.create({
        url: 'https://chrome.google.com/webstore/detail/nagmkdppcmenlcgelpgkjoknakghllml'
      });
    });
    $feedback.addEventListener('click', function () {
      chrome.tabs.create({
        url: 'https://github.com/zhw2590582/bilibili-live-recorder'
      });
    });
    $footer.addEventListener('click', function () {
      chrome.tabs.create({
        url: 'https://live.bilibili.com?blr'
      });
    });

}());
//# sourceMappingURL=index.js.map
