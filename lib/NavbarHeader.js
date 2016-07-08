'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var NavbarHeader = _react2['default'].createClass({
  displayName: 'NavbarHeader',

  contextTypes: {
    $bs_navbar_bsClass: _react.PropTypes.string
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['className']);

    var _context$$bs_navbar_bsClass = this.context.$bs_navbar_bsClass;
    var bsClass = _context$$bs_navbar_bsClass === undefined ? 'navbar' : _context$$bs_navbar_bsClass;

    var headerClasses = _utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'header');

    return _react2['default'].createElement('div', _extends({}, props, { className: _classnames2['default'](className, headerClasses) }));
  }
});

exports['default'] = NavbarHeader;
module.exports = exports['default'];