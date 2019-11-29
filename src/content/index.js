(function () {
    'use strict';

    function sleep() {
      var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      return new Promise(function (resolve) {
        return setTimeout(resolve, ms);
      });
    }

    var $script = document.createElement('script');
    $script.src = chrome.extension.getURL('injected/index.js');

    $script.onload = function () {
      return $script.remove();
    };

    document.documentElement.appendChild($script);
    var $style = document.createElement('link');
    $style.rel = 'stylesheet';
    $style.type = 'text/css';
    $style.href = chrome.extension.getURL('injected/index.css');
    sleep().then(function () {
      return document.head.appendChild($style);
    });

}());
//# sourceMappingURL=index.js.map
