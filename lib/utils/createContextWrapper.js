'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _objectWithoutProperties = require('babel-runtime/helpers/object-without-properties')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = createContextWrapper;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

/**
 * Creates new trigger class that injects context into overlay.
 */

function createContextWrapper(Trigger, propName) {
  return function (contextTypes) {
    var ContextWrapper = (function (_React$Component) {
      _inherits(ContextWrapper, _React$Component);

      function ContextWrapper() {
        _classCallCheck(this, ContextWrapper);

        _React$Component.apply(this, arguments);
      }

      ContextWrapper.prototype.getChildContext = function getChildContext() {
        return this.props.context;
      };

      ContextWrapper.prototype.render = function render() {
        // Strip injected props from below.
        var _props = this.props;
        var wrapped = _props.wrapped;
        var context = _props.context;

        var props = _objectWithoutProperties(_props, ['wrapped', 'context']);

        return _react2['default'].cloneElement(wrapped, props);
      };

      return ContextWrapper;
    })(_react2['default'].Component);

    ContextWrapper.childContextTypes = contextTypes;

    var TriggerWithContext = (function () {
      function TriggerWithContext() {
        _classCallCheck(this, TriggerWithContext);
      }

      TriggerWithContext.prototype.render = function render() {
        var props = _extends({}, this.props);
        props[propName] = this.getWrappedOverlay();

        return _react2['default'].createElement(
          Trigger,
          props,
          this.props.children
        );
      };

      TriggerWithContext.prototype.getWrappedOverlay = function getWrappedOverlay() {
        return _react2['default'].createElement(ContextWrapper, {
          context: this.context,
          wrapped: this.props[propName]
        });
      };

      return TriggerWithContext;
    })();

    TriggerWithContext.contextTypes = contextTypes;

    return TriggerWithContext;
  };
}

module.exports = exports['default'];