'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var Badge = _react2['default'].createClass({
  displayName: 'Badge',

  propTypes: {
    pullRight: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      pullRight: false,
      bsClass: 'badge'
    };
  },

  hasContent: function hasContent() {
    var children = this.props.children;

    return _utilsValidComponentChildren2['default'].count(children) > 0 || _react2['default'].Children.count(children) > 1 || typeof children === 'string' || typeof children === 'number';
  },

  render: function render() {
    var _classes;

    var classes = (_classes = {
      'pull-right': this.props.pullRight
    }, _classes[_utilsBootstrapUtils.prefix(this.props)] = this.hasContent(), _classes);
    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, {
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  }
});

exports['default'] = Badge;
module.exports = exports['default'];