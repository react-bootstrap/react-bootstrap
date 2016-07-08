'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _Collapse = require('./Collapse');

var _Collapse2 = _interopRequireDefault(_Collapse);

var NavbarCollapse = _react2['default'].createClass({
  displayName: 'NavbarCollapse',

  contextTypes: {
    $bs_navbar_bsClass: _react.PropTypes.string,
    $bs_navbar_expanded: _react.PropTypes.bool
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['children']);

    var _context = this.context;
    var _context$$bs_navbar_bsClass = _context.$bs_navbar_bsClass;
    var bsClass = _context$$bs_navbar_bsClass === undefined ? 'navbar' : _context$$bs_navbar_bsClass;
    var expanded = _context.$bs_navbar_expanded;

    return _react2['default'].createElement(
      _Collapse2['default'],
      _extends({ 'in': expanded }, props),
      _react2['default'].createElement(
        'div',
        { className: _utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'collapse') },
        children
      )
    );
  }
});

exports['default'] = NavbarCollapse;
module.exports = exports['default'];