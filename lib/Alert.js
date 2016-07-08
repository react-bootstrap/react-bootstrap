'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

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

var Alert = _react2['default'].createClass({
  displayName: 'Alert',

  propTypes: {
    onDismiss: _react2['default'].PropTypes.func,
    /**
     * @private
     */
    dismissAfter: _reactPropTypesLibDeprecated2['default'](_react2['default'].PropTypes.number, 'No longer supported.'),
    closeLabel: _react2['default'].PropTypes.string
  },

  getDefaultProps: function getDefaultProps() {
    return {
      closeLabel: 'Close Alert'
    };
  },

  renderDismissButton: function renderDismissButton() {
    return _react2['default'].createElement(
      'button',
      {
        type: 'button',
        className: 'close',
        onClick: this.props.onDismiss,
        'aria-hidden': 'true',
        tabIndex: '-1'
      },
      _react2['default'].createElement(
        'span',
        null,
        '×'
      )
    );
  },

  renderSrOnlyDismissButton: function renderSrOnlyDismissButton() {
    return _react2['default'].createElement(
      'button',
      {
        type: 'button',
        className: 'close sr-only',
        onClick: this.props.onDismiss
      },
      this.props.closeLabel
    );
  },

  render: function render() {
    var classes = _utilsBootstrapUtils.getClassSet(this.props);
    var isDismissable = !!this.props.onDismiss;

    classes[_utilsBootstrapUtils.prefix(this.props, 'dismissable')] = isDismissable;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        role: 'alert',
        className: _classnames2['default'](this.props.className, classes)
      }),
      isDismissable ? this.renderDismissButton() : null,
      this.props.children,
      isDismissable ? this.renderSrOnlyDismissButton() : null
    );
  },

  componentDidMount: function componentDidMount() {
    if (this.props.dismissAfter && this.props.onDismiss) {
      this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
    }
  },

  componentWillUnmount: function componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }
});

exports['default'] = _utilsBootstrapUtils.bsStyles(_styleMaps.State.values(), _styleMaps.State.INFO, _utilsBootstrapUtils.bsClass('alert', Alert));
module.exports = exports['default'];