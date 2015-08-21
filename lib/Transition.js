'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsTransitionEvents = require('./utils/TransitionEvents');

var _utilsTransitionEvents2 = _interopRequireDefault(_utilsTransitionEvents);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var UNMOUNTED = 0;
exports.UNMOUNTED = UNMOUNTED;
var EXITED = 1;
exports.EXITED = EXITED;
var ENTERING = 2;
exports.ENTERING = ENTERING;
var ENTERED = 3;
exports.ENTERED = ENTERED;
var EXITING = 4;

exports.EXITING = EXITING;

var Transition = (function (_React$Component) {
  _inherits(Transition, _React$Component);

  function Transition(props, context) {
    _classCallCheck(this, Transition);

    _React$Component.call(this, props, context);

    var initialStatus = undefined;
    if (props['in']) {
      // Start enter transition in componentDidMount.
      initialStatus = props.transitionAppear ? EXITED : ENTERED;
    } else {
      initialStatus = props.unmountOnExit ? UNMOUNTED : EXITED;
    }
    this.state = { status: initialStatus };

    this.nextCallback = null;
  }

  Transition.prototype.componentDidMount = function componentDidMount() {
    if (this.props.transitionAppear && this.props['in']) {
      this.performEnter(this.props);
    }
  };

  Transition.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
    var status = this.state.status;
    if (nextProps['in']) {
      if (status === EXITING) {
        this.performEnter(nextProps);
      } else if (this.props.unmountOnExit) {
        if (status === UNMOUNTED) {
          // Start enter transition in componentDidUpdate.
          this.setState({ status: EXITED });
        }
      } else if (status === EXITED) {
        this.performEnter(nextProps);
      }

      // Otherwise we're already entering or entered.
    } else {
        if (status === ENTERING || status === ENTERED) {
          this.performExit(nextProps);
        }

        // Otherwise we're already exited or exiting.
      }
  };

  Transition.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.props.unmountOnExit && this.state.status === EXITED) {
      // EXITED is always a transitional state to either ENTERING or UNMOUNTED
      // when using unmountOnExit.
      if (this.props['in']) {
        this.performEnter(this.props);
      } else {
        this.setState({ status: UNMOUNTED });
      }
    }
  };

  Transition.prototype.componentWillUnmount = function componentWillUnmount() {
    this.cancelNextCallback();
  };

  Transition.prototype.performEnter = function performEnter(props) {
    var _this = this;

    this.cancelNextCallback();
    var node = _react2['default'].findDOMNode(this);

    // Not this.props, because we might be about to receive new props.
    props.onEnter(node);

    this.safeSetState({ status: ENTERING }, function () {
      _this.props.onEntering(node);

      _this.onTransitionEnd(node, function () {
        _this.safeSetState({ status: ENTERED }, function () {
          _this.props.onEntered(node);
        });
      });
    });
  };

  Transition.prototype.performExit = function performExit(props) {
    var _this2 = this;

    this.cancelNextCallback();
    var node = _react2['default'].findDOMNode(this);

    // Not this.props, because we might be about to receive new props.
    props.onExit(node);

    this.safeSetState({ status: EXITING }, function () {
      _this2.props.onExiting(node);

      _this2.onTransitionEnd(node, function () {
        _this2.safeSetState({ status: EXITED }, function () {
          _this2.props.onExited(node);
        });
      });
    });
  };

  Transition.prototype.cancelNextCallback = function cancelNextCallback() {
    if (this.nextCallback !== null) {
      this.nextCallback.cancel();
      this.nextCallback = null;
    }
  };

  Transition.prototype.safeSetState = function safeSetState(nextState, callback) {
    // This shouldn't be necessary, but there are weird race conditions with
    // setState callbacks and unmounting in testing, so always make sure that
    // we can cancel any pending setState callbacks after we unmount.
    this.setState(nextState, this.setNextCallback(callback));
  };

  Transition.prototype.setNextCallback = function setNextCallback(callback) {
    var _this3 = this;

    var active = true;

    this.nextCallback = function (event) {
      if (active) {
        active = false;
        _this3.nextCallback = null;

        callback(event);
      }
    };

    this.nextCallback.cancel = function () {
      active = false;
    };

    return this.nextCallback;
  };

  Transition.prototype.onTransitionEnd = function onTransitionEnd(node, handler) {
    this.setNextCallback(handler);

    if (node) {
      _utilsTransitionEvents2['default'].addEndEventListener(node, this.nextCallback);
      setTimeout(this.nextCallback, this.props.duration);
    } else {
      setTimeout(this.nextCallback, 0);
    }
  };

  Transition.prototype.render = function render() {
    var status = this.state.status;
    if (status === UNMOUNTED) {
      return null;
    }

    var _props = this.props;
    var children = _props.children;
    var className = _props.className;

    var childProps = _objectWithoutProperties(_props, ['children', 'className']);

    _Object$keys(Transition.propTypes).forEach(function (key) {
      return delete childProps[key];
    });

    var transitionClassName = undefined;
    if (status === EXITED) {
      transitionClassName = this.props.exitedClassName;
    } else if (status === ENTERING) {
      transitionClassName = this.props.enteringClassName;
    } else if (status === ENTERED) {
      transitionClassName = this.props.enteredClassName;
    } else if (status === EXITING) {
      transitionClassName = this.props.exitingClassName;
    }

    var child = _react2['default'].Children.only(children);
    return _react2['default'].cloneElement(child, _extends({}, childProps, {
      className: _classnames2['default'](child.props.className, className, transitionClassName)
    }));
  };

  return Transition;
})(_react2['default'].Component);

Transition.propTypes = {
  /**
   * Show the component; triggers the enter or exit animation
   */
  'in': _react2['default'].PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is not shown
   */
  unmountOnExit: _react2['default'].PropTypes.bool,

  /**
   * Run the enter animation when the component mounts, if it is initially
   * shown
   */
  transitionAppear: _react2['default'].PropTypes.bool,

  /**
   * Duration of the animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  duration: _react2['default'].PropTypes.number,

  /**
   * CSS class or classes applied when the component is exited
   */
  exitedClassName: _react2['default'].PropTypes.string,
  /**
   * CSS class or classes applied while the component is exiting
   */
  exitingClassName: _react2['default'].PropTypes.string,
  /**
   * CSS class or classes applied when the component is entered
   */
  enteredClassName: _react2['default'].PropTypes.string,
  /**
   * CSS class or classes applied while the component is entering
   */
  enteringClassName: _react2['default'].PropTypes.string,

  /**
   * Callback fired before the "entering" classes are applied
   */
  onEnter: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "entering" classes are applied
   */
  onEntering: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "enter" classes are applied
   */
  onEntered: _react2['default'].PropTypes.func,
  /**
   * Callback fired before the "exiting" classes are applied
   */
  onExit: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "exiting" classes are applied
   */
  onExiting: _react2['default'].PropTypes.func,
  /**
   * Callback fired after the "exited" classes are applied
   */
  onExited: _react2['default'].PropTypes.func
};

// Name the function so it is clearer in the documentation
function noop() {}

Transition.defaultProps = {
  'in': false,
  duration: 300,
  unmountOnExit: false,
  transitionAppear: false,

  onEnter: noop,
  onEntering: noop,
  onEntered: noop,

  onExit: noop,
  onExiting: noop,
  onExited: noop
};

exports['default'] = Transition;