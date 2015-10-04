'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var _Tab = require('./Tab');

var _Tab2 = _interopRequireDefault(_Tab);

var TabPane = _react2['default'].createClass({
  displayName: 'TabPane',

  componentWillMount: function componentWillMount() {
    _utilsDeprecationWarning2['default']('TabPane', 'Tab', 'https://github.com/react-bootstrap/react-bootstrap/pull/1091');
  },

  render: function render() {
    return _react2['default'].createElement(_Tab2['default'], this.props);
  }
});

exports['default'] = TabPane;
module.exports = exports['default'];