import { inherits as _inherits, createSuper as _createSuper, classCallCheck as _classCallCheck, defineProperty as _defineProperty, assertThisInitialized as _assertThisInitialized, createClass as _createClass, objectSpread2 as _objectSpread2 } from "../../_virtual/_rollupPluginBabelHelpers.js";
import "../../utils/util.js";
import { SHORTCUT } from "../../events.js";
import BasePlugin from "../../plugin/basePlugin.js";
import "delegate";
function preventDefault(e) {
  e.preventDefault();
  e.returnValue = false;
}
function isDisableTag(el) {
  var tagName = el.tagName;
  if (tagName === "INPUT" || tagName === "TEXTAREA" || el.isContentEditable) {
    return true;
  }
  return false;
}
var Keyboard = /* @__PURE__ */ function(_BasePlugin) {
  _inherits(Keyboard2, _BasePlugin);
  var _super = _createSuper(Keyboard2);
  function Keyboard2() {
    var _this;
    _classCallCheck(this, Keyboard2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "onBodyKeyDown", function(event) {
      var e = event || window.event;
      if (!_this.player || !_this.player.isUserActive && !_this.config.isIgnoreUserActive) {
        return;
      }
      if (_this.config.disable || _this.config.disableBodyTrigger || !_this.checkIsVisible() || e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }
      var keyCode = e.keyCode;
      if ((e.target === document.body || _this.config.isGlobalTrigger && !isDisableTag(e.target)) && _this.checkCode(keyCode, true)) {
        preventDefault(e);
        _this.handleKeyCode(keyCode, event);
        return false;
      }
      return false;
    });
    _defineProperty(_assertThisInitialized(_this), "onKeydown", function(event) {
      var e = event || window.event;
      if (_this.config.disable || _this.config.disableRootTrigger || e.metaKey || e.altKey || e.ctrlKey) {
        return;
      }
      if (!_this.player.isUserActive && !_this.config.isIgnoreUserActive) {
        return;
      }
      if (!_this.player.isUserActive && !_this.config.isIgnoreUserActive) {
        return;
      }
      if (e && (e.keyCode === 37 || _this.checkCode(e.keyCode)) && (e.target === _this.player.root || e.target === _this.player.video || e.target === _this.player.controls.el)) {
        preventDefault(e);
      } else {
        return true;
      }
      _this.handleKeyCode(e.keyCode, event);
    });
    return _this;
  }
  _createClass(Keyboard2, [{
    key: "mergekeyCodeMap",
    value: function mergekeyCodeMap() {
      var _this2 = this;
      var extendkeyCodeMap = this.config.keyCodeMap;
      if (extendkeyCodeMap) {
        Object.keys(extendkeyCodeMap).map(function(key) {
          if (!_this2.keyCodeMap[key]) {
            _this2.keyCodeMap[key] = extendkeyCodeMap[key];
          } else {
            ["keyCode", "action", "disable", "isBodyTarget"].map(function(key1) {
              extendkeyCodeMap[key][key1] && (_this2.keyCodeMap[key][key1] = extendkeyCodeMap[key][key1]);
            });
          }
        });
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      this.config.disable = !this.playerConfig.keyShortcut;
      var seekStep = typeof this.config.seekStep === "function" ? this.config.seekStep(this.player) : this.config.seekStep;
      if (!(!seekStep || typeof seekStep !== "number")) {
        this.seekStep = seekStep;
      }
      this.keyCodeMap = {
        space: {
          keyCode: 32,
          action: "playPause",
          disable: false,
          noBodyTarget: false
        },
        up: {
          keyCode: 38,
          action: "upVolume",
          disable: false,
          noBodyTarget: true
        },
        down: {
          keyCode: 40,
          action: "downVolume",
          disable: false,
          noBodyTarget: true
        },
        left: {
          keyCode: 37,
          action: "seekBack",
          disable: false
        },
        right: {
          keyCode: 39,
          action: "seek",
          disable: false
        },
        esc: {
          keyCode: 27,
          action: "exitFullscreen",
          disable: false
        }
      };
      this.mergekeyCodeMap();
      this.player.root.addEventListener("keydown", this.onKeydown);
      document.addEventListener("keydown", this.onBodyKeyDown);
    }
  }, {
    key: "checkIsVisible",
    value: function checkIsVisible() {
      if (!this.config.checkVisible) {
        return true;
      }
      var rec = this.player.root.getBoundingClientRect();
      var height = rec.height, top = rec.top, bottom = rec.bottom;
      var h = window.innerHeight;
      if (top < 0 && top < 0 - height * 0.9 || bottom > 0 && bottom - h > height * 0.9) {
        return false;
      }
      return true;
    }
  }, {
    key: "checkCode",
    value: function checkCode(code, isBodyTarget) {
      var _this3 = this;
      var flag = false;
      Object.keys(this.keyCodeMap).map(function(key) {
        if (_this3.keyCodeMap[key] && code === _this3.keyCodeMap[key].keyCode && !_this3.keyCodeMap[key].disable) {
          flag = !isBodyTarget || isBodyTarget && !_this3.keyCodeMap[key].noBodyTarget;
        }
      });
      return flag;
    }
  }, {
    key: "downVolume",
    value: function downVolume(event) {
      var player = this.player;
      var val = parseFloat((player.volume - 0.1).toFixed(1));
      var props = {
        volume: {
          from: player.volume,
          to: val
        }
      };
      this.emitUserAction(event, "change_volume", {
        props
      });
      if (val >= 0) {
        player.volume = val;
      } else {
        player.volume = 0;
      }
    }
  }, {
    key: "upVolume",
    value: function upVolume(event) {
      var player = this.player;
      var val = parseFloat((player.volume + 0.1).toFixed(1));
      var props = {
        volume: {
          from: player.volume,
          to: val
        }
      };
      this.emitUserAction(event, "change_volume", {
        props
      });
      if (val <= 1) {
        player.volume = val;
      } else {
        player.volume = 1;
      }
    }
  }, {
    key: "seek",
    value: function seek(event) {
      var _this$player = this.player, currentTime = _this$player.currentTime, duration = _this$player.duration;
      var _time = currentTime;
      if (currentTime + this.seekStep <= duration) {
        _time = currentTime + this.seekStep;
      } else {
        _time = duration - 1;
      }
      var props = {
        currentTime: {
          from: currentTime,
          to: _time
        }
      };
      this.emitUserAction(event, "seek", {
        props
      });
      this.player.currentTime = _time;
    }
  }, {
    key: "seekBack",
    value: function seekBack(event) {
      var currentTime = this.player.currentTime;
      var _time = 0;
      if (currentTime - this.seekStep >= 0) {
        _time = currentTime - this.seekStep;
      }
      var props = {
        currentTime: {
          from: currentTime,
          to: _time
        }
      };
      this.emitUserAction(event, "seek", {
        props
      });
      this.player.currentTime = _time;
    }
  }, {
    key: "playPause",
    value: function playPause(event) {
      var player = this.player;
      if (!player) {
        return;
      }
      this.emitUserAction(event, "switch_play_pause");
      if (player.paused) {
        player.play();
      } else {
        player.pause();
      }
    }
  }, {
    key: "exitFullscreen",
    value: function exitFullscreen(event) {
      var player = this.player;
      var fullscreen = player.fullscreen, cssfullscreen = player.cssfullscreen;
      if (fullscreen) {
        this.emitUserAction("keyup", "switch_fullscreen", {
          prop: "fullscreen",
          from: fullscreen,
          to: !fullscreen
        });
        player.exitFullscreen();
      }
      if (cssfullscreen) {
        this.emitUserAction("keyup", "switch_css_fullscreen", {
          prop: "cssfullscreen",
          from: cssfullscreen,
          to: !cssfullscreen
        });
        player.exitCssFullscreen();
      }
    }
  }, {
    key: "handleKeyCode",
    value: function handleKeyCode(curKeyCode, event) {
      var _this4 = this;
      Object.keys(this.keyCodeMap).map(function(key) {
        var _this4$keyCodeMap$key = _this4.keyCodeMap[key], action = _this4$keyCodeMap$key.action, keyCode = _this4$keyCodeMap$key.keyCode, disable = _this4$keyCodeMap$key.disable;
        if (keyCode === curKeyCode && !disable) {
          if (typeof action === "function") {
            action(event, _this4.player);
          } else if (typeof action === "string") {
            if (typeof _this4[action] === "function") {
              _this4[action](event, _this4.player);
            }
          }
          _this4.emit(SHORTCUT, _objectSpread2({
            key,
            target: event.target
          }, _this4.keyCodeMap[key]));
        }
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.player.root.removeEventListener("keydown", this.onKeydown);
      document.removeEventListener("keydown", this.onBodyKeyDown);
    }
  }, {
    key: "disable",
    value: function disable() {
      this.config.disable = true;
    }
  }, {
    key: "enable",
    value: function enable() {
      this.config.disable = false;
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return "keyboard";
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        seekStep: 10,
        checkVisible: true,
        disableBodyTrigger: false,
        disableRootTrigger: false,
        isGlobalTrigger: false,
        keyCodeMap: {},
        disable: false,
        isIgnoreUserActive: false
      };
    }
  }]);
  return Keyboard2;
}(BasePlugin);
export { Keyboard as default };
