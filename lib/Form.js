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
  horizontal: _react2['default'].PropTypes.bool,
  inline: _react2['default'].PropTypes.bool,
  componentClass: _reactPropTypesLibElementType2['default']
};

var defaultProps = {
  horizontal: false,
  inline: false,
  componentClass: 'form'
};

var Form = (function (_React$Component) {
  _inherits(Form, _React$Component);

  function Form() {
    _classCallCheck(this, Form);

    _React$Component.apply(this, arguments);
  }

  Form.prototype.render = function render() {
    var _props = this.props;
    var horizontal = _props.horizontal;
    var inline = _props.inline;
    var Component = _props.componentClass;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['horizontal', 'inline', 'componentClass', 'className']);

    delete props.bsClass;

    var classes = [];
    if (horizontal) {
      classes.push(_utilsBootstrapUtils.prefix(this.props, 'horizontal'));
    }
    if (inline) {
      classes.push(_utilsBootstrapUtils.prefix(this.props, 'inline'));
    }

    return _react2['default'].createElement(Component, _extends({}, props, { className: _classnames2['default'](className, classes) }));
  };

  return Form;
})(_react2['default'].Component);

Form.propTypes = propTypes;
Form.defaultProps = defaultProps;

exports['default'] = _utilsBootstrapUtils.bsClass('form', Form);
module.exports = exports['default'];