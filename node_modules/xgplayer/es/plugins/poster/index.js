import { inherits as _inherits, createSuper as _createSuper, classCallCheck as _classCallCheck, createClass as _createClass } from "../../_virtual/_rollupPluginBabelHelpers.js";
import util from "../../utils/util.js";
import { ENDED, TIME_UPDATE, URL_CHANGE, PLAY } from "../../events.js";
import "../../utils/debug.js";
import Plugin from "../../plugin/plugin.js";
var Poster = /* @__PURE__ */ function(_Plugin) {
  _inherits(Poster2, _Plugin);
  var _super = _createSuper(Poster2);
  function Poster2() {
    _classCallCheck(this, Poster2);
    return _super.apply(this, arguments);
  }
  _createClass(Poster2, [{
    key: "isEndedShow",
    get: function get() {
      return this.config.isEndedShow;
    },
    set: function set(value) {
      this.config.isEndedShow = value;
    }
  }, {
    key: "hide",
    value: function hide() {
      util.addClass(this.root, "hide");
    }
  }, {
    key: "show",
    value: function show() {
      util.removeClass(this.root, "hide");
    }
  }, {
    key: "beforeCreate",
    value: function beforeCreate(args) {
      if (typeof args.player.config.poster === "string") {
        args.config.poster = args.player.config.poster;
      }
    }
  }, {
    key: "afterCreate",
    value: function afterCreate() {
      var _this = this;
      this.on(ENDED, function() {
        if (_this.isEndedShow) {
          util.removeClass(_this.root, "hide");
        }
      });
      if (this.config.hideCanplay) {
        this.once(TIME_UPDATE, function() {
          _this.onTimeUpdate();
        });
        this.on(URL_CHANGE, function() {
          util.removeClass(_this.root, "hide");
          util.addClass(_this.root, "xg-showplay");
          _this.once(TIME_UPDATE, function() {
            _this.onTimeUpdate();
          });
        });
      } else {
        this.on(PLAY, function() {
          util.addClass(_this.root, "hide");
        });
      }
    }
  }, {
    key: "onTimeUpdate",
    value: function onTimeUpdate() {
      var _this2 = this;
      if (!this.player.currentTime) {
        this.once(TIME_UPDATE, function() {
          _this2.onTimeUpdate();
        });
      } else {
        util.removeClass(this.root, "xg-showplay");
      }
    }
  }, {
    key: "update",
    value: function update(poster) {
      if (!poster) {
        return;
      }
      this.config.poster = poster;
      this.root.style.backgroundImage = "url(".concat(poster, ")");
    }
  }, {
    key: "render",
    value: function render() {
      var _this$config = this.config, poster = _this$config.poster, hideCanplay = _this$config.hideCanplay;
      var style = poster ? "background-image:url(".concat(poster, ");") : "";
      return '<xg-poster class="xgplayer-poster '.concat(hideCanplay ? "xg-showplay" : "", '" style="').concat(style, '">\n    </xg-poster>');
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return "poster";
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {
        isEndedShow: true,
        hideCanplay: false,
        poster: ""
      };
    }
  }]);
  return Poster2;
}(Plugin);
export { Poster as default };
