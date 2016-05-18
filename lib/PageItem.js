'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SafeAnchor = require('./SafeAnchor');

var _SafeAnchor2 = _interopRequireDefault(_SafeAnchor);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var PageItem = _react2['default'].createClass({
  displayName: 'PageItem',

  propTypes: {
    disabled: _react2['default'].PropTypes.bool,
    previous: _react2['default'].PropTypes.bool,
    next: _react2['default'].PropTypes.bool,
    onClick: _react2['default'].PropTypes.func,
    onSelect: _react2['default'].PropTypes.func,
    eventKey: _react2['default'].PropTypes.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      disabled: false,
      previous: false,
      next: false
    };
  },

  render: function render() {
    var _props = this.props;
    var disabled = _props.disabled;
    var previous = _props.previous;
    var next = _props.next;
    var onClick = _props.onClick;
    var className = _props.className;
    var style = _props.style;

    var props = _objectWithoutProperties(_props, ['disabled', 'previous', 'next', 'onClick', 'className', 'style']);

    delete props.onSelect;
    delete props.eventKey;

    return _react2['default'].createElement(
      'li',
      {
        className: _classnames2['default'](className, { disabled: disabled, previous: previous, next: next }),
        style: style
      },
      _react2['default'].createElement(_SafeAnchor2['default'], _extends({}, props, {
        disabled: disabled,
        onClick: _utilsCreateChainedFunction2['default'](onClick, this.handleSelect)
      }))
    );
  },

  handleSelect: function handleSelect(e) {
    if (this.props.onSelect || this.props.disabled) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, e);
      }
    }
  }
});

exports['default'] = PageItem;
module.exports = exports['default'];