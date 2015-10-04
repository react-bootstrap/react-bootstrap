'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Tooltip = (function (_React$Component) {
  _inherits(Tooltip, _React$Component);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    _React$Component.apply(this, arguments);
  }

  Tooltip.prototype.render = function render() {
    var _props = this.props;
    var placement = _props.placement;
    var positionLeft = _props.positionLeft;
    var positionTop = _props.positionTop;
    var arrowOffsetLeft = _props.arrowOffsetLeft;
    var arrowOffsetTop = _props.arrowOffsetTop;
    var className = _props.className;
    var style = _props.style;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['placement', 'positionLeft', 'positionTop', 'arrowOffsetLeft', 'arrowOffsetTop', 'className', 'style', 'children']);

    return _react2['default'].createElement(
      'div',
      _extends({
        role: 'tooltip'
      }, props, {
        className: _classnames2['default'](className, 'tooltip', placement),
        style: _extends({ left: positionLeft, top: positionTop }, style)
      }),
      _react2['default'].createElement('div', {
        className: 'tooltip-arrow',
        style: { left: arrowOffsetLeft, top: arrowOffsetTop }
      }),
      _react2['default'].createElement(
        'div',
        { className: 'tooltip-inner' },
        children
      )
    );
  };

  return Tooltip;
})(_react2['default'].Component);

exports['default'] = Tooltip;

Tooltip.propTypes = {
  /**
   * An html id attribute, necessary for accessibility
   * @type {string}
   * @required
   */
  id: _utilsCustomPropTypes2['default'].isRequiredForA11y(_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),

  /**
   * The direction the tooltip is positioned towards
   */
  placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

  /**
   * The `left` position value for the tooltip
   */
  positionLeft: _react2['default'].PropTypes.number,
  /**
   * The `top` position value for the tooltip
   */
  positionTop: _react2['default'].PropTypes.number,
  /**
   * The `left` position value for the tooltip arrow
   */
  arrowOffsetLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
  /**
   * The `top` position value for the tooltip arrow
   */
  arrowOffsetTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string])
};

Tooltip.defaultProps = {
  placement: 'right'
};
module.exports = exports['default'];