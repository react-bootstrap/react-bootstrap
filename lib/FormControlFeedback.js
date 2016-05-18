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

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _Glyphicon = require('./Glyphicon');

var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

var defaultProps = {
  bsRole: 'feedback'
};

var contextTypes = {
  $bs_formGroup: _react2['default'].PropTypes.object
};

var FormControlFeedback = (function (_React$Component) {
  _inherits(FormControlFeedback, _React$Component);

  function FormControlFeedback() {
    _classCallCheck(this, FormControlFeedback);

    _React$Component.apply(this, arguments);
  }

  FormControlFeedback.prototype.getGlyph = function getGlyph(validationState) {
    switch (validationState) {
      case 'success':
        return 'ok';
      case 'warning':
        return 'warning-sign';
      case 'error':
        return 'remove';
      default:
        return null;
    }
  };

  FormControlFeedback.prototype.renderDefaultFeedback = function renderDefaultFeedback(formGroup, className, classes, props) {
    var glyph = this.getGlyph(formGroup && formGroup.validationState);
    if (!glyph) {
      return null;
    }

    return _react2['default'].createElement(_Glyphicon2['default'], _extends({}, props, {
      glyph: glyph,
      className: _classnames2['default'](className, classes)
    }));
  };

  FormControlFeedback.prototype.render = function render() {
    var _props = this.props;
    var className = _props.className;
    var children = _props.children;

    var props = _objectWithoutProperties(_props, ['className', 'children']);

    delete props.bsClass;

    var classes = _utilsBootstrapUtils.getClassSet(this.props);

    if (!children) {
      return this.renderDefaultFeedback(this.context.$bs_formGroup, className, classes, props);
    }

    var child = _react2['default'].Children.only(children);
    return _react2['default'].cloneElement(child, _extends({}, props, {
      className: _classnames2['default'](child.props.className, className, classes)
    }));
  };

  return FormControlFeedback;
})(_react2['default'].Component);

FormControlFeedback.defaultProps = defaultProps;
FormControlFeedback.contextTypes = contextTypes;

exports['default'] = _utilsBootstrapUtils.bsClass('form-control-feedback', FormControlFeedback);
module.exports = exports['default'];