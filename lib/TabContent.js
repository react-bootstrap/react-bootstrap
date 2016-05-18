'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var animationPropType = _react.PropTypes.oneOfType([_react.PropTypes.bool, _reactPropTypesLibElementType2['default']]);

var TabContent = _react2['default'].createClass({
  displayName: 'TabContent',

  propTypes: {

    /**
     * the Component used to render the TabContent
     */
    componentClass: _reactPropTypesLibElementType2['default'],

    /**
     * Sets a default animation strategy for all children TabPanes.
     * Use `false` to disable, `true` to enable the default "Fade"
     * animation or any `<Transition>` component.
     */
    animation: _react.PropTypes.oneOfType([_react.PropTypes.bool, _reactPropTypesLibElementType2['default']]),

    /**
     * Unmount the tab (remove it from the DOM) when it is no longer visible
     */
    unmountOnExit: _react.PropTypes.bool
  },

  contextTypes: {
    $bs_tabcontainer: _react2['default'].PropTypes.shape({
      activeKey: _react2['default'].PropTypes.any,
      onSelect: _react.PropTypes.func
    })
  },

  childContextTypes: {
    $bs_tabcontent: _react.PropTypes.shape({
      bsClass: _react.PropTypes.string,
      animation: animationPropType,
      activeKey: _react.PropTypes.any,
      onExited: _react.PropTypes.func,
      register: _react.PropTypes.func,
      unmountOnExit: _react.PropTypes.bool
    })
  },

  getDefaultProps: function getDefaultProps() {
    return {
      componentClass: 'div',
      animation: true,
      unmountOnExit: false
    };
  },

  getInitialState: function getInitialState() {
    return {
      exitingPane: null
    };
  },

  getChildContext: function getChildContext() {
    var exitingPane = this._exitingPane;

    return {
      $bs_tabcontent: {
        bsClass: this.props.bsClass,
        animation: this.props.animation,
        activeKey: exitingPane ? undefined : this.getActiveKey(),
        onExited: this.handlePaneExited,
        register: this.registerPane,
        unmountOnExit: this.props.unmountOnExit
      }
    };
  },

  componentWillMount: function componentWillMount() {
    this.panes = [];
  },

  /**
   * This belongs in `componentWillReceiveProps()` but
   * 0.14.x contains a bug where cwrp isn't called when only context changes.
   * fixed in master, not sure it will make it into any 0.14 release
   */
  componentWillUpdate: function componentWillUpdate(nextProps, _, nextContext) {
    var currentActiveKey = this.getActiveKey();
    var nextActiveKey = this.getActiveKey(nextContext);
    var currentKeyIsStillValid = this.panes.indexOf(currentActiveKey) !== -1;

    if (this.panes.indexOf(this._exitingPane) === -1) {
      this._exitingPane = null;
    }

    if (nextActiveKey !== currentActiveKey && currentKeyIsStillValid) {
      this._exitingPane = currentActiveKey;
    }
  },

  render: function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;

    var Component = this.props.componentClass;

    var contentClass = _utilsBootstrapUtils.prefix(this.props, 'content');

    return _react2['default'].createElement(
      Component,
      { className: _classnames2['default'](contentClass, className) },
      children
    );
  },

  handlePaneExited: function handlePaneExited() {
    this._exitingPane = null;
    this.forceUpdate();
  },

  /**
   * This is unfortunately neccessary because the TabContent needs to know if
   * a TabPane is ever going to exit, since it may unmount and just leave the
   * TabContent to wait longingly forever for the handlePaneExited to be called.
   */
  registerPane: function registerPane(eventKey) {
    var _this = this;

    var panes = this.panes;

    !(panes.indexOf(eventKey) === -1) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'You cannot have multiple TabPanes of with the same `eventKey` in the same ' + 'TabContent component. Duplicate eventKey: ' + eventKey) : _invariant2['default'](false) : undefined;

    panes.push(eventKey);

    return function () {
      panes.splice(panes.indexOf(eventKey), 1);
      if (eventKey === _this.getActiveKey()) {
        _this.getContext('$bs_tabcontainer').onSelect();
      }
    };
  },

  getActiveKey: function getActiveKey() {
    var context = arguments.length <= 0 || arguments[0] === undefined ? this.context : arguments[0];

    return this.getContext('$bs_tabcontainer', context).activeKey;
  },

  getContext: function getContext(key) {
    var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

    return context[key] || {};
  }
});

exports['default'] = _utilsBootstrapUtils.bsClass('tab', TabContent);
module.exports = exports['default'];