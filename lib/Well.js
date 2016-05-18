'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var Well = (function (_React$Component) {
  _inherits(Well, _React$Component);

  function Well() {
    _classCallCheck(this, _Well);

    _React$Component.apply(this, arguments);
  }

  Well.prototype.render = function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, { className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  };

  var _Well = Well;
  Well = _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL])(Well) || Well;
  Well = _utilsBootstrapUtils.bsClass('well')(Well) || Well;
  return Well;
})(_react2['default'].Component);

exports['default'] = Well;
module.exports = exports['default'];