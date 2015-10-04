'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var CARET = _react2['default'].createElement(
  'span',
  null,
  ' ',
  _react2['default'].createElement('span', { className: 'caret' })
);

var DropdownToggle = (function (_React$Component) {
  _inherits(DropdownToggle, _React$Component);

  function DropdownToggle() {
    _classCallCheck(this, DropdownToggle);

    _React$Component.apply(this, arguments);
  }

  DropdownToggle.prototype.render = function render() {
    var caret = this.props.noCaret ? null : CARET;

    var classes = {
      'dropdown-toggle': true
    };

    var Component = this.props.useAnchor ? _SafeAnchor2['default'] : _Button2['default'];

    return _react2['default'].createElement(
      Component,
      _extends({}, this.props, {
        className: _classnames2['default'](classes, this.props.className),
        type: 'button',
        'aria-haspopup': true,
        'aria-expanded': this.props.open }),
      this.props.title || this.props.children,
      caret
    );
  };

  return DropdownToggle;
})(_react2['default'].Component);

exports['default'] = DropdownToggle;

var titleAndChildrenValidation = _utilsCustomPropTypes2['default'].singlePropFrom(['title', 'children']);

DropdownToggle.defaultProps = {
  open: false,
  useAnchor: false,
  bsRole: 'toggle'
};

DropdownToggle.propTypes = {
  bsRole: _react2['default'].PropTypes.string,
  children: titleAndChildrenValidation,
  noCaret: _react2['default'].PropTypes.bool,
  open: _react2['default'].PropTypes.bool,
  title: titleAndChildrenValidation,
  useAnchor: _react2['default'].PropTypes.bool
};

DropdownToggle.isToggle = true;
DropdownToggle.titleProp = 'title';
DropdownToggle.onClickProp = 'onClick';
module.exports = exports['default'];