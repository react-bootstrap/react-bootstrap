'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _lodashCompatObjectOmit = require('lodash-compat/object/omit');

var _lodashCompatObjectOmit2 = _interopRequireDefault(_lodashCompatObjectOmit);

var _lodashCompatObjectPick = require('lodash-compat/object/pick');

var _lodashCompatObjectPick2 = _interopRequireDefault(_lodashCompatObjectPick);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var DropdownButton = (function (_React$Component) {
  _inherits(DropdownButton, _React$Component);

  function DropdownButton() {
    _classCallCheck(this, DropdownButton);

    _React$Component.apply(this, arguments);
  }

  DropdownButton.prototype.render = function render() {
    var _props = this.props;
    var bsStyle = _props.bsStyle;
    var bsSize = _props.bsSize;
    var disabled = _props.disabled;
    var _props2 = this.props;
    var title = _props2.title;
    var children = _props2.children;

    var props = _objectWithoutProperties(_props2, ['title', 'children']);

    var dropdownProps = _lodashCompatObjectPick2['default'](props, _Object$keys(_Dropdown2['default'].ControlledComponent.propTypes));
    var toggleProps = _lodashCompatObjectOmit2['default'](props, _Object$keys(_Dropdown2['default'].ControlledComponent.propTypes));

    return _react2['default'].createElement(
      _Dropdown2['default'],
      _extends({}, dropdownProps, {
        bsSize: bsSize,
        bsStyle: bsStyle
      }),
      _react2['default'].createElement(
        _Dropdown2['default'].Toggle,
        _extends({}, toggleProps, {
          disabled: disabled
        }),
        title
      ),
      _react2['default'].createElement(
        _Dropdown2['default'].Menu,
        null,
        children
      )
    );
  };

  return DropdownButton;
})(_react2['default'].Component);

DropdownButton.propTypes = _extends({
  disabled: _react2['default'].PropTypes.bool,
  bsStyle: _Button2['default'].propTypes.bsStyle,
  bsSize: _Button2['default'].propTypes.bsSize,

  /**
   * When used with the `title` prop, the noCaret option will not render a caret icon, in the toggle element.
   */
  noCaret: _react2['default'].PropTypes.bool,
  title: _react2['default'].PropTypes.node.isRequired

}, _Dropdown2['default'].propTypes);

DropdownButton.defaultProps = {
  disabled: false,
  pullRight: false,
  dropup: false,
  navItem: false,
  noCaret: false
};

exports['default'] = DropdownButton;
module.exports = exports['default'];