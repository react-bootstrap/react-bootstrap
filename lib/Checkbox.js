'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var propTypes = {
  inline: _react2['default'].PropTypes.bool,
  disabled: _react2['default'].PropTypes.bool,
  /**
   * Only valid if `inline` is not set.
   */
  validationState: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
  /**
   * Attaches a ref to the `<input>` element. Only functions can be used here.
   *
   * ```js
   * <Checkbox inputRef={ref => { this.input = ref; }} />
   * ```
   */
  inputRef: _react2['default'].PropTypes.func
};

var defaultProps = {
  inline: false,
  disabled: false
};

var Checkbox = (function (_React$Component) {
  _inherits(Checkbox, _React$Component);

  function Checkbox() {
    _classCallCheck(this, Checkbox);

    _React$Component.apply(this, arguments);
  }

  Checkbox.prototype.render = function render() {
    var _props = this.props;
    var inline = _props.inline;
    var disabled = _props.disabled;
    var validationState = _props.validationState;
    var inputRef = _props.inputRef;
    var className = _props.className;
    var style = _props.style;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['inline', 'disabled', 'validationState', 'inputRef', 'className', 'style', 'children']);

    delete props.bsClass;

    var input = _react2['default'].createElement('input', _extends({}, props, {
      ref: inputRef,
      type: 'checkbox',
      disabled: disabled
    }));

    if (inline) {
      var _classes;

      var _classes2 = (_classes = {}, _classes[_utilsBootstrapUtils.prefix(this.props, 'inline')] = true, _classes.disabled = disabled, _classes);

      // Use a warning here instead of in propTypes to get better-looking
      // generated documentation.
      process.env.NODE_ENV !== 'production' ? _warning2['default'](!validationState, '`validationState` is ignored on `<Checkbox inline>`. To display ' + 'validation state on an inline checkbox, set `validationState` on a ' + 'parent `<FormGroup>` or other element instead.') : undefined;

      return _react2['default'].createElement(
        'label',
        { className: _classnames2['default'](className, _classes2), style: style },
        input,
        children
      );
    }

    var classes = _extends({}, _utilsBootstrapUtils.getClassSet(this.props), {
      disabled: disabled
    });
    if (validationState) {
      classes['has-' + validationState] = true;
    }

    return _react2['default'].createElement(
      'div',
      { className: _classnames2['default'](className, classes), style: style },
      _react2['default'].createElement(
        'label',
        null,
        input,
        children
      )
    );
  };

  return Checkbox;
})(_react2['default'].Component);

Checkbox.propTypes = propTypes;
Checkbox.defaultProps = defaultProps;

exports['default'] = _utilsBootstrapUtils.bsClass('checkbox', Checkbox);
module.exports = exports['default'];