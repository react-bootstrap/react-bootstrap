'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var ButtonToolbar = _react2['default'].createClass({
  displayName: 'ButtonToolbar',

  propTypes: {
    bsSize: _Button2['default'].propTypes.bsSize
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'btn-toolbar'
    };
  },

  render: function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        role: 'toolbar',
        className: _classnames2['default'](this.props.className, classes)
      }),
      this.props.children
    );
  }
});

exports['default'] = ButtonToolbar;
module.exports = exports['default'];