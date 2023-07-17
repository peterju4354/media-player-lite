import { createClass as _createClass, classCallCheck as _classCallCheck } from "../../_virtual/_rollupPluginBabelHelpers.js";
var EVENTS = {
  PRESS: "press",
  PRESS_END: "pressend",
  DOUBlE_CLICK: "doubleclick",
  CLICK: "click",
  TOUCH_MOVE: "touchmove",
  TOUCH_START: "touchstart",
  TOUCH_END: "touchend"
};
var TOUCHS = {
  start: "touchstart",
  end: "touchend",
  move: "touchmove",
  cancel: "touchcancel"
};
var MOUSES = {
  start: "mousedown",
  end: "mouseup",
  move: "mousemove",
  cancel: "mouseleave"
};
function getTouch(touches) {
  if (touches && touches.length > 0) {
    return touches[touches.length - 1];
  } else {
    return null;
  }
}
function preventToucheDefault(e) {
  var ua = navigator.userAgent;
  /(?:iPhone|iPad)/.test(ua) && e.cancelable && e.preventDefault();
}
function getDefaultConfig() {
  return {
    pressDelay: 600,
    dbClickDelay: 200,
    disablePress: false,
    disableDbClick: false,
    miniStep: 2,
    needPreventDefault: true
  };
}
var Touche = /* @__PURE__ */ function() {
  function Touche2(dom) {
    var _this = this;
    var config = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
      eventType: "touch"
    };
    _classCallCheck(this, Touche2);
    this._pos = {
      moving: false,
      start: false,
      x: 0,
      y: 0
    };
    this.config = getDefaultConfig();
    Object.keys(config).map(function(key) {
      _this.config[key] = config[key];
    });
    this.root = dom;
    this.events = config.eventType === "mouse" ? MOUSES : TOUCHS;
    this.pressIntrvalId = null;
    this.dbIntrvalId = null;
    this.__handlers = {};
    this._initEvent();
  }
  _createClass(Touche2, [{
    key: "_initEvent",
    value: function _initEvent() {
      this.onTouchStart = this.onTouchStart.bind(this);
      this.onTouchMove = this.onTouchMove.bind(this);
      this.onTouchEnd = this.onTouchEnd.bind(this);
      this.onTouchCancel = this.onTouchCancel.bind(this);
      this.root.addEventListener(this.events.start, this.onTouchStart);
    }
  }, {
    key: "__setPress",
    value: function __setPress(e) {
      var _this2 = this;
      var config = this.config;
      if (this.pressIntrvalId) {
        this.__clearPress();
      }
      this.pressIntrvalId = setTimeout(function() {
        _this2.trigger(EVENTS.PRESS, e);
        _this2._pos.press = true;
        _this2.__clearPress();
      }, config.pressDelay);
    }
  }, {
    key: "__clearPress",
    value: function __clearPress() {
      window.clearTimeout(this.pressIntrvalId);
      this.pressIntrvalId = null;
    }
  }, {
    key: "__setDb",
    value: function __setDb(e) {
      var _this3 = this;
      var config = this.config;
      if (this.dbIntrvalId) {
        this.__clearDb();
        this.trigger(EVENTS.DOUBlE_CLICK, e);
        return;
      }
      this.dbIntrvalId = setTimeout(function() {
        _this3.__clearDb();
        if (!_this3._pos.start && !_this3._pos.press && !_this3._pos.moving) {
          _this3.trigger(EVENTS.CLICK, e);
        }
      }, config.dbClickDelay);
    }
  }, {
    key: "__clearDb",
    value: function __clearDb() {
      clearTimeout(this.dbIntrvalId);
      this.dbIntrvalId = null;
    }
  }, {
    key: "on",
    value: function on(event, handler) {
      if (!this.__handlers[event]) {
        this.__handlers[event] = [];
      }
      this.__handlers[event].push(handler);
    }
  }, {
    key: "off",
    value: function off(event, handler) {
      if (!this.__handlers[event]) {
        return;
      }
      var handlers = this.__handlers[event];
      var index = -1;
      for (var i = 0; i < handlers.length; i++) {
        if (handlers[i] === handler) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        this.__handlers[event].splice(index, 1);
      }
    }
  }, {
    key: "trigger",
    value: function trigger(event, e) {
      if (!this.__handlers[event]) {
        return;
      }
      this.__handlers[event].map(function(handler) {
        try {
          handler(e);
        } catch (error) {
          console.error("trigger>>:".concat(event), error);
        }
      });
    }
  }, {
    key: "onTouchStart",
    value: function onTouchStart(e) {
      var _pos = this._pos, root = this.root, config = this.config;
      config.needPreventDefault && preventToucheDefault(e);
      var touch = getTouch(e.touches);
      _pos.x = touch ? parseInt(touch.pageX, 10) : e.pageX;
      _pos.y = touch ? parseInt(touch.pageX, 10) : e.pageX;
      _pos.start = true;
      this.__setPress(e);
      root.addEventListener(this.events.end, this.onTouchEnd);
      root.addEventListener(this.events.cancel, this.onTouchCancel);
      root.addEventListener(this.events.move, this.onTouchMove);
      this.trigger(EVENTS.TOUCH_START, e);
    }
  }, {
    key: "onTouchCancel",
    value: function onTouchCancel(e) {
      this.onTouchEnd(e);
    }
  }, {
    key: "onTouchEnd",
    value: function onTouchEnd(e) {
      var _pos = this._pos, root = this.root, config = this.config;
      config.needPreventDefault && preventToucheDefault(e);
      this.__clearPress();
      root.removeEventListener(this.events.cancel, this.onTouchCancel);
      root.removeEventListener(this.events.end, this.onTouchEnd);
      root.removeEventListener(this.events.move, this.onTouchMove);
      e.moving = _pos.moving;
      e.press = _pos.press;
      _pos.press && this.trigger(EVENTS.PRESS_END, e);
      this.trigger(EVENTS.TOUCH_END, e);
      !_pos.press && !_pos.moving && this.__setDb(e);
      _pos.press = false;
      _pos.start = false;
      _pos.moving = false;
    }
  }, {
    key: "onTouchMove",
    value: function onTouchMove(e) {
      var _pos = this._pos, config = this.config;
      var touch = getTouch(e.touches);
      var x = touch ? parseInt(touch.pageX, 10) : e.pageX;
      var y = touch ? parseInt(touch.pageY, 10) : e.pageX;
      var diffx = x - _pos.x;
      var diffy = y - _pos.y;
      if (Math.abs(diffy) < config.miniStep && Math.abs(diffx) < config.miniStep) {
        return;
      }
      this.__clearPress();
      _pos.press && this.trigger(EVENTS.PRESS_END, e);
      _pos.press = false;
      _pos.moving = true;
      this.trigger(EVENTS.TOUCH_MOVE, e);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var _this4 = this;
      var map = {
        touchend: "onTouchEnd",
        touchmove: "onTouchMove",
        touchstart: "onTouchStart"
      };
      Object.keys(map).map(function(key) {
        _this4.root.removeEventListener("touchend", _this4[map[key]]);
      });
    }
  }]);
  return Touche2;
}();
export { Touche as default };
