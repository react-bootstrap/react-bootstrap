'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var PaginationButton = _react2['default'].createClass({
  displayName: 'PaginationButton',

  propTypes: {
    className: _react2['default'].PropTypes.string,
    eventKey: _react2['default'].PropTypes.any,
    onSelect: _react2['default'].PropTypes.func,
    disabled: _react2['default'].PropTypes.bool,
    active: _react2['default'].PropTypes.bool,
    onClick: _react2['default'].PropTypes.func,
    /**
     * You can use a custom element for this component
     */
    buttonComponentClass: _reactPropTypesLibElementType2['default']
  },

  getDefaultProps: function getDefaultProps() {
    return {
      active: false,
      disabled: false
    };
  },

  handleClick: function handleClick(event) {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onSelect) {
      this.props.onSelect(this.props.eventKey, event);
    }
  },

  render: function render() {
    var _props = this.props;
    var active = _props.active;
    var disabled = _props.disabled;
    var onClick = _props.onClick;
    var ButtonComponentClass = _props.buttonComponentClass;
    var className = _props.className;
    var style = _props.style;

    var props = _objectWithoutProperties(_props, ['active', 'disabled', 'onClick', 'buttonComponentClass', 'className', 'style']);

    delete props.onSelect;

    return _react2['default'].createElement(
      'li',
      {
        className: _classnames2['default'](className, { active: active, disabled: disabled }),
        style: style
      },
      _react2['default'].createElement(ButtonComponentClass, _extends({}, props, {
        disabled: disabled,
        onClick: _utilsCreateChainedFunction2['default'](onClick, this.handleClick)
      }))
    );
  }
});

exports['default'] = PaginationButton;
module.exports = exports['default'];