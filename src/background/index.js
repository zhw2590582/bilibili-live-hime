var bilibiliLiveHimeBackground = (function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var classCallCheck = _classCallCheck;

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

  const filesInDirectory = dir => new Promise (resolve =>

      dir.createReader ().readEntries (entries =>

          Promise.all (entries.filter (e => e.name[0] !== '.').map (e =>

              e.isDirectory
                  ? filesInDirectory (e)
                  : new Promise (resolve => e.file (resolve))
          ))
          .then (files => [].concat (...files))
          .then (resolve)
      )
  );

  const timestampForFilesInDirectory = dir =>
          filesInDirectory (dir).then (files =>
              files.map (f => f.name + f.lastModifiedDate).join ());

  const reload = () => {

      chrome.tabs.query ({ active: true, currentWindow: true }, tabs => { // NB: see https://github.com/xpl/crx-hotreload/issues/5

          if (tabs[0]) { chrome.tabs.reload (tabs[0].id); }

          chrome.runtime.reload ();
      });
  };

  const watchChanges = (dir, lastTimestamp) => {

      timestampForFilesInDirectory (dir).then (timestamp => {

          if (!lastTimestamp || (lastTimestamp === timestamp)) {

              setTimeout (() => watchChanges (dir, timestamp), 1000); // retry after 1s

          } else {

              reload ();
          }
      });

  };

  chrome.management.getSelf (self => {

      if (self.installType === 'development') {

          chrome.runtime.getPackageDirectoryEntry (dir => watchChanges (dir));
      }
  });

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var cspGenerator = createCommonjsModule(function (module, exports) {
  /*!
   * csp-generator.js v1.0.2
   * Github: https://github.com/zhw2590582/csp-generator#readme
   * (c) 2017-2019 Harvey Zack
   * Released under the MIT License.
   */

  !function(e,t){module.exports=t();}(commonjsGlobal,function(){var n=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i);}}var e=function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e};return function(){function t(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"";n(this,t),this.csp=this.parse(e);}return e(t,[{key:"parse",value:function(e){return (0<arguments.length&&void 0!==e?e:"").split(";").reduce(function(e,t){var n=t.split(" ").filter(function(e){return e.trim()}),i=n[0],r=n.slice(1);return e[i]=r,e},{})}},{key:"generate",value:function(){var n=this;return Object.keys(this.csp).reduce(function(e,t){return "".concat(e," ").concat(t," ").concat(n.csp[t].join(" "),";")},"").trim()}},{key:"append",value:function(e,t){return this.csp[e]&&-1===this.csp[e].indexOf(t)?this.csp[e].push(t):this.csp[e]=[t],this}},{key:"delete",value:function(e,t){if(t){var n=(this.csp[e]||[]).indexOf(t);-1<n&&this.csp[e].splice(n,1);}else delete this.csp[e];return this}},{key:"get",value:function(e){return this.csp[e]}}]),t}()});
  });

  var manifest = chrome.runtime.getManifest();
  chrome.webRequest.onHeadersReceived.addListener(function (details) {
    var header = details.responseHeaders.find(function (event) {
      var name = event.name.toLowerCase();
      return name === 'content-security-policy-report-only' || name === 'content-security-policy';
    });

    if (header && header.value) {
      var csp = new cspGenerator(header.value);
      csp.append('worker-src', 'blob:');
      csp.append('script-src', '*.baidu.com');
      csp.append('img-src', '*.baidu.com');
      header.value = csp.generate();
    }

    return {
      responseHeaders: details.responseHeaders
    };
  }, {
    urls: manifest.content_scripts[0].matches
  }, ['blocking', 'responseHeaders']);

  var Recorder =
  /*#__PURE__*/
  function () {
    function Recorder(bg) {
      classCallCheck(this, Recorder);

      this.bg = bg;
      this.ms = null;
    }

    createClass(Recorder, [{
      key: "isTypeSupported",
      value: function isTypeSupported(mimeType) {
        return MediaRecorder.isTypeSupported(mimeType);
      }
    }, {
      key: "start",
      value: function start() {
        var _this = this;

        chrome.tabCapture.capture(Recorder.constraints, function (stream) {
          _this.ms = new MediaStream();
          stream.getTracks().forEach(function (track) {
            _this.ms.addTrack(track);
          });
        });
      }
    }, {
      key: "stop",
      value: function stop() {//
      }
    }], [{
      key: "constraints",
      get: function get() {
        return {
          audio: true,
          video: true,
          videoConstraints: {
            mandatory: {
              chromeMediaSource: 'tab',
              maxWidth: 3840,
              maxHeight: 2160
            }
          },
          audioConstraints: {
            mandatory: {
              echoCancellation: true
            }
          }
        };
      }
    }]);

    return Recorder;
  }();

  var Background =
  /*#__PURE__*/
  function () {
    function Background() {
      var _this = this;

      classCallCheck(this, Background);

      this.recorder = new Recorder(this);
      chrome.runtime.onMessage.addListener(function (request) {
        console.log(request);
        var type = request.type,
            data = request.data;

        switch (type) {
          case 'start':
            _this.recorder.start(data);

            console.log(data);
            break;

          case 'stop':
            _this.recorder.stop(data);

            break;
        }
      });
    }

    createClass(Background, [{
      key: "postMessage",
      value: function postMessage(data) {//
      }
    }]);

    return Background;
  }();

  var index = new Background();

  return index;

}());
//# sourceMappingURL=index.js.map
