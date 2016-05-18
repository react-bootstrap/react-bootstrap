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

var Label = (function (_React$Component) {
  _inherits(Label, _React$Component);

  function Label() {
    _classCallCheck(this, _Label);

    _React$Component.apply(this, arguments);
  }

  Label.prototype.render = function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  };

  var _Label = Label;
  Label = _utilsBootstrapUtils.bsStyles(_styleMaps.State.values().concat(_styleMaps.DEFAULT, _styleMaps.PRIMARY), _styleMaps.DEFAULT)(Label) || Label;
  Label = _utilsBootstrapUtils.bsClass('label')(Label) || Label;
  return Label;
})(_react2['default'].Component);

exports['default'] = Label;
module.exports = exports['default'];