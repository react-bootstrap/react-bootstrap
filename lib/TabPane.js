'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _domHelpersClassAddClass = require('dom-helpers/class/addClass');

var _domHelpersClassAddClass2 = _interopRequireDefault(_domHelpersClassAddClass);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsTabUtils = require('./utils/tabUtils');

var _Fade = require('./Fade');

var _Fade2 = _interopRequireDefault(_Fade);

var TabPane = _react2['default'].createClass({
  displayName: 'TabPane',

  propTypes: {

    /**
     * Uniquely identify the TabPane amoung its siblings.
     */
    eventKey: _react.PropTypes.any,

    /**
     * Use animation when showing or hiding TabPanes. Use `false` to disable,
     * `true` to enable the default "Fade" animation or any Transition component.
     *
     */
    animation: _react.PropTypes.oneOfType([_react.PropTypes.bool, _reactPropTypesLibElementType2['default']]),

    /** @private **/
    id: _react.PropTypes.string,

    /** @private **/
    'aria-labelledby': _react.PropTypes.string,

    /**
     * Transition onEnter callback when animation is not `false`
     */
    onEnter: _react.PropTypes.func,

    /**
     * Transition onEntering callback when animation is not `false`
     */
    onEntering: _react.PropTypes.func,

    /**
     * Transition onEntered callback when animation is not `false`
     */
    onEntered: _react.PropTypes.func,

    /**
     * Transition onExit callback when animation is not `false`
     */
    onExit: _react.PropTypes.func,

    /**
     * Transition onExiting callback when animation is not `false`
     */
    onExiting: _react.PropTypes.func,

    /**
     * Transition onExited callback when animation is not `false`
     */
    onExited: _react.PropTypes.func,

    /**
     * Unmount the tab (remove it from the DOM) when it is no longer visible
     */
    unmountOnExit: _react.PropTypes.bool
  },

  contextTypes: {
    $bs_tabcontainer: _react.PropTypes.shape({
      getId: _react.PropTypes.func,
      unmountOnExit: _react.PropTypes.bool
    }),
    $bs_tabcontent: _react.PropTypes.shape({
      bsClass: _react.PropTypes.string,
      animation: _react.PropTypes.oneOfType([_react.PropTypes.bool, _reactPropTypesLibElementType2['default']]),
      activeKey: _react.PropTypes.any,
      onExited: _react.PropTypes.func,
      register: _react.PropTypes.func,
      unmountOnExit: _react.PropTypes.bool
    })
  },

  /**
   * We override the TabContainer context so Navs in TabPanes
   * don't conflict with the top level one.
   */
  childContextTypes: {
    $bs_tabcontainer: _react.PropTypes.oneOf([null])
  },

  componentWillMount: function componentWillMount() {
    this.exited = !this.isActive();
    this.registerWithParent();
  },

  componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
    if (nextProps.eventKey !== this.props.eventKey) {
      this.unregisterWithParent();
      this.registerWithParent(nextProps, nextContext);
    }
  },

  componentWillUpdate: function componentWillUpdate(nextProps, _, nextContext) {
    if (this.isActive(nextProps, nextContext)) {
      this.exited = false;
    } else if (!this.exited && !this.getTransition(nextProps, nextContext)) {
      // Otherwise let handleHidden take care of marking exited.
      this.exited = true;
      this._fireExitedCallback = true;
    }
  },

  componentDidUpdate: function componentDidUpdate() {
    if (this._fireExitedCallback) {
      this._fireExitedCallback = false;
      this.onExited();
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    this.unregisterWithParent();
  },

  getChildContext: function getChildContext() {
    return { $bs_tabcontainer: null };
  },

  getTransition: function getTransition() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
    var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

    context = this.getContext('$bs_tabcontent', context);
    return props.animation != null ? props.animation : context.animation;
  },

  getUnmountOnExit: function getUnmountOnExit() {
    var context = this.getContext('$bs_tabcontent', this.context);
    return this.props.unmountOnExit != null ? this.props.unmountOnExit : context.unmountOnExit;
  },

  isActive: function isActive() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
    var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

    return this.getContext('$bs_tabcontent', context).activeKey === props.eventKey;
  },

  render: function render() {
    var _classes;

    var active = this.isActive();
    var visible = active || !this.exited;
    var getId = this.getContext('$bs_tabcontainer').getId;
    var bsClass = this.props.bsClass || this.getContext('$bs_tabcontent').bsClass;

    var Transition = this.getTransition();

    if (!visible && !Transition && this.getUnmountOnExit()) {
      return null;
    }

    var classes = (_classes = {
      active: visible
    }, _classes[_utilsBootstrapUtils.prefix({ bsClass: bsClass }, 'pane')] = true, _classes);

    var _props = this.props;
    var eventKey = _props.eventKey;
    var id = _props.id;
    var labelledBy = _props['aria-labelledby'];
    var onExit = _props.onExit;
    var onExiting = _props.onExiting;
    var onExited = _props.onExited;
    var onEnter = _props.onEnter;
    var onEntering = _props.onEntering;
    var onEntered = _props.onEntered;

    if (typeof Transition === 'boolean') {
      Transition = Transition ? _Fade2['default'] : null;
    }

    if (getId) {
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!(id || labelledBy), 'In the context of a TabContainer, TabPanes are given generated `id` and `aria-labelledby` ' + 'attributes for the sake of proper component accessibility. Any provided ones will be ignored. ' + 'To control these attributes directly provide a `generateChildId` prop to the parent TabContainer.') : undefined;
      id = getId(eventKey, _utilsTabUtils.PANE) || null;
      labelledBy = getId(eventKey, _utilsTabUtils.TAB) || null;
    }

    var tabPane = _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        id: id,
        role: 'tabpanel',
        'aria-hidden': !visible,
        'aria-labelledby': labelledBy,
        className: _classnames2['default'](this.props.className, classes, { 'in': !Transition })
      }),
      this.props.children
    );

    if (Transition) {
      tabPane = _react2['default'].createElement(
        Transition,
        {
          'in': active,
          onExit: onExit,
          onExiting: onExiting,
          onExited: _utilsCreateChainedFunction2['default'](this.handleExited, onExited),
          onEnter: _utilsCreateChainedFunction2['default'](this.handleEnter, onEnter),
          onEntering: onEntering,
          onEntered: onEntered,
          unmountOnExit: this.getUnmountOnExit()
        },
        tabPane
      );
    }

    return tabPane;
  },

  onExited: function onExited() {
    var context = this.getContext('$bs_tabcontent');
    if (context.onExited) {
      context.onExited(this.props.eventKey);
    }
  },

  handleEnter: function handleEnter(node) {
    // ref: https://github.com/react-bootstrap/react-overlays/issues/40
    if (this.isActive()) {
      _domHelpersClassAddClass2['default'](node, 'active');
      node.offsetWidth; // eslint-disable-line no-unused-expressions
    }
  },

  handleExited: function handleExited() {
    this.exited = true;
    this.onExited();
    this.forceUpdate();
  },

  registerWithParent: function registerWithParent() {
    var props = arguments.length <= 0 || arguments[0] === undefined ? this.props : arguments[0];
    var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

    var register = this.getContext('$bs_tabcontent', context).register;

    if (register) {
      this.unregister = register(props.eventKey);
    }
  },

  unregisterWithParent: function unregisterWithParent() {
    if (this.unregister) {
      this.unregister();
    }
  },

  getContext: function getContext(key) {
    var context = arguments.length <= 1 || arguments[1] === undefined ? this.context : arguments[1];

    return context[key] || {};
  }
});

exports['default'] = _utilsBootstrapUtils.bsClass('tab', TabPane);
module.exports = exports['default'];