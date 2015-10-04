'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _BootstrapMixin = require('./BootstrapMixin');

var _BootstrapMixin2 = _interopRequireDefault(_BootstrapMixin);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

var _Dropdown = require('./Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _SplitToggle = require('./SplitToggle');

var _SplitToggle2 = _interopRequireDefault(_SplitToggle);

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
    var
    // bsStyle is validated by 'Button' component
    bsStyle = _props.bsStyle;

    var props = _objectWithoutProperties(_props, ['children', 'title', 'onClick', 'target', 'href', 'bsStyle']);

    var disabled = props.disabled;

    var button = _react2['default'].createElement(
      _Button2['default'],
      {
        onClick: onClick,
        bsStyle: bsStyle,
        disabled: disabled,
        target: target,
        href: href
      },
      title
    );

    return _react2['default'].createElement(
      _Dropdown2['default'],
      props,
      button,
      _react2['default'].createElement(_SplitToggle2['default'], {
        'aria-label': title,
        bsStyle: bsStyle,
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

SplitButton.propTypes = _extends({}, _Dropdown2['default'].propTypes, _BootstrapMixin2['default'].propTypes, {

  /**
   * @private
   */
  onClick: function onClick() {},
  target: _react2['default'].PropTypes.string,
  href: _react2['default'].PropTypes.string,
  /**
   * The content of the split button.
   */
  title: _react2['default'].PropTypes.node.isRequired
});

SplitButton.defaultProps = {
  disabled: false,
  dropup: false,
  pullRight: false
};

SplitButton.Toggle = _SplitToggle2['default'];

exports['default'] = SplitButton;
module.exports = exports['default'];
// eslint-disable-line