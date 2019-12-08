var BilibiliLiveHimeDanmu = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  var Danmu = function Danmu() {
    classCallCheck(this, Danmu);

    var $script = document.createElement('script');
    $script.src = chrome.extension.getURL('injected/index.js');

    $script.onload = function () {
      return $script.remove();
    };

    document.documentElement.appendChild($script);
    window.addEventListener('message', function (event) {
      chrome.runtime.sendMessage(event.data);
    });
  };

  var index = new Danmu();

  return index;

}());
//# sourceMappingURL=index.js.map
