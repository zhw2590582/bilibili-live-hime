var BilibiliLiveHimeInjected = (function () {
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

  var DANMU = 'DANMU';
  var GIFT = 'GIFT';
  var GUARD = 'GUARD';

  var Injected =
  /*#__PURE__*/
  function () {
    function Injected() {
      classCallCheck(this, Injected);

      if (window.location.href.includes('blh=1')) {
        this.init();
      }
    }

    createClass(Injected, [{
      key: "init",
      value: function init() {
        this.getChatHistoryList().then(function (chatHistoryList) {
          var observer = new MutationObserver(function (mutationsList) {
            mutationsList.forEach(function (mutations) {
              var addedNodes = Array.from(mutations.addedNodes || []);
              addedNodes.forEach(function (item) {
                // 弹幕
                if (item.classList.contains('danmaku-item')) {
                  try {
                    window.postMessage({
                      type: DANMU,
                      data: {
                        uid: item.dataset.uid,
                        uname: item.dataset.uname,
                        danmaku: item.dataset.danmaku
                      }
                    });
                  } catch (error) {//
                  }
                } // 礼物


                if (item.classList.contains('gift-item')) {
                  try {
                    window.postMessage({
                      type: GIFT,
                      data: {
                        uid: null,
                        uname: item.querySelector('.username').innerText.trim(),
                        action: item.querySelector('.action').innerText.trim(),
                        gift: item.querySelector('.gift-name').innerText.trim(),
                        count: item.querySelector('.count').innerText.trim()
                      }
                    });
                  } catch (error) {//
                  }
                } // 上船


                if (item.classList.contains('guard-buy')) {
                  try {
                    window.postMessage({
                      type: GUARD,
                      data: {
                        uid: null,
                        uname: item.querySelector('.username').innerText.trim(),
                        action: '购买',
                        gift: '舰长',
                        count: item.querySelector('.count').innerText.trim()
                      }
                    });
                  } catch (error) {//
                  }
                }
              });
            });
          });
          observer.observe(chatHistoryList, {
            childList: true
          });
        });
        this.getPenuryGiftMsg().then(function (penuryGiftMsg) {
          var observer = new MutationObserver(function (mutationsList) {
            mutationsList.forEach(function (mutations) {
              var addedNodes = Array.from(mutations.addedNodes || []);
              addedNodes.forEach(function (item) {
                try {
                  window.postMessage({
                    type: GIFT,
                    data: {
                      uname: item.querySelector('.username').innerText.trim(),
                      action: item.querySelector('.action').innerText.trim(),
                      gift: item.querySelector('.gift-name').innerText.trim(),
                      count: item.querySelector('.count').innerText.trim()
                    }
                  });
                } catch (error) {//
                }
              });
            });
          });
          observer.observe(penuryGiftMsg, {
            childList: true
          });
        });
      }
    }, {
      key: "getChatHistoryList",
      value: function getChatHistoryList() {
        return new Promise(function (resolve) {
          (function loop() {
            var chatHistoryList = document.getElementById('chat-history-list');

            if (!chatHistoryList) {
              setTimeout(loop, 1000);
            } else {
              resolve(chatHistoryList);
            }
          })();
        });
      }
    }, {
      key: "getPenuryGiftMsg",
      value: function getPenuryGiftMsg() {
        return new Promise(function (resolve) {
          (function loop() {
            var penuryGiftMsg = document.getElementById('penury-gift-msg');

            if (!penuryGiftMsg) {
              setTimeout(loop, 1000);
            } else {
              resolve(penuryGiftMsg);
            }
          })();
        });
      }
    }]);

    return Injected;
  }();

  var index = new Injected();

  return index;

}());
//# sourceMappingURL=index.js.map
