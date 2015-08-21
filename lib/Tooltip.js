'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _utilsCustomPropTypes = require('./utils/CustomPropTypes');

var _utilsCustomPropTypes2 = _interopRequireDefault(_utilsCustomPropTypes);

var Tooltip = _react2['default'].createClass({
  displayName: 'Tooltip',

  mixins: [_BootstrapMixin2['default']],

  propTypes: {
    /**
     * An html id attribute, necessary for accessibility
     * @type {string}
     * @required
     */
    id: _utilsCustomPropTypes2['default'].isRequiredForA11y(_react2['default'].PropTypes.string),

    /**
     * Sets the direction the Tooltip is positioned towards.
     */
    placement: _react2['default'].PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * The "left" position value for the Tooltip.
     */
    positionLeft: _react2['default'].PropTypes.number,
    /**
     * The "top" position value for the Tooltip.
     */
    positionTop: _react2['default'].PropTypes.number,
    /**
     * The "left" position value for the Tooltip arrow.
     */
    arrowOffsetLeft: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    /**
     * The "top" position value for the Tooltip arrow.
     */
    arrowOffsetTop: _react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.number, _react2['default'].PropTypes.string]),
    /**
     * Title text
     */
    title: _react2['default'].PropTypes.node
  },

  getDefaultProps: function getDefaultProps() {
    return {
      placement: 'right'
    };
  },

  render: function render() {
    var _classes;

    var classes = (_classes = {
      'tooltip': true
    }, _classes[this.props.placement] = true, _classes);

    var style = _extends({
      'left': this.props.positionLeft,
      'top': this.props.positionTop
    }, this.props.style);

    // eslint-disable-line react/prop-types
    var arrowStyle = {
      'left': this.props.arrowOffsetLeft,
      'top': this.props.arrowOffsetTop
    };

    return _react2['default'].createElement(
      'div',
      _extends({ role: 'tooltip' }, this.props, { className: _classnames2['default'](this.props.className, classes), style: style }),
      _react2['default'].createElement('div', { className: 'tooltip-arrow', style: arrowStyle }),
      _react2['default'].createElement(
        'div',
        { className: 'tooltip-inner' },
        this.props.children
      )
    );
  }
});

exports['default'] = Tooltip;
module.exports = exports['default'];
// we don't want to expose the `style` property