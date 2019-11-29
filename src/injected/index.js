var bilibiliLiveRecorderInjected = (function () {
	'use strict';

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var setPrototypeOf = createCommonjsModule(function (module) {
	function _setPrototypeOf(o, p) {
	  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	module.exports = _setPrototypeOf;
	});

	var construct = createCommonjsModule(function (module) {
	function isNativeReflectConstruct() {
	  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
	  if (Reflect.construct.sham) return false;
	  if (typeof Proxy === "function") return true;

	  try {
	    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
	    return true;
	  } catch (e) {
	    return false;
	  }
	}

	function _construct(Parent, args, Class) {
	  if (isNativeReflectConstruct()) {
	    module.exports = _construct = Reflect.construct;
	  } else {
	    module.exports = _construct = function _construct(Parent, args, Class) {
	      var a = [null];
	      a.push.apply(a, args);
	      var Constructor = Function.bind.apply(Parent, a);
	      var instance = new Constructor();
	      if (Class) setPrototypeOf(instance, Class.prototype);
	      return instance;
	    };
	  }

	  return _construct.apply(null, arguments);
	}

	module.exports = _construct;
	});

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

	function sleep() {
	  var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
	  return new Promise(function (resolve) {
	    return setTimeout(resolve, ms);
	  });
	}
	function download(url, name) {
	  var elink = document.createElement('a');
	  elink.style.display = 'none';
	  elink.href = url;
	  elink.download = name;
	  document.body.appendChild(elink);
	  elink.click();
	  document.body.removeChild(elink);
	}

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

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	var Storage =
	/*#__PURE__*/
	function () {
	  function Storage(name) {
	    classCallCheck(this, Storage);

	    this.name = name;
	  }

	  createClass(Storage, [{
	    key: "get",
	    value: function get(key) {
	      var storage = JSON.parse(window.localStorage.getItem(this.name)) || {};
	      return key ? storage[key] : storage;
	    }
	  }, {
	    key: "set",
	    value: function set(key, value) {
	      var storage = _objectSpread({}, this.get(), defineProperty({}, key, value));

	      window.localStorage.setItem(this.name, JSON.stringify(storage));
	    }
	  }, {
	    key: "del",
	    value: function del(key) {
	      var storage = this.get();
	      delete storage[key];
	      window.localStorage.setItem(this.name, JSON.stringify(storage));
	    }
	  }, {
	    key: "clean",
	    value: function clean() {
	      window.localStorage.removeItem(this.name);
	    }
	  }]);

	  return Storage;
	}();

	var Injected =
	/*#__PURE__*/
	function () {
	  function Injected() {
	    var _this = this;

	    classCallCheck(this, Injected);

	    this.name = 'bilibili-live-recorder';
	    this.storage = new Storage(this.name);
	    this.worker = new Worker(URL.createObjectURL(new Blob(["\"use strict\";function _toConsumableArray(a){return _arrayWithoutHoles(a)||_iterableToArray(a)||_nonIterableSpread()}function _nonIterableSpread(){throw new TypeError(\"Invalid attempt to spread non-iterable instance\")}function _iterableToArray(a){if(Symbol.iterator in Object(a)||\"[object Arguments]\"===Object.prototype.toString.call(a))return Array.from(a)}function _arrayWithoutHoles(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}}function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError(\"Cannot call a class as a function\")}function _defineProperties(a,b){for(var c,d=0;d<b.length;d++)c=b[d],c.enumerable=c.enumerable||!1,c.configurable=!0,\"value\"in c&&(c.writable=!0),Object.defineProperty(a,c.key,c)}function _createClass(a,b,c){return b&&_defineProperties(a.prototype,b),c&&_defineProperties(a,c),a}function mergeBuffer(){for(var a=arguments.length,b=Array(a),c=0;c<a;c++)b[c]=arguments[c];var d=b[0].constructor;return b.reduce(function(a,b){var c=new d((0|a.byteLength)+(0|b.byteLength));return c.set(a,0),c.set(b,0|a.byteLength),c},new d)}function readBufferSum(a){var b=!(1<arguments.length&&arguments[1]!==void 0)||arguments[1];return a.reduce(function(c,d,e){return c+(b?d:d-128)*Math.pow(256,a.length-e-1)},0)}function getTagTime(a){var b=a[4],c=a[5],d=a[6],e=a[7];return d|c<<8|b<<16|e<<24}function durationToTime(a){var b=(Math.floor(a/60)+\"\").slice(-5),c=a%60+\"\";return\"\".concat(1===b.length?\"0\".concat(b):b,\":\").concat(1===c.length?\"0\".concat(c):c)}var Flv=/*#__PURE__*/function(){function a(){_classCallCheck(this,a),this.index=0,this.tasks=[],this.timer=null,this.loading=!1,this.running=!1,this.tagLength=0,this.tagStartTime=0,this.resultDuration=0,this.data=new Uint8Array,this.header=new Uint8Array,this.scripTag=new Uint8Array,this.videoAndAudioTags=[],function a(){var b=this;this.timer=setTimeout(function(){b.running&&b.loading&&b.report(),a.call(b)},1e3)}.call(this)}return _createClass(a,[{key:\"report\",value:function report(){postMessage({type:\"report\",data:{duration:durationToTime(Math.floor(this.resultDuration/1e3)),size:\"\".concat((this.resultSize/1024/1024).toFixed(2).slice(-8),\"M\")}})}},{key:\"readable\",value:function readable(a){return this.data.length-this.index>=a}},{key:\"read\",value:function read(a){var b=this.index+a,c=this.data.subarray(this.index,b);return this.index=b,c}},{key:\"load\",value:function load(a){this.loading=!0,this.tasks.push(this.demuxer.bind(this,a)),this.running||function a(){var b=this,c=this.tasks.shift();c&&this.loading?(this.running=!0,c().then(function(){setTimeout(a.bind(b),0)})):this.running=!1}.call(this)}},{key:\"demuxer\",value:function demuxer(a){var b=this;return new Promise(function(c,d){if(!b.loading)return void c();for(b.data=mergeBuffer(b.data,a),!b.header.length&&b.readable(13)&&(b.header=b.read(13));b.index<b.data.length;){var e=0,f=0,g=new Uint8Array,h=b.index;if(b.readable(11))g=mergeBuffer(g,b.read(11)),f=g[0],e=readBufferSum(g.subarray(1,4));else return b.index=h,void c();if(b.readable(e+4)){g=mergeBuffer(g,b.read(e));var i=b.read(4);g=mergeBuffer(g,i);var j=readBufferSum(i);if(j!==e+11){b.stop();return postMessage({type:\"error\",data:\"Bilibili \u5F55\u64AD\u59EC: \u89C6\u9891\u6D41\u53D1\u751F\u53D8\u5316\uFF0C\u5DF2\u81EA\u52A8\u505C\u6B62\u5F55\u5236\"}),void d(new Error(\"Bilibili \u5F55\u64AD\u59EC: \u89C6\u9891\u6D41\u53D1\u751F\u53D8\u5316\uFF0C\u5DF2\u81EA\u52A8\u505C\u6B62\u5F55\u5236\"))}}else return b.index=h,void c();if(b.tagLength+=1,18===f)b.scripTag=g;else{var k=getTagTime(g);b.tagStartTime||(b.tagStartTime=k);var l=k-b.tagStartTime;10>=b.tagLength&&1e3<=l-b.resultDuration&&(b.tagStartTime=k),b.resultDuration=k-b.tagStartTime;var m=b.videoAndAudioTags[b.videoAndAudioTags.length-1];m?10485760<=m.byteLength?b.videoAndAudioTags.push(g):b.videoAndAudioTags[b.videoAndAudioTags.length-1]=mergeBuffer(m,g):b.videoAndAudioTags.push(g)}b.data=b.data.subarray(b.index),b.index=0}c()})}},{key:\"stop\",value:function stop(){this.loading=!1,clearTimeout(this.timer),this.report()}},{key:\"download\",value:function download(){postMessage({type:\"download\",data:URL.createObjectURL(new Blob(this.resultData))})}},{key:\"resultData\",get:function get(){for(var a=this.resultSize,b=[this.header,this.scripTag].concat(_toConsumableArray(this.videoAndAudioTags)),c=[new Uint8Array],d=0;d<b.length;d+=1){var e=b[d],f=c[c.length-1];try{c[c.length-1]=mergeBuffer(f,e)}catch(a){c[c.length]=e}var g=c.reduce(function(a,b){return a+b.byteLength},0);postMessage({type:\"merging\",data:\"\".concat(Math.floor(100*(g/a||0)),\"%\")})}return c}},{key:\"resultSize\",get:function get(){return this.header.byteLength+this.scripTag.byteLength+this.videoAndAudioTags.reduce(function(a,b){return a+b.byteLength},0)}}]),a}(),flv=new Flv;onmessage=function onmessage(a){var b=a.data,c=b.type,d=b.data;switch(c){case\"load\":flv.load(d);break;case\"stop\":flv.stop();break;case\"download\":flv.download();break;default:}};"])));
	    this.loading = false;

	    this.worker.onmessage = function (event) {
	      var _event$data = event.data,
	          type = _event$data.type,
	          data = _event$data.data;

	      switch (type) {
	        case 'report':
	          if (_this.$container) {
	            _this.$duration.textContent = data.duration;
	            _this.$size.textContent = data.size;
	          }

	          break;

	        case 'download':
	          download(data, "".concat(document.title, ".flv"));

	          _this.changeState('before-record');

	          _this.worker.terminate();

	          _this.$duration.textContent = '00:00';
	          _this.$size.textContent = '0.00M';
	          _this.$wait.textContent = '0%';
	          break;

	        case 'merging':
	          _this.$wait.textContent = data;
	          break;

	        case 'error':
	          _this.loading = false;

	          _this.changeState('after-record');

	          break;
	      }
	    };

	    if (this.storage.get(location.href)) {
	      this.storage.del(location.href);
	      this.loading = true;
	      this.intercept();
	    }

	    sleep(1000).then(function () {
	      _this.createUI();

	      _this.analysis();
	    });
	  }

	  createClass(Injected, [{
	    key: "createUI",
	    value: function createUI() {
	      var _this2 = this;

	      if (!document.body) {
	        return sleep(100).then(function () {
	          return _this2.createUI();
	        });
	      }

	      this.$container = document.createElement('div');
	      this.$container.classList.add(this.name);
	      this.$container.innerHTML = "\n            <div class=\"blr-states\">\n                <div class=\"blr-state blr-state-before-record blr-active\">\u5F00\u59CB</div>\n                <div class=\"blr-state blr-state-recording\">\u505C\u6B62</div>\n                <div class=\"blr-state blr-state-after-record\">\u4E0B\u8F7D</div>\n                <div class=\"blr-state blr-state-wait\">0%</div>\n            </div>\n            <div class=\"blr-monitors\">\n                <div class=\"blr-monitor blr-monitor-top\">\n                    <div class=\"blr-monitor-name\">\u65F6\u957F\uFF1A</div>\n                    <div class=\"blr-monitor-value blr-duration\">00:00</div>\n                </div>\n                <div class=\"blr-monitor blr-monitor-bottom\">\n                    <div class=\"blr-monitor-name\">\u5927\u5C0F\uFF1A</div>\n                    <div class=\"blr-monitor-value blr-size\">0.00M</div>\n                </div>\n            </div>\n        ";
	      this.$states = Array.from(this.$container.querySelectorAll('.blr-state'));
	      this.$beforeRecord = this.$container.querySelector('.blr-state-before-record');
	      this.$recording = this.$container.querySelector('.blr-state-recording');
	      this.$afterRecord = this.$container.querySelector('.blr-state-after-record');
	      this.$wait = this.$container.querySelector('.blr-state-wait');
	      this.$duration = this.$container.querySelector('.blr-duration');
	      this.$size = this.$container.querySelector('.blr-size');
	      this.$monitor = this.$container.querySelector('.blr-monitor');

	      if (this.loading) {
	        this.changeState('recording');
	      } else if (location.href.includes('blr')) {
	        this.storage.clean();
	        this.$container.classList.add('blr-focus');
	        sleep(10000).then(function () {
	          _this2.$container.classList.remove('blr-focus');
	        });
	      }

	      var x = this.storage.get('x');
	      var y = this.storage.get('y');

	      if (x && y) {
	        this.$container.style.left = "".concat(x, "px");
	        this.$container.style.top = "".concat(y, "px");
	      }

	      document.body.appendChild(this.$container);
	      this.bindEvent();
	    }
	  }, {
	    key: "changeState",
	    value: function changeState(state) {
	      this.$states.forEach(function (item) {
	        if (item.classList.contains("blr-state-".concat(state))) {
	          item.classList.add('blr-active');
	        } else {
	          item.classList.remove('blr-active');
	        }
	      });
	    }
	  }, {
	    key: "bindEvent",
	    value: function bindEvent() {
	      var _this3 = this;

	      this.$beforeRecord.addEventListener('click', function () {
	        var $video = document.querySelector('video');

	        if ($video) {
	          _this3.storage.set(location.href, Date.now());

	          location.reload();
	        }
	      });
	      this.$recording.addEventListener('click', function () {
	        _this3.loading = false;

	        _this3.changeState('after-record');

	        _this3.worker.postMessage({
	          type: 'stop'
	        });
	      });
	      this.$afterRecord.addEventListener('click', function () {
	        _this3.loading = false;

	        _this3.changeState('wait');

	        _this3.worker.postMessage({
	          type: 'download'
	        });
	      });
	      var isDroging = false;
	      var lastPageX = 0;
	      var lastPageY = 0;
	      var lastPlayerLeft = 0;
	      var lastPlayerTop = 0;
	      this.$monitor.addEventListener('mousedown', function () {
	        isDroging = true;
	        lastPageX = event.pageX;
	        lastPageY = event.pageY;
	        lastPlayerLeft = _this3.$container.offsetLeft;
	        lastPlayerTop = _this3.$container.offsetTop;
	      });
	      document.addEventListener('mousemove', function (event) {
	        if (isDroging) {
	          var x = event.pageX - lastPageX;
	          var y = event.pageY - lastPageY;
	          _this3.$container.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
	        }
	      });
	      document.addEventListener('mouseup', function () {
	        if (isDroging) {
	          isDroging = false;
	          _this3.$container.style.transform = 'translate(0, 0)';
	          var x = lastPlayerLeft + event.pageX - lastPageX;
	          var y = lastPlayerTop + event.pageY - lastPageY;
	          _this3.$container.style.left = "".concat(x, "px");
	          _this3.$container.style.top = "".concat(y, "px");

	          _this3.storage.set('x', x);

	          _this3.storage.set('y', y);
	        }
	      });
	    }
	  }, {
	    key: "intercept",
	    value: function intercept() {
	      var that = this;
	      var read = ReadableStreamDefaultReader.prototype.read;

	      ReadableStreamDefaultReader.prototype.read = function () {
	        var promiseResult = read.call(this);
	        promiseResult.then(function (_ref) {
	          var done = _ref.done,
	              value = _ref.value;
	          if (done || !that.loading) return;
	          that.worker.postMessage({
	            type: 'load',
	            data: value
	          });
	        });
	        return promiseResult;
	      };

	      var B = window.Blob;

	      window.Blob = function (array, options) {
	        var data = array[0];

	        if (options && options.type === 'text/javascript') {
	          data = "var read=ReadableStreamDefaultReader.prototype.read;ReadableStreamDefaultReader.prototype.read=function(){var e=read.call(this);return e.then(function(e){postMessage({type:\"blr-load\",data:e})}),e};\n".concat(data);
	        }

	        return new B([data], options);
	      };

	      var W = window.Worker;

	      window.Worker = function () {
	        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	          args[_key] = arguments[_key];
	        }

	        if (args[0].slice(0, 5) === 'data:') return;

	        var worker = construct(W, args);

	        worker.onmessage = function (event) {
	          var _event$data2 = event.data,
	              type = _event$data2.type,
	              data = _event$data2.data;

	          switch (type) {
	            case 'blr-load':
	              if (data.done || !that.loading) return;
	              that.worker.postMessage({
	                type: 'load',
	                data: data.value
	              });
	              break;
	          }
	        };

	        return worker;
	      };
	    }
	  }, {
	    key: "analysis",
	    value: function analysis() {
	      window._hmt = window._hmt || [];
	      var hm = document.createElement('script');
	      hm.src = 'https://hm.baidu.com/hm.js?3c93ca28120f48d2a27889d0623cd7b7';
	      var s = document.getElementsByTagName('script')[0];
	      s.parentNode.insertBefore(hm, s);
	    }
	  }]);

	  return Injected;
	}();

	var index = new Injected();

	return index;

}());
//# sourceMappingURL=index.js.map
