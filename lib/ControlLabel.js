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
  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: _react2['default'].PropTypes.string,
  srOnly: _react2['default'].PropTypes.bool
};

var defaultProps = {
  srOnly: false
};

var contextTypes = {
  $bs_formGroup: _react2['default'].PropTypes.object
};

var ControlLabel = (function (_React$Component) {
  _inherits(ControlLabel, _React$Component);

  function ControlLabel() {
    _classCallCheck(this, ControlLabel);

    _React$Component.apply(this, arguments);
  }

  ControlLabel.prototype.render = function render() {
    var formGroup = this.context.$bs_formGroup;
    var controlId = formGroup && formGroup.controlId;

    var _props = this.props;
    var _props$htmlFor = _props.htmlFor;
    var htmlFor = _props$htmlFor === undefined ? controlId : _props$htmlFor;
    var srOnly = _props.srOnly;
    var className = _props.className;

    var props = _objectWithoutProperties(_props, ['htmlFor', 'srOnly', 'className']);

    process.env.NODE_ENV !== 'production' ? _warning2['default'](controlId == null || htmlFor === controlId, '`controlId` is ignored on `<ControlLabel>` when `htmlFor` is specified.') : undefined;

    delete props.bsClass;

    var classes = _extends({}, _utilsBootstrapUtils.getClassSet(this.props), {
      'sr-only': srOnly
    });

    return _react2['default'].createElement('label', _extends({}, props, {
      htmlFor: htmlFor,
      className: _classnames2['default'](className, classes)
    }));
  };

  return ControlLabel;
})(_react2['default'].Component);

ControlLabel.propTypes = propTypes;
ControlLabel.defaultProps = defaultProps;
ControlLabel.contextTypes = contextTypes;

exports['default'] = _utilsBootstrapUtils.bsClass('control-label', ControlLabel);
module.exports = exports['default'];