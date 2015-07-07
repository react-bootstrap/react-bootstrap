'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var PageItem = _react2['default'].createClass({
  displayName: 'PageItem',

  propTypes: {
    href: _react2['default'].PropTypes.string,
    target: _react2['default'].PropTypes.string,
    title: _react2['default'].PropTypes.string,
    disabled: _react2['default'].PropTypes.bool,
    previous: _react2['default'].PropTypes.bool,
    next: _react2['default'].PropTypes.bool,
    onSelect: _react2['default'].PropTypes.func,
    eventKey: _react2['default'].PropTypes.any
  },

  getDefaultProps: function getDefaultProps() {
    return {
      href: '#'
    };
  },

  render: function render() {
    var classes = {
      'disabled': this.props.disabled,
      'previous': this.props.previous,
      'next': this.props.next
    };

    return _react2['default'].createElement(
      'li',
      _extends({}, this.props, {
        className: (0, _classnames2['default'])(this.props.className, classes) }),
      _react2['default'].createElement(
        'a',
        {
          href: this.props.href,
          title: this.props.title,
          target: this.props.target,
          onClick: this.handleSelect,
          ref: 'anchor' },
        this.props.children
      )
    );
  },

  handleSelect: function handleSelect(e) {
    if (this.props.onSelect) {
      e.preventDefault();

      if (!this.props.disabled) {
        this.props.onSelect(this.props.eventKey, this.props.href, this.props.target);
      }
    }
  }
});

exports['default'] = PageItem;
module.exports = exports['default'];