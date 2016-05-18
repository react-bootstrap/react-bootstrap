'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _DropdownToggle = require('./DropdownToggle');

var _DropdownToggle2 = _interopRequireDefault(_DropdownToggle);

var SplitToggle = (function (_React$Component) {
  _inherits(SplitToggle, _React$Component);

  function SplitToggle() {
    _classCallCheck(this, SplitToggle);

    _React$Component.apply(this, arguments);
  }

  SplitToggle.prototype.render = function render() {
    return _react2['default'].createElement(_DropdownToggle2['default'], _extends({}, this.props, {
      useAnchor: false,
      noCaret: false
    }));
  };

  return SplitToggle;
})(_react2['default'].Component);

exports['default'] = SplitToggle;

SplitToggle.defaultProps = _DropdownToggle2['default'].defaultProps;
module.exports = exports['default'];