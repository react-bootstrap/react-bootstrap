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

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var ButtonStyles = _styleMaps.State.values().concat(_styleMaps.DEFAULT, _styleMaps.PRIMARY, _styleMaps.LINK);

var types = ['button', 'reset', 'submit'];

var Button = (function (_React$Component) {
  _inherits(Button, _React$Component);

  function Button(props, context) {
    _classCallCheck(this, Button);

    _React$Component.call(this, props, context);
  }

  Button.prototype.render = function render() {
    var _extends2;

    var classes = this.props.navDropdown ? {} : _utilsBootstrapUtils.getClassSet(this.props);
    var renderFuncName = undefined;

    var blockClass = _utilsBootstrapUtils.prefix(this.props, 'block');

    classes = _extends((_extends2 = {
      active: this.props.active
    }, _extends2[blockClass] = this.props.block, _extends2), classes);

    if (this.props.navItem) {
      return this.renderNavItem(classes);
    }

    renderFuncName = this.props.href || this.props.target || this.props.navDropdown ? 'renderAnchor' : 'renderButton';

    return this[renderFuncName](classes);
  };

  Button.prototype.renderAnchor = function renderAnchor(classes) {
    var _props = this.props;
    var disabled = _props.disabled;
    var href = _props.href;

    classes.disabled = disabled;

    return _react2['default'].createElement(
      _SafeAnchor2['default'],
      _extends({}, this.props, {
        href: href || '#',
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  };

  Button.prototype.renderButton = function renderButton(classes) {
    var Component = this.props.componentClass || 'button';

    return _react2['default'].createElement(
      Component,
      _extends({}, this.props, {
        type: this.props.type || 'button',
        className: _classnames2['default'](this.props.className, classes) }),
      this.props.children
    );
  };

  Button.prototype.renderNavItem = function renderNavItem(classes) {
    var liClasses = {
      active: this.props.active
    };

    return _react2['default'].createElement(
      'li',
      { className: _classnames2['default'](liClasses) },
      this.renderAnchor(classes)
    );
  };

  return Button;
})(_react2['default'].Component);

Button.propTypes = {
  active: _react2['default'].PropTypes.bool,
  disabled: _react2['default'].PropTypes.bool,
  block: _react2['default'].PropTypes.bool,
  navItem: _react2['default'].PropTypes.bool,
  navDropdown: _react2['default'].PropTypes.bool,
  onClick: _react2['default'].PropTypes.func,
  /**
   * You can use a custom element for this component
   */
  componentClass: _reactPropTypesLibElementType2['default'],
  href: _react2['default'].PropTypes.string,
  target: _react2['default'].PropTypes.string,
  /**
   * Defines HTML button type Attribute
   * @type {("button"|"reset"|"submit")}
   * @defaultValue 'button'
   */
  type: _react2['default'].PropTypes.oneOf(types)
};

Button.defaultProps = {
  active: false,
  block: false,
  disabled: false,
  navItem: false,
  navDropdown: false
};

Button.types = types;

exports['default'] = _utilsBootstrapUtils.bsStyles(ButtonStyles, _styleMaps.DEFAULT, _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL, _styleMaps.Sizes.XSMALL], _utilsBootstrapUtils.bsClass('btn', Button)));
module.exports = exports['default'];