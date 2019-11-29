var bilibiliLiveHimePopup = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  var defineProperty = _defineProperty;

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  var createClass = _createClass;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  var Storage =
  /*#__PURE__*/
  function () {
    function Storage(name) {
      var isLocal = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      classCallCheck(this, Storage);

      this.name = name;
      this.storage = isLocal ? localStorage : sessionStorage;
    }

    createClass(Storage, [{
      key: "get",
      value: function get(key) {
        var storage = JSON.parse(this.storage.getItem(this.name)) || {};
        return key ? storage[key] : storage;
      }
    }, {
      key: "set",
      value: function set(key, value) {
        var storage = _objectSpread({}, this.get(), defineProperty({}, key, value));

        this.storage.setItem(this.name, JSON.stringify(storage));
      }
    }, {
      key: "del",
      value: function del(key) {
        var storage = this.get();
        delete storage[key];
        this.storage.setItem(this.name, JSON.stringify(storage));
      }
    }, {
      key: "clean",
      value: function clean() {
        this.storage.removeItem(this.name);
      }
    }]);

    return Storage;
  }();

  function getActiveTab() {
    return new Promise(function (resolve) {
      chrome.tabs.query({
        active: true,
        currentWindow: true
      }, function (tabs) {
        resolve(tabs[0]);
      });
    });
  }

  var Popup = function Popup() {
    classCallCheck(this, Popup);

    var storage = new Storage('popup');
    var live = storage.get('live');
    var config = storage.get('config');
    var manifest = chrome.runtime.getManifest();
    var $container = document.querySelector('.container');
    var $name = document.querySelector('.name');
    var $feedback = document.querySelector('.feedback');
    var $tab = document.querySelector('.tab');
    var $rtmpUrl = document.querySelector('.rtmpUrl');
    var $liveUrl = document.querySelector('.liveUrl');
    var $resolution = document.querySelector('.resolution');
    var $frameRate = document.querySelector('.frameRate');
    var $bitsPerSecond = document.querySelector('.bitsPerSecond');
    var $info = document.querySelector('.info');
    var $start = document.querySelector('.start');
    var $stop = document.querySelector('.stop');
    $name.textContent = "".concat(manifest.name, " ").concat(manifest.version);
    $name.addEventListener('click', function () {
      chrome.tabs.create({
        url: 'https://chrome.google.com/webstore/detail/nagmkdppcmenlcgelpgkjoknakghllml'
      });
    });
    $feedback.addEventListener('click', function () {
      chrome.tabs.create({
        url: 'https://github.com/zhw2590582/bilibili-live-hime'
      });
    });
    getActiveTab().then(function (tab) {
      $tab.value = "".concat(tab.title, " - ").concat(tab.url);

      if (config) {
        $rtmpUrl.value = config.rtmpUrl;
        $liveUrl.value = config.liveUrl;
        $resolution.value = config.resolution;
        $frameRate.value = config.frameRate;
        $bitsPerSecond.value = config.bitsPerSecond;
      }

      if (live) {
        $tab.value = config.tab;
        $container.classList.add('live');
      }
    });

    function info(msg) {
      $info.style.display = 'block';
      $info.textContent = msg;
    }

    function start() {
      var tab = $tab.value.trim();
      var rtmpUrl = $rtmpUrl.value.trim();
      var liveUrl = $liveUrl.value.trim();
      var resolution = $resolution.value.trim();
      var frameRate = $frameRate.value.trim();
      var bitsPerSecond = $bitsPerSecond.value.trim();

      if (!rtmpUrl || !rtmpUrl.startsWith($rtmpUrl.placeholder)) {
        return info('请输入正确的 rtmp 推流地址');
      }

      if (!liveUrl || !liveUrl.startsWith($liveUrl.placeholder)) {
        return info('请输入正确的 https 直播地址');
      }

      $info.style.display = 'none';
      $container.classList.add('live');
      storage.set('live', true);
      chrome.tabs.create({
        url: liveUrl
      });
      var configData = {
        tab: tab,
        rtmpUrl: rtmpUrl,
        liveUrl: liveUrl,
        resolution: resolution,
        frameRate: frameRate,
        bitsPerSecond: bitsPerSecond
      };
      storage.set('config', configData);
      chrome.runtime.sendMessage({
        type: 'start',
        data: configData
      });
    }

    function stop() {
      $container.classList.remove('live');
      storage.del('live', true);
      chrome.runtime.sendMessage({
        type: 'stop'
      });
    }

    $start.addEventListener('click', start);
    $stop.addEventListener('click', stop);
  };

  var index = new Popup();

  return index;

}());
//# sourceMappingURL=index.js.map
