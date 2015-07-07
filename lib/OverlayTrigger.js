/*eslint-disable react/prop-types */
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var _utilsCreateContextWrapper = require('./utils/createContextWrapper');

var _utilsCreateContextWrapper2 = _interopRequireDefault(_utilsCreateContextWrapper);

var _Overlay = require('./Overlay');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _utilsOverlayPositionUtils = require('./utils/overlayPositionUtils');

var _utilsOverlayPositionUtils2 = _interopRequireDefault(_utilsOverlayPositionUtils);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var _reactLibWarning = require('react/lib/warning');

var _reactLibWarning2 = _interopRequireDefault(_reactLibWarning);

/**
 * Check if value one is inside or equal to the of value
 *
 * @param {string} one
 * @param {string|array} of
 * @returns {boolean}
 */
function isOneOf(one, of) {
  if (Array.isArray(of)) {
    return of.indexOf(one) >= 0;
  }
  return one === of;
}

var OverlayTrigger = _react2['default'].createClass({
  displayName: 'OverlayTrigger',

  propTypes: _extends({}, _Overlay2['default'].propTypes, {

    /**
    * Specify which action or actions trigger Overlay visibility
    */
    trigger: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.oneOf(['manual', 'click', 'hover', 'focus']), _react2['default'].PropTypes.arrayOf(_react2['default'].PropTypes.oneOf(['click', 'hover', 'focus']))]),

    /**
     * A millisecond delay amount to show and hide the Overlay once triggered
     */
    delay: _react2['default'].PropTypes.number,
    /**
     * A millisecond delay amount before showing the Overlay once triggered.
     */
    delayShow: _react2['default'].PropTypes.number,
    /**
     * A millisecond delay amount before hiding the Overlay once triggered.
     */
    delayHide: _react2['default'].PropTypes.number,

    /**
     * The initial visibility state of the Overlay, for more nuanced visibility controll consider
     * using the Overlay component directly.
     */
    defaultOverlayShown: _react2['default'].PropTypes.bool,

    /**
     * An element or text to overlay next to the target.
     */
    overlay: _react2['default'].PropTypes.node.isRequired,

    /**
     * @private
     */
    onBlur: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onClick: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onFocus: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onMouseEnter: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    onMouseLeave: _react2['default'].PropTypes.func,

    //override specific overlay props
    /**
     * @private
     */
    target: function target() {},
    /**
    * @private
    */
    onHide: function onHide() {},
    /**
     * @private
     */
    show: function show() {}
  }),

  getDefaultProps: function getDefaultProps() {
    return {
      trigger: ['hover', 'focus']
    };
  },

  getInitialState: function getInitialState() {
    return {
      isOverlayShown: this.props.defaultOverlayShown == null ? false : this.props.defaultOverlayShown
    };
  },

  show: function show() {
    this.setState({
      isOverlayShown: true
    });
  },

  hide: function hide() {
    this.setState({
      isOverlayShown: false
    });
  },

  toggle: function toggle() {
    if (this.state.isOverlayShown) {
      this.hide();
    } else {
      this.show();
    }
  },

  componentDidMount: function componentDidMount() {
    this._mountNode = document.createElement('div');
    _react2['default'].render(this._overlay, this._mountNode);
  },

  componentWillUnmount: function componentWillUnmount() {
    _react2['default'].unmountComponentAtNode(this._mountNode);
    this._mountNode = null;
    clearTimeout(this._hoverDelay);
  },

  componentDidUpdate: function componentDidUpdate() {
    _react2['default'].render(this._overlay, this._mountNode);
  },

  getOverlay: function getOverlay() {
    var _this = this;

    var props = {
      show: this.state.isOverlayShown,
      onHide: this.hide,
      rootClose: this.props.rootClose,
      target: function target() {
        return _react2['default'].findDOMNode(_this);
      },
      placement: this.props.placement,
      container: this.props.container,
      containerPadding: this.props.containerPadding
    };

    var overlay = (0, _react.cloneElement)(this.props.overlay, {
      placement: props.placement,
      container: props.container
    });

    return _react2['default'].createElement(
      _Overlay2['default'],
      props,
      overlay
    );
  },

  render: function render() {
    var trigger = _react2['default'].Children.only(this.props.children);

    var props = {
      'aria-describedby': this.props.overlay.props.id
    };

    // create in render otherwise owner is lost...
    this._overlay = this.getOverlay();

    if (this.props.trigger !== 'manual') {

      props.onClick = (0, _utilsCreateChainedFunction2['default'])(trigger.props.onClick, this.props.onClick);

      if (isOneOf('click', this.props.trigger)) {
        props.onClick = (0, _utilsCreateChainedFunction2['default'])(this.toggle, props.onClick);
      }

      if (isOneOf('hover', this.props.trigger)) {
        (0, _reactLibWarning2['default'])(!(this.props.trigger === 'hover'), '[react-bootstrap] Specifying only the `"hover"` trigger limits the visibilty of the overlay to just mouse users. ' + 'Consider also including the `"focus"` trigger so that touch and keyboard only users can see the overlay as well.');

        props.onMouseOver = (0, _utilsCreateChainedFunction2['default'])(this.handleDelayedShow, this.props.onMouseOver);
        props.onMouseOut = (0, _utilsCreateChainedFunction2['default'])(this.handleDelayedHide, this.props.onMouseOut);
      }

      if (isOneOf('focus', this.props.trigger)) {
        props.onFocus = (0, _utilsCreateChainedFunction2['default'])(this.handleDelayedShow, this.props.onFocus);
        props.onBlur = (0, _utilsCreateChainedFunction2['default'])(this.handleDelayedHide, this.props.onBlur);
      }
    } else {
      (0, _utilsDeprecationWarning2['default'])('"manual" trigger type', ' the Overlay component');
    }

    return (0, _react.cloneElement)(trigger, props);
  },

  handleDelayedShow: function handleDelayedShow() {
    var _this2 = this;

    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    var delay = this.props.delayShow != null ? this.props.delayShow : this.props.delay;

    if (!delay) {
      this.show();
      return;
    }

    this._hoverDelay = setTimeout(function () {
      _this2._hoverDelay = null;
      _this2.show();
    }, delay);
  },

  handleDelayedHide: function handleDelayedHide() {
    var _this3 = this;

    if (this._hoverDelay != null) {
      clearTimeout(this._hoverDelay);
      this._hoverDelay = null;
      return;
    }

    var delay = this.props.delayHide != null ? this.props.delayHide : this.props.delay;

    if (!delay) {
      this.hide();
      return;
    }

    this._hoverDelay = setTimeout(function () {
      _this3._hoverDelay = null;
      _this3.hide();
    }, delay);
  },

  // deprecated Methods
  calcOverlayPosition: function calcOverlayPosition() {
    var overlay = this.props.overlay;

    (0, _utilsDeprecationWarning2['default'])('OverlayTrigger.calcOverlayPosition()', 'utils/overlayPositionUtils');

    return _utilsOverlayPositionUtils2['default'].calcOverlayPosition(overlay.props.placement || this.props.placement, _react2['default'].findDOMNode(overlay), _react2['default'].findDOMNode(this), _react2['default'].findDOMNode(overlay.props.container || this.props.container), overlay.props.containerPadding || this.props.containerPadding);
  },

  getPosition: function getPosition() {
    (0, _utilsDeprecationWarning2['default'])('OverlayTrigger.getPosition()', 'utils/overlayPositionUtils');

    var overlay = this.props.overlay;

    return _utilsOverlayPositionUtils2['default'].getPosition(_react2['default'].findDOMNode(this), _react2['default'].findDOMNode(overlay.props.container || this.props.container));
  }

});

/**
 * Creates a new OverlayTrigger class that forwards the relevant context
 *
 * This static method should only be called at the module level, instead of in
 * e.g. a render() method, because it's expensive to create new classes.
 *
 * For example, you would want to have:
 *
 * > export default OverlayTrigger.withContext({
 * >   myContextKey: React.PropTypes.object
 * > });
 *
 * and import this when needed.
 */
OverlayTrigger.withContext = (0, _utilsCreateContextWrapper2['default'])(OverlayTrigger, 'overlay');

exports['default'] = OverlayTrigger;
module.exports = exports['default'];