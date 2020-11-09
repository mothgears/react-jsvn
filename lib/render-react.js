"use strict";

require("core-js/modules/es.array.concat");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _createReactRender = _interopRequireDefault(require("./createReactRender"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = (0, _createReactRender.default)(_react.default);

var _default = function _default(view) {
  for (var _len = arguments.length, envs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    envs[_key - 1] = arguments[_key];
  }

  return view.render.apply(view, [render].concat(envs));
};

exports.default = _default;
module.exports = exports.default;