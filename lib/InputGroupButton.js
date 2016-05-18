'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var InputGroupButton = (function (_React$Component) {
  _inherits(InputGroupButton, _React$Component);

  function InputGroupButton() {
    _classCallCheck(this, InputGroupButton);

    _React$Component.apply(this, arguments);
  }

  InputGroupButton.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    delete props.bsClass;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement('span', _extends({}, props, { className: _classnames2['default'](className, classes) }));
  };

  return InputGroupButton;
})(_react2['default'].Component);

exports['default'] = _utilsBootstrapUtils.bsClass('input-group-btn', InputGroupButton);
module.exports = exports['default'];