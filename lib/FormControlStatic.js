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

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var propTypes = {
  componentClass: _reactPropTypesLibElementType2['default']
};

var defaultProps = {
  componentClass: 'p'
};

var FormControlStatic = (function (_React$Component) {
  _inherits(FormControlStatic, _React$Component);

  function FormControlStatic() {
    _classCallCheck(this, FormControlStatic);

    _React$Component.apply(this, arguments);
  }

  FormControlStatic.prototype.render = function render() {
    var _props = this.props;
    var Component = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['componentClass', 'className']);

    delete props.bsClass;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    return _react2['default'].createElement(Component, _extends({}, props, { className: _classnames2['default'](className, classes) }));
  };

  return FormControlStatic;
})(_react2['default'].Component);

FormControlStatic.propTypes = propTypes;
FormControlStatic.defaultProps = defaultProps;

exports['default'] = _utilsBootstrapUtils.bsClass('form-control-static', FormControlStatic);
module.exports = exports['default'];