/*!
* Bilibili HTML5 Live Player v1.13.6 (336-31585d58)
* 
* Copyright 2016 - 2020 bilibili, Inc.
* Released in Fri Jun 19 2020 21:31:59 GMT+0800 (China Standard Time)
*/

!function(e) {
    var t = {};
    function n(i) {
        if (t[i])
            return t[i].exports;
        var r = t[i] = {
            i: i,
            l: !1,
            exports: {}
        };
        return e[i].call(r.exports, r, r.exports, n),
        r.l = !0,
        r.exports
    }
    n.m = e,
    n.c = t,
    n.d = function(e, t, i) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: i
        })
    }
    ,
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.t = function(e, t) {
        if (1 & t && (e = n(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var i = Object.create(null);
        if (n.r(i),
        Object.defineProperty(i, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var r in e)
                n.d(i, r, function(t) {
                    return e[t]
                }
                .bind(null, r));
        return i
    }
    ,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, "a", t),
        t
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.p = "",
    n(n.s = 22)
}({
    22: function(e, t, n) {
        window.DanmakuWebSocket = n(25)
                                    },
    25: function(e, t) {
        var n, i;
        n = "undefined" != typeof self ? self : this,
        i = function() {
            return function(e) {
                function t(i) {
                    if (n[i])
                        return n[i].exports;
                    var r = n[i] = {
                        i: i,
                        l: !1,
                        exports: {}
                    };
                    return e[i].call(r.exports, r, r.exports, t),
                    r.l = !0,
                    r.exports
                }
                var n = {};
                return t.m = e,
                t.c = n,
                t.d = function(e, n, i) {
                    t.o(e, n) || Object.defineProperty(e, n, {
                        configurable: !1,
                        enumerable: !0,
                        get: i
                    })
                }
                ,
                t.n = function(e) {
                    var n = e && e.__esModule ? function() {
                        return e.default
                    }
                    : function() {
                        return e
                    }
                    ;
                    return t.d(n, "a", n),
                    n
                }
                ,
                t.o = function(e, t) {
                    return Object.prototype.hasOwnProperty.call(e, t)
                }
                ,
                t.p = "",
                t(t.s = 1)
            }([function(e, t, n) {
                "use strict";
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
                }
            }
            , function(e, t, n) {
                var i = n(2).default;
                e.exports = i
            }
            , function(e, t, n) {
                "use strict";
                Object.defineProperty(t, "__esModule", {
                    value: !0
                });
                var i = n(3)
                  , r = function() {
                    function e(e, t) {
                        for (var n = 0; n < t.length; n++) {
                            var i = t[n];
                            i.enumerable = i.enumerable || !1,
                            i.configurable = !0,
                            "value"in i && (i.writable = !0),
                            Object.defineProperty(e, i.key, i)
                        }
                    }
                    return function(t, n, i) {
                        return n && e(t.prototype, n),
                        i && e(t, i),
                        t
                    }
                }()
                  , a = function() {
                    function e(t) {
                        return function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        "development" === e.CONFIG.bundleType && (console.clear(),
                        console.dir(e.CONFIG)),
                        this.initialize(t)
                    }
                    return e.prototype.initialize = function(t) {
                        return "development" === e.CONFIG.bundleType && console.log("App Initialized."),
                        this.ws = new i.a(t),
                        this.getReturn()
                    }
                    ,
                    e.prototype.getReturn = function() {
                        return "development" === e.CONFIG.bundleType ? this : {
                            destroy: this.destroy.bind(this),
                            send: this.send.bind(this),
                            getAuthInfo: this.getAuthInfo.bind(this),
                            getRetryCount: this.getRetryCount.bind(this)
                        }
                    }
                    ,
                    e.prototype.destroy = function() {
                        this.ws && this.ws.destroy()
                    }
                    ,
                    e.prototype.send = function(e) {
                        this.ws && this.ws.send(e)
                    }
                    ,
                    e.prototype.getAuthInfo = function() {
                        return this.ws && this.ws.getAuthInfo()
                    }
                    ,
                    e.prototype.getRetryCount = function() {
                        return this.ws && this.ws.getRetryCount()
                    }
                    ,
                    r(e, null, [{
                        key: "CONFIG",
                        get: function() {
                            return {
                                version: "1.3.4",
                                gitHash: "151ab1a1",
                                build: "27",
                                bundleType: "release"
                            }
                        }
                    }]),
                    e
                }();
                t.default = a
            }
            , function(e, t, n) {
                "use strict";
                var i = n(0)
                  , r = n(4)
                  , a = n(5)
                  , o = n(6).inflate
                  , s = function() {
                    function e(t) {
                        if (function(e, t) {
                            if (!(e instanceof t))
                                throw new TypeError("Cannot call a class as a function")
                        }(this, e),
                        e.checkOptions(t)) {
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
                                fallback: function() {},
                                heartBeatInterval: 30,
                                onReceivedMessage: function() {},
                                onReceiveAuthRes: function() {},
                                onHeartBeatReply: function() {},
                                onInitialized: function() {},
                                onOpen: function() {},
                                onClose: function() {},
                                onError: function() {},
                                onListConnectError: function() {}
                            };
                            this.options = a.a.extend({}, n, t),
                            this.wsBinaryHeaderList = a.a.extend([], r.a),
                            this.authInfo = {
                                origin: "",
                                encode: ""
                            },
                            0 !== this.options.urlList.length && 0 !== this.options.retryMaxCount && this.options.retryMaxCount < this.options.urlList.length && (this.options.retryMaxCount = this.options.urlList.length - 1),
                            this.state = {
                                retryCount: 0,
                                listConnectFinishedCount: 0,
                                index: 0
                            },
                            this.callbackQueueList = {
                                onInitializedQueue: [],
                                onOpenQueue: [],
                                onCloseQueue: [],
                                onErrorQueue: [],
                                onReceivedMessageQueue: [],
                                onHeartBeatReplyQueue: [],
                                onRetryFallbackQueue: [],
                                onListConnectErrorQueue: [],
                                onReceiveAuthResQueue: []
                            },
                            this.HEART_BEAT_INTERVAL = 0,
                            this.mixinCallback().initialize(this.options.urlList.length > 0 ? this.options.urlList[0] : this.options.url)
                        }
                    }
                    return e.prototype.initialize = function(e) {
                        var t = "MozWebSocket"in window ? window.MozWebSocket : window.WebSocket
                          , n = this.options;
                        try {
                            this.ws = new t(e),
                            this.ws.binaryType = "arraybuffer",
                            this.ws.onopen = this.onOpen.bind(this),
                            this.ws.onmessage = this.onMessage.bind(this),
                            this.ws.onclose = this.onClose.bind(this),
                            this.ws.onerror = this.onError.bind(this),
                            a.a.callFunction(this.callbackQueueList.onInitializedQueue),
                            this.callbackQueueList.onInitializedQueue = []
                        } catch (e) {
                            "function" == typeof n.fallback && n.fallback()
                        }
                        return this
                    }
                    ,
                    e.prototype.onOpen = function() {
                        return a.a.callFunction(this.callbackQueueList.onOpenQueue),
                        this.userAuthentication(),
                        this
                    }
                    ,
                    e.prototype.userAuthentication = function() {
                        var e, t = this, n = this.options, r = {
                            uid: parseInt(n.uid, 10),
                            roomid: parseInt(n.rid, 10),
                            protover: parseInt(n.protover, 10) || i.a.WS_BODY_PROTOCOL_VERSION_NORMAL
                        };
                        n.aid && (r.aid = parseInt(n.aid, 10)),
                        n.from > 0 && (r.from = parseInt(n.from, 10) || 7);
                        for (var a = 0; a < n.customAuthParam.length; a++) {
                            var o = n.customAuthParam[a]
                              , s = o.type || "string";
                            switch (void 0 !== r[o.key] && console.error("Token has the same key already! 【" + o.key + "】"),
                            o.key.toString() && o.value.toString() || console.error("Invalid customAuthParam, missing key or value! 【" + o.key + "】-【" + o.value + "】"),
                            s) {
                            case "string":
                                r[o.key] = o.value;
                                break;
                            case "number":
                                r[o.key] = parseInt(o.value, 10);
                                break;
                            case "boolean":
                                r[o.key] = !!r[o.value];
                                break;
                            default:
                                return void console.error("Unsupported customAuthParam type!【" + s + "】")
                            }
                        }
                        e = this.convertToArrayBuffer(JSON.stringify(r), i.a.WS_OP_USER_AUTHENTICATION),
                        this.authInfo.origin = r,
                        this.authInfo.encode = e,
                        setTimeout(function() {
                            t.ws.send(e)
                        }, 0)
                    }
                    ,
                    e.prototype.getAuthInfo = function() {
                        return this.authInfo
                    }
                    ,
                    e.prototype.heartBeat = function() {
                        var e = this;
                        clearTimeout(this.HEART_BEAT_INTERVAL);
                        var t = this.convertToArrayBuffer({}, i.a.WS_OP_HEARTBEAT);
                        this.ws.send(t),
                        this.HEART_BEAT_INTERVAL = setTimeout(function() {
                            e.heartBeat()
                        }, 1e3 * this.options.heartBeatInterval)
                    }
                    ,
                    e.prototype.onMessage = function(e) {
                        var t = this;
                        try {
                            var n = this.convertToObject(e.data);
                            if (n instanceof Array)
                                n.forEach(function(e) {
                                    t.onMessage(e)
                                });
                            else if (n instanceof Object)
                                switch (n.op) {
                                case i.a.WS_OP_HEARTBEAT_REPLY:
                                    this.onHeartBeatReply(n.body);
                                    break;
                                case i.a.WS_OP_MESSAGE:
                                    this.onMessageReply(n.body);
                                    break;
                                case i.a.WS_OP_CONNECT_SUCCESS:
                                    if (0 !== n.body.length && n.body[0])
                                        switch (n.body[0].code) {
                                        case i.a.WS_AUTH_OK:
                                            this.heartBeat();
                                            break;
                                        case i.a.WS_AUTH_TOKEN_ERROR:
                                            this.options.retry = !1,
                                            "function" == typeof this.options.onReceiveAuthRes && this.options.onReceiveAuthRes(n.body);
                                            break;
                                        default:
                                            this.onClose()
                                        }
                                    else
                                        this.heartBeat()
                                }
                        } catch (e) {
                            console.error("WebSocket Error: ", e)
                        }
                        return this
                    }
                    ,
                    e.prototype.onMessageReply = function(e) {
                        var t = this;
                        try {
                            e instanceof Array ? e.forEach(function(e) {
                                t.onMessageReply(e)
                            }) : e instanceof Object && "function" == typeof this.options.onReceivedMessage && this.options.onReceivedMessage(e)
                        } catch (e) {
                            console.error("On Message Resolve Error: ", e)
                        }
                    }
                    ,
                    e.prototype.onHeartBeatReply = function(e) {
                        a.a.callFunction(this.callbackQueueList.onHeartBeatReplyQueue, e)
                    }
                    ,
                    e.prototype.onClose = function() {
                        var e = this
                          , t = this.options.urlList.length;
                        return a.a.callFunction(this.callbackQueueList.onCloseQueue),
                        clearTimeout(this.HEART_BEAT_INTERVAL),
                        this.options.retry ? (this.checkRetryState() ? setTimeout(function() {
                            console.error("Danmaku Websocket Retry .", e.state.retryCount),
                            e.state.index += 1,
                            0 === t || e.state.retryCount > e.options.retryThreadCount ? setTimeout(function() {
                                e.initialize(e.options.url)
                            }, 1e3 * e.options.retryRoundInterval) : 0 !== t && e.state.index > t - 1 ? (e.state.index = 0,
                            e.state.listConnectFinishedCount += 1,
                            1 === e.state.listConnectFinishedCount && a.a.callFunction(e.callbackQueueList.onListConnectErrorQueue),
                            setTimeout(function() {
                                e.initialize(e.options.urlList[e.state.index])
                            }, 1e3 * e.options.retryRoundInterval)) : e.initialize(e.options.urlList[e.state.index])
                        }, 1e3 * this.options.retryInterval) : (console.error("Danmaku Websocket Retry Failed."),
                        a.a.callFunction(this.callbackQueueList.onRetryFallbackQueue)),
                        this) : this
                    }
                    ,
                    e.prototype.onError = function(e) {
                        return console.error("Danmaku Websocket On Error.", e),
                        a.a.callFunction(this.callbackQueueList.onErrorQueue, e),
                        this
                    }
                    ,
                    e.prototype.destroy = function() {
                        clearTimeout(this.HEART_BEAT_INTERVAL),
                        this.options.retry = !1,
                        this.ws && this.ws.close(),
                        this.ws = null
                    }
                    ,
                    e.prototype.convertToArrayBuffer = function(e, t) {
                        this.encoder || (this.encoder = a.a.getEncoder());
                        var n = new ArrayBuffer(i.a.WS_PACKAGE_HEADER_TOTAL_LENGTH)
                          , r = new DataView(n,i.a.WS_PACKAGE_OFFSET)
                          , o = this.encoder.encode(e);
                        return r.setInt32(i.a.WS_PACKAGE_OFFSET, i.a.WS_PACKAGE_HEADER_TOTAL_LENGTH + o.byteLength),
                        this.wsBinaryHeaderList[2].value = t,
                        this.wsBinaryHeaderList.forEach(function(e) {
                            4 === e.bytes ? r.setInt32(e.offset, e.value) : 2 === e.bytes && r.setInt16(e.offset, e.value)
                        }),
                        a.a.mergeArrayBuffer(n, o)
                    }
                    ,
                    e.prototype.convertToObject = function(e) {
                        var t = new DataView(e)
                          , n = {
                            body: []
                        };
                        if (n.packetLen = t.getInt32(i.a.WS_PACKAGE_OFFSET),
                        this.wsBinaryHeaderList.forEach(function(e) {
                            4 === e.bytes ? n[e.key] = t.getInt32(e.offset) : 2 === e.bytes && (n[e.key] = t.getInt16(e.offset))
                        }),
                        n.packetLen < e.byteLength && this.convertToObject(e.slice(0, n.packetLen)),
                        this.decoder || (this.decoder = a.a.getDecoder()),
                        !n.op || i.a.WS_OP_MESSAGE !== n.op && n.op !== i.a.WS_OP_CONNECT_SUCCESS)
                            n.op && i.a.WS_OP_HEARTBEAT_REPLY === n.op && (n.body = {
                                count: t.getInt32(i.a.WS_PACKAGE_HEADER_TOTAL_LENGTH)
                            });
                        else
                            for (var r = i.a.WS_PACKAGE_OFFSET, s = n.packetLen, u = "", l = ""; r < e.byteLength; r += s) {
                                s = t.getInt32(r),
                                u = t.getInt16(r + i.a.WS_HEADER_OFFSET);
                                try {
                                    if (n.ver === i.a.WS_BODY_PROTOCOL_VERSION_DEFLATE) {
                                        var c = e.slice(r + u, r + s)
                                          , d = o(new Uint8Array(c));
                                        l = this.convertToObject(d.buffer).body
                                    } else {
                                        var f = this.decoder.decode(e.slice(r + u, r + s));
                                        l = 0 !== f.length ? JSON.parse(f) : null
                                    }
                                    l && n.body.push(l)
                                } catch (t) {
                                    console.error("decode body error:", new Uint8Array(e), n, t)
                                }
                            }
                        return n
                    }
                    ,
                    e.prototype.send = function(e) {
                        this.ws && this.ws.send(e)
                    }
                    ,
                    e.prototype.addCallback = function(e, t) {
                        return "function" == typeof e && t instanceof Array && t.push(e),
                        this
                    }
                    ,
                    e.prototype.mixinCallback = function() {
                        var e = this.options
                          , t = this.callbackQueueList;
                        return this.addCallback(e.onReceivedMessage, t.onReceivedMessageQueue).addCallback(e.onHeartBeatReply, t.onHeartBeatReplyQueue).addCallback(e.onInitialized, t.onInitializedQueue).addCallback(e.onOpen, t.onOpenQueue).addCallback(e.onClose, t.onCloseQueue).addCallback(e.onError, t.onErrorQueue).addCallback(e.onRetryFallback, t.onRetryFallbackQueue).addCallback(e.onListConnectError, t.onListConnectErrorQueue).addCallback(e.onReceiveAuthRes, t.onReceiveAuthResQueue),
                        this
                    }
                    ,
                    e.prototype.getRetryCount = function() {
                        return this.state.retryCount
                    }
                    ,
                    e.prototype.checkRetryState = function() {
                        var e = this.options
                          , t = !1;
                        return (0 === e.retryMaxCount || this.state.retryCount < e.retryMaxCount) && (this.state.retryCount += 1,
                        t = !0),
                        t
                    }
                    ,
                    e.checkOptions = function(e) {
                        return e || e instanceof Object ? e.url ? !!e.rid || (console.error("WebSocket Initialize options rid(cid) missing."),
                        !1) : (console.error("WebSocket Initialize options url missing."),
                        !1) : (console.error("WebSocket Initialize options missing or error.", e),
                        !1)
                    }
                    ,
                    e
                }();
                t.a = s
            }
            , function(e, t, n) {
                "use strict";
                var i = n(0)
                  , r = [{
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
                t.a = r
            }
            , function(e, t, n) {
                "use strict";
                var i = {
                    getDecoder: function() {
                        return window.TextDecoder ? new window.TextDecoder : {
                            decode: function(e) {
                                return decodeURIComponent(window.escape(String.fromCharCode.apply(String, new Uint8Array(e))))
                            }
                        }
                    },
                    getEncoder: function() {
                        return window.TextEncoder ? new window.TextEncoder : {
                            encode: function(e) {
                                for (var t = new ArrayBuffer(e.length), n = new Uint8Array(t), i = 0, r = e.length; i < r; i++)
                                    n[i] = e.charCodeAt(i);
                                return t
                            }
                        }
                    },
                    mergeArrayBuffer: function(e, t) {
                        var n = new Uint8Array(e)
                          , i = new Uint8Array(t)
                          , r = new Uint8Array(n.byteLength + i.byteLength);
                        return r.set(n, 0),
                        r.set(i, n.byteLength),
                        r.buffer
                    },
                    callFunction: function(e, t) {
                        return e instanceof Array && e.length ? (e.forEach(function(e) {
                            return "function" == typeof e && e(t)
                        }),
                        null) : "function" == typeof e && e(t)
                    },
                    extend: function(e) {
                        for (var t = arguments.length, n = Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
                            n[i - 1] = arguments[i];
                        var r = e || {};
                        return r instanceof Object && n.forEach(function(e) {
                            e instanceof Object && Object.keys(e).forEach(function(t) {
                                r[t] = e[t]
                            })
                        }),
                        r
                    }
                };
                t.a = i
            }
            , function(e, t, n) {
                var i;
                e.exports = function e(t, n, r) {
                    function a(s, u) {
                        if (!n[s]) {
                            if (!t[s]) {
                                var l = "function" == typeof i && i;
                                if (!u && l)
                                    return i(s, !0);
                                if (o)
                                    return o(s, !0);
                                var c = new Error("Cannot find module '" + s + "'");
                                throw c.code = "MODULE_NOT_FOUND",
                                c
                            }
                            var d = n[s] = {
                                exports: {}
                            };
                            t[s][0].call(d.exports, function(e) {
                                return a(t[s][1][e] || e)
                            }, d, d.exports, e, t, n, r)
                        }
                        return n[s].exports
                    }
                    for (var o = "function" == typeof i && i, s = 0; s < r.length; s++)
                        a(r[s]);
                    return a
                }({
                    1: [function(e, t, n) {
                        "use strict";
                        var i = "undefined" != typeof Uint8Array && "undefined" != typeof Uint16Array && "undefined" != typeof Int32Array;
                        n.assign = function(e) {
                            for (var t, n, i = Array.prototype.slice.call(arguments, 1); i.length; ) {
                                var r = i.shift();
                                if (r) {
                                    if ("object" != typeof r)
                                        throw new TypeError(r + "must be non-object");
                                    for (var a in r)
                                        t = r,
                                        n = a,
                                        Object.prototype.hasOwnProperty.call(t, n) && (e[a] = r[a])
                                }
                            }
                            return e
                        }
                        ,
                        n.shrinkBuf = function(e, t) {
                            return e.length === t ? e : e.subarray ? e.subarray(0, t) : (e.length = t,
                            e)
                        }
                        ;
                        var r = {
                            arraySet: function(e, t, n, i, r) {
                                if (t.subarray && e.subarray)
                                    e.set(t.subarray(n, n + i), r);
                                else
                                    for (var a = 0; a < i; a++)
                                        e[r + a] = t[n + a]
                            },
                            flattenChunks: function(e) {
                                var t, n, i, r, a, o;
                                for (t = i = 0,
                                n = e.length; t < n; t++)
                                    i += e[t].length;
                                for (o = new Uint8Array(i),
                                t = r = 0,
                                n = e.length; t < n; t++)
                                    a = e[t],
                                    o.set(a, r),
                                    r += a.length;
                                return o
                            }
                        }
                          , a = {
                            arraySet: function(e, t, n, i, r) {
                                for (var a = 0; a < i; a++)
                                    e[r + a] = t[n + a]
                            },
                            flattenChunks: function(e) {
                                return [].concat.apply([], e)
                            }
                        };
                        n.setTyped = function(e) {
                            e ? (n.Buf8 = Uint8Array,
                            n.Buf16 = Uint16Array,
                            n.Buf32 = Int32Array,
                            n.assign(n, r)) : (n.Buf8 = Array,
                            n.Buf16 = Array,
                            n.Buf32 = Array,
                            n.assign(n, a))
                        }
                        ,
                        n.setTyped(i)
                    }
                    , {}],
                    2: [function(e, t, n) {
                        "use strict";
                        function i(e, t) {
                            if (t < 65534 && (e.subarray && o || !e.subarray && a))
                                return String.fromCharCode.apply(null, r.shrinkBuf(e, t));
                            for (var n = "", i = 0; i < t; i++)
                                n += String.fromCharCode(e[i]);
                            return n
                        }
                        var r = e("./common")
                          , a = !0
                          , o = !0;
                        try {
                            String.fromCharCode.apply(null, [0])
                        } catch (e) {
                            a = !1
                        }
                        try {
                            String.fromCharCode.apply(null, new Uint8Array(1))
                        } catch (e) {
                            o = !1
                        }
                        for (var s = new r.Buf8(256), u = 0; u < 256; u++)
                            s[u] = 252 <= u ? 6 : 248 <= u ? 5 : 240 <= u ? 4 : 224 <= u ? 3 : 192 <= u ? 2 : 1;
                        s[254] = s[254] = 1,
                        n.string2buf = function(e) {
                            var t, n, i, a, o, s = e.length, u = 0;
                            for (a = 0; a < s; a++)
                                55296 == (64512 & (n = e.charCodeAt(a))) && a + 1 < s && 56320 == (64512 & (i = e.charCodeAt(a + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320),
                                a++),
                                u += n < 128 ? 1 : n < 2048 ? 2 : n < 65536 ? 3 : 4;
                            for (t = new r.Buf8(u),
                            a = o = 0; o < u; a++)
                                55296 == (64512 & (n = e.charCodeAt(a))) && a + 1 < s && 56320 == (64512 & (i = e.charCodeAt(a + 1))) && (n = 65536 + (n - 55296 << 10) + (i - 56320),
                                a++),
                                t[o++] = n < 128 ? n : (t[o++] = n < 2048 ? 192 | n >>> 6 : (t[o++] = n < 65536 ? 224 | n >>> 12 : (t[o++] = 240 | n >>> 18,
                                128 | n >>> 12 & 63),
                                128 | n >>> 6 & 63),
                                128 | 63 & n);
                            return t
                        }
                        ,
                        n.buf2binstring = function(e) {
                            return i(e, e.length)
                        }
                        ,
                        n.binstring2buf = function(e) {
                            for (var t = new r.Buf8(e.length), n = 0, i = t.length; n < i; n++)
                                t[n] = e.charCodeAt(n);
                            return t
                        }
                        ,
                        n.buf2string = function(e, t) {
                            var n, r, a, o, u = t || e.length, l = new Array(2 * u);
                            for (n = r = 0; n < u; )
                                if ((a = e[n++]) < 128)
                                    l[r++] = a;
                                else if (4 < (o = s[a]))
                                    l[r++] = 65533,
                                    n += o - 1;
                                else {
                                    for (a &= 2 === o ? 31 : 3 === o ? 15 : 7; 1 < o && n < u; )
                                        a = a << 6 | 63 & e[n++],
                                        o--;
                                    l[r++] = 1 < o ? 65533 : a < 65536 ? a : (a -= 65536,
                                    l[r++] = 55296 | a >> 10 & 1023,
                                    56320 | 1023 & a)
                                }
                            return i(l, r)
                        }
                        ,
                        n.utf8border = function(e, t) {
                            var n;
                            for ((t = t || e.length) > e.length && (t = e.length),
                            n = t - 1; 0 <= n && 128 == (192 & e[n]); )
                                n--;
                            return n < 0 ? t : 0 === n ? t : n + s[e[n]] > t ? n : t
                        }
                    }
                    , {
                        "./common": 1
                    }],
                    3: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e, t, n, i) {
                            for (var r = 65535 & e | 0, a = e >>> 16 & 65535 | 0, o = 0; 0 !== n; ) {
                                for (n -= o = 2e3 < n ? 2e3 : n; a = a + (r = r + t[i++] | 0) | 0,
                                --o; )
                                    ;
                                r %= 65521,
                                a %= 65521
                            }
                            return r | a << 16 | 0
                        }
                    }
                    , {}],
                    4: [function(e, t, n) {
                        "use strict";
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
                        }
                    }
                    , {}],
                    5: [function(e, t, n) {
                        "use strict";
                        var i = function() {
                            for (var e, t = [], n = 0; n < 256; n++) {
                                e = n;
                                for (var i = 0; i < 8; i++)
                                    e = 1 & e ? 3988292384 ^ e >>> 1 : e >>> 1;
                                t[n] = e
                            }
                            return t
                        }();
                        t.exports = function(e, t, n, r) {
                            var a = i
                              , o = r + n;
                            e ^= -1;
                            for (var s = r; s < o; s++)
                                e = e >>> 8 ^ a[255 & (e ^ t[s])];
                            return -1 ^ e
                        }
                    }
                    , {}],
                    6: [function(e, t, n) {
                        "use strict";
                        t.exports = function() {
                            this.text = 0,
                            this.time = 0,
                            this.xflags = 0,
                            this.os = 0,
                            this.extra = null,
                            this.extra_len = 0,
                            this.name = "",
                            this.comment = "",
                            this.hcrc = 0,
                            this.done = !1
                        }
                    }
                    , {}],
                    7: [function(e, t, n) {
                        "use strict";
                        t.exports = function(e, t) {
                            var n, i, r, a, o, s, u, l, c, d, f, h, _, p, m, v, y, g, E, b, S, k, R, T, w;
                            n = e.state,
                            i = e.next_in,
                            T = e.input,
                            r = i + (e.avail_in - 5),
                            a = e.next_out,
                            w = e.output,
                            o = a - (t - e.avail_out),
                            s = a + (e.avail_out - 257),
                            u = n.dmax,
                            l = n.wsize,
                            c = n.whave,
                            d = n.wnext,
                            f = n.window,
                            h = n.hold,
                            _ = n.bits,
                            p = n.lencode,
                            m = n.distcode,
                            v = (1 << n.lenbits) - 1,
                            y = (1 << n.distbits) - 1;
                            e: do {
                                _ < 15 && (h += T[i++] << _,
                                _ += 8,
                                h += T[i++] << _,
                                _ += 8),
                                g = p[h & v];
                                t: for (; ; ) {
                                    if (h >>>= E = g >>> 24,
                                    _ -= E,
                                    0 == (E = g >>> 16 & 255))
                                        w[a++] = 65535 & g;
                                    else {
                                        if (!(16 & E)) {
                                            if (0 == (64 & E)) {
                                                g = p[(65535 & g) + (h & (1 << E) - 1)];
                                                continue t
                                            }
                                            if (32 & E) {
                                                n.mode = 12;
                                                break e
                                            }
                                            e.msg = "invalid literal/length code",
                                            n.mode = 30;
                                            break e
                                        }
                                        b = 65535 & g,
                                        (E &= 15) && (_ < E && (h += T[i++] << _,
                                        _ += 8),
                                        b += h & (1 << E) - 1,
                                        h >>>= E,
                                        _ -= E),
                                        _ < 15 && (h += T[i++] << _,
                                        _ += 8,
                                        h += T[i++] << _,
                                        _ += 8),
                                        g = m[h & y];
                                        n: for (; ; ) {
                                            if (h >>>= E = g >>> 24,
                                            _ -= E,
                                            !(16 & (E = g >>> 16 & 255))) {
                                                if (0 == (64 & E)) {
                                                    g = m[(65535 & g) + (h & (1 << E) - 1)];
                                                    continue n
                                                }
                                                e.msg = "invalid distance code",
                                                n.mode = 30;
                                                break e
                                            }
                                            if (S = 65535 & g,
                                            _ < (E &= 15) && (h += T[i++] << _,
                                            (_ += 8) < E && (h += T[i++] << _,
                                            _ += 8)),
                                            u < (S += h & (1 << E) - 1)) {
                                                e.msg = "invalid distance too far back",
                                                n.mode = 30;
                                                break e
                                            }
                                            if (h >>>= E,
                                            _ -= E,
                                            (E = a - o) < S) {
                                                if (c < (E = S - E) && n.sane) {
                                                    e.msg = "invalid distance too far back",
                                                    n.mode = 30;
                                                    break e
                                                }
                                                if (R = f,
                                                (k = 0) === d) {
                                                    if (k += l - E,
                                                    E < b) {
                                                        for (b -= E; w[a++] = f[k++],
                                                        --E; )
                                                            ;
                                                        k = a - S,
                                                        R = w
                                                    }
                                                } else if (d < E) {
                                                    if (k += l + d - E,
                                                    (E -= d) < b) {
                                                        for (b -= E; w[a++] = f[k++],
                                                        --E; )
                                                            ;
                                                        if (k = 0,
                                                        d < b) {
                                                            for (b -= E = d; w[a++] = f[k++],
                                                            --E; )
                                                                ;
                                                            k = a - S,
                                                            R = w
                                                        }
                                                    }
                                                } else if (k += d - E,
                                                E < b) {
                                                    for (b -= E; w[a++] = f[k++],
                                                    --E; )
                                                        ;
                                                    k = a - S,
                                                    R = w
                                                }
                                                for (; 2 < b; )
                                                    w[a++] = R[k++],
                                                    w[a++] = R[k++],
                                                    w[a++] = R[k++],
                                                    b -= 3;
                                                b && (w[a++] = R[k++],
                                                1 < b && (w[a++] = R[k++]))
                                            } else {
                                                for (k = a - S; w[a++] = w[k++],
                                                w[a++] = w[k++],
                                                w[a++] = w[k++],
                                                2 < (b -= 3); )
                                                    ;
                                                b && (w[a++] = w[k++],
                                                1 < b && (w[a++] = w[k++]))
                                            }
                                            break
                                        }
                                    }
                                    break
                                }
                            } while (i < r && a < s);i -= b = _ >> 3,
                            h &= (1 << (_ -= b << 3)) - 1,
                            e.next_in = i,
                            e.next_out = a,
                            e.avail_in = i < r ? r - i + 5 : 5 - (i - r),
                            e.avail_out = a < s ? s - a + 257 : 257 - (a - s),
                            n.hold = h,
                            n.bits = _
                        }
                    }
                    , {}],
                    8: [function(e, t, n) {
                        "use strict";
                        function i(e) {
                            return (e >>> 24 & 255) + (e >>> 8 & 65280) + ((65280 & e) << 8) + ((255 & e) << 24)
                        }
                        function r() {
                            this.mode = 0,
                            this.last = !1,
                            this.wrap = 0,
                            this.havedict = !1,
                            this.flags = 0,
                            this.dmax = 0,
                            this.check = 0,
                            this.total = 0,
                            this.head = null,
                            this.wbits = 0,
                            this.wsize = 0,
                            this.whave = 0,
                            this.wnext = 0,
                            this.window = null,
                            this.hold = 0,
                            this.bits = 0,
                            this.length = 0,
                            this.offset = 0,
                            this.extra = 0,
                            this.lencode = null,
                            this.distcode = null,
                            this.lenbits = 0,
                            this.distbits = 0,
                            this.ncode = 0,
                            this.nlen = 0,
                            this.ndist = 0,
                            this.have = 0,
                            this.next = null,
                            this.lens = new h.Buf16(320),
                            this.work = new h.Buf16(288),
                            this.lendyn = null,
                            this.distdyn = null,
                            this.sane = 0,
                            this.back = 0,
                            this.was = 0
                        }
                        function a(e) {
                            var t;
                            return e && e.state ? (t = e.state,
                            e.total_in = e.total_out = t.total = 0,
                            e.msg = "",
                            t.wrap && (e.adler = 1 & t.wrap),
                            t.mode = S,
                            t.last = 0,
                            t.havedict = 0,
                            t.dmax = 32768,
                            t.head = null,
                            t.hold = 0,
                            t.bits = 0,
                            t.lencode = t.lendyn = new h.Buf32(k),
                            t.distcode = t.distdyn = new h.Buf32(R),
                            t.sane = 1,
                            t.back = -1,
                            E) : b
                        }
                        function o(e) {
                            var t;
                            return e && e.state ? ((t = e.state).wsize = 0,
                            t.whave = 0,
                            t.wnext = 0,
                            a(e)) : b
                        }
                        function s(e, t) {
                            var n, i;
                            return e && e.state ? (i = e.state,
                            t < 0 ? (n = 0,
                            t = -t) : (n = 1 + (t >> 4),
                            t < 48 && (t &= 15)),
                            t && (t < 8 || 15 < t) ? b : (null !== i.window && i.wbits !== t && (i.window = null),
                            i.wrap = n,
                            i.wbits = t,
                            o(e))) : b
                        }
                        function u(e, t) {
                            var n, i;
                            return e ? (i = new r,
                            (e.state = i).window = null,
                            (n = s(e, t)) !== E && (e.state = null),
                            n) : b
                        }
                        function l(e) {
                            if (T) {
                                var t;
                                for (d = new h.Buf32(512),
                                f = new h.Buf32(32),
                                t = 0; t < 144; )
                                    e.lens[t++] = 8;
                                for (; t < 256; )
                                    e.lens[t++] = 9;
                                for (; t < 280; )
                                    e.lens[t++] = 7;
                                for (; t < 288; )
                                    e.lens[t++] = 8;
                                for (v(y, e.lens, 0, 288, d, 0, e.work, {
                                    bits: 9
                                }),
                                t = 0; t < 32; )
                                    e.lens[t++] = 5;
                                v(g, e.lens, 0, 32, f, 0, e.work, {
                                    bits: 5
                                }),
                                T = !1
                            }
                            e.lencode = d,
                            e.lenbits = 9,
                            e.distcode = f,
                            e.distbits = 5
                        }
                        function c(e, t, n, i) {
                            var r, a = e.state;
                            return null === a.window && (a.wsize = 1 << a.wbits,
                            a.wnext = 0,
                            a.whave = 0,
                            a.window = new h.Buf8(a.wsize)),
                            i >= a.wsize ? (h.arraySet(a.window, t, n - a.wsize, a.wsize, 0),
                            a.wnext = 0,
                            a.whave = a.wsize) : (i < (r = a.wsize - a.wnext) && (r = i),
                            h.arraySet(a.window, t, n - i, r, a.wnext),
                            (i -= r) ? (h.arraySet(a.window, t, n - i, i, 0),
                            a.wnext = i,
                            a.whave = a.wsize) : (a.wnext += r,
                            a.wnext === a.wsize && (a.wnext = 0),
                            a.whave < a.wsize && (a.whave += r))),
                            0
                        }
                        var d, f, h = e("../utils/common"), _ = e("./adler32"), p = e("./crc32"), m = e("./inffast"), v = e("./inftrees"), y = 1, g = 2, E = 0, b = -2, S = 1, k = 852, R = 592, T = !0;
                        n.inflateReset = o,
                        n.inflateReset2 = s,
                        n.inflateResetKeep = a,
                        n.inflateInit = function(e) {
                            return u(e, 15)
                        }
                        ,
                        n.inflateInit2 = u,
                        n.inflate = function(e, t) {
                            var n, r, a, o, s, u, d, f, k, R, T, w, L, A, O, C, D, I, M, P, x, B, N, U, j = 0, F = new h.Buf8(4), V = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
                            if (!e || !e.state || !e.output || !e.input && 0 !== e.avail_in)
                                return b;
                            12 === (n = e.state).mode && (n.mode = 13),
                            s = e.next_out,
                            a = e.output,
                            d = e.avail_out,
                            o = e.next_in,
                            r = e.input,
                            u = e.avail_in,
                            f = n.hold,
                            k = n.bits,
                            R = u,
                            T = d,
                            B = E;
                            e: for (; ; )
                                switch (n.mode) {
                                case S:
                                    if (0 === n.wrap) {
                                        n.mode = 13;
                                        break
                                    }
                                    for (; k < 16; ) {
                                        if (0 === u)
                                            break e;
                                        u--,
                                        f += r[o++] << k,
                                        k += 8
                                    }
                                    if (2 & n.wrap && 35615 === f) {
                                        F[n.check = 0] = 255 & f,
                                        F[1] = f >>> 8 & 255,
                                        n.check = p(n.check, F, 2, 0),
                                        k = f = 0,
                                        n.mode = 2;
                                        break
                                    }
                                    if (n.flags = 0,
                                    n.head && (n.head.done = !1),
                                    !(1 & n.wrap) || (((255 & f) << 8) + (f >> 8)) % 31) {
                                        e.msg = "incorrect header check",
                                        n.mode = 30;
                                        break
                                    }
                                    if (8 != (15 & f)) {
                                        e.msg = "unknown compression method",
                                        n.mode = 30;
                                        break
                                    }
                                    if (k -= 4,
                                    x = 8 + (15 & (f >>>= 4)),
                                    0 === n.wbits)
                                        n.wbits = x;
                                    else if (x > n.wbits) {
                                        e.msg = "invalid window size",
                                        n.mode = 30;
                                        break
                                    }
                                    n.dmax = 1 << x,
                                    e.adler = n.check = 1,
                                    n.mode = 512 & f ? 10 : 12,
                                    k = f = 0;
                                    break;
                                case 2:
                                    for (; k < 16; ) {
                                        if (0 === u)
                                            break e;
                                        u--,
                                        f += r[o++] << k,
                                        k += 8
                                    }
                                    if (n.flags = f,
                                    8 != (255 & n.flags)) {
                                        e.msg = "unknown compression method",
                                        n.mode = 30;
                                        break
                                    }
                                    if (57344 & n.flags) {
                                        e.msg = "unknown header flags set",
                                        n.mode = 30;
                                        break
                                    }
                                    n.head && (n.head.text = f >> 8 & 1),
                                    512 & n.flags && (F[0] = 255 & f,
                                    F[1] = f >>> 8 & 255,
                                    n.check = p(n.check, F, 2, 0)),
                                    k = f = 0,
                                    n.mode = 3;
                                case 3:
                                    for (; k < 32; ) {
                                        if (0 === u)
                                            break e;
                                        u--,
                                        f += r[o++] << k,
                                        k += 8
                                    }
                                    n.head && (n.head.time = f),
                                    512 & n.flags && (F[0] = 255 & f,
                                    F[1] = f >>> 8 & 255,
                                    F[2] = f >>> 16 & 255,
                                    F[3] = f >>> 24 & 255,
                                    n.check = p(n.check, F, 4, 0)),
                                    k = f = 0,
                                    n.mode = 4;
                                case 4:
                                    for (; k < 16; ) {
                                        if (0 === u)
                                            break e;
                                        u--,
                                        f += r[o++] << k,
                                        k += 8
                                    }
                                    n.head && (n.head.xflags = 255 & f,
                                    n.head.os = f >> 8),
                                    512 & n.flags && (F[0] = 255 & f,
                                    F[1] = f >>> 8 & 255,
                                    n.check = p(n.check, F, 2, 0)),
                                    k = f = 0,
                                    n.mode = 5;
                                case 5:
                                    if (1024 & n.flags) {
                                        for (; k < 16; ) {
                                            if (0 === u)
                                                break e;
                                            u--,
                                            f += r[o++] << k,
                                            k += 8
                                        }
                                        n.length = f,
                                        n.head && (n.head.extra_len = f),
                                        512 & n.flags && (F[0] = 255 & f,
                                        F[1] = f >>> 8 & 255,
                                        n.check = p(n.check, F, 2, 0)),
                                        k = f = 0
                                    } else
                                        n.head && (n.head.extra = null);
                                    n.mode = 6;
                                case 6:
                                    if (1024 & n.flags && (u < (w = n.length) && (w = u),
                                    w && (n.head && (x = n.head.extra_len - n.length,
                                    n.head.extra || (n.head.extra = new Array(n.head.extra_len)),
                                    h.arraySet(n.head.extra, r, o, w, x)),
                                    512 & n.flags && (n.check = p(n.check, r, w, o)),
                                    u -= w,
                                    o += w,
                                    n.length -= w),
                                    n.length))
                                        break e;
                                    n.length = 0,
                                    n.mode = 7;
                                case 7:
                                    if (2048 & n.flags) {
                                        if (0 === u)
                                            break e;
                                        for (w = 0; x = r[o + w++],
                                        n.head && x && n.length < 65536 && (n.head.name += String.fromCharCode(x)),
                                        x && w < u; )
                                            ;
                                        if (512 & n.flags && (n.check = p(n.check, r, w, o)),
                                        u -= w,
                                        o += w,
                                        x)
                                            break e
                                    } else
                                        n.head && (n.head.name = null);
                                    n.length = 0,
                                    n.mode = 8;
                                case 8:
                                    if (4096 & n.flags) {
                                        if (0 === u)
                                            break e;
                                        for (w = 0; x = r[o + w++],
                                        n.head && x && n.length < 65536 && (n.head.comment += String.fromCharCode(x)),
                                        x && w < u; )
                                            ;
                                        if (512 & n.flags && (n.check = p(n.check, r, w, o)),
                                        u -= w,
                                        o += w,
                                        x)
                                            break e
                                    } else
                                        n.head && (n.head.comment = null);
                                    n.mode = 9;
                                case 9:
                                    if (512 & n.flags) {
                                        for (; k < 16; ) {
                                            if (0 === u)
                                                break e;
                                            u--,
                                            f += r[o++] << k,
                                            k += 8
                                        }
                                        if (f !== (65535 & n.check)) {
                                            e.msg = "header crc mismatch",
                                            n.mode = 30;
                                            break
                                        }
                                        k = f = 0
                                    }
                                    n.head && (n.head.hcrc = n.flags >> 9 & 1,
                                    n.head.done = !0),
                                    e.adler = n.check = 0,
                                    n.mode = 12;
                                    break;
                                case 10:
                                    for (; k < 32; ) {
                                        if (0 === u)
                                            break e;
                                        u--,
                                        f += r[o++] << k,
                                        k += 8
                                    }
                                    e.adler = n.check = i(f),
                                    k = f = 0,
                                    n.mode = 11;
                                case 11:
                                    if (0 === n.havedict)
                                        return e.next_out = s,
                                        e.avail_out = d,
                                        e.next_in = o,
                                        e.avail_in = u,
                                        n.hold = f,
                                        n.bits = k,
                                        2;
                                    e.adler = n.check = 1,
                                    n.mode = 12;
                                case 12:
                                    if (5 === t || 6 === t)
                                        break e;
                                case 13:
                                    if (n.last) {
                                        f >>>= 7 & k,
                                        k -= 7 & k,
                                        n.mode = 27;
                                        break
                                    }
                                    for (; k < 3; ) {
                                        if (0 === u)
                                            break e;
                                        u--,
                                        f += r[o++] << k,
                                        k += 8
                                    }
                                    switch (n.last = 1 & f,
                                    k -= 1,
                                    3 & (f >>>= 1)) {
                                    case 0:
                                        n.mode = 14;
                                        break;
                                    case 1:
                                        if (l(n),
                                        n.mode = 20,
                                        6 !== t)
                                            break;
                                        f >>>= 2,
                                        k -= 2;
                                        break e;
                                    case 2:
                                        n.mode = 17;
                                        break;
                                    case 3:
                                        e.msg = "invalid block type",
                                        n.mode = 30
                                    }
                                    f >>>= 2,
                                    k -= 2;
                                    break;
                                case 14:
                                    for (f >>>= 7 & k,
                                    k -= 7 & k; k < 32; ) {
                                        if (0 === u)
                                            break e;
                                        u--,
                                        f += r[o++] << k,
                                        k += 8
                                    }
                                    if ((65535 & f) != (f >>> 16 ^ 65535)) {
                                        e.msg = "invalid stored block lengths",
                                        n.mode = 30;
                                        break
                                    }
                                    if (n.length = 65535 & f,
                                    k = f = 0,
                                    n.mode = 15,
                                    6 === t)
                                        break e;
                                case 15:
                                    n.mode = 16;
                                case 16:
                                    if (w = n.length) {
                                        if (u < w && (w = u),
                                        d < w && (w = d),
                                        0 === w)
                                            break e;
                                        h.arraySet(a, r, o, w, s),
                                        u -= w,
                                        o += w,
                                        d -= w,
                                        s += w,
                                        n.length -= w;
                                        break
                                    }
                                    n.mode = 12;
                                    break;
                                case 17:
                                    for (; k < 14; ) {
                                        if (0 === u)
                                            break e;
                                        u--,
                                        f += r[o++] << k,
                                        k += 8
                                    }
                                    if (n.nlen = 257 + (31 & f),
                                    f >>>= 5,
                                    k -= 5,
                                    n.ndist = 1 + (31 & f),
                                    f >>>= 5,
                                    k -= 5,
                                    n.ncode = 4 + (15 & f),
                                    f >>>= 4,
                                    k -= 4,
                                    286 < n.nlen || 30 < n.ndist) {
                                        e.msg = "too many length or distance symbols",
                                        n.mode = 30;
                                        break
                                    }
                                    n.have = 0,
                                    n.mode = 18;
                                case 18:
                                    for (; n.have < n.ncode; ) {
                                        for (; k < 3; ) {
                                            if (0 === u)
                                                break e;
                                            u--,
                                            f += r[o++] << k,
                                            k += 8
                                        }
                                        n.lens[V[n.have++]] = 7 & f,
                                        f >>>= 3,
                                        k -= 3
                                    }
                                    for (; n.have < 19; )
                                        n.lens[V[n.have++]] = 0;
                                    if (n.lencode = n.lendyn,
                                    n.lenbits = 7,
                                    N = {
                                        bits: n.lenbits
                                    },
                                    B = v(0, n.lens, 0, 19, n.lencode, 0, n.work, N),
                                    n.lenbits = N.bits,
                                    B) {
                                        e.msg = "invalid code lengths set",
                                        n.mode = 30;
                                        break
                                    }
                                    n.have = 0,
                                    n.mode = 19;
                                case 19:
                                    for (; n.have < n.nlen + n.ndist; ) {
                                        for (; C = (j = n.lencode[f & (1 << n.lenbits) - 1]) >>> 16 & 255,
                                        D = 65535 & j,
                                        !((O = j >>> 24) <= k); ) {
                                            if (0 === u)
                                                break e;
                                            u--,
                                            f += r[o++] << k,
                                            k += 8
                                        }
                                        if (D < 16)
                                            f >>>= O,
                                            k -= O,
                                            n.lens[n.have++] = D;
                                        else {
                                            if (16 === D) {
                                                for (U = O + 2; k < U; ) {
                                                    if (0 === u)
                                                        break e;
                                                    u--,
                                                    f += r[o++] << k,
                                                    k += 8
                                                }
                                                if (f >>>= O,
                                                k -= O,
                                                0 === n.have) {
                                                    e.msg = "invalid bit length repeat",
                                                    n.mode = 30;
                                                    break
                                                }
                                                x = n.lens[n.have - 1],
                                                w = 3 + (3 & f),
                                                f >>>= 2,
                                                k -= 2
                                            } else if (17 === D) {
                                                for (U = O + 3; k < U; ) {
                                                    if (0 === u)
                                                        break e;
                                                    u--,
                                                    f += r[o++] << k,
                                                    k += 8
                                                }
                                                k -= O,
                                                x = 0,
                                                w = 3 + (7 & (f >>>= O)),
                                                f >>>= 3,
                                                k -= 3
                                            } else {
                                                for (U = O + 7; k < U; ) {
                                                    if (0 === u)
                                                        break e;
                                                    u--,
                                                    f += r[o++] << k,
                                                    k += 8
                                                }
                                                k -= O,
                                                x = 0,
                                                w = 11 + (127 & (f >>>= O)),
                                                f >>>= 7,
                                                k -= 7
                                            }
                                            if (n.have + w > n.nlen + n.ndist) {
                                                e.msg = "invalid bit length repeat",
                                                n.mode = 30;
                                                break
                                            }
                                            for (; w--; )
                                                n.lens[n.have++] = x
                                        }
                                    }
                                    if (30 === n.mode)
                                        break;
                                    if (0 === n.lens[256]) {
                                        e.msg = "invalid code -- missing end-of-block",
                                        n.mode = 30;
                                        break
                                    }
                                    if (n.lenbits = 9,
                                    N = {
                                        bits: n.lenbits
                                    },
                                    B = v(y, n.lens, 0, n.nlen, n.lencode, 0, n.work, N),
                                    n.lenbits = N.bits,
                                    B) {
                                        e.msg = "invalid literal/lengths set",
                                        n.mode = 30;
                                        break
                                    }
                                    if (n.distbits = 6,
                                    n.distcode = n.distdyn,
                                    N = {
                                        bits: n.distbits
                                    },
                                    B = v(g, n.lens, n.nlen, n.ndist, n.distcode, 0, n.work, N),
                                    n.distbits = N.bits,
                                    B) {
                                        e.msg = "invalid distances set",
                                        n.mode = 30;
                                        break
                                    }
                                    if (n.mode = 20,
                                    6 === t)
                                        break e;
                                case 20:
                                    n.mode = 21;
                                case 21:
                                    if (6 <= u && 258 <= d) {
                                        e.next_out = s,
                                        e.avail_out = d,
                                        e.next_in = o,
                                        e.avail_in = u,
                                        n.hold = f,
                                        n.bits = k,
                                        m(e, T),
                                        s = e.next_out,
                                        a = e.output,
                                        d = e.avail_out,
                                        o = e.next_in,
                                        r = e.input,
                                        u = e.avail_in,
                                        f = n.hold,
                                        k = n.bits,
                                        12 === n.mode && (n.back = -1);
                                        break
                                    }
                                    for (n.back = 0; C = (j = n.lencode[f & (1 << n.lenbits) - 1]) >>> 16 & 255,
                                    D = 65535 & j,
                                    !((O = j >>> 24) <= k); ) {
                                        if (0 === u)
                                            break e;
                                        u--,
                                        f += r[o++] << k,
                                        k += 8
                                    }
                                    if (C && 0 == (240 & C)) {
                                        for (I = O,
                                        M = C,
                                        P = D; C = (j = n.lencode[P + ((f & (1 << I + M) - 1) >> I)]) >>> 16 & 255,
                                        D = 65535 & j,
                                        !(I + (O = j >>> 24) <= k); ) {
                                            if (0 === u)
                                                break e;
                                            u--,
                                            f += r[o++] << k,
                                            k += 8
                                        }
                                        f >>>= I,
                                        k -= I,
                                        n.back += I
                                    }
                                    if (f >>>= O,
                                    k -= O,
                                    n.back += O,
                                    n.length = D,
                                    0 === C) {
                                        n.mode = 26;
                                        break
                                    }
                                    if (32 & C) {
                                        n.back = -1,
                                        n.mode = 12;
                                        break
                                    }
                                    if (64 & C) {
                                        e.msg = "invalid literal/length code",
                                        n.mode = 30;
                                        break
                                    }
                                    n.extra = 15 & C,
                                    n.mode = 22;
                                case 22:
                                    if (n.extra) {
                                        for (U = n.extra; k < U; ) {
                                            if (0 === u)
                                                break e;
                                            u--,
                                            f += r[o++] << k,
                                            k += 8
                                        }
                                        n.length += f & (1 << n.extra) - 1,
                                        f >>>= n.extra,
                                        k -= n.extra,
                                        n.back += n.extra
                                    }
                                    n.was = n.length,
                                    n.mode = 23;
                                case 23:
                                    for (; C = (j = n.distcode[f & (1 << n.distbits) - 1]) >>> 16 & 255,
                                    D = 65535 & j,
                                    !((O = j >>> 24) <= k); ) {
                                        if (0 === u)
                                            break e;
                                        u--,
                                        f += r[o++] << k,
                                        k += 8
                                    }
                                    if (0 == (240 & C)) {
                                        for (I = O,
                                        M = C,
                                        P = D; C = (j = n.distcode[P + ((f & (1 << I + M) - 1) >> I)]) >>> 16 & 255,
                                        D = 65535 & j,
                                        !(I + (O = j >>> 24) <= k); ) {
                                            if (0 === u)
                                                break e;
                                            u--,
                                            f += r[o++] << k,
                                            k += 8
                                        }
                                        f >>>= I,
                                        k -= I,
                                        n.back += I
                                    }
                                    if (f >>>= O,
                                    k -= O,
                                    n.back += O,
                                    64 & C) {
                                        e.msg = "invalid distance code",
                                        n.mode = 30;
                                        break
                                    }
                                    n.offset = D,
                                    n.extra = 15 & C,
                                    n.mode = 24;
                                case 24:
                                    if (n.extra) {
                                        for (U = n.extra; k < U; ) {
                                            if (0 === u)
                                                break e;
                                            u--,
                                            f += r[o++] << k,
                                            k += 8
                                        }
                                        n.offset += f & (1 << n.extra) - 1,
                                        f >>>= n.extra,
                                        k -= n.extra,
                                        n.back += n.extra
                                    }
                                    if (n.offset > n.dmax) {
                                        e.msg = "invalid distance too far back",
                                        n.mode = 30;
                                        break
                                    }
                                    n.mode = 25;
                                case 25:
                                    if (0 === d)
                                        break e;
                                    if (w = T - d,
                                    n.offset > w) {
                                        if ((w = n.offset - w) > n.whave && n.sane) {
                                            e.msg = "invalid distance too far back",
                                            n.mode = 30;
                                            break
                                        }
                                        L = w > n.wnext ? (w -= n.wnext,
                                        n.wsize - w) : n.wnext - w,
                                        w > n.length && (w = n.length),
                                        A = n.window
                                    } else
                                        A = a,
                                        L = s - n.offset,
                                        w = n.length;
                                    for (d < w && (w = d),
                                    d -= w,
                                    n.length -= w; a[s++] = A[L++],
                                    --w; )
                                        ;
                                    0 === n.length && (n.mode = 21);
                                    break;
                                case 26:
                                    if (0 === d)
                                        break e;
                                    a[s++] = n.length,
                                    d--,
                                    n.mode = 21;
                                    break;
                                case 27:
                                    if (n.wrap) {
                                        for (; k < 32; ) {
                                            if (0 === u)
                                                break e;
                                            u--,
                                            f |= r[o++] << k,
                                            k += 8
                                        }
                                        if (T -= d,
                                        e.total_out += T,
                                        n.total += T,
                                        T && (e.adler = n.check = n.flags ? p(n.check, a, T, s - T) : _(n.check, a, T, s - T)),
                                        T = d,
                                        (n.flags ? f : i(f)) !== n.check) {
                                            e.msg = "incorrect data check",
                                            n.mode = 30;
                                            break
                                        }
                                        k = f = 0
                                    }
                                    n.mode = 28;
                                case 28:
                                    if (n.wrap && n.flags) {
                                        for (; k < 32; ) {
                                            if (0 === u)
                                                break e;
                                            u--,
                                            f += r[o++] << k,
                                            k += 8
                                        }
                                        if (f !== (4294967295 & n.total)) {
                                            e.msg = "incorrect length check",
                                            n.mode = 30;
                                            break
                                        }
                                        k = f = 0
                                    }
                                    n.mode = 29;
                                case 29:
                                    B = 1;
                                    break e;
                                case 30:
                                    B = -3;
                                    break e;
                                case 31:
                                    return -4;
                                case 32:
                                default:
                                    return b
                                }
                            return e.next_out = s,
                            e.avail_out = d,
                            e.next_in = o,
                            e.avail_in = u,
                            n.hold = f,
                            n.bits = k,
                            (n.wsize || T !== e.avail_out && n.mode < 30 && (n.mode < 27 || 4 !== t)) && c(e, e.output, e.next_out, T - e.avail_out) ? (n.mode = 31,
                            -4) : (R -= e.avail_in,
                            T -= e.avail_out,
                            e.total_in += R,
                            e.total_out += T,
                            n.total += T,
                            n.wrap && T && (e.adler = n.check = n.flags ? p(n.check, a, T, e.next_out - T) : _(n.check, a, T, e.next_out - T)),
                            e.data_type = n.bits + (n.last ? 64 : 0) + (12 === n.mode ? 128 : 0) + (20 === n.mode || 15 === n.mode ? 256 : 0),
                            (0 === R && 0 === T || 4 === t) && B === E && (B = -5),
                            B)
                        }
                        ,
                        n.inflateEnd = function(e) {
                            if (!e || !e.state)
                                return b;
                            var t = e.state;
                            return t.window && (t.window = null),
                            e.state = null,
                            E
                        }
                        ,
                        n.inflateGetHeader = function(e, t) {
                            var n;
                            return e && e.state ? 0 == (2 & (n = e.state).wrap) ? b : ((n.head = t).done = !1,
                            E) : b
                        }
                        ,
                        n.inflateSetDictionary = function(e, t) {
                            var n, i = t.length;
                            return e && e.state ? 0 !== (n = e.state).wrap && 11 !== n.mode ? b : 11 === n.mode && _(1, t, i, 0) !== n.check ? -3 : c(e, t, i, i) ? (n.mode = 31,
                            -4) : (n.havedict = 1,
                            E) : b
                        }
                        ,
                        n.inflateInfo = "pako inflate (from Nodeca project)"
                    }
                    , {
                        "../utils/common": 1,
                        "./adler32": 3,
                        "./crc32": 5,
                        "./inffast": 7,
                        "./inftrees": 9
                    }],
                    9: [function(e, t, n) {
                        "use strict";
                        var i = e("../utils/common")
                          , r = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]
                          , a = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78]
                          , o = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0]
                          , s = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
                        t.exports = function(e, t, n, u, l, c, d, f) {
                            var h, _, p, m, v, y, g, E, b, S = f.bits, k = 0, R = 0, T = 0, w = 0, L = 0, A = 0, O = 0, C = 0, D = 0, I = 0, M = null, P = 0, x = new i.Buf16(16), B = new i.Buf16(16), N = null, U = 0;
                            for (k = 0; k <= 15; k++)
                                x[k] = 0;
                            for (R = 0; R < u; R++)
                                x[t[n + R]]++;
                            for (L = S,
                            w = 15; 1 <= w && 0 === x[w]; w--)
                                ;
                            if (w < L && (L = w),
                            0 === w)
                                return l[c++] = 20971520,
                                l[c++] = 20971520,
                                f.bits = 1,
                                0;
                            for (T = 1; T < w && 0 === x[T]; T++)
                                ;
                            for (L < T && (L = T),
                            k = C = 1; k <= 15; k++)
                                if (C <<= 1,
                                (C -= x[k]) < 0)
                                    return -1;
                            if (0 < C && (0 === e || 1 !== w))
                                return -1;
                            for (B[1] = 0,
                            k = 1; k < 15; k++)
                                B[k + 1] = B[k] + x[k];
                            for (R = 0; R < u; R++)
                                0 !== t[n + R] && (d[B[t[n + R]]++] = R);
                            if (y = 0 === e ? (M = N = d,
                            19) : 1 === e ? (M = r,
                            P -= 257,
                            N = a,
                            U -= 257,
                            256) : (M = o,
                            N = s,
                            -1),
                            k = T,
                            v = c,
                            O = R = I = 0,
                            p = -1,
                            m = (D = 1 << (A = L)) - 1,
                            1 === e && 852 < D || 2 === e && 592 < D)
                                return 1;
                            for (; ; ) {
                                for (g = k - O,
                                b = d[R] < y ? (E = 0,
                                d[R]) : d[R] > y ? (E = N[U + d[R]],
                                M[P + d[R]]) : (E = 96,
                                0),
                                h = 1 << k - O,
                                T = _ = 1 << A; l[v + (I >> O) + (_ -= h)] = g << 24 | E << 16 | b | 0,
                                0 !== _; )
                                    ;
                                for (h = 1 << k - 1; I & h; )
                                    h >>= 1;
                                if (0 !== h ? (I &= h - 1,
                                I += h) : I = 0,
                                R++,
                                0 == --x[k]) {
                                    if (k === w)
                                        break;
                                    k = t[n + d[R]]
                                }
                                if (L < k && (I & m) !== p) {
                                    for (0 === O && (O = L),
                                    v += T,
                                    C = 1 << (A = k - O); A + O < w && !((C -= x[A + O]) <= 0); )
                                        A++,
                                        C <<= 1;
                                    if (D += 1 << A,
                                    1 === e && 852 < D || 2 === e && 592 < D)
                                        return 1;
                                    l[p = I & m] = L << 24 | A << 16 | v - c | 0
                                }
                            }
                            return 0 !== I && (l[v + I] = k - O << 24 | 64 << 16 | 0),
                            f.bits = L,
                            0
                        }
                    }
                    , {
                        "../utils/common": 1
                    }],
                    10: [function(e, t, n) {
                        "use strict";
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
                        }
                    }
                    , {}],
                    11: [function(e, t, n) {
                        "use strict";
                        t.exports = function() {
                            this.input = null,
                            this.next_in = 0,
                            this.avail_in = 0,
                            this.total_in = 0,
                            this.output = null,
                            this.next_out = 0,
                            this.avail_out = 0,
                            this.total_out = 0,
                            this.msg = "",
                            this.state = null,
                            this.data_type = 2,
                            this.adler = 0
                        }
                    }
                    , {}],
                    "/lib/inflate.js": [function(e, t, n) {
                        "use strict";
                        function i(e) {
                            if (!(this instanceof i))
                                return new i(e);
                            this.options = o.assign({
                                chunkSize: 16384,
                                windowBits: 0,
                                to: ""
                            }, e || {});
                            var t = this.options;
                            t.raw && 0 <= t.windowBits && t.windowBits < 16 && (t.windowBits = -t.windowBits,
                            0 === t.windowBits && (t.windowBits = -15)),
                            !(0 <= t.windowBits && t.windowBits < 16) || e && e.windowBits || (t.windowBits += 32),
                            15 < t.windowBits && t.windowBits < 48 && 0 == (15 & t.windowBits) && (t.windowBits |= 15),
                            this.err = 0,
                            this.msg = "",
                            this.ended = !1,
                            this.chunks = [],
                            this.strm = new c,
                            this.strm.avail_out = 0;
                            var n = a.inflateInit2(this.strm, t.windowBits);
                            if (n !== u.Z_OK)
                                throw new Error(l[n]);
                            if (this.header = new d,
                            a.inflateGetHeader(this.strm, this.header),
                            t.dictionary && ("string" == typeof t.dictionary ? t.dictionary = s.string2buf(t.dictionary) : "[object ArrayBuffer]" === f.call(t.dictionary) && (t.dictionary = new Uint8Array(t.dictionary)),
                            t.raw && (n = a.inflateSetDictionary(this.strm, t.dictionary)) !== u.Z_OK))
                                throw new Error(l[n])
                        }
                        function r(e, t) {
                            var n = new i(t);
                            if (n.push(e, !0),
                            n.err)
                                throw n.msg || l[n.err];
                            return n.result
                        }
                        var a = e("./zlib/inflate")
                          , o = e("./utils/common")
                          , s = e("./utils/strings")
                          , u = e("./zlib/constants")
                          , l = e("./zlib/messages")
                          , c = e("./zlib/zstream")
                          , d = e("./zlib/gzheader")
                          , f = Object.prototype.toString;
                        i.prototype.push = function(e, t) {
                            var n, i, r, l, c, d = this.strm, h = this.options.chunkSize, _ = this.options.dictionary, p = !1;
                            if (this.ended)
                                return !1;
                            i = t === ~~t ? t : !0 === t ? u.Z_FINISH : u.Z_NO_FLUSH,
                            "string" == typeof e ? d.input = s.binstring2buf(e) : "[object ArrayBuffer]" === f.call(e) ? d.input = new Uint8Array(e) : d.input = e,
                            d.next_in = 0,
                            d.avail_in = d.input.length;
                            do {
                                if (0 === d.avail_out && (d.output = new o.Buf8(h),
                                d.next_out = 0,
                                d.avail_out = h),
                                (n = a.inflate(d, u.Z_NO_FLUSH)) === u.Z_NEED_DICT && _ && (n = a.inflateSetDictionary(this.strm, _)),
                                n === u.Z_BUF_ERROR && !0 === p && (n = u.Z_OK,
                                p = !1),
                                n !== u.Z_STREAM_END && n !== u.Z_OK)
                                    return this.onEnd(n),
                                    !(this.ended = !0);
                                d.next_out && (0 !== d.avail_out && n !== u.Z_STREAM_END && (0 !== d.avail_in || i !== u.Z_FINISH && i !== u.Z_SYNC_FLUSH) || ("string" === this.options.to ? (r = s.utf8border(d.output, d.next_out),
                                l = d.next_out - r,
                                c = s.buf2string(d.output, r),
                                d.next_out = l,
                                d.avail_out = h - l,
                                l && o.arraySet(d.output, d.output, r, l, 0),
                                this.onData(c)) : this.onData(o.shrinkBuf(d.output, d.next_out)))),
                                0 === d.avail_in && 0 === d.avail_out && (p = !0)
                            } while ((0 < d.avail_in || 0 === d.avail_out) && n !== u.Z_STREAM_END);return n === u.Z_STREAM_END && (i = u.Z_FINISH),
                            i === u.Z_FINISH ? (n = a.inflateEnd(this.strm),
                            this.onEnd(n),
                            this.ended = !0,
                            n === u.Z_OK) : i !== u.Z_SYNC_FLUSH || (this.onEnd(u.Z_OK),
                            !(d.avail_out = 0))
                        }
                        ,
                        i.prototype.onData = function(e) {
                            this.chunks.push(e)
                        }
                        ,
                        i.prototype.onEnd = function(e) {
                            e === u.Z_OK && ("string" === this.options.to ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)),
                            this.chunks = [],
                            this.err = e,
                            this.msg = this.strm.msg
                        }
                        ,
                        n.Inflate = i,
                        n.inflate = r,
                        n.inflateRaw = function(e, t) {
                            return (t = t || {}).raw = !0,
                            r(e, t)
                        }
                        ,
                        n.ungzip = r
                    }
                    , {
                        "./utils/common": 1,
                        "./utils/strings": 2,
                        "./zlib/constants": 4,
                        "./zlib/gzheader": 6,
                        "./zlib/inflate": 8,
                        "./zlib/messages": 10,
                        "./zlib/zstream": 11
                    }]
                }, {}, [])("/lib/inflate.js")
            }
            ])
        }
        ,
        "object" == typeof t && "object" == typeof e ? e.exports = i() : "function" == typeof define && define.amd ? define([], i) : "object" == typeof t ? t.DanmakuWebSocket = i() : n.DanmakuWebSocket = i()
        }
    });
