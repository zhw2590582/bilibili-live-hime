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

  var Content =
  /*#__PURE__*/
  function () {
    function Content(type) {
      classCallCheck(this, Content);

      if (type === 'live') {
        this.initLive();
      }

      if (type === 'active') {
        this.initActive();
      }
    }

    createClass(Content, [{
      key: "initLive",
      value: function initLive() {
        console.log('live');
      }
    }, {
      key: "initActive",
      value: function initActive() {
        console.log('active');
      }
    }]);

    return Content;
  }();

  return Content;

}());
//# sourceMappingURL=index.js.map
