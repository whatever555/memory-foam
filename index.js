"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Cookies = require("js-cookie");

var MemoryFoam =
/*#__PURE__*/
function (_Component) {
  _inherits(MemoryFoam, _Component);

  function MemoryFoam(props) {
    var _this;

    _classCallCheck(this, MemoryFoam);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MemoryFoam).call(this, props));
    _this.myInput = _react["default"].createRef();
    _this.state = _this.getMyShizzle();
    return _this;
  }

  _createClass(MemoryFoam, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.storeMe();
      var that = this;
      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
          that.storeMe();
        });
      });
      var config = {
        attributes: true
      };
      observer.observe(this.myInput.current, config);
      this.setState({
        styles: {
          w: 'initial',
          h: 'initial'
        }
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.storeMe();
    }
  }, {
    key: "convertCookieToJSON",
    value: function convertCookieToJSON(cookie) {
      var output = {};
      if (typeof cookie === "undefined" || !cookie.length > 0) return {};
      cookie.split(/\s*;\s*/).forEach(function (pair) {
        pair = pair.split(/\s*=\s*/);
        output[pair[0]] = pair.splice(1).join("=");
      });
      var json = JSON.stringify(output, null, 4);
      return JSON.parse(json);
    }
  }, {
    key: "getMyShizzle",
    value: function getMyShizzle() {
      var cookie = this.convertCookieToJSON(this.props.cookies);
      var w = cookie["mf-w-".concat(this.props.mid)];
      var h = cookie["mf-h-".concat(this.props.mid)];
      return {
        styles: {
          display: "block",
          width: w + "px",
          height: h + "px"
        }
      };
    }
  }, {
    key: "storeMe",
    value: function storeMe() {
      var w = this.myInput.current.offsetWidth;
      var h = this.myInput.current.offsetHeight;

      if (w > 0 && h > 0) {
        Cookies.set("mf-w-".concat(this.props.id), w);
        Cookies.set("mf-h-".concat(this.props.id), h);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var styles = this.state.styles;
      return _react["default"].createElement("div", {
        ref: this.myInput,
        style: styles
      }, this.props.children);
    }
  }]);

  return MemoryFoam;
}(_react.Component);

exports["default"] = MemoryFoam;
