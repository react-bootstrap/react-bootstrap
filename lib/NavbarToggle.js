'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var NavbarToggle = _react2['default'].createClass({
  displayName: 'NavbarToggle',

  propTypes: {
    onClick: _react2['default'].PropTypes.func,
    /**
     * The toggle content, if left empty it will render the default toggle (seen above).
     */
    children: _react.PropTypes.node
  },

  contextTypes: {
    $bs_navbar_bsClass: _react.PropTypes.string,
    $bs_navbar_onToggle: _react.PropTypes.func,
    $bs_navbar_expanded: _react.PropTypes.bool
  },

  render: function render() {
    var _props = this.props;
    var onClick = _props.onClick;
    var className = _props.className;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['onClick', 'className', 'children']);

    var _context = this.context;
    var _context$$bs_navbar_bsClass = _context.$bs_navbar_bsClass;
    var bsClass = _context$$bs_navbar_bsClass === undefined ? 'navbar' : _context$$bs_navbar_bsClass;
    var onToggle = _context.$bs_navbar_onToggle;
    var expanded = _context.$bs_navbar_expanded;

    var buttonProps = _extends({
      type: 'button'
    }, props, {
      onClick: _utilsCreateChainedFunction2['default'](onClick, onToggle),
      className: _classnames2['default'](className, _utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'toggle'), !expanded && 'collapsed')
    });

    if (children) {
      return _react2['default'].createElement(
        'button',
        buttonProps,
        children
      );
    }

    return _react2['default'].createElement(
      'button',
      buttonProps,
      _react2['default'].createElement(
        'span',
        { className: 'sr-only' },
        'Toggle navigation'
      ),
      _react2['default'].createElement('span', { className: 'icon-bar' }),
      _react2['default'].createElement('span', { className: 'icon-bar' }),
      _react2['default'].createElement('span', { className: 'icon-bar' })
    );
  }
});

exports['default'] = NavbarToggle;
module.exports = exports['default'];