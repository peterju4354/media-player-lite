import { inherits as _inherits, createSuper as _createSuper, classCallCheck as _classCallCheck, createClass as _createClass } from "../../_virtual/_rollupPluginBabelHelpers.js";
import "../../utils/util.js";
import "../../utils/debug.js";
import Plugin from "../../plugin/plugin.js";
var MiniProgress = /* @__PURE__ */ function(_Plugin) {
  _inherits(MiniProgress2, _Plugin);
  var _super = _createSuper(MiniProgress2);
  function MiniProgress2() {
    _classCallCheck(this, MiniProgress2);
    return _super.apply(this, arguments);
  }
  _createClass(MiniProgress2, [{
    key: "afterCreate",
    value: function afterCreate() {
    }
  }, {
    key: "update",
    value: function update() {
      var data = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {
        cached: 0,
        played: 0
      };
      var duration = arguments.length > 1 ? arguments[1] : void 0;
      if (!duration || !this.root) {
        return;
      }
      if (data.cached) {
        this.find("xg-mini-progress-cache").style.width = "".concat(data.cached / duration * 100, "%");
      }
      if (data.played) {
        this.find("xg-mini-progress-played").style.width = "".concat(data.played / duration * 100, "%");
      }
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.playerConfig.progress || !this.playerConfig.miniprogress) {
        return;
      }
      return '<xg-mini-progress class="xg-mini-progress">\n    <xg-mini-progress-cache class="xg-mini-progress-cache"></xg-mini-progress-cache>\n    <xg-mini-progress-played class="xg-mini-progress-played"></xg-mini-progress-played>\n    </xg-mini-progress>';
    }
  }], [{
    key: "pluginName",
    get: function get() {
      return "MiniProgress";
    }
  }, {
    key: "defaultConfig",
    get: function get() {
      return {};
    }
  }]);
  return MiniProgress2;
}(Plugin);
export { MiniProgress as default };
