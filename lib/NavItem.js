'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var NavItem = _react2['default'].createClass({
  displayName: 'NavItem',

  propTypes: {
    active: _react2['default'].PropTypes.bool,
    disabled: _react2['default'].PropTypes.bool,
    role: _react2['default'].PropTypes.string,
    href: _react2['default'].PropTypes.string,
    onClick: _react2['default'].PropTypes.func,
    onSelect: _react2['default'].PropTypes.func,
    eventKey: _react2['default'].PropTypes.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
  },

  render: function render() {
    var _props = this.props;
    var active = _props.active;
    var disabled = _props.disabled;
    var role = _props.role;
    var href = _props.href;
    var onClick = _props.onClick;
    var className = _props.className;
    var style = _props.style;

    var props = _objectWithoutProperties(_props, ['active', 'disabled', 'role', 'href', 'onClick', 'className', 'style']);

    delete props.onSelect;
    delete props.eventKey;

    if (!role) {
      if (href === '#') {
        role = 'button';
      }
    } else if (role === 'tab') {
      props['aria-selected'] = active;
    }

    return _react2['default'].createElement(
      'li',
      {
        role: 'presentation',
        className: _classnames2['default'](className, { active: active, disabled: disabled }),
        style: style
      },
      _react2['default'].createElement(_SafeAnchor2['default'], _extends({}, props, {
        disabled: disabled,
        role: role,
        href: href,
        onClick: _utilsCreateChainedFunction2['default'](onClick, this.handleClick)
      }))
    );
  },

  handleClick: function handleClick(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, e);
      }
    }
  }
});

exports['default'] = NavItem;
module.exports = exports['default'];