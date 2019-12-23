var BilibiliLiveHimeActive = (function () {
  'use strict';

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

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var _typeof_1 = createCommonjsModule(function (module) {
  function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

  function _typeof(obj) {
    if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
      module.exports = _typeof = function _typeof(obj) {
        return _typeof2(obj);
      };
    } else {
      module.exports = _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
      };
    }

    return _typeof(obj);
  }

  module.exports = _typeof;
  });

  /*!
  * Bilibili HTML5 Live Player v1.9.2 (304-54f7b3b9)
  * 
  * Copyright 2016 - 2019 bilibili, Inc.
  * Released in Tue Dec 10 2019 20:56:25 GMT+0800 (GMT+08:00)
  */

  /* eslint-disable */
  !function (e) {
    var t = {};

    function n(i) {
      if (t[i]) return t[i].exports;
      var r = t[i] = {
        i: i,
        l: !1,
        exports: {}
      };
      return e[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
    }

    n.m = e, n.c = t, n.d = function (e, t, i) {
      n.o(e, t) || Object.defineProperty(e, t, {
        enumerable: !0,
        get: i
      });
    }, n.r = function (e) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(e, "__esModule", {
        value: !0
      });
    }, n.t = function (e, t) {
      if (1 & t && (e = n(e)), 8 & t) return e;
      if (4 & t && "object" == _typeof_1(e) && e && e.__esModule) return e;
      var i = Object.create(null);
      if (n.r(i), Object.defineProperty(i, "default", {
        enumerable: !0,
        value: e
      }), 2 & t && "string" != typeof e) for (var r in e) {
        n.d(i, r, function (t) {
          return e[t];
        }.bind(null, r));
      }
      return i;
    }, n.n = function (e) {
      var t = e && e.__esModule ? function () {
        return e["default"];
      } : function () {
        return e;
      };
      return n.d(t, "a", t), t;
    }, n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 22);
  }({
    22: function _(e, t, n) {
      window.DanmakuWebSocket = n(25);
    },
    25: function _(e, t) {
      var n, i;
      n = "undefined" != typeof self ? self : this, i = function i() {
        return function (e) {
          function t(i) {
            if (n[i]) return n[i].exports;
            var r = n[i] = {
              i: i,
              l: !1,
              exports: {}
            };
            return e[i].call(r.exports, r, r.exports, t), r.l = !0, r.exports;
          }

          var n = {};
          return t.m = e, t.c = n, t.d = function (e, n, i) {
            t.o(e, n) || Object.defineProperty(e, n, {
              configurable: !1,
              enumerable: !0,
              get: i
            });
          }, t.n = function (e) {
            var n = e && e.__esModule ? function () {
              return e["default"];
            } : function () {
              return e;
            };
            return t.d(n, "a", n), n;
          }, t.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
          }, t.p = "", t(t.s = 1);
        }([function (e, t, n) {

          t.a = {
            WS_OP_HEARTBEAT: 2,
            WS_OP_HEARTBEAT_REPLY: 3,
            WS_OP_MESSAGE: 5,
            WS_OP_USER_AUTHENTICATION: 7,
            WS_OP_CONNECT_SUCCESS: 8,
            WS_PACKAGE_HEADER_TOTAL_LENGTH: 16,
            WS_PACKAGE_OFFSET: 0,
            WS_HEADER_OFFSET: 4,
            WS_VERSION_OFFSET: 6,
            WS_OPERATION_OFFSET: 8,
            WS_SEQUENCE_OFFSET: 12,
            WS_BODY_PROTOCOL_VERSION_NORMAL: 0,
            WS_BODY_PROTOCOL_VERSION_DEFLATE: 2,
            WS_HEADER_DEFAULT_VERSION: 1,
            WS_HEADER_DEFAULT_OPERATION: 1,
            WS_HEADER_DEFAULT_SEQUENCE: 1,
            WS_AUTH_OK: 0,
            WS_AUTH_TOKEN_ERROR: -101
          };
        }, function (e, t, n) {
          var i = n(2)["default"];
          e.exports = i;
        }, function (e, t, n) {

          Object.defineProperty(t, "__esModule", {
            value: !0
          });

          var i = n(3),
              r = function () {
            function e(e, t) {
              for (var n = 0; n < t.length; n++) {
                var i = t[n];
                i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(e, i.key, i);
              }
            }

            return function (t, n, i) {
              return n && e(t.prototype, n), i && e(t, i), t;
            };
          }(),
              o = function () {
            function e(t) {
              return function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
              }(this, e), "development" === e.CONFIG.bundleType && (console.clear(), console.dir(e.CONFIG)), this.initialize(t);
            }

            return e.prototype.initialize = function (t) {
              return "development" === e.CONFIG.bundleType && console.log("App Initialized."), this.ws = new i.a(t), this.getReturn();
            }, e.prototype.getReturn = function () {
              return "development" === e.CONFIG.bundleType ? this : {
                destroy: this.destroy.bind(this),
                send: this.send.bind(this),
                getAuthInfo: this.getAuthInfo.bind(this),
                getRetryCount: this.getRetryCount.bind(this)
              };
            }, e.prototype.destroy = function () {
              this.ws && this.ws.destroy();
            }, e.prototype.send = function (e) {
              this.ws && this.ws.send(e);
            }, e.prototype.getAuthInfo = function () {
              return this.ws && this.ws.getAuthInfo();
            }, e.prototype.getRetryCount = function () {
              return this.ws && this.ws.getRetryCount();
            }, r(e, null, [{
              key: "CONFIG",
              get: function get() {
                return {
                  version: "1.3.4",
                  gitHash: "151ab1a1",
                  build: "27",
                  bundleType: "release"
                };
              }
            }]), e;
          }();

          t["default"] = o;
        }, function (e, t, n) {

          var i = n(0),
              r = n(4),
              o = n(5),
              a = n(6).inflate,
              s = function () {
            function e(t) {
              if (function (e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
              }(this, e), e.checkOptions(t)) {
                var n = {
                  url: "",
                  urlList: [],
                  rid: 0,
                  aid: 0,
                  uid: 0,
                  from: -1,
                  retry: !0,
                  retryMaxCount: 0,
                  retryInterval: 5,
                  retryThreadCount: 10,
                  retryRoundInterval: Math.floor(2 * Math.random()) + 3,
                  customAuthParam: [],
                  fallback: function fallback() {},
                  heartBeatInterval: 30,
                  onReceivedMessage: function onReceivedMessage() {},
                  onReceiveAuthRes: function onReceiveAuthRes() {},
                  onHeartBeatReply: function onHeartBeatReply() {},
                  onInitialized: function onInitialized() {},
                  onOpen: function onOpen() {},
                  onClose: function onClose() {},
                  onError: function onError() {},
                  onListConnectError: function onListConnectError() {}
                };
                this.options = o.a.extend({}, n, t), this.wsBinaryHeaderList = o.a.extend([], r.a), this.authInfo = {
                  origin: "",
                  encode: ""
                }, 0 !== this.options.urlList.length && 0 !== this.options.retryMaxCount && this.options.retryMaxCount < this.options.urlList.length && (this.options.retryMaxCount = this.options.urlList.length - 1), this.state = {
                  retryCount: 0,
                  listConnectFinishedCount: 0,
                  index: 0
                }, this.callbackQueueList = {
                  onInitializedQueue: [],
                  onOpenQueue: [],
                  onCloseQueue: [],
                  onErrorQueue: [],
                  onReceivedMessageQueue: [],
                  onHeartBeatReplyQueue: [],
                  onRetryFallbackQueue: [],
                  onListConnectErrorQueue: [],
                  onReceiveAuthResQueue: []
                }, this.HEART_BEAT_INTERVAL = 0, this.mixinCallback().initialize(this.options.urlList.length > 0 ? this.options.urlList[0] : this.options.url);
              }
            }

            return e.prototype.initialize = function (e) {
              var t = "MozWebSocket" in window ? window.MozWebSocket : window.WebSocket,
                  n = this.options;

              try {
                this.ws = new t(e), this.ws.binaryType = "arraybuffer", this.ws.onopen = this.onOpen.bind(this), this.ws.onmessage = this.onMessage.bind(this), this.ws.onclose = this.onClose.bind(this), this.ws.onerror = this.onError.bind(this), o.a.callFunction(this.callbackQueueList.onInitializedQueue), this.callbackQueueList.onInitializedQueue = [];
              } catch (e) {
                "function" == typeof n.fallback && n.fallback();
              }

              return this;
            }, e.prototype.onOpen = function () {
              return o.a.callFunction(this.callbackQueueList.onOpenQueue), this.userAuthentication(), this;
            }, e.prototype.userAuthentication = function () {
              var e,
                  t = this,
                  n = this.options,
                  r = {
                uid: parseInt(n.uid, 10),
                roomid: parseInt(n.rid, 10),
                protover: parseInt(n.protover, 10) || i.a.WS_BODY_PROTOCOL_VERSION_NORMAL
              };
              n.aid && (r.aid = parseInt(n.aid, 10)), n.from > 0 && (r.from = parseInt(n.from, 10) || 7);

              for (var o = 0; o < n.customAuthParam.length; o++) {
                var a = n.customAuthParam[o],
                    s = a.type || "string";

                switch (void 0 !== r[a.key] && console.error("Token has the same key already! 【" + a.key + "】"), a.key.toString() && a.value.toString() || console.error("Invalid customAuthParam, missing key or value! 【" + a.key + "】-【" + a.value + "】"), s) {
                  case "string":
                    r[a.key] = a.value;
                    break;

                  case "number":
                    r[a.key] = parseInt(a.value, 10);
                    break;

                  case "boolean":
                    r[a.key] = !!r[a.value];
                    break;

                  default:
                    return void console.error("Unsupported customAuthParam type!【" + s + "】");
                }
              }

              e = this.convertToArrayBuffer(JSON.stringify(r), i.a.WS_OP_USER_AUTHENTICATION), this.authInfo.origin = r, this.authInfo.encode = e, setTimeout(function () {
                t.ws.send(e);
              }, 0);
            }, e.prototype.getAuthInfo = function () {
              return this.authInfo;
            }, e.prototype.heartBeat = function () {
              var e = this;
              clearTimeout(this.HEART_BEAT_INTERVAL);
              var t = this.convertToArrayBuffer({}, i.a.WS_OP_HEARTBEAT);
              this.ws.send(t), this.HEART_BEAT_INTERVAL = setTimeout(function () {
                e.heartBeat();
              }, 1e3 * this.options.heartBeatInterval);
            }, e.prototype.onMessage = function (e) {
              var t = this;

              try {
                var n = this.convertToObject(e.data);
                if (n instanceof Array) n.forEach(function (e) {
                  t.onMessage(e);
                });else if (n instanceof Object) switch (n.op) {
                  case i.a.WS_OP_HEARTBEAT_REPLY:
                    this.onHeartBeatReply(n.body);
                    break;

                  case i.a.WS_OP_MESSAGE:
                    this.onMessageReply(n.body);
                    break;

                  case i.a.WS_OP_CONNECT_SUCCESS:
                    if (0 !== n.body.length && n.body[0]) switch (n.body[0].code) {
                      case i.a.WS_AUTH_OK:
                        this.heartBeat();
                        break;

                      case i.a.WS_AUTH_TOKEN_ERROR:
                        this.options.retry = !1, "function" == typeof this.options.onReceiveAuthRes && this.options.onReceiveAuthRes(n.body);
                        break;

                      default:
                        this.onClose();
                    } else this.heartBeat();
                }
              } catch (e) {
                console.error("WebSocket Error: ", e);
              }

              return this;
            }, e.prototype.onMessageReply = function (e) {
              var t = this;

              try {
                e instanceof Array ? e.forEach(function (e) {
                  t.onMessageReply(e);
                }) : e instanceof Object && "function" == typeof this.options.onReceivedMessage && this.options.onReceivedMessage(e);
              } catch (e) {
                console.error("On Message Resolve Error: ", e);
              }
            }, e.prototype.onHeartBeatReply = function (e) {
              o.a.callFunction(this.callbackQueueList.onHeartBeatReplyQueue, e);
            }, e.prototype.onClose = function () {
              var e = this,
                  t = this.options.urlList.length;
              return o.a.callFunction(this.callbackQueueList.onCloseQueue), clearTimeout(this.HEART_BEAT_INTERVAL), this.options.retry ? (this.checkRetryState() ? setTimeout(function () {
                console.error("Danmaku Websocket Retry .", e.state.retryCount), e.state.index += 1, 0 === t || e.state.retryCount > e.options.retryThreadCount ? setTimeout(function () {
                  e.initialize(e.options.url);
                }, 1e3 * e.options.retryRoundInterval) : 0 !== t && e.state.index > t - 1 ? (e.state.index = 0, e.state.listConnectFinishedCount += 1, 1 === e.state.listConnectFinishedCount && o.a.callFunction(e.callbackQueueList.onListConnectErrorQueue), setTimeout(function () {
                  e.initialize(e.options.urlList[e.state.index]);
                }, 1e3 * e.options.retryRoundInterval)) : e.initialize(e.options.urlList[e.state.index]);
              }, 1e3 * this.options.retryInterval) : (console.error("Danmaku Websocket Retry Failed."), o.a.callFunction(this.callbackQueueList.onRetryFallbackQueue)), this) : this;
            }, e.prototype.onError = function (e) {
              return console.error("Danmaku Websocket On Error.", e), o.a.callFunction(this.callbackQueueList.onErrorQueue, e), this;
            }, e.prototype.destroy = function () {
              clearTimeout(this.HEART_BEAT_INTERVAL), this.options.retry = !1, this.ws && this.ws.close(), this.ws = null;
            }, e.prototype.convertToArrayBuffer = function (e, t) {
              this.encoder || (this.encoder = o.a.getEncoder());
              var n = new ArrayBuffer(i.a.WS_PACKAGE_HEADER_TOTAL_LENGTH),
                  r = new DataView(n, i.a.WS_PACKAGE_OFFSET),
                  a = this.encoder.encode(e);
              return r.setInt32(i.a.WS_PACKAGE_OFFSET, i.a.WS_PACKAGE_HEADER_TOTAL_LENGTH + a.byteLength), this.wsBinaryHeaderList[2].value = t, this.wsBinaryHeaderList.forEach(function (e) {
                4 === e.bytes ? r.setInt32(e.offset, e.value) : 2 === e.bytes && r.setInt16(e.offset, e.value);
              }), o.a.mergeArrayBuffer(n, a);
            }, e.prototype.convertToObject = function (e) {
              var t = new DataView(e),
                  n = {
                body: []
              };
              if (n.packetLen = t.getInt32(i.a.WS_PACKAGE_OFFSET), this.wsBinaryHeaderList.forEach(function (e) {
                4 === e.bytes ? n[e.key] = t.getInt32(e.offset) : 2 === e.bytes && (n[e.key] = t.getInt16(e.offset));
              }), n.packetLen < e.byteLength && this.convertToObject(e.slice(0, n.packetLen)), this.decoder || (this.decoder = o.a.getDecoder()), !n.op || i.a.WS_OP_MESSAGE !== n.op && n.op !== i.a.WS_OP_CONNECT_SUCCESS) n.op && i.a.WS_OP_HEARTBEAT_REPLY === n.op && (n.body = {
                count: t.getInt32(i.a.WS_PACKAGE_HEADER_TOTAL_LENGTH)
              });else for (var r = i.a.WS_PACKAGE_OFFSET, s = n.packetLen, u = "", c = ""; r < e.byteLength; r += s) {
                s = t.getInt32(r), u = t.getInt16(r + i.a.WS_HEADER_OFFSET);

                try {
                  if (n.ver === i.a.WS_BODY_PROTOCOL_VERSION_DEFLATE) {
                    var l = e.slice(r + u, r + s),
                        f = a(new Uint8Array(l));
                    c = this.convertToObject(f.buffer).body;
                  } else {
                    var d = this.decoder.decode(e.slice(r + u, r + s));
                    c = 0 !== d.length ? JSON.parse(d) : null;
                  }

                  c && n.body.push(c);
                } catch (t) {
                  console.error("decode body error:", new Uint8Array(e), n, t);
                }
              }
              return n;
            }, e.prototype.send = function (e) {
              this.ws && this.ws.send(e);
            }, e.prototype.addCallback = function (e, t) {
              return "function" == typeof e && t instanceof Array && t.push(e), this;
            }, e.prototype.mixinCallback = function () {
              var e = this.options,
                  t = this.callbackQueueList;
              return this.addCallback(e.onReceivedMessage, t.onReceivedMessageQueue).addCallback(e.onHeartBeatReply, t.onHeartBeatReplyQueue).addCallback(e.onInitialized, t.onInitializedQueue).addCallback(e.onOpen, t.onOpenQueue).addCallback(e.onClose, t.onCloseQueue).addCallback(e.onError, t.onErrorQueue).addCallback(e.onRetryFallback, t.onRetryFallbackQueue).addCallback(e.onListConnectError, t.onListConnectErrorQueue).addCallback(e.onReceiveAuthRes, t.onReceiveAuthResQueue), this;
            }, e.prototype.getRetryCount = function () {
              return this.state.retryCount;
            }, e.prototype.checkRetryState = function () {
              var e = this.options,
                  t = !1;
              return (0 === e.retryMaxCount || this.state.retryCount < e.retryMaxCount) && (this.state.retryCount += 1, t = !0), t;
            }, e.checkOptions = function (e) {
              return e || e instanceof Object ? e.url ? !!e.rid || (console.error("WebSocket Initialize options rid(cid) missing."), !1) : (console.error("WebSocket Initialize options url missing."), !1) : (console.error("WebSocket Initialize options missing or error.", e), !1);
            }, e;
          }();

          t.a = s;
        }, function (e, t, n) {

          var i = n(0),
              r = [{
            name: "Header Length",
            key: "headerLen",
            bytes: 2,
            offset: i.a.WS_HEADER_OFFSET,
            value: i.a.WS_PACKAGE_HEADER_TOTAL_LENGTH
          }, {
            name: "Protocol Version",
            key: "ver",
            bytes: 2,
            offset: i.a.WS_VERSION_OFFSET,
            value: i.a.WS_HEADER_DEFAULT_VERSION
          }, {
            name: "Operation",
            key: "op",
            bytes: 4,
            offset: i.a.WS_OPERATION_OFFSET,
            value: i.a.WS_HEADER_DEFAULT_OPERATION
          }, {
            name: "Sequence Id",
            key: "seq",
            bytes: 4,
            offset: i.a.WS_SEQUENCE_OFFSET,
            value: i.a.WS_HEADER_DEFAULT_SEQUENCE
          }];
          t.a = r;
        }, function (e, t, n) {

          var i = {
            getDecoder: function getDecoder() {
              return window.TextDecoder ? new window.TextDecoder() : {
                decode: function decode(e) {
                  return decodeURIComponent(window.escape(String.fromCharCode.apply(String, new Uint8Array(e))));
                }
              };
            },
            getEncoder: function getEncoder() {
              return window.TextEncoder ? new window.TextEncoder() : {
                encode: function encode(e) {
                  for (var t = new ArrayBuffer(e.length), n = new Uint8Array(t), i = 0, r = e.length; i < r; i++) {
                    n[i] = e.charCodeAt(i);
                  }

                  return t;
                }
              };
            },
            mergeArrayBuffer: function mergeArrayBuffer(e, t) {
              var n = new Uint8Array(e),
                  i = new Uint8Array(t),
                  r = new Uint8Array(n.byteLength + i.byteLength);
              return r.set(n, 0), r.set(i, n.byteLength), r.buffer;
            },
            callFunction: function callFunction(e, t) {
              return e instanceof Array && e.length ? (e.forEach(function (e) {
                return "function" == typeof e && e(t);
              }), null) : "function" == typeof e && e(t);
            },
            extend: function extend(e) {
              for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++) {
                n[i - 1] = arguments[i];
              }

              var r = e || {};
              return r instanceof Object && n.forEach(function (e) {
                e instanceof Object && Object.keys(e).forEach(function (t) {
                  r[t] = e[t];
                });
              }), r;
            }
          };
          t.a = i;
        }, function (e, t, n) {
          var i;

          e.exports = function e(t, n, r) {
            function o(s, u) {
              if (!n[s]) {
                if (!t[s]) {
                  if (!u && "function" == typeof i && i) return i();
                  if (a) return a(s, !0);
                  var c = new Error("Cannot find module '" + s + "'");
                  throw c.code = "MODULE_NOT_FOUND", c;
                }

                var l = n[s] = {
                  exports: {}
                };
                t[s][0].call(l.exports, function (e) {
                  return o(t[s][1][e] || e);
                }, l, l.exports, e, t, n, r);
              }

              return n[s].exports;
            }

            for (var a = "function" == typeof i , s = 0; s < r.length; s++) {
              o(r[s]);
            }

            return o;
          }({
            1: [function (e, t, n) {

              var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
              n.assign = function (e) {
                for (var t, n, i = Array.prototype.slice.call(arguments, 1); i.length;) {
                  var r = i.shift();

                  if (r) {
                    if ("object" != _typeof_1(r)) throw new TypeError(r + "must be non-object");

                    for (var o in r) {
                      t = r, n = o, Object.prototype.hasOwnProperty.call(t, n) && (e[o] = r[o]);
                    }
                  }
                }

                return e;
              }, n.shrinkBuf = function (e, t) {
                return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t, e);
              };
              var r = {
                arraySet: function arraySet(e, t, n, i, r) {
                  if (t.subarray && e.subarray) e.set(t.subarray(n, n + i), r);else for (var o = 0; o < i; o++) {
                    e[r + o] = t[n + o];
                  }
                },
                flattenChunks: function flattenChunks(e) {
                  var t, n, i, r, o, a;

                  for (t = i = 0, n = e.length; t < n; t++) {
                    i += e[t].length;
                  }

                  for (a = new Uint8Array(i), t = r = 0, n = e.length; t < n; t++) {
                    o = e[t], a.set(o, r), r += o.length;
                  }

                  return a;
                }
              },
                  o = {
                arraySet: function arraySet(e, t, n, i, r) {
                  for (var o = 0; o < i; o++) {
                    e[r + o] = t[n + o];
                  }
                },
                flattenChunks: function flattenChunks(e) {
                  return [].concat.apply([], e);
                }
              };
              n.setTyped = function (e) {
                e ? (n.Buf8 = Uint8Array, n.Buf16 = Uint16Array, n.Buf32 = Int32Array, n.assign(n, r)) : (n.Buf8 = Array, n.Buf16 = Array, n.Buf32 = Array, n.assign(n, o));
              }, n.setTyped(i);
            }, {}],
            2: [function (e, t, n) {

              function i(e, t) {
                if (t < 65534 && (e.subarray && a || !e.subarray && o)) return String.fromCharCode.apply(null, r.shrinkBuf(e, t));

                for (var n = "", i = 0; i < t; i++) {
                  n += String.fromCharCode(e[i]);
                }

                return n;
              }

              var r = e("./common"),
                  o = !0,
                  a = !0;

              try {
                String.fromCharCode.apply(null, [0]);
              } catch (e) {
                o = !1;
              }

              try {
                String.fromCharCode.apply(null, new Uint8Array(1));
              } catch (e) {
                a = !1;
              }

              for (var s = new r.Buf8(256), u = 0; u < 256; u++) {
                s[u] = 252 <= u ? 6 : 248 <= u ? 5 : 240 <= u ? 4 : 224 <= u ? 3 : 192 <= u ? 2 : 1;
              }

              s[254] = s[254] = 1, n.string2buf = function (e) {
                var t,
                    n,
                    i,
                    o,
                    a,
                    s = e.length,
                    u = 0;

                for (o = 0; o < s; o++) {
                  55296 == (64512 & (n = e.charCodeAt(o))) && o + 1 < s && 56320 == (64512 & (i = e.charCodeAt(o + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320), o++), u += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
                }

                for (t = new r.Buf8(u), o = a = 0; a < u; o++) {
                  55296 == (64512 & (n = e.charCodeAt(o))) && o + 1 < s && 56320 == (64512 & (i = e.charCodeAt(o + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320), o++), t[a++] = n < 128 ? n : (t[a++] = n < 2048 ? 192 | n >>> 6 : (t[a++] = n < 65536 ? 224 | n >>> 12 : (t[a++] = 240 | n >>> 18, 128 | n >>> 12 & 63), 128 | n >>> 6 & 63), 128 | 63 & n);
                }

                return t;
              }, n.buf2binstring = function (e) {
                return i(e, e.length);
              }, n.binstring2buf = function (e) {
                for (var t = new r.Buf8(e.length), n = 0, i = t.length; n < i; n++) {
                  t[n] = e.charCodeAt(n);
                }

                return t;
              }, n.buf2string = function (e, t) {
                var n,
                    r,
                    o,
                    a,
                    u = t || e.length,
                    c = new Array(2 * u);

                for (n = r = 0; n < u;) {
                  if ((o = e[n++]) < 128) c[r++] = o;else if (4 < (a = s[o])) c[r++] = 65533, n += a - 1;else {
                    for (o &= 2 === a ? 31 : 3 === a ? 15 : 7; 1 < a && n < u;) {
                      o = o << 6 | 63 & e[n++], a--;
                    }

                    c[r++] = 1 < a ? 65533 : o < 65536 ? o : (o -= 65536, c[r++] = 55296 | o >> 10 & 1023, 56320 | 1023 & o);
                  }
                }

                return i(c, r);
              }, n.utf8border = function (e, t) {
                var n;

                for ((t = t || e.length) > e.length && (t = e.length), n = t - 1; 0 <= n && 128 == (192 & e[n]);) {
                  n--;
                }

                return n < 0 ? t : 0 === n ? t : n + s[e[n]] > t ? n : t;
              };
            }, {
              "./common": 1
            }],
            3: [function (e, t, n) {

              t.exports = function (e, t, n, i) {
                for (var r = 65535 & e | 0, o = e >>> 16 & 65535 | 0, a = 0; 0 !== n;) {
                  for (n -= a = 2e3 < n ? 2e3 : n; o = o + (r = r + t[i++] | 0) | 0, --a;) {
                  }

                  r %= 65521, o %= 65521;
                }

                return r | o << 16 | 0;
              };
            }, {}],
            4: [function (e, t, n) {

              t.exports = {
                Z_NO_FLUSH: 0,
                Z_PARTIAL_FLUSH: 1,
                Z_SYNC_FLUSH: 2,
                Z_FULL_FLUSH: 3,
                Z_FINISH: 4,
                Z_BLOCK: 5,
                Z_TREES: 6,
                Z_OK: 0,
                Z_STREAM_END: 1,
                Z_NEED_DICT: 2,
                Z_ERRNO: -1,
                Z_STREAM_ERROR: -2,
                Z_DATA_ERROR: -3,
                Z_BUF_ERROR: -5,
                Z_NO_COMPRESSION: 0,
                Z_BEST_SPEED: 1,
                Z_BEST_COMPRESSION: 9,
                Z_DEFAULT_COMPRESSION: -1,
                Z_FILTERED: 1,
                Z_HUFFMAN_ONLY: 2,
                Z_RLE: 3,
                Z_FIXED: 4,
                Z_DEFAULT_STRATEGY: 0,
                Z_BINARY: 0,
                Z_TEXT: 1,
                Z_UNKNOWN: 2,
                Z_DEFLATED: 8
              };
            }, {}],
            5: [function (e, t, n) {

              var i = function () {
                for (var e, t = [], n = 0; n < 256; n++) {
                  e = n;

                  for (var i = 0; i < 8; i++) {
                    e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                  }

                  t[n] = e;
                }

                return t;
              }();

              t.exports = function (e, t, n, r) {
                var o = i,
                    a = r + n;
                e ^= -1;

                for (var s = r; s < a; s++) {
                  e = e >>> 8 ^ o[255 & (e ^ t[s])];
                }

                return -1 ^ e;
              };
            }, {}],
            6: [function (e, t, n) {

              t.exports = function () {
                this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = !1;
              };
            }, {}],
            7: [function (e, t, n) {

              t.exports = function (e, t) {
                var n, i, r, o, a, s, u, c, l, f, d, h, b, _, p, y, w, k, m, g, E, v, A, S, O;

                n = e.state, i = e.next_in, S = e.input, r = i + (e.avail_in - 5), o = e.next_out, O = e.output, a = o - (t - e.avail_out), s = o + (e.avail_out - 257), u = n.dmax, c = n.wsize, l = n.whave, f = n.wnext, d = n.window, h = n.hold, b = n.bits, _ = n.lencode, p = n.distcode, y = (1 << n.lenbits) - 1, w = (1 << n.distbits) - 1;

                e: do {
                  b < 15 && (h += S[i++] << b, b += 8, h += S[i++] << b, b += 8), k = _[h & y];

                  t: for (;;) {
                    if (h >>>= m = k >>> 24, b -= m, 0 == (m = k >>> 16 & 255)) O[o++] = 65535 & k;else {
                      if (!(16 & m)) {
                        if (0 == (64 & m)) {
                          k = _[(65535 & k) + (h & (1 << m) - 1)];
                          continue t;
                        }

                        if (32 & m) {
                          n.mode = 12;
                          break e;
                        }

                        e.msg = "invalid literal/length code", n.mode = 30;
                        break e;
                      }

                      g = 65535 & k, (m &= 15) && (b < m && (h += S[i++] << b, b += 8), g += h & (1 << m) - 1, h >>>= m, b -= m), b < 15 && (h += S[i++] << b, b += 8, h += S[i++] << b, b += 8), k = p[h & w];

                      n: for (;;) {
                        if (h >>>= m = k >>> 24, b -= m, !(16 & (m = k >>> 16 & 255))) {
                          if (0 == (64 & m)) {
                            k = p[(65535 & k) + (h & (1 << m) - 1)];
                            continue n;
                          }

                          e.msg = "invalid distance code", n.mode = 30;
                          break e;
                        }

                        if (E = 65535 & k, b < (m &= 15) && (h += S[i++] << b, (b += 8) < m && (h += S[i++] << b, b += 8)), u < (E += h & (1 << m) - 1)) {
                          e.msg = "invalid distance too far back", n.mode = 30;
                          break e;
                        }

                        if (h >>>= m, b -= m, (m = o - a) < E) {
                          if (l < (m = E - m) && n.sane) {
                            e.msg = "invalid distance too far back", n.mode = 30;
                            break e;
                          }

                          if (A = d, (v = 0) === f) {
                            if (v += c - m, m < g) {
                              for (g -= m; O[o++] = d[v++], --m;) {
                              }

                              v = o - E, A = O;
                            }
                          } else if (f < m) {
                            if (v += c + f - m, (m -= f) < g) {
                              for (g -= m; O[o++] = d[v++], --m;) {
                              }

                              if (v = 0, f < g) {
                                for (g -= m = f; O[o++] = d[v++], --m;) {
                                }

                                v = o - E, A = O;
                              }
                            }
                          } else if (v += f - m, m < g) {
                            for (g -= m; O[o++] = d[v++], --m;) {
                            }

                            v = o - E, A = O;
                          }

                          for (; 2 < g;) {
                            O[o++] = A[v++], O[o++] = A[v++], O[o++] = A[v++], g -= 3;
                          }

                          g && (O[o++] = A[v++], 1 < g && (O[o++] = A[v++]));
                        } else {
                          for (v = o - E; O[o++] = O[v++], O[o++] = O[v++], O[o++] = O[v++], 2 < (g -= 3);) {
                          }

                          g && (O[o++] = O[v++], 1 < g && (O[o++] = O[v++]));
                        }

                        break;
                      }
                    }
                    break;
                  }
                } while (i < r && o < s);

                i -= g = b >> 3, h &= (1 << (b -= g << 3)) - 1, e.next_in = i, e.next_out = o, e.avail_in = i < r ? r - i + 5 : 5 - (i - r), e.avail_out = o < s ? s - o + 257 : 257 - (o - s), n.hold = h, n.bits = b;
              };
            }, {}],
            8: [function (e, t, n) {

              function i(e) {
                return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24);
              }

              function r(e) {
                var t;
                return e && e.state ? (t = e.state, e.total_in = e.total_out = t.total = 0, e.msg = "", t.wrap && (e.adler = 1 & t.wrap), t.mode = g, t.last = 0, t.havedict = 0, t.dmax = 32768, t.head = null, t.hold = 0, t.bits = 0, t.lencode = t.lendyn = new d.Buf32(E), t.distcode = t.distdyn = new d.Buf32(v), t.sane = 1, t.back = -1, k) : m;
              }

              function o(e) {
                var t;
                return e && e.state ? ((t = e.state).wsize = 0, t.whave = 0, t.wnext = 0, r(e)) : m;
              }

              function a(e, t) {
                var n, i;
                return e && e.state ? (i = e.state, t < 0 ? (n = 0, t = -t) : (n = 1 + (t >> 4), t < 48 && (t &= 15)), t && (t < 8 || 15 < t) ? m : (null !== i.window && i.wbits !== t && (i.window = null), i.wrap = n, i.wbits = t, o(e))) : m;
              }

              function s(e, t) {
                var n, i;
                return e ? (i = new function () {
                  this.mode = 0, this.last = !1, this.wrap = 0, this.havedict = !1, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new d.Buf16(320), this.work = new d.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
                }(), (e.state = i).window = null, (n = a(e, t)) !== k && (e.state = null), n) : m;
              }

              function u(e) {
                if (A) {
                  var t;

                  for (l = new d.Buf32(512), f = new d.Buf32(32), t = 0; t < 144;) {
                    e.lens[t++] = 8;
                  }

                  for (; t < 256;) {
                    e.lens[t++] = 9;
                  }

                  for (; t < 280;) {
                    e.lens[t++] = 7;
                  }

                  for (; t < 288;) {
                    e.lens[t++] = 8;
                  }

                  for (p(y, e.lens, 0, 288, l, 0, e.work, {
                    bits: 9
                  }), t = 0; t < 32;) {
                    e.lens[t++] = 5;
                  }

                  p(w, e.lens, 0, 32, f, 0, e.work, {
                    bits: 5
                  }), A = !1;
                }

                e.lencode = l, e.lenbits = 9, e.distcode = f, e.distbits = 5;
              }

              function c(e, t, n, i) {
                var r,
                    o = e.state;
                return null === o.window && (o.wsize = 1 << o.wbits, o.wnext = 0, o.whave = 0, o.window = new d.Buf8(o.wsize)), i >= o.wsize ? (d.arraySet(o.window, t, n - o.wsize, o.wsize, 0), o.wnext = 0, o.whave = o.wsize) : (i < (r = o.wsize - o.wnext) && (r = i), d.arraySet(o.window, t, n - i, r, o.wnext), (i -= r) ? (d.arraySet(o.window, t, n - i, i, 0), o.wnext = i, o.whave = o.wsize) : (o.wnext += r, o.wnext === o.wsize && (o.wnext = 0), o.whave < o.wsize && (o.whave += r))), 0;
              }

              var l,
                  f,
                  d = e("../utils/common"),
                  h = e("./adler32"),
                  b = e("./crc32"),
                  _ = e("./inffast"),
                  p = e("./inftrees"),
                  y = 1,
                  w = 2,
                  k = 0,
                  m = -2,
                  g = 1,
                  E = 852,
                  v = 592,
                  A = !0;

              n.inflateReset = o, n.inflateReset2 = a, n.inflateResetKeep = r, n.inflateInit = function (e) {
                return s(e, 15);
              }, n.inflateInit2 = s, n.inflate = function (e, t) {
                var n,
                    r,
                    o,
                    a,
                    s,
                    l,
                    f,
                    E,
                    v,
                    A,
                    S,
                    O,
                    T,
                    R,
                    C,
                    x,
                    I,
                    L,
                    B,
                    F,
                    N,
                    H,
                    D,
                    W,
                    P = 0,
                    U = new d.Buf8(4),
                    z = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in) return m;
                12 === (n = e.state).mode && (n.mode = 13), s = e.next_out, o = e.output, f = e.avail_out, a = e.next_in, r = e.input, l = e.avail_in, E = n.hold, v = n.bits, A = l, S = f, H = k;

                e: for (;;) {
                  switch (n.mode) {
                    case g:
                      if (0 === n.wrap) {
                        n.mode = 13;
                        break;
                      }

                      for (; v < 16;) {
                        if (0 === l) break e;
                        l--, E += r[a++] << v, v += 8;
                      }

                      if (2 & n.wrap && 35615 === E) {
                        U[n.check = 0] = 255 & E, U[1] = E >>> 8 & 255, n.check = b(n.check, U, 2, 0), v = E = 0, n.mode = 2;
                        break;
                      }

                      if (n.flags = 0, n.head && (n.head.done = !1), !(1 & n.wrap) || (((255 & E) << 8) + (E >> 8)) % 31) {
                        e.msg = "incorrect header check", n.mode = 30;
                        break;
                      }

                      if (8 != (15 & E)) {
                        e.msg = "unknown compression method", n.mode = 30;
                        break;
                      }

                      if (v -= 4, N = 8 + (15 & (E >>>= 4)), 0 === n.wbits) n.wbits = N;else if (N > n.wbits) {
                        e.msg = "invalid window size", n.mode = 30;
                        break;
                      }
                      n.dmax = 1 << N, e.adler = n.check = 1, n.mode = 512 & E ? 10 : 12, v = E = 0;
                      break;

                    case 2:
                      for (; v < 16;) {
                        if (0 === l) break e;
                        l--, E += r[a++] << v, v += 8;
                      }

                      if (n.flags = E, 8 != (255 & n.flags)) {
                        e.msg = "unknown compression method", n.mode = 30;
                        break;
                      }

                      if (57344 & n.flags) {
                        e.msg = "unknown header flags set", n.mode = 30;
                        break;
                      }

                      n.head && (n.head.text = E >> 8 & 1), 512 & n.flags && (U[0] = 255 & E, U[1] = E >>> 8 & 255, n.check = b(n.check, U, 2, 0)), v = E = 0, n.mode = 3;

                    case 3:
                      for (; v < 32;) {
                        if (0 === l) break e;
                        l--, E += r[a++] << v, v += 8;
                      }

                      n.head && (n.head.time = E), 512 & n.flags && (U[0] = 255 & E, U[1] = E >>> 8 & 255, U[2] = E >>> 16 & 255, U[3] = E >>> 24 & 255, n.check = b(n.check, U, 4, 0)), v = E = 0, n.mode = 4;

                    case 4:
                      for (; v < 16;) {
                        if (0 === l) break e;
                        l--, E += r[a++] << v, v += 8;
                      }

                      n.head && (n.head.xflags = 255 & E, n.head.os = E >> 8), 512 & n.flags && (U[0] = 255 & E, U[1] = E >>> 8 & 255, n.check = b(n.check, U, 2, 0)), v = E = 0, n.mode = 5;

                    case 5:
                      if (1024 & n.flags) {
                        for (; v < 16;) {
                          if (0 === l) break e;
                          l--, E += r[a++] << v, v += 8;
                        }

                        n.length = E, n.head && (n.head.extra_len = E), 512 & n.flags && (U[0] = 255 & E, U[1] = E >>> 8 & 255, n.check = b(n.check, U, 2, 0)), v = E = 0;
                      } else n.head && (n.head.extra = null);

                      n.mode = 6;

                    case 6:
                      if (1024 & n.flags && (l < (O = n.length) && (O = l), O && (n.head && (N = n.head.extra_len - n.length, n.head.extra || (n.head.extra = new Array(n.head.extra_len)), d.arraySet(n.head.extra, r, a, O, N)), 512 & n.flags && (n.check = b(n.check, r, O, a)), l -= O, a += O, n.length -= O), n.length)) break e;
                      n.length = 0, n.mode = 7;

                    case 7:
                      if (2048 & n.flags) {
                        if (0 === l) break e;

                        for (O = 0; N = r[a + O++], n.head && N && n.length < 65536 && (n.head.name += String.fromCharCode(N)), N && O < l;) {
                        }

                        if (512 & n.flags && (n.check = b(n.check, r, O, a)), l -= O, a += O, N) break e;
                      } else n.head && (n.head.name = null);

                      n.length = 0, n.mode = 8;

                    case 8:
                      if (4096 & n.flags) {
                        if (0 === l) break e;

                        for (O = 0; N = r[a + O++], n.head && N && n.length < 65536 && (n.head.comment += String.fromCharCode(N)), N && O < l;) {
                        }

                        if (512 & n.flags && (n.check = b(n.check, r, O, a)), l -= O, a += O, N) break e;
                      } else n.head && (n.head.comment = null);

                      n.mode = 9;

                    case 9:
                      if (512 & n.flags) {
                        for (; v < 16;) {
                          if (0 === l) break e;
                          l--, E += r[a++] << v, v += 8;
                        }

                        if (E !== (65535 & n.check)) {
                          e.msg = "header crc mismatch", n.mode = 30;
                          break;
                        }

                        v = E = 0;
                      }

                      n.head && (n.head.hcrc = n.flags >> 9 & 1, n.head.done = !0), e.adler = n.check = 0, n.mode = 12;
                      break;

                    case 10:
                      for (; v < 32;) {
                        if (0 === l) break e;
                        l--, E += r[a++] << v, v += 8;
                      }

                      e.adler = n.check = i(E), v = E = 0, n.mode = 11;

                    case 11:
                      if (0 === n.havedict) return e.next_out = s, e.avail_out = f, e.next_in = a, e.avail_in = l, n.hold = E, n.bits = v, 2;
                      e.adler = n.check = 1, n.mode = 12;

                    case 12:
                      if (5 === t || 6 === t) break e;

                    case 13:
                      if (n.last) {
                        E >>>= 7 & v, v -= 7 & v, n.mode = 27;
                        break;
                      }

                      for (; v < 3;) {
                        if (0 === l) break e;
                        l--, E += r[a++] << v, v += 8;
                      }

                      switch (n.last = 1 & E, v -= 1, 3 & (E >>>= 1)) {
                        case 0:
                          n.mode = 14;
                          break;

                        case 1:
                          if (u(n), n.mode = 20, 6 !== t) break;
                          E >>>= 2, v -= 2;
                          break e;

                        case 2:
                          n.mode = 17;
                          break;

                        case 3:
                          e.msg = "invalid block type", n.mode = 30;
                      }

                      E >>>= 2, v -= 2;
                      break;

                    case 14:
                      for (E >>>= 7 & v, v -= 7 & v; v < 32;) {
                        if (0 === l) break e;
                        l--, E += r[a++] << v, v += 8;
                      }

                      if ((65535 & E) != (E >>> 16 ^ 65535)) {
                        e.msg = "invalid stored block lengths", n.mode = 30;
                        break;
                      }

                      if (n.length = 65535 & E, v = E = 0, n.mode = 15, 6 === t) break e;

                    case 15:
                      n.mode = 16;

                    case 16:
                      if (O = n.length) {
                        if (l < O && (O = l), f < O && (O = f), 0 === O) break e;
                        d.arraySet(o, r, a, O, s), l -= O, a += O, f -= O, s += O, n.length -= O;
                        break;
                      }

                      n.mode = 12;
                      break;

                    case 17:
                      for (; v < 14;) {
                        if (0 === l) break e;
                        l--, E += r[a++] << v, v += 8;
                      }

                      if (n.nlen = 257 + (31 & E), E >>>= 5, v -= 5, n.ndist = 1 + (31 & E), E >>>= 5, v -= 5, n.ncode = 4 + (15 & E), E >>>= 4, v -= 4, 286 < n.nlen || 30 < n.ndist) {
                        e.msg = "too many length or distance symbols", n.mode = 30;
                        break;
                      }

                      n.have = 0, n.mode = 18;

                    case 18:
                      for (; n.have < n.ncode;) {
                        for (; v < 3;) {
                          if (0 === l) break e;
                          l--, E += r[a++] << v, v += 8;
                        }

                        n.lens[z[n.have++]] = 7 & E, E >>>= 3, v -= 3;
                      }

                      for (; n.have < 19;) {
                        n.lens[z[n.have++]] = 0;
                      }

                      if (n.lencode = n.lendyn, n.lenbits = 7, D = {
                        bits: n.lenbits
                      }, H = p(0, n.lens, 0, 19, n.lencode, 0, n.work, D), n.lenbits = D.bits, H) {
                        e.msg = "invalid code lengths set", n.mode = 30;
                        break;
                      }

                      n.have = 0, n.mode = 19;

                    case 19:
                      for (; n.have < n.nlen + n.ndist;) {
                        for (; x = (P = n.lencode[E & (1 << n.lenbits) - 1]) >>> 16 & 255, I = 65535 & P, !((C = P >>> 24) <= v);) {
                          if (0 === l) break e;
                          l--, E += r[a++] << v, v += 8;
                        }

                        if (I < 16) E >>>= C, v -= C, n.lens[n.have++] = I;else {
                          if (16 === I) {
                            for (W = C + 2; v < W;) {
                              if (0 === l) break e;
                              l--, E += r[a++] << v, v += 8;
                            }

                            if (E >>>= C, v -= C, 0 === n.have) {
                              e.msg = "invalid bit length repeat", n.mode = 30;
                              break;
                            }

                            N = n.lens[n.have - 1], O = 3 + (3 & E), E >>>= 2, v -= 2;
                          } else if (17 === I) {
                            for (W = C + 3; v < W;) {
                              if (0 === l) break e;
                              l--, E += r[a++] << v, v += 8;
                            }

                            v -= C, N = 0, O = 3 + (7 & (E >>>= C)), E >>>= 3, v -= 3;
                          } else {
                            for (W = C + 7; v < W;) {
                              if (0 === l) break e;
                              l--, E += r[a++] << v, v += 8;
                            }

                            v -= C, N = 0, O = 11 + (127 & (E >>>= C)), E >>>= 7, v -= 7;
                          }

                          if (n.have + O > n.nlen + n.ndist) {
                            e.msg = "invalid bit length repeat", n.mode = 30;
                            break;
                          }

                          for (; O--;) {
                            n.lens[n.have++] = N;
                          }
                        }
                      }

                      if (30 === n.mode) break;

                      if (0 === n.lens[256]) {
                        e.msg = "invalid code -- missing end-of-block", n.mode = 30;
                        break;
                      }

                      if (n.lenbits = 9, D = {
                        bits: n.lenbits
                      }, H = p(y, n.lens, 0, n.nlen, n.lencode, 0, n.work, D), n.lenbits = D.bits, H) {
                        e.msg = "invalid literal/lengths set", n.mode = 30;
                        break;
                      }

                      if (n.distbits = 6, n.distcode = n.distdyn, D = {
                        bits: n.distbits
                      }, H = p(w, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, D), n.distbits = D.bits, H) {
                        e.msg = "invalid distances set", n.mode = 30;
                        break;
                      }

                      if (n.mode = 20, 6 === t) break e;

                    case 20:
                      n.mode = 21;

                    case 21:
                      if (6 <= l && 258 <= f) {
                        e.next_out = s, e.avail_out = f, e.next_in = a, e.avail_in = l, n.hold = E, n.bits = v, _(e, S), s = e.next_out, o = e.output, f = e.avail_out, a = e.next_in, r = e.input, l = e.avail_in, E = n.hold, v = n.bits, 12 === n.mode && (n.back = -1);
                        break;
                      }

                      for (n.back = 0; x = (P = n.lencode[E & (1 << n.lenbits) - 1]) >>> 16 & 255, I = 65535 & P, !((C = P >>> 24) <= v);) {
                        if (0 === l) break e;
                        l--, E += r[a++] << v, v += 8;
                      }

                      if (x && 0 == (240 & x)) {
                        for (L = C, B = x, F = I; x = (P = n.lencode[F + ((E & (1 << L + B) - 1) >> L)]) >>> 16 & 255, I = 65535 & P, !(L + (C = P >>> 24) <= v);) {
                          if (0 === l) break e;
                          l--, E += r[a++] << v, v += 8;
                        }

                        E >>>= L, v -= L, n.back += L;
                      }

                      if (E >>>= C, v -= C, n.back += C, n.length = I, 0 === x) {
                        n.mode = 26;
                        break;
                      }

                      if (32 & x) {
                        n.back = -1, n.mode = 12;
                        break;
                      }

                      if (64 & x) {
                        e.msg = "invalid literal/length code", n.mode = 30;
                        break;
                      }

                      n.extra = 15 & x, n.mode = 22;

                    case 22:
                      if (n.extra) {
                        for (W = n.extra; v < W;) {
                          if (0 === l) break e;
                          l--, E += r[a++] << v, v += 8;
                        }

                        n.length += E & (1 << n.extra) - 1, E >>>= n.extra, v -= n.extra, n.back += n.extra;
                      }

                      n.was = n.length, n.mode = 23;

                    case 23:
                      for (; x = (P = n.distcode[E & (1 << n.distbits) - 1]) >>> 16 & 255, I = 65535 & P, !((C = P >>> 24) <= v);) {
                        if (0 === l) break e;
                        l--, E += r[a++] << v, v += 8;
                      }

                      if (0 == (240 & x)) {
                        for (L = C, B = x, F = I; x = (P = n.distcode[F + ((E & (1 << L + B) - 1) >> L)]) >>> 16 & 255, I = 65535 & P, !(L + (C = P >>> 24) <= v);) {
                          if (0 === l) break e;
                          l--, E += r[a++] << v, v += 8;
                        }

                        E >>>= L, v -= L, n.back += L;
                      }

                      if (E >>>= C, v -= C, n.back += C, 64 & x) {
                        e.msg = "invalid distance code", n.mode = 30;
                        break;
                      }

                      n.offset = I, n.extra = 15 & x, n.mode = 24;

                    case 24:
                      if (n.extra) {
                        for (W = n.extra; v < W;) {
                          if (0 === l) break e;
                          l--, E += r[a++] << v, v += 8;
                        }

                        n.offset += E & (1 << n.extra) - 1, E >>>= n.extra, v -= n.extra, n.back += n.extra;
                      }

                      if (n.offset > n.dmax) {
                        e.msg = "invalid distance too far back", n.mode = 30;
                        break;
                      }

                      n.mode = 25;

                    case 25:
                      if (0 === f) break e;

                      if (O = S - f, n.offset > O) {
                        if ((O = n.offset - O) > n.whave && n.sane) {
                          e.msg = "invalid distance too far back", n.mode = 30;
                          break;
                        }

                        T = O > n.wnext ? (O -= n.wnext, n.wsize - O) : n.wnext - O, O > n.length && (O = n.length), R = n.window;
                      } else R = o, T = s - n.offset, O = n.length;

                      for (f < O && (O = f), f -= O, n.length -= O; o[s++] = R[T++], --O;) {
                      }

                      0 === n.length && (n.mode = 21);
                      break;

                    case 26:
                      if (0 === f) break e;
                      o[s++] = n.length, f--, n.mode = 21;
                      break;

                    case 27:
                      if (n.wrap) {
                        for (; v < 32;) {
                          if (0 === l) break e;
                          l--, E |= r[a++] << v, v += 8;
                        }

                        if (S -= f, e.total_out += S, n.total += S, S && (e.adler = n.check = n.flags ? b(n.check, o, S, s - S) : h(n.check, o, S, s - S)), S = f, (n.flags ? E : i(E)) !== n.check) {
                          e.msg = "incorrect data check", n.mode = 30;
                          break;
                        }

                        v = E = 0;
                      }

                      n.mode = 28;

                    case 28:
                      if (n.wrap && n.flags) {
                        for (; v < 32;) {
                          if (0 === l) break e;
                          l--, E += r[a++] << v, v += 8;
                        }

                        if (E !== (4294967295 & n.total)) {
                          e.msg = "incorrect length check", n.mode = 30;
                          break;
                        }

                        v = E = 0;
                      }

                      n.mode = 29;

                    case 29:
                      H = 1;
                      break e;

                    case 30:
                      H = -3;
                      break e;

                    case 31:
                      return -4;

                    case 32:
                    default:
                      return m;
                  }
                }

                return e.next_out = s, e.avail_out = f, e.next_in = a, e.avail_in = l, n.hold = E, n.bits = v, (n.wsize || S !== e.avail_out && n.mode < 30 && (n.mode < 27 || 4 !== t)) && c(e, e.output, e.next_out, S - e.avail_out) ? (n.mode = 31, -4) : (A -= e.avail_in, S -= e.avail_out, e.total_in += A, e.total_out += S, n.total += S, n.wrap && S && (e.adler = n.check = n.flags ? b(n.check, o, S, e.next_out - S) : h(n.check, o, S, e.next_out - S)), e.data_type = n.bits + (n.last ? 64 : 0) + (12 === n.mode ? 128 : 0) + (20 === n.mode || 15 === n.mode ? 256 : 0), (0 === A && 0 === S || 4 === t) && H === k && (H = -5), H);
              }, n.inflateEnd = function (e) {
                if (!e || !e.state) return m;
                var t = e.state;
                return t.window && (t.window = null), e.state = null, k;
              }, n.inflateGetHeader = function (e, t) {
                var n;
                return e && e.state ? 0 == (2 & (n = e.state).wrap) ? m : ((n.head = t).done = !1, k) : m;
              }, n.inflateSetDictionary = function (e, t) {
                var n,
                    i = t.length;
                return e && e.state ? 0 !== (n = e.state).wrap && 11 !== n.mode ? m : 11 === n.mode && h(1, t, i, 0) !== n.check ? -3 : c(e, t, i, i) ? (n.mode = 31, -4) : (n.havedict = 1, k) : m;
              }, n.inflateInfo = "pako inflate (from Nodeca project)";
            }, {
              "../utils/common": 1,
              "./adler32": 3,
              "./crc32": 5,
              "./inffast": 7,
              "./inftrees": 9
            }],
            9: [function (e, t, n) {

              var i = e("../utils/common"),
                  r = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0],
                  o = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78],
                  a = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0],
                  s = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];

              t.exports = function (e, t, n, u, c, l, f, d) {
                var h,
                    b,
                    _,
                    p,
                    y,
                    w,
                    k,
                    m,
                    g,
                    E = d.bits,
                    v = 0,
                    A = 0,
                    S = 0,
                    O = 0,
                    T = 0,
                    R = 0,
                    C = 0,
                    x = 0,
                    I = 0,
                    L = 0,
                    B = null,
                    F = 0,
                    N = new i.Buf16(16),
                    H = new i.Buf16(16),
                    D = null,
                    W = 0;

                for (v = 0; v <= 15; v++) {
                  N[v] = 0;
                }

                for (A = 0; A < u; A++) {
                  N[t[n + A]]++;
                }

                for (T = E, O = 15; 1 <= O && 0 === N[O]; O--) {
                }

                if (O < T && (T = O), 0 === O) return c[l++] = 20971520, c[l++] = 20971520, d.bits = 1, 0;

                for (S = 1; S < O && 0 === N[S]; S++) {
                }

                for (T < S && (T = S), v = x = 1; v <= 15; v++) {
                  if (x <<= 1, (x -= N[v]) < 0) return -1;
                }

                if (0 < x && (0 === e || 1 !== O)) return -1;

                for (H[1] = 0, v = 1; v < 15; v++) {
                  H[v + 1] = H[v] + N[v];
                }

                for (A = 0; A < u; A++) {
                  0 !== t[n + A] && (f[H[t[n + A]]++] = A);
                }

                if (w = 0 === e ? (B = D = f, 19) : 1 === e ? (B = r, F -= 257, D = o, W -= 257, 256) : (B = a, D = s, -1), v = S, y = l, C = A = L = 0, _ = -1, p = (I = 1 << (R = T)) - 1, 1 === e && 852 < I || 2 === e && 592 < I) return 1;

                for (;;) {
                  for (k = v - C, g = f[A] < w ? (m = 0, f[A]) : f[A] > w ? (m = D[W + f[A]], B[F + f[A]]) : (m = 96, 0), h = 1 << v - C, S = b = 1 << R; c[y + (L >> C) + (b -= h)] = k << 24 | m << 16 | g | 0, 0 !== b;) {
                  }

                  for (h = 1 << v - 1; L & h;) {
                    h >>= 1;
                  }

                  if (0 !== h ? (L &= h - 1, L += h) : L = 0, A++, 0 == --N[v]) {
                    if (v === O) break;
                    v = t[n + f[A]];
                  }

                  if (T < v && (L & p) !== _) {
                    for (0 === C && (C = T), y += S, x = 1 << (R = v - C); R + C < O && !((x -= N[R + C]) <= 0);) {
                      R++, x <<= 1;
                    }

                    if (I += 1 << R, 1 === e && 852 < I || 2 === e && 592 < I) return 1;
                    c[_ = L & p] = T << 24 | R << 16 | y - l | 0;
                  }
                }

                return 0 !== L && (c[y + L] = v - C << 24 | 64 << 16 | 0), d.bits = T, 0;
              };
            }, {
              "../utils/common": 1
            }],
            10: [function (e, t, n) {

              t.exports = {
                2: "need dictionary",
                1: "stream end",
                0: "",
                "-1": "file error",
                "-2": "stream error",
                "-3": "data error",
                "-4": "insufficient memory",
                "-5": "buffer error",
                "-6": "incompatible version"
              };
            }, {}],
            11: [function (e, t, n) {

              t.exports = function () {
                this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
              };
            }, {}],
            "/lib/inflate.js": [function (e, t, n) {

              function i(e) {
                if (!(this instanceof i)) return new i(e);
                this.options = a.assign({
                  chunkSize: 16384,
                  windowBits: 0,
                  to: ""
                }, e || {});
                var t = this.options;
                t.raw && 0 <= t.windowBits && t.windowBits < 16 && (t.windowBits = -t.windowBits, 0 === t.windowBits && (t.windowBits = -15)), !(0 <= t.windowBits && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32), 15 < t.windowBits && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15), this.err = 0, this.msg = "", this.ended = !1, this.chunks = [], this.strm = new l(), this.strm.avail_out = 0;
                var n = o.inflateInit2(this.strm, t.windowBits);
                if (n !== u.Z_OK) throw new Error(c[n]);
                if (this.header = new f(), o.inflateGetHeader(this.strm, this.header), t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = s.string2buf(t.dictionary) : "[object ArrayBuffer]" === d.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)), t.raw && (n = o.inflateSetDictionary(this.strm, t.dictionary)) !== u.Z_OK)) throw new Error(c[n]);
              }

              function r(e, t) {
                var n = new i(t);
                if (n.push(e, !0), n.err) throw n.msg || c[n.err];
                return n.result;
              }

              var o = e("./zlib/inflate"),
                  a = e("./utils/common"),
                  s = e("./utils/strings"),
                  u = e("./zlib/constants"),
                  c = e("./zlib/messages"),
                  l = e("./zlib/zstream"),
                  f = e("./zlib/gzheader"),
                  d = Object.prototype.toString;
              i.prototype.push = function (e, t) {
                var n,
                    i,
                    r,
                    c,
                    l,
                    f = this.strm,
                    h = this.options.chunkSize,
                    b = this.options.dictionary,
                    _ = !1;

                if (this.ended) return !1;
                i = t === ~~t ? t : !0 === t ? u.Z_FINISH : u.Z_NO_FLUSH, "string" == typeof e ? f.input = s.binstring2buf(e) : "[object ArrayBuffer]" === d.call(e) ? f.input = new Uint8Array(e) : f.input = e, f.next_in = 0, f.avail_in = f.input.length;

                do {
                  if (0 === f.avail_out && (f.output = new a.Buf8(h), f.next_out = 0, f.avail_out = h), (n = o.inflate(f, u.Z_NO_FLUSH)) === u.Z_NEED_DICT && b && (n = o.inflateSetDictionary(this.strm, b)), n === u.Z_BUF_ERROR && !0 === _ && (n = u.Z_OK, _ = !1), n !== u.Z_STREAM_END && n !== u.Z_OK) return this.onEnd(n), !(this.ended = !0);
                  f.next_out && (0 !== f.avail_out && n !== u.Z_STREAM_END && (0 !== f.avail_in || i !== u.Z_FINISH && i !== u.Z_SYNC_FLUSH) || ("string" === this.options.to ? (r = s.utf8border(f.output, f.next_out), c = f.next_out - r, l = s.buf2string(f.output, r), f.next_out = c, f.avail_out = h - c, c && a.arraySet(f.output, f.output, r, c, 0), this.onData(l)) : this.onData(a.shrinkBuf(f.output, f.next_out)))), 0 === f.avail_in && 0 === f.avail_out && (_ = !0);
                } while ((0 < f.avail_in || 0 === f.avail_out) && n !== u.Z_STREAM_END);

                return n === u.Z_STREAM_END && (i = u.Z_FINISH), i === u.Z_FINISH ? (n = o.inflateEnd(this.strm), this.onEnd(n), this.ended = !0, n === u.Z_OK) : i !== u.Z_SYNC_FLUSH || (this.onEnd(u.Z_OK), !(f.avail_out = 0));
              }, i.prototype.onData = function (e) {
                this.chunks.push(e);
              }, i.prototype.onEnd = function (e) {
                e === u.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = a.flattenChunks(this.chunks)), this.chunks = [], this.err = e, this.msg = this.strm.msg;
              }, n.Inflate = i, n.inflate = r, n.inflateRaw = function (e, t) {
                return (t = t || {}).raw = !0, r(e, t);
              }, n.ungzip = r;
            }, {
              "./utils/common": 1,
              "./utils/strings": 2,
              "./zlib/constants": 4,
              "./zlib/gzheader": 6,
              "./zlib/inflate": 8,
              "./zlib/messages": 10,
              "./zlib/zstream": 11
            }]
          }, {}, [])("/lib/inflate.js");
        }]);
      }, "object" == _typeof_1(t) && "object" == _typeof_1(e) ? e.exports = i() : "function" == typeof define && define.amd ? define([], i) : "object" == _typeof_1(t) ? t.DanmakuWebSocket = i() : n.DanmakuWebSocket = i();
    }
  });

  var DANMU_OPTION = 'danmu_option';
  var MAX_DANMU = 50;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function query(el) {
    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return doc.querySelector(el);
  }

  var Content =
  /*#__PURE__*/
  function () {
    function Content() {
      var _this = this;

      classCallCheck(this, Content);

      chrome.runtime.onMessage.addListener(function (request) {
        if (query('.blh-danmuku')) return;
        var type = request.type,
            data = request.data;

        switch (type) {
          case DANMU_OPTION:
            {
              _this.dws = new window.DanmakuWebSocket(_objectSpread({}, data, {
                onInitialized: function onInitialized() {
                  if (!query('.blh-danmuku')) {
                    _this.createUI();

                    _this.eventBind();
                  }
                },
                onReceivedMessage: function onReceivedMessage(msg) {
                  window.postMessage(msg);

                  _this.receivedMessage(msg);
                },
                onHeartBeatReply: function onHeartBeatReply(msg) {
                  _this.$popular.innerText = "\u4EBA\u6C14\uFF1A".concat(msg.count || 0);
                }
              }));
              break;
            }
        }
      });
    }

    createClass(Content, [{
      key: "receivedMessage",
      value: function receivedMessage(msg) {
        var cmd = msg.cmd,
            info = msg.info,
            data = msg.data;

        switch (cmd) {
          case 'DANMU_MSG':
            this.addDanmu({
              uname: info[2][1],
              text: info[1]
            });
            break;

          case 'SEND_GIFT':
            this.addGift({
              uname: data.uname,
              action: data.action,
              gift: data.giftName,
              num: data.num
            });
            break;

          case 'GUARD_BUY':
            this.addGift({
              uname: data.username,
              action: '购买',
              gift: data.gift_name,
              num: data.num
            });
            break;

          case 'ROOM_REAL_TIME_MESSAGE_UPDATE':
            this.$headL.innerText = "\u623F\u95F4\uFF1A".concat(data.roomid);
            this.$fans.innerText = "\u7C89\u4E1D\uFF1A".concat(data.fans);
            break;
        }
      }
    }, {
      key: "createUI",
      value: function createUI() {
        this.manifest = chrome.runtime.getManifest();
        this.$danmuku = document.createElement('div');
        this.$danmuku.classList.add('blh-danmuku');
        this.$danmuku.innerHTML = "\n            <div class=\"blh-header\">\n                <div class=\"blh-header-l\"></div>\n                <div class=\"blh-header-r\">\xD7</div>\n            </div>\n            <div class=\"blh-info\">\n                <span class=\"blh-popular\"></span>\n                <span class=\"blh-fans\"></span>\n            </div>\n            <div class=\"blh-danmu\">\n                <div class=\"blh-danmu-inner\"></div>\n            </div>\n            <div class=\"blh-gift\">\n                <div class=\"blh-gift-inner\"></div>\n            </div>\n            <div class=\"blh-footer\"></div>\n        ";
        this.$headL = query('.blh-header-l', this.$danmuku);
        this.$popular = query('.blh-popular', this.$danmuku);
        this.$fans = query('.blh-fans', this.$danmuku);
        this.$headR = query('.blh-header-r', this.$danmuku);
        this.$danmu = query('.blh-danmu', this.$danmuku);
        this.$danmuInner = query('.blh-danmu-inner', this.$danmuku);
        this.$gift = query('.blh-gift', this.$danmuku);
        this.$giftInner = query('.blh-gift-inner', this.$danmuku);
        this.$footer = query('.blh-footer', this.$danmuku);
        this.$headL.textContent = "".concat(this.manifest.name, " ").concat(this.manifest.version);
        document.body.appendChild(this.$danmuku);
        this.$icon = document.createElement('div');
        this.$icon.classList.add('blh-danmuku-icon');
        this.$icon.textContent = '弹';
        document.body.appendChild(this.$icon);
      }
    }, {
      key: "eventBind",
      value: function eventBind() {
        var _this2 = this;

        var isHeadDroging = false;
        var isFootDroging = false;
        var lastPageX = 0;
        var lastPageY = 0;
        var lastLeft = 0;
        var lastTop = 0;
        var lastHeight = 0;
        this.$headL.addEventListener('mousedown', function (event) {
          isHeadDroging = true;
          lastPageX = event.pageX;
          lastPageY = event.pageY;
          lastLeft = _this2.$danmuku.offsetLeft;
          lastTop = _this2.$danmuku.offsetTop;
        });
        this.$footer.addEventListener('mousedown', function (event) {
          isFootDroging = true;
          lastPageY = event.pageY;
          lastHeight = _this2.$danmu.clientHeight;
        });
        document.addEventListener('mousemove', function (event) {
          if (isHeadDroging) {
            var x = event.pageX - lastPageX;
            var y = event.pageY - lastPageY;
            _this2.$danmuku.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
          }

          if (isFootDroging) {
            var height = lastHeight + event.pageY - lastPageY;

            if (height >= 100) {
              _this2.$danmu.style.height = "".concat(height, "px");
            } else {
              isFootDroging = false;
            }
          }

          if (event.composedPath().indexOf(_this2.$danmuku) > -1) {
            _this2.isHover = true;
          } else {
            _this2.isHover = false;
          }
        });
        document.addEventListener('mouseup', function (event) {
          if (isHeadDroging) {
            isHeadDroging = false;
            _this2.$danmuku.style.transform = 'translate(0, 0)';
            var x = lastLeft + event.pageX - lastPageX;
            var y = lastTop + event.pageY - lastPageY;
            _this2.$danmuku.style.left = "".concat(x, "px");
            _this2.$danmuku.style.top = "".concat(y, "px");
          }

          if (isFootDroging) {
            isFootDroging = false;
          }
        });
        this.$headR.addEventListener('click', function () {
          _this2.$danmuku.style.display = 'none';
          _this2.$icon.style.display = 'block';
        });
        this.$icon.addEventListener('click', function () {
          _this2.$danmuku.style.display = 'block';
          _this2.$icon.style.display = 'none';
        });
      }
    }, {
      key: "addDanmu",
      value: function addDanmu(danmu) {
        var _this3 = this;

        var children = this.$danmuInner.children;

        if (children.length > MAX_DANMU) {
          var child = children[0];
          query('.blh-danmu-uname', child).innerText = "".concat(danmu.uname, ":");
          query('.blh-danmu-text', child).innerText = danmu.text;
          this.$danmuInner.appendChild(child);
        } else {
          this.$danmuInner.insertAdjacentHTML('beforeend', "\n                <div class=\"blh-danmu-item\">\n                    <span class=\"blh-danmu-uname\">".concat(danmu.uname, ":</span>\n                    <span class=\"blh-danmu-text\">").concat(danmu.text, "</span>\n                </div>\n            "));
        }

        if (!this.isHover) {
          clearTimeout(this.danmuTimer);
          this.danmuTimer = setTimeout(function () {
            _this3.$danmu.scrollTo(0, _this3.$danmu.scrollHeight);
          }, 100);
        }
      }
    }, {
      key: "addGift",
      value: function addGift(gift) {
        var _this4 = this;

        var children = this.$giftInner.children;

        if (children.length > MAX_DANMU) {
          var child = children[0];
          query('.blh-gift-uname', child).innerText = "".concat(gift.uname, ":");
          query('.blh-gift-text', child).innerText = "".concat(gift.action, " ").concat(gift.gift, " X ").concat(gift.num);
          this.$giftInner.appendChild(child);
        } else {
          this.$giftInner.insertAdjacentHTML('beforeend', "\n                <div class=\"blh-gift-item\">\n                    <span class=\"blh-gift-uname\">".concat(gift.uname, ":</span>\n                    <span class=\"blh-gift-text\">").concat(gift.action, " ").concat(gift.gift, " X ").concat(gift.num, "</span>\n                </div>\n            "));
        }

        if (!this.isHover) {
          clearTimeout(this.giftTimer);
          this.giftTimer = setTimeout(function () {
            _this4.$gift.scrollTo(0, _this4.$gift.scrollHeight);
          }, 100);
        }
      }
    }]);

    return Content;
  }();

  var index = new Content();

  return index;

}());
//# sourceMappingURL=index.js.map
