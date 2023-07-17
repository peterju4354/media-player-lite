import { inherits as _inherits, createSuper as _createSuper, classCallCheck as _classCallCheck, defineProperty as _defineProperty, assertThisInitialized as _assertThisInitialized, createClass as _createClass } from "../../_virtual/_rollupPluginBabelHelpers.js";
import util from "../../utils/util.js";
import sniffer from "../../utils/sniffer.js";
import { TIME_UPDATE, COMPLETE, EMPTIED, PLAY, PAUSE, LOADED_DATA, LOAD_START } from "../../events.js";
import XG_DEBUG from "../../utils/debug.js";
import Plugin from "../../plugin/plugin.js";
var MODES = {
  REAL_TIME: "realtime",
  FIRST_FRAME: "firstframe",
  FRAME_RATE: "framerate",
  POSTER: "poster"
};
function nowTime() {
  try {
    return parseInt(window.performance.now(), 10);
  } catch (e) {
    return new Date().getTime();
  }
}
function checkIsSupportCanvas() {
  try {
    var ctx = document.createElement("canvas").getContext;
    if (ctx) {
      return true;
    }
    return false;
  } catch (e) {
    return false;
  }
}
var isSupportCanvas = null;
var DynamicBg = /* @__PURE__ */ function(_Plugin) {
  _inherits(DynamicBg2, _Plugin);
  var _super = _createSuper(DynamicBg2);
  function DynamicBg2() {
    var _this;
    _classCallCheck(this, DynamicBg2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "onLoadedData", function(e) {
      if (!_this.player) {
        return;
      }
      _this._frameCount = _this.config.startFrameCount;
      _this.renderOnTimeupdate(e);
      _this.off(TIME_UPDATE, _this.renderOnTimeupdate);
      _this.on(TIME_UPDATE, _this.renderOnTimeupdate);
    });
    _defineProperty(_assertThisInitialized(_this), "renderOnTimeupdate", function(e) {
      if (_this._frameCount > 0) {
        _this.renderOnce();
        _this._frameCount--;
      } else {
        _this._isLoaded = true;
        _this.off(TIME_UPDATE, _this.renderOnTimeupdate);
        !_this.player.paused && _this._checkIfCanStart() && _this.start();
      }
    });
    _defineProperty(_assertThisInitialized(_this), "start", function() {
      var video = _this.player.media;
      var _now = nowTime();
      var _sVideo = _this.checkVideoIsSupport(video);
      if (!_sVideo || !_this.canvasCtx) {
        return;
      }
      _this.stop();
      if (video.videoWidth && video.videoHeight) {
        _this.videoPI = video.videoHeight > 0 ? parseInt(video.videoWidth / video.videoHeight * 100, 10) : 0;
        if (_this.config.mode === MODES.REAL_TIME) {
          video && video.videoWidth && _this.update(_sVideo, _this.videoPI);
          _this.preTime = _now;
        } else if (_now - _this.preTime >= _this.interval) {
          video && video.videoWidth && _this.update(_sVideo, _this.videoPI);
          _this.preTime = _now;
        }
      }
      _this.frameId = util.requestAnimationFrame(_this.start);
    });
    _defineProperty(_assertThisInitialized(_this), "stop", function() {
      if (_this.frameId) {
        util.cancelAnimationFrame(_this.frameId);
        _this.frameId = null;
      }
    });
    return _this;
  }
  _createClass(DynamicBg2, [{
    key: "afterCreate",
    value: function afterCreate() {
      var _this2 = this;
      if (this.playerConfig.dynamicBg === true) {
        this.config.disable = false;
      }
      if (!DynamicBg2.isSupport) {
        this.config.disable = true;
      }
      var _this$config = this.config, disable = _this$config.disable, mode = _this$config.mode, frameRate = _this$config.frameRate;
      if (disable) {
        return;
      }
      this._pos = {
        width: 0,
        height: 0,
        rwidth: 0,
        rheight: 0,
        x: 0,
        y: 0,
        pi: 0
      };
      this.isStart = false;
      this._isLoaded = false;
      this.videoPI = 0;
      this.preTime = 0;
      this.interval = parseInt(1e3 / frameRate, 10);
      this.canvas = null;
      this.canvasCtx = null;
      this._frameCount = 0;
      this.once(COMPLETE, function() {
        if (!_this2.player) {
          return;
        }
        _this2.init();
        if (!_this2.player.paused) {
          _this2.start();
        }
      });
      if (mode === MODES.POSTER) {
        return;
      }
      if (mode !== MODES.FIRST_FRAME) {
        this.on(EMPTIED, function() {
          _this2.stop();
        });
        this.on(PLAY, function() {
          _this2._checkIfCanStart() && _this2.start();
        });
        this.on(PAUSE, function() {
          _this2.stop();
        });
      }
      this.on(LOADED_DATA, this.onLoadedData);
      this.on(LOAD_START, function() {
        _this2._isLoaded = false;
        _this2.stop();
      });
    }
  }, {
    key: "init",
    value: function init() {
      var player = this.player, config = this.config;
      this.canvasFilter = DynamicBg2.supportCanvasFilter();
      try {
        var parent = !this.config.isInnerRender ? player.root : player.innerContainer || player.root;
        parent.insertAdjacentHTML("afterbegin", '<div class="xgplayer-dynamic-bg"><canvas>\n        </canvas><xgmask></xgmask></div>');
        this.root = parent.children[0];
        this.canvas = this.find("canvas");
        if (!this.canvasFilter) {
          this.canvas.style.filter = config.filter;
          this.canvas.style.webkitFilter = config.filter;
        }
        this.mask = this.find("xgmask");
        config.addMask && (this.mask.style.background = config.maskBg);
        this.canvasCtx = this.canvas.getContext("2d");
        this.renderByPoster();
      } catch (e) {
        XG_DEBUG.logError("plugin:DynamicBg", e);
      }
    }
  }, {
    key: "checkVideoIsSupport",
    value: function checkVideoIsSupport(video) {
      if (!video) {
        return null;
      }
      var _tVideo = video && video instanceof window.HTMLVideoElement ? video : video.canvas ? video.canvas : video.flyVideo ? video.flyVideo : null;
      if (_tVideo && !(sniffer.browser === "safari" && (/^blob/.test(_tVideo.currentSrc) || /^blob/.test(_tVideo.src)))) {
        return _tVideo;
      }
      var _tagName = _tVideo ? _tVideo.tagName.toLowerCase() : "";
      if (_tagName === "canvas" || _tagName === "img") {
        return _tVideo;
      }
      return null;
    }
  }, {
    key: "renderByPoster",
    value: function renderByPoster() {
      var poster = this.playerConfig.poster;
      if (poster) {
        var url = util.typeOf(poster) === "String" ? poster : util.typeOf(poster.poster) === "String" ? poster.poster : null;
        this.updateImg(url);
      }
    }
  }, {
    key: "_checkIfCanStart",
    value: function _checkIfCanStart() {
      var mode = this.config.mode;
      return this._isLoaded && mode !== MODES.FIRST_FRAME && mode !== MODES.POSTER;
    }
  }, {
    key: "renderOnce",
    value: function renderOnce() {
      var video = this.player.media;
      if (!video.videoWidth || !video.videoHeight) {
        return;
      }
      this.videoPI = parseInt(video.videoWidth / video.videoHeight * 100, 10);
      var _sVideo = this.checkVideoIsSupport(video);
      _sVideo && video.videoWidth && this.update(_sVideo, this.videoPI);
    }
  }, {
    key: "updateImg",
    value: function updateImg(url) {
      var _this3 = this;
      if (!url) {
        return;
      }
      var _this$canvas$getBound = this.canvas.getBoundingClientRect(), width = _this$canvas$getBound.width, height = _this$canvas$getBound.height;
      var image = new window.Image();
      image.onload = function() {
        if (!_this3.canvas || _this3.frameId || _this3.isStart) {
          return;
        }
        _this3.canvas.height = height;
        _this3.canvas.width = width;
        var pi = parseInt(width / height * 100, 10);
        _this3.update(image, pi);
        image = null;
      };
      image.src = url;
    }
  }, {
    key: "update",
    value: function update(video, sourcePI) {
      if (!this.canvas || !this.canvasCtx || !sourcePI) {
        return;
      }
      try {
        var _pos = this._pos, config = this.config;
        var _this$canvas$getBound2 = this.canvas.getBoundingClientRect(), width = _this$canvas$getBound2.width, height = _this$canvas$getBound2.height;
        if (width !== _pos.width || height !== _pos.height || _pos.pi !== sourcePI) {
          var pi = parseInt(width / height * 100, 10);
          _pos.pi = sourcePI;
          _pos.width = this.canvas.width = width;
          _pos.height = this.canvas.height = height;
          var rheight = height;
          var rwidth = width;
          if (pi < sourcePI) {
            rwidth = parseInt(height * sourcePI / 100, 10);
          } else if (pi > sourcePI) {
            rheight = parseInt(width * 100 / sourcePI, 10);
          }
          _pos.rwidth = rwidth * config.multiple;
          _pos.rheight = rheight * config.multiple;
          _pos.x = (width - _pos.rwidth) / 2;
          _pos.y = (height - _pos.rheight) / 2;
        }
        this.canvasFilter && (this.canvasCtx.filter = config.filter);
        this.canvasCtx.drawImage(video, _pos.x, _pos.y, _pos.rwidth, _pos.rheight);
      } catch (e) {
        XG_DEBUG.logError("plugin:DynamicBg", e);
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.stop();
      this.canvasCtx = null;
      this.canvas = null;
    }
  }, {
    key: "render",
    value: function render() {
      return "";
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return "dynamicBg";
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        isInnerRender: false,
        disable: true,
        mode: "framerate",
        frameRate: 10,
        filter: "blur(50px)",
        startFrameCount: 2,
        addMask: true,
        multiple: 1.2,
        maskBg: "rgba(0,0,0,0.7)"
      };
    }
  }, {
    key: "isSupport",
    get: function get() {
      if (typeof isSupportCanvas === "boolean") {
        return isSupportCanvas;
      }
      isSupportCanvas = checkIsSupportCanvas();
      return isSupportCanvas;
    }
  }, {
    key: "supportCanvasFilter",
    value: function supportCanvasFilter() {
      return !(sniffer.browser === "safari" || sniffer.browser === "firefox");
    }
  }]);
  return DynamicBg2;
}(Plugin);
export { DynamicBg as default };
