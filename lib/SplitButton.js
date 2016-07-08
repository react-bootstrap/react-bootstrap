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

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _SplitToggle = require('./SplitToggle');

var _SplitToggle2 = _interopRequireDefault(_SplitToggle);

var _lodashCompatObjectOmit = require('lodash-compat/object/omit');

var _lodashCompatObjectOmit2 = _interopRequireDefault(_lodashCompatObjectOmit);

var _lodashCompatObjectPick = require('lodash-compat/object/pick');

var _lodashCompatObjectPick2 = _interopRequireDefault(_lodashCompatObjectPick);

var SplitButton = (function (_React$Component) {
  _inherits(SplitButton, _React$Component);

  function SplitButton() {
    _classCallCheck(this, SplitButton);

    _React$Component.apply(this, arguments);
  }

  SplitButton.prototype.render = function render() {
    var _props = this.props;
    var children = _props.children;
    var title = _props.title;
    var onClick = _props.onClick;
    var target = _props.target;
    var href = _props.href;
    var toggleLabel = _props.toggleLabel;
    var bsSize = _props.bsSize;
    var bsStyle = _props.bsStyle;

    var props = _objectWithoutProperties(_props, ['children', 'title', 'onClick', 'target', 'href', 'toggleLabel', 'bsSize', 'bsStyle']);

    var disabled = props.disabled;

    var dropdownProps = _lodashCompatObjectPick2['default'](props, _Object$keys(_Dropdown2['default'].ControlledComponent.propTypes));
    var buttonProps = _lodashCompatObjectOmit2['default'](props, _Object$keys(_Dropdown2['default'].ControlledComponent.propTypes));

    return _react2['default'].createElement(
      _Dropdown2['default'],
      dropdownProps,
      _react2['default'].createElement(
        _Button2['default'],
        _extends({}, buttonProps, {
          onClick: onClick,
          bsStyle: bsStyle,
          bsSize: bsSize,
          disabled: disabled,
          target: target,
          href: href
        }),
        title
      ),
      _react2['default'].createElement(_SplitToggle2['default'], {
        'aria-label': toggleLabel || title,
        bsStyle: bsStyle,
        bsSize: bsSize,
        disabled: disabled
      }),
      _react2['default'].createElement(
        _Dropdown2['default'].Menu,
        null,
        children
      )
    );
  };

  return SplitButton;
})(_react2['default'].Component);

SplitButton.propTypes = _extends({}, _Dropdown2['default'].propTypes, {
  bsStyle: _Button2['default'].propTypes.bsStyle,

  /**
   * @private
   */
  onClick: function onClick() {},
  target: _react2['default'].PropTypes.string,
  href: _react2['default'].PropTypes.string,
  /**
   * The content of the split button.
   */
  title: _react2['default'].PropTypes.node.isRequired,
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: _react2['default'].PropTypes.string
});

SplitButton.defaultProps = {
  disabled: false,
  dropup: false,
  pullRight: false
};

SplitButton.Toggle = _SplitToggle2['default'];

exports['default'] = SplitButton;
module.exports = exports['default'];