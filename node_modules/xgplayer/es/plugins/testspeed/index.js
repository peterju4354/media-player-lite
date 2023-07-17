import { inherits as _inherits, createSuper as _createSuper, classCallCheck as _classCallCheck, defineProperty as _defineProperty, assertThisInitialized as _assertThisInitialized, createClass as _createClass } from "../../_virtual/_rollupPluginBabelHelpers.js";
import util from "../../utils/util.js";
import { DOWNLOAD_SPEED_CHANGE, LOADED_DATA, REPLAY } from "../../events.js";
import "../../utils/debug.js";
import Plugin from "../../plugin/plugin.js";
var TestSpeed = /* @__PURE__ */ function(_BasePlugin) {
  _inherits(TestSpeed2, _BasePlugin);
  var _super = _createSuper(TestSpeed2);
  function TestSpeed2() {
    var _this;
    _classCallCheck(this, TestSpeed2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "getSpeed", function(speedList) {
      if (_this.speedListCache.length <= 0)
        return 0;
      var total = 0;
      _this.speedListCache.map(function(item) {
        total += item;
      });
      return Math.floor(total / _this.speedListCache.length);
    });
    _defineProperty(_assertThisInitialized(_this), "_onRealSpeedChange", function(data) {
      data.speed && _this.appendList(data.speed);
    });
    _defineProperty(_assertThisInitialized(_this), "testSpeed", function() {
      clearTimeout(_this.timer);
      _this.timer = null;
      if (!_this.player || !_this.config.openSpeed)
        return;
      var _this$config = _this.config, url = _this$config.url, loadSize = _this$config.loadSize, testCnt = _this$config.testCnt, testTimeStep = _this$config.testTimeStep;
      var testSpeedUrl = url + (url.indexOf("?") < 0 ? "?testst=" : "&testst=") + Date.now();
      if (_this.cnt >= testCnt) {
        return;
      }
      _this.cnt++;
      try {
        var start = new Date().getTime();
        var end = null;
        var xhr = new XMLHttpRequest();
        _this.xhr = xhr;
        xhr.open("GET", testSpeedUrl);
        var headers = {};
        var random = Math.floor(Math.random() * 10);
        headers.Range = "bytes=" + random + "-" + (loadSize + random);
        if (headers) {
          Object.keys(headers).forEach(function(k) {
            xhr.setRequestHeader(k, headers[k]);
          });
        }
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4) {
            _this.xhr = null;
            end = new Date().getTime();
            var size = xhr.getResponseHeader("Content-Length") / 1024 * 8;
            var speed = Math.round(size * 1e3 / (end - start));
            _this.appendList(speed);
            _this.timer = setTimeout(_this.testSpeed, testTimeStep);
          }
        };
        xhr.send();
      } catch (e) {
        console.error(e);
      }
    });
    _defineProperty(_assertThisInitialized(_this), "appendList", function(speed) {
      var saveSpeedMax = _this.config.saveSpeedMax;
      if (_this.speedListCache.length >= saveSpeedMax) {
        _this.speedListCache.shift();
      }
      _this.speedListCache.push(speed);
      _this.player && (_this.player.realTimeSpeed = speed);
      _this.updateSpeed();
    });
    _defineProperty(_assertThisInitialized(_this), "updateSpeed", function() {
      var speed = _this.getSpeed();
      var _assertThisInitialize = _assertThisInitialized(_this), player = _assertThisInitialize.player;
      if (player && (!player.avgSpeed || speed !== player.avgSpeed)) {
        player.avgSpeed = speed;
        player.emit(DOWNLOAD_SPEED_CHANGE, {
          speed,
          realTimeSpeed: player.realTimeSpeed
        });
      }
    });
    return _this;
  }
  _createClass(TestSpeed2, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;
      this.speedListCache = [];
      var _this$config2 = this.config, openSpeed = _this$config2.openSpeed, testTimeStep = _this$config2.testTimeStep;
      this.timer = null;
      this.cnt = 0;
      this.xhr = null;
      if (!openSpeed) {
        return;
      }
      this.on("real_time_speed", this._onRealSpeedChange);
      this.on([LOADED_DATA, REPLAY], function() {
        if (util.isMSE(_this2.player.video)) {
          return;
        }
        _this2.speedListCache = [];
        _this2.cnt = 0;
        _this2.timer = setTimeout(_this2.testSpeed, testTimeStep);
      });
    }
  }, {
    key: "openSpeed",
    get: function get() {
      return this.config.openSpeed;
    },
    set: function set(value) {
      this.config.openSpeed = value;
      if (!value && this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
        return;
      }
      if (this.config.openSpeed) {
        if (this.timer)
          return;
        this.timer = setTimeout(this.testSpeed, this.config.testTimeStep);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      clearTimeout(this.timer);
      this.timer = null;
      if (this.xhr && this.xhr.readyState !== 4) {
        this.xhr.cancel();
        this.xhr = null;
      }
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return "testspeed";
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        openSpeed: false,
        testCnt: 3,
        loadSize: 200 * 1024,
        testTimeStep: 3e3,
        url: "",
        saveSpeedMax: 5
      };
    }
  }]);
  return TestSpeed2;
}(Plugin);
export { TestSpeed as default };
