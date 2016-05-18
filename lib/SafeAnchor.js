'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

function isTrivialHref(href) {
  return !href || href.trim() === '#';
}

/**
 * There are situations due to browser quirks or bootstrap css where
 * an anchor tag is needed, when semantically a button tag is the
 * better choice. SafeAnchor ensures that when an anchor is used like a
 * button its accessible. It also emulates input `disabled` behavior for
 * links, which is usually desirable for Buttons, NavItems, MenuItems, etc.
 */

var SafeAnchor = (function (_React$Component) {
  _inherits(SafeAnchor, _React$Component);

  function SafeAnchor(props) {
    _classCallCheck(this, SafeAnchor);

    _React$Component.call(this, props);
    this.handleClick = this.handleClick.bind(this);
  }

  SafeAnchor.prototype.render = function render() {
    var _props = this.props;
    var href = _props.href;
    var role = _props.role;
    var tabIndex = _props.tabIndex;
    var disabled = _props.disabled;
    var style = _props.style;

    var props = _objectWithoutProperties(_props, ['href', 'role', 'tabIndex', 'disabled', 'style']);

    var Component = this.props.componentClass || 'a';

    if (isTrivialHref(href)) {
      role = role || 'button';
      // we want to make sure there is a href attribute on the node
      // otherwise, the cursor incorrectly styled (except with role='button')
      href = href || '';
    }

    if (disabled) {
      tabIndex = -1;
      style = _extends({ pointerEvents: 'none' }, style);
    }

    return _react2['default'].createElement(Component, _extends({}, props, {
      role: role,
      href: href,
      style: style,
      tabIndex: tabIndex,
      onClick: this.handleClick
    }));
  };

  SafeAnchor.prototype.handleClick = function handleClick(event) {
    var _props2 = this.props;
    var disabled = _props2.disabled;
    var href = _props2.href;
    var onClick = _props2.onClick;

    if (disabled || isTrivialHref(href)) {
      event.preventDefault();
    }

    if (disabled) {
      event.stopPropagation();
      return;
    }

    if (onClick) {
      onClick(event);
    }
  };

  return SafeAnchor;
})(_react2['default'].Component);

exports['default'] = SafeAnchor;

SafeAnchor.propTypes = {
  href: _react2['default'].PropTypes.string,
  onClick: _react2['default'].PropTypes.func,
  disabled: _react2['default'].PropTypes.bool,
  role: _react2['default'].PropTypes.string,
  tabIndex: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
  /**
   * this is sort of silly but needed for Button
   */
  componentClass: _reactPropTypesLibElementType2['default']
};
module.exports = exports['default'];