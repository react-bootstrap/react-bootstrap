'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var NavDropdown = (function (_React$Component) {
  _inherits(NavDropdown, _React$Component);

  function NavDropdown() {
    _classCallCheck(this, NavDropdown);

    _React$Component.apply(this, arguments);
  }

  NavDropdown.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var title = _props.title;
    var noCaret = _props.noCaret;

    var props = _objectWithoutProperties(_props, ['children', 'title', 'noCaret']);

    return _react2['default'].createElement(
      _Dropdown2['default'],
      _extends({}, props, { componentClass: 'li' }),
      _react2['default'].createElement(
        _Dropdown2['default'].Toggle,
        {
          useAnchor: true,
          disabled: props.disabled,
          noCaret: noCaret
        },
        title
      ),
      _react2['default'].createElement(
        _Dropdown2['default'].Menu,
        null,
        children
      )
    );
  };

  return NavDropdown;
})(_react2['default'].Component);

NavDropdown.propTypes = _extends({
  noCaret: _react2['default'].PropTypes.bool,
  title: _react2['default'].PropTypes.node.isRequired
}, _Dropdown2['default'].propTypes);

exports['default'] = NavDropdown;
module.exports = exports['default'];