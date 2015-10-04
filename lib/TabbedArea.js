'use strict';

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Tabs = require('./Tabs');

var _Tabs2 = _interopRequireDefault(_Tabs);

var _TabPane = require('./TabPane');

var _TabPane2 = _interopRequireDefault(_TabPane);

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var _utilsDeprecationWarning = require('./utils/deprecationWarning');

var _utilsDeprecationWarning2 = _interopRequireDefault(_utilsDeprecationWarning);

var TabbedArea = _react2['default'].createClass({
  displayName: 'TabbedArea',

  componentWillMount: function componentWillMount() {
    _utilsDeprecationWarning2['default']('TabbedArea', 'Tabs', 'https://github.com/react-bootstrap/react-bootstrap/pull/1091');
  },

  render: function render() {
    var _props = this.props;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['children']);

    var tabs = _utilsValidComponentChildren2['default'].map(children, function (child) {
      var _child$props = child.props;
      var title = _child$props.tab;

      var others = _objectWithoutProperties(_child$props, ['tab']);

      return _react2['default'].createElement(_TabPane2['default'], _extends({ title: title }, others));
    });

    return _react2['default'].createElement(
      _Tabs2['default'],
      props,
      tabs
    );
  }
});

exports['default'] = TabbedArea;
module.exports = exports['default'];