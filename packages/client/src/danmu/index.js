var BilibiliLiveHimeDanmu = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  var REG_FUNCTION = /^function\s*([\w$]*)\s*\(([\w\s,$]*)\)\s*\{([\w\W\s\S]*)\}$/;

  function getDanmuOption() {
    var initTime = Date.now();

    (function loop() {
      if (window.DanmakuWebSocket) {
        var DWS = window.DanmakuWebSocket;

        window.DanmakuWebSocket = function f(option) {
          var dws = new DWS(option);
          window.postMessage({
            type: 'danmu_option',
            data: Object.keys(option).reduce(function (obj, key) {
              if (typeof option[key] !== 'function') {
                obj[key] = option[key];
              }

              return obj;
            }, {})
          });
          return dws;
        };
      } else if (Date.now() - initTime >= 60000) {
        window.postMessage({
          type: 'danmu_error'
        });
      } else {
        setTimeout(loop, 10);
      }
    })();
  }

  var Danmu = function Danmu() {
    classCallCheck(this, Danmu);

    var $script = document.createElement('script');
    $script.type = 'text/javascript';
    $script.text = getDanmuOption.toString().match(REG_FUNCTION)[3];
    document.documentElement.appendChild($script);
    $script.onload = document.documentElement.removeChild($script);
    window.addEventListener('message', function (event) {
      chrome.runtime.sendMessage(event.data);
    });
  };

  var index = new Danmu();

  return index;

}());
//# sourceMappingURL=index.js.map
