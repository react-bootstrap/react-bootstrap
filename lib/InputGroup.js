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

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _InputGroupAddon = require('./InputGroupAddon');

var _InputGroupAddon2 = _interopRequireDefault(_InputGroupAddon);

var _InputGroupButton = require('./InputGroupButton');

var _InputGroupButton2 = _interopRequireDefault(_InputGroupButton);

var InputGroup = (function (_React$Component) {
  _inherits(InputGroup, _React$Component);

  function InputGroup() {
    _classCallCheck(this, InputGroup);

    _React$Component.apply(this, arguments);
  }

  InputGroup.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    delete props.bsClass;
    delete props.bsSize;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement('span', _extends({}, props, { className: _classnames2['default'](className, classes) }));
  };

  return InputGroup;
})(_react2['default'].Component);

InputGroup.Addon = _InputGroupAddon2['default'];
InputGroup.Button = _InputGroupButton2['default'];

exports['default'] = _utilsBootstrapUtils.bsClass('input-group', _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], InputGroup));
module.exports = exports['default'];