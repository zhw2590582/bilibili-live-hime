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

  var Injected =
  /*#__PURE__*/
  function () {
    function Injected() {
      classCallCheck(this, Injected);

      this.getPlayer().then(function (player) {
        var add = player.components.danmaku.add;

        player.components.danmaku.add = function f() {
          for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
            arg[_key] = arguments[_key];
          }

          var result = add.call.apply(add, [this].concat(arg));
          window.postMessage({
            type: 'danmu',
            data: arg[0]
          });
          return result;
        };
      });
    }

    createClass(Injected, [{
      key: "getPlayer",
      value: function getPlayer() {
        return new Promise(function (resolve) {
          (function loop() {
            if (!window.EmbedPlayer || !window.EmbedPlayer.playerInstance) {
              setTimeout(loop, 1000);
            } else if (window.EmbedPlayer.playerInstance.play) {
              var instance = window.EmbedPlayer.playerInstance.play();
              resolve(instance);
            } else {
              setTimeout(loop, 1000);
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
