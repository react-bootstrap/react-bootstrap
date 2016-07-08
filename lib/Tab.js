'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _TabPane = require('./TabPane');

var _TabPane2 = _interopRequireDefault(_TabPane);

var _TabContainer = require('./TabContainer');

var _TabContainer2 = _interopRequireDefault(_TabContainer);

var _TabContent = require('./TabContent');

var _TabContent2 = _interopRequireDefault(_TabContent);

var Tab = (function (_React$Component) {
  _inherits(Tab, _React$Component);

  function Tab() {
    _classCallCheck(this, Tab);

    _React$Component.apply(this, arguments);
  }

  Tab.prototype.render = function render() {
    var _props = this.props;
    var title = _props.title;
    var disabled = _props.disabled;
    var tabClassName = _props.tabClassName;

    var props = _objectWithoutProperties(_props, ['title', 'disabled', 'tabClassName']);

    return _react2['default'].createElement(_TabPane2['default'], props);
  };

  return Tab;
})(_react2['default'].Component);

Tab.propTypes = _extends({}, _TabPane2['default'].propTypes, {

  disabled: _react2['default'].PropTypes.bool,

  title: _react2['default'].PropTypes.node,

  /**
   * tabClassName is used as className for the associated NavItem
   */
  tabClassName: _react2['default'].PropTypes.string
});

Tab.Container = _TabContainer2['default'];
Tab.Content = _TabContent2['default'];
Tab.Pane = _TabPane2['default'];

exports['default'] = Tab;
module.exports = exports['default'];