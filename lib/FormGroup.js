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

var _reactPropTypesLibDeprecated = require('react-prop-types/lib/deprecated');

var _reactPropTypesLibDeprecated2 = _interopRequireDefault(_reactPropTypesLibDeprecated);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsValidComponentChildren = require('./utils/ValidComponentChildren');

var _utilsValidComponentChildren2 = _interopRequireDefault(_utilsValidComponentChildren);

var propTypes = {
  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: _react2['default'].PropTypes.string,
  /**
   * @private
   */
  standalone: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.bool, 'Use a `<FormControl>` or `<InputGroup>` directly.'),
  validationState: _react2['default'].PropTypes.oneOf(['success', 'warning', 'error']),
  /**
   * @private
   */
  bsStyle: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.oneOf(['success', 'warning', 'error']), 'Use `validationState`'),
  /**
   * @private
   */
  hasFeedback: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.bool, 'Use a `<FormControl.Feedback>` element.'),
  /**
   * @private
   */
  groupClassName: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.string, 'Use `className`.')
};

var childContextTypes = {
  $bs_formGroup: _react2['default'].PropTypes.object.isRequired
};

var FormGroup = (function (_React$Component) {
  _inherits(FormGroup, _React$Component);

  function FormGroup() {
    _classCallCheck(this, FormGroup);

    _React$Component.apply(this, arguments);
  }

  FormGroup.prototype.getChildContext = function getChildContext() {
    var _props = this.props;
    var controlId = _props.controlId;
    var bsStyle = _props.bsStyle;
    var _props$validationState = _props.validationState;
    var validationState = _props$validationState === undefined ? bsStyle : _props$validationState;

    return {
      $bs_formGroup: {
        controlId: controlId,
        validationState: validationState
      }
    };
  };

  FormGroup.prototype.hasFeedback = function hasFeedback(children) {
    var _this = this;

    return _utilsValidComponentChildren2['default'].some(children, function (child) {
      return child.props.bsRole === 'feedback' || child.props.children && _this.hasFeedback(child.props.children);
    });
  };

  FormGroup.prototype.render = function render() {
    var _props2 = this.props;
    var standalone = _props2.standalone;
    var bsStyle = _props2.bsStyle;
    var _props2$validationState = _props2.validationState;
    var validationState = _props2$validationState === undefined ? bsStyle : _props2$validationState;
    var groupClassName = _props2.groupClassName;
    var _props2$className = _props2.className;
    var className = _props2$className === undefined ? groupClassName : _props2$className;
    var children = _props2.children;
    var _props2$hasFeedback = _props2.hasFeedback;
    var hasFeedback = _props2$hasFeedback === undefined ? this.hasFeedback(children) : _props2$hasFeedback;

    var props = _objectWithoutProperties(_props2, ['standalone', 'bsStyle', 'validationState', 'groupClassName', 'className', 'children', 'hasFeedback']);

    delete props.bsClass;
    delete props.bsSize;
    delete props.controlId;

    var classes = _extends({}, !standalone && _utilsBootstrapUtils.getClassSet(this.props), {
      'has-feedback': hasFeedback
    });
    if (validationState) {
      classes['has-' + validationState] = true;
    }

    return _react2['default'].createElement(
      'div',
      _extends({}, props, { className: _classnames2['default'](className, classes) }),
      children
    );
  };

  return FormGroup;
})(_react2['default'].Component);

FormGroup.propTypes = propTypes;
FormGroup.childContextTypes = childContextTypes;

exports['default'] = _utilsBootstrapUtils.bsClass('form-group', _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], FormGroup));
module.exports = exports['default'];