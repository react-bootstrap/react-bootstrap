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

var NavbarBrand = (function (_React$Component) {
  _inherits(NavbarBrand, _React$Component);

  function NavbarBrand() {
    _classCallCheck(this, NavbarBrand);

    _React$Component.apply(this, arguments);
  }

  NavbarBrand.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['className', 'children']);

    var _context$$bs_navbar_bsClass = this.context.$bs_navbar_bsClass;
    var bsClass = _context$$bs_navbar_bsClass === undefined ? 'navbar' : _context$$bs_navbar_bsClass;

    var brandClasses = _utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'brand');

    if (_react2['default'].isValidElement(children)) {
      return _react2['default'].cloneElement(children, {
        className: _classnames2['default'](children.props.className, className, brandClasses)
      });
    }

    return _react2['default'].createElement(
      'span',
      _extends({}, props, { className: _classnames2['default'](className, brandClasses) }),
      children
    );
  };

  return NavbarBrand;
})(_react2['default'].Component);

NavbarBrand.contextTypes = {
  $bs_navbar_bsClass: _react2['default'].PropTypes.string
};

exports['default'] = NavbarBrand;
module.exports = exports['default'];