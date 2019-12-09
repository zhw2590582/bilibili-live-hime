var BilibiliLiveHimeContent = (function () {
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

  var DANMU = 'danmu';
  var GIFT = 'gift';
  var GUARD = 'guard';

  function query(el) {
    var doc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;
    return doc.querySelector(el);
  }

  var Content =
  /*#__PURE__*/
  function () {
    function Content() {
      classCallCheck(this, Content);

      if (!query('.blh-danmuku')) {
        this.createUI();
        this.eventBind();
        this.receiveDanmu();
      }
    }

    createClass(Content, [{
      key: "createUI",
      value: function createUI() {
        this.$danmuku = document.createElement('div');
        this.$danmuku.classList.add('blh-danmuku');
        this.$danmuku.innerHTML = "\n            <div class=\"blh-header\">\n                <div class=\"blh-header-l\"></div>\n                <div class=\"blh-header-r\">\xD7</div>\n            </div>\n            <div class=\"blh-danmu\">\n                <div class=\"blh-danmu-inner\"></div>\n            </div>\n            <div class=\"blh-gift\">\n                <div class=\"blh-gift-inner\"></div>\n            </div>\n            <div class=\"blh-footer\"></div>\n        ";
        this.$headL = query('.blh-header-l', this.$danmuku);
        this.$headR = query('.blh-header-r', this.$danmuku);
        this.$danmu = query('.blh-danmu', this.$danmuku);
        this.$danmuInner = query('.blh-danmu-inner', this.$danmuku);
        this.$gift = query('.blh-gift', this.$danmuku);
        this.$giftInner = query('.blh-gift-inner', this.$danmuku);
        this.$footer = query('.blh-footer', this.$danmuku);
        document.body.appendChild(this.$danmuku);
      }
    }, {
      key: "eventBind",
      value: function eventBind() {
        var _this = this;

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
          lastLeft = _this.$danmuku.offsetLeft;
          lastTop = _this.$danmuku.offsetTop;
          lastHeight = _this.$danmu.clientHeight;
        });
        this.$footer.addEventListener('mousedown', function (event) {
          isFootDroging = true;
          lastPageY = event.pageY;
        });
        document.addEventListener('mousemove', function (event) {
          if (isHeadDroging) {
            var x = event.pageX - lastPageX;
            var y = event.pageY - lastPageY;
            _this.$danmuku.style.transform = "translate(".concat(x, "px, ").concat(y, "px)");
          }

          if (isFootDroging) {
            var height = lastHeight + event.pageY - lastPageY;

            if (height >= 100) {
              _this.$danmu.style.height = "".concat(height, "px");
            } else {
              isFootDroging = false;
            }
          }

          if (event.composedPath().indexOf(_this.$danmuku) > -1) {
            _this.isHover = true;
          } else {
            _this.isHover = false;
          }
        });
        document.addEventListener('mouseup', function (event) {
          if (isHeadDroging) {
            isHeadDroging = false;
            _this.$danmuku.style.transform = 'translate(0, 0)';
            var x = lastLeft + event.pageX - lastPageX;
            var y = lastTop + event.pageY - lastPageY;
            _this.$danmuku.style.left = "".concat(x, "px");
            _this.$danmuku.style.top = "".concat(y, "px");
          }

          if (isFootDroging) {
            isFootDroging = false;
          }
        });
        this.$headR.addEventListener('click', function () {
          _this.$danmuku.classList.add('blh-hidden');
        });
      }
    }, {
      key: "addDanmu",
      value: function addDanmu(danmu) {
        var children = this.$danmuInner.children;

        if (children.length > 50) {
          var child = children[0];
          query('.blh-danmu-uname', child).innerText = "".concat(danmu.uname, ":");
          query('.blh-danmu-text', child).innerText = danmu.text;
          this.$danmuInner.appendChild(child);
        } else {
          this.$danmuInner.insertAdjacentHTML('beforeend', "\n                <div class=\"blh-danmu-item\">\n                    <span class=\"blh-danmu-uname\">".concat(danmu.uname, ":</span>\n                    <span class=\"blh-danmu-text\">").concat(danmu.text, "</span>\n                </div>\n            "));
        }

        if (!this.isHover) {
          this.$danmu.scrollTo(0, this.$danmu.scrollHeight);
        }
      }
    }, {
      key: "addGift",
      value: function addGift(gift) {
        var children = this.$giftInner.children;

        if (children.length > 50) {
          var child = children[0];
          query('.blh-gift-uname', child).innerText = "".concat(gift.uname, ":");
          query('.blh-gift-action', child).innerText = gift.action;
          query('.blh-gift-gift', child).innerText = gift.gift;
          query('.blh-gift-count', child).innerText = gift.count;
          this.$giftInner.appendChild(child);
        } else {
          this.$giftInner.insertAdjacentHTML('beforeend', "\n                <div class=\"blh-gift-item\">\n                    <span class=\"blh-gift-uname\">".concat(gift.uname, ":</span>\n                    <span class=\"blh-gift-action\">").concat(gift.action, "</span>\n                    <span class=\"blh-gift-gift\">").concat(gift.gift, "</span>\n                    <span class=\"blh-gift-count\">").concat(gift.count, "</span>\n                </div>\n            "));
        }

        if (!this.isHover) {
          this.$gift.scrollTo(0, this.$gift.scrollHeight);
        }
      }
    }, {
      key: "receiveDanmu",
      value: function receiveDanmu() {
        var _this2 = this;

        if (!chrome) return;
        chrome.runtime.onMessage.addListener(function (request) {
          var type = request.type,
              data = request.data;
          window.postMessage(request);

          switch (type) {
            case DANMU:
              _this2.addDanmu(data);

              break;

            case GIFT:
            case GUARD:
              _this2.addGift(data);

              break;
          }
        });
      }
    }]);

    return Content;
  }();

  var index = new Content();

  return index;

}());
//# sourceMappingURL=index.js.map
