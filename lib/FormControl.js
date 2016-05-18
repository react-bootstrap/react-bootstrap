'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibElementType = require('react-prop-types/lib/elementType');

var _reactPropTypesLibElementType2 = _interopRequireDefault(_reactPropTypesLibElementType);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _FormControlFeedback = require('./FormControlFeedback');

var _FormControlFeedback2 = _interopRequireDefault(_FormControlFeedback);

var _FormControlStatic = require('./FormControlStatic');

var _FormControlStatic2 = _interopRequireDefault(_FormControlStatic);

var propTypes = {
  componentClass: _reactPropTypesLibElementType2['default'],
  /**
   * Only relevant if `componentClass` is `'input'`.
   */
  type: _react2['default'].PropTypes.string,
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: _react2['default'].PropTypes.string
};

var defaultProps = {
  componentClass: 'input'
};

var contextTypes = {
  $bs_formGroup: _react2['default'].PropTypes.object
};

var FormControl = (function (_React$Component) {
  _inherits(FormControl, _React$Component);

  function FormControl() {
    _classCallCheck(this, FormControl);

    _React$Component.apply(this, arguments);
  }

  FormControl.prototype.render = function render() {
    var formGroup = this.context.$bs_formGroup;
    var controlId = formGroup && formGroup.controlId;

    var _props = this.props;
    var Component = _props.componentClass;
    var type = _props.type;
    var _props$id = _props.id;
    var id = _props$id === undefined ? controlId : _props$id;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'type', 'id', 'className']);

    process.env.NODE_ENV !== 'production' ? _warning2['default'](controlId == null || id === controlId, '`controlId` is ignored on `<FormControl>` when `id` is specified.') : undefined;

    delete props.bsClass;

    // input[type="file"] should not have .form-control.
    var classes = undefined;
    if (type !== 'file') {
      classes = _utilsBootstrapUtils.getClassSet(this.props);
    }

    return _react2['default'].createElement(Component, _extends({}, props, {
      type: type,
      id: id,
      className: _classnames2['default'](className, classes)
    }));
  };

  return FormControl;
})(_react2['default'].Component);

FormControl.propTypes = propTypes;
FormControl.defaultProps = defaultProps;
FormControl.contextTypes = contextTypes;

FormControl.Feedback = _FormControlFeedback2['default'];
FormControl.Static = _FormControlStatic2['default'];

exports['default'] = _utilsBootstrapUtils.bsClass('form-control', FormControl);
module.exports = exports['default'];