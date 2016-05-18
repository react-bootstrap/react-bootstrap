'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _reactOverlaysLibRootCloseWrapper = require('react-overlays/lib/RootCloseWrapper');

var _reactOverlaysLibRootCloseWrapper2 = _interopRequireDefault(_reactOverlaysLibRootCloseWrapper);

var DropdownMenu = (function (_React$Component) {
  _inherits(DropdownMenu, _React$Component);

  function DropdownMenu(props) {
    _classCallCheck(this, DropdownMenu);

    _React$Component.call(this, props);

    this.focusNext = this.focusNext.bind(this);
    this.focusPrevious = this.focusPrevious.bind(this);
    this.getFocusableMenuItems = this.getFocusableMenuItems.bind(this);
    this.getItemsAndActiveIndex = this.getItemsAndActiveIndex.bind(this);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  DropdownMenu.prototype.handleKeyDown = function handleKeyDown(event) {
    switch (event.keyCode) {
      case _keycode2['default'].codes.down:
        this.focusNext();
        event.preventDefault();
        break;
      case _keycode2['default'].codes.up:
        this.focusPrevious();
        event.preventDefault();
        break;
      case _keycode2['default'].codes.esc:
      case _keycode2['default'].codes.tab:
        this.props.onClose(event);
        break;
      default:
    }
  };

  DropdownMenu.prototype.focusNext = function focusNext() {
    var _getItemsAndActiveIndex = this.getItemsAndActiveIndex();

    var items = _getItemsAndActiveIndex.items;
    var activeItemIndex = _getItemsAndActiveIndex.activeItemIndex;

    if (items.length === 0) {
      return;
    }

    if (activeItemIndex === items.length - 1) {
      items[0].focus();
      return;
    }

    items[activeItemIndex + 1].focus();
  };

  DropdownMenu.prototype.focusPrevious = function focusPrevious() {
    var _getItemsAndActiveIndex2 = this.getItemsAndActiveIndex();

    var items = _getItemsAndActiveIndex2.items;
    var activeItemIndex = _getItemsAndActiveIndex2.activeItemIndex;

    if (activeItemIndex === 0) {
      items[items.length - 1].focus();
      return;
    }

    items[activeItemIndex - 1].focus();
  };

  DropdownMenu.prototype.getItemsAndActiveIndex = function getItemsAndActiveIndex() {
    var items = this.getFocusableMenuItems();
    var activeElement = document.activeElement;
    var activeItemIndex = items.indexOf(activeElement);

    return { items: items, activeItemIndex: activeItemIndex };
  };

  DropdownMenu.prototype.getFocusableMenuItems = function getFocusableMenuItems() {
    var menuNode = _reactDom2['default'].findDOMNode(this);

    if (menuNode === undefined) {
      return [];
    }

    return [].slice.call(menuNode.querySelectorAll('[tabIndex="-1"]'), 0);
  };

  DropdownMenu.prototype.render = function render() {
    var _classes,
        _this = this;

    var _props = this.props;
    var children = _props.children;
    var onSelect = _props.onSelect;
    var pullRight = _props.pullRight;
    var className = _props.className;
    var labelledBy = _props.labelledBy;
    var open = _props.open;
    var onClose = _props.onClose;

    var props = _objectWithoutProperties(_props, ['children', 'onSelect', 'pullRight', 'className', 'labelledBy', 'open', 'onClose']);

    var items = _utilsValidComponentChildren2['default'].map(children, function (child) {
      var childProps = child.props || {};

      return _react2['default'].cloneElement(child, {
        onKeyDown: _utilsCreateChainedFunction2['default'](childProps.onKeyDown, _this.handleKeyDown),
        onSelect: _utilsCreateChainedFunction2['default'](childProps.onSelect, onSelect)
      }, childProps.children);
    });

    var classes = (_classes = {}, _classes[_utilsBootstrapUtils.prefix(this.props, 'menu')] = true, _classes[_utilsBootstrapUtils.prefix(this.props, 'menu-right')] = pullRight, _classes);

    var list = _react2['default'].createElement(
      'ul',
      _extends({
        className: _classnames2['default'](className, classes),
        role: 'menu',
        'aria-labelledby': labelledBy
      }, props),
      items
    );

    if (open) {
      list = _react2['default'].createElement(
        _reactOverlaysLibRootCloseWrapper2['default'],
        { noWrap: true, onRootClose: onClose },
        list
      );
    }

    return list;
  };

  return DropdownMenu;
})(_react2['default'].Component);

DropdownMenu.defaultProps = {
  bsRole: 'menu',
  bsClass: 'dropdown',
  pullRight: false
};

DropdownMenu.propTypes = {
  open: _react2['default'].PropTypes.bool,
  pullRight: _react2['default'].PropTypes.bool,
  onClose: _react2['default'].PropTypes.func,
  labelledBy: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
  onSelect: _react2['default'].PropTypes.func
};

exports['default'] = DropdownMenu;
module.exports = exports['default'];