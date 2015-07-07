'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsDomUtils = require('./utils/domUtils');

var _utilsDomUtils2 = _interopRequireDefault(_utilsDomUtils);

var _utilsOverlayPositionUtils = require('./utils/overlayPositionUtils');

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Position = (function (_React$Component) {
  function Position(props, context) {
    _classCallCheck(this, Position);

    _get(Object.getPrototypeOf(Position.prototype), 'constructor', this).call(this, props, context);
    this.state = {
      positionLeft: null,
      positionTop: null,
      arrowOffsetLeft: null,
      arrowOffsetTop: null
    };
  }

  _inherits(Position, _React$Component);

  _createClass(Position, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._needsFlush = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps() {
      this._needsFlush = true;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._maybeUpdatePosition();
    }
  }, {
    key: 'componentDidUpate',
    value: function componentDidUpate() {
      this._maybeUpdatePosition();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props;
      var placement = _props.placement;
      var children = _props.children;

      var _ref = this.props.target ? this.state : {};

      var positionLeft = _ref.positionLeft;
      var positionTop = _ref.positionTop;

      var arrows = _objectWithoutProperties(_ref, ['positionLeft', 'positionTop']);

      return (0, _react.cloneElement)(_react2['default'].Children.only(children), _extends({}, arrows, {
        placement: placement,
        positionTop: positionTop,
        positionLeft: positionLeft,
        style: _extends({}, children.props.style, {
          left: positionLeft,
          top: positionTop
        })
      }));
    }
  }, {
    key: '_maybeUpdatePosition',
    value: function _maybeUpdatePosition() {
      if (this._needsFlush) {
        this._needsFlush = false;
        this._updatePosition();
      }
    }
  }, {
    key: '_updatePosition',
    value: function _updatePosition() {
      if (this.props.target == null) {
        return;
      }

      var target = _react2['default'].findDOMNode(this.props.target(this.props));
      var container = _react2['default'].findDOMNode(this.props.container) || _utilsDomUtils2['default'].ownerDocument(this).body;

      this.setState((0, _utilsOverlayPositionUtils.calcOverlayPosition)(this.props.placement, _react2['default'].findDOMNode(this), target, container, this.props.containerPadding));
    }
  }]);

  return Position;
})(_react2['default'].Component);

Position.propTypes = {
  /**
   * The target DOM node the Component is positioned next too.
   */
  target: _react2['default'].PropTypes.func,
  /**
   * The "offsetParent" of the Component
   */
  container: _utilsCustomPropTypes2['default'].mountable,
  /**
   * Distance in pixels the Component should be positioned to the edge of the Container.
   */
  containerPadding: _react2['default'].PropTypes.number,
  /**
   * The location that the overlay should be positioned to its target.
   */
  placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left'])
};

Position.defaultProps = {
  containerPadding: 0,
  placement: 'right'
};

exports['default'] = Position;
module.exports = exports['default'];