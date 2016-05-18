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

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

var ModalHeader = (function (_React$Component) {
  _inherits(ModalHeader, _React$Component);

  function ModalHeader() {
    _classCallCheck(this, ModalHeader);

    _React$Component.apply(this, arguments);
  }

  ModalHeader.prototype.render = function render() {
    var _props = this.props;
    var label = _props['aria-label'];

    var props = _objectWithoutProperties(_props, ['aria-label']);

    var onHide = _utilsCreateChainedFunction2['default'](this.context.$bs_onModalHide, this.props.onHide);

    return _react2['default'].createElement(
      'div',
      _extends({}, props, {
        className: _classnames2['default'](this.props.className, _utilsBootstrapUtils.prefix(this.props, 'header'))
      }),
      this.props.closeButton && _react2['default'].createElement(
        'button',
        {
          type: 'button',
          className: 'close',
          'aria-label': label,
          onClick: onHide },
        _react2['default'].createElement(
          'span',
          { 'aria-hidden': 'true' },
          '×'
        )
      ),
      this.props.children
    );
  };

  return ModalHeader;
})(_react2['default'].Component);

ModalHeader.propTypes = {
  /**
   * The 'aria-label' attribute provides an accessible label for the close button.
   * It is used for Assistive Technology when the label text is not readable.
   */
  'aria-label': _react2['default'].PropTypes.string,

  bsClass: _react2['default'].PropTypes.string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: _react2['default'].PropTypes.bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside a Modal component, the onHide will automatically
   * be propagated up to the parent Modal `onHide`.
   */
  onHide: _react2['default'].PropTypes.func
};

ModalHeader.contextTypes = {
  '$bs_onModalHide': _react2['default'].PropTypes.func
};

ModalHeader.defaultProps = {
  'aria-label': 'Close',
  closeButton: false
};

exports['default'] = _utilsBootstrapUtils.bsClass('modal', ModalHeader);
module.exports = exports['default'];