'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibIsRequiredForA11y = require('react-prop-types/lib/isRequiredForA11y');

var _reactPropTypesLibIsRequiredForA11y2 = _interopRequireDefault(_reactPropTypesLibIsRequiredForA11y);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var Tooltip = _react2['default'].createClass({
  displayName: 'Tooltip',

  propTypes: {
    /**
     * An html id attribute, necessary for accessibility
     * @type {string}
     * @required
     */
    id: _reactPropTypesLibIsRequiredForA11y2['default'](_react2['default'].PropTypes.oneOfType([_react2['default'].PropTypes.string, _react2['default'].PropTypes.number])),

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
      bsClass: 'tooltip',
      placement: 'right'
    };
  },

  render: function render() {
    var _classes;

    var classes = (_classes = {}, _classes[_utilsBootstrapUtils.prefix(this.props)] = true, _classes[this.props.placement] = true, _classes);

    var style = _extends({
      left: this.props.positionLeft,
      top: this.props.positionTop
    }, this.props.style);

    var arrowStyle = {
      left: this.props.arrowOffsetLeft,
      top: this.props.arrowOffsetTop
    };

    return _react2['default'].createElement(
      'div',
      _extends({
        role: 'tooltip'
      }, this.props, {
        className: _classnames2['default'](this.props.className, classes),
        style: style
      }),
      _react2['default'].createElement('div', { className: _utilsBootstrapUtils.prefix(this.props, 'arrow'), style: arrowStyle }),
      _react2['default'].createElement(
        'div',
        { className: _utilsBootstrapUtils.prefix(this.props, 'inner') },
        this.props.children
      )
    );
  }
});

exports['default'] = Tooltip;
module.exports = exports['default'];