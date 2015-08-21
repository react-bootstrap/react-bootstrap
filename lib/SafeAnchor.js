'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utilsCreateChainedFunction = require('./utils/createChainedFunction');

var _utilsCreateChainedFunction2 = _interopRequireDefault(_utilsCreateChainedFunction);

/**
 * Note: This is intended as a stop-gap for accessibility concerns that the
 * Bootstrap CSS does not address as they have styled anchors and not buttons
 * in many cases.
 */

var SafeAnchor = (function (_React$Component) {
  _inherits(SafeAnchor, _React$Component);

  function SafeAnchor(props) {
    _classCallCheck(this, SafeAnchor);

    _React$Component.call(this, props);

    this.handleClick = this.handleClick.bind(this);
  }

  SafeAnchor.prototype.handleClick = function handleClick(event) {
    if (this.props.href === undefined) {
      event.preventDefault();
    }
  };

  SafeAnchor.prototype.render = function render() {
    return _react2['default'].createElement('a', _extends({ role: this.props.href ? undefined : 'button'
    }, this.props, {
      onClick: _utilsCreateChainedFunction2['default'](this.props.onClick, this.handleClick),
      href: this.props.href || '' }));
  };

  return SafeAnchor;
})(_react2['default'].Component);

exports['default'] = SafeAnchor;

SafeAnchor.propTypes = {
  href: _react2['default'].PropTypes.string,
  onClick: _react2['default'].PropTypes.func
};
module.exports = exports['default'];