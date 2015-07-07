'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Navbar = _react2['default'].createClass({
  displayName: 'Navbar',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    fixedTop: _react2['default'].PropTypes.bool,
    fixedBottom: _react2['default'].PropTypes.bool,
    staticTop: _react2['default'].PropTypes.bool,
    inverse: _react2['default'].PropTypes.bool,
    fluid: _react2['default'].PropTypes.bool,
    role: _react2['default'].PropTypes.string,
    componentClass: _utilsCustomPropTypes2['default'].elementType,
    brand: _react2['default'].PropTypes.node,
    toggleButton: _react2['default'].PropTypes.node,
    toggleNavKey: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number]),
    onToggle: _react2['default'].PropTypes.func,
    navExpanded: _react2['default'].PropTypes.bool,
    defaultNavExpanded: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'navbar',
      bsStyle: 'default',
      role: 'navigation',
      componentClass: 'nav'
    };
  },

  getInitialState: function getInitialState() {
    return {
      navExpanded: this.props.defaultNavExpanded
    };
  },

  shouldComponentUpdate: function shouldComponentUpdate() {
    // Defer any updates to this component during the `onSelect` handler.
    return !this._isChanging;
  },

  handleToggle: function handleToggle() {
    if (this.props.onToggle) {
      this._isChanging = true;
      this.props.onToggle();
      this._isChanging = false;
    }

    this.setState({
      navExpanded: !this.state.navExpanded
    });
  },

  isNavExpanded: function isNavExpanded() {
    return this.props.navExpanded != null ? this.props.navExpanded : this.state.navExpanded;
  },

  render: function render() {
    var classes = this.getBsClassSet();
    var ComponentClass = this.props.componentClass;

    classes['navbar-fixed-top'] = this.props.fixedTop;
    classes['navbar-fixed-bottom'] = this.props.fixedBottom;
    classes['navbar-static-top'] = this.props.staticTop;
    classes['navbar-inverse'] = this.props.inverse;

    return _react2['default'].createElement(
      ComponentClass,
      _extends({}, this.props, { className: (0, _classnames2['default'])(this.props.className, classes) }),
      _react2['default'].createElement(
        'div',
        { className: this.props.fluid ? 'container-fluid' : 'container' },
        this.props.brand || this.props.toggleButton || this.props.toggleNavKey != null ? this.renderHeader() : null,
        _utilsValidComponentChildren2['default'].map(this.props.children, this.renderChild)
      )
    );
  },

  renderChild: function renderChild(child, index) {
    return (0, _react.cloneElement)(child, {
      navbar: true,
      collapsible: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey,
      expanded: this.props.toggleNavKey != null && this.props.toggleNavKey === child.props.eventKey && this.isNavExpanded(),
      key: child.key ? child.key : index
    });
  },

  renderHeader: function renderHeader() {
    var brand = undefined;

    if (this.props.brand) {
      if (_react2['default'].isValidElement(this.props.brand)) {
        brand = (0, _react.cloneElement)(this.props.brand, {
          className: (0, _classnames2['default'])(this.props.brand.props.className, 'navbar-brand')
        });
      } else {
        brand = _react2['default'].createElement(
          'span',
          { className: 'navbar-brand' },
          this.props.brand
        );
      }
    }

    return _react2['default'].createElement(
      'div',
      { className: 'navbar-header' },
      brand,
      this.props.toggleButton || this.props.toggleNavKey != null ? this.renderToggleButton() : null
    );
  },

  renderToggleButton: function renderToggleButton() {
    var children = undefined;

    if (_react2['default'].isValidElement(this.props.toggleButton)) {

      return (0, _react.cloneElement)(this.props.toggleButton, {
        className: (0, _classnames2['default'])(this.props.toggleButton.props.className, 'navbar-toggle'),
        onClick: (0, _utilsCreateChainedFunction2['default'])(this.handleToggle, this.props.toggleButton.props.onClick)
      });
    }

    children = this.props.toggleButton != null ? this.props.toggleButton : [_react2['default'].createElement(
      'span',
      { className: 'sr-only', key: 0 },
      'Toggle navigation'
    ), _react2['default'].createElement('span', { className: 'icon-bar', key: 1 }), _react2['default'].createElement('span', { className: 'icon-bar', key: 2 }), _react2['default'].createElement('span', { className: 'icon-bar', key: 3 })];

    return _react2['default'].createElement(
      'button',
      { className: 'navbar-toggle', type: 'button', onClick: this.handleToggle },
      children
    );
  }
});

exports['default'] = Navbar;
module.exports = exports['default'];