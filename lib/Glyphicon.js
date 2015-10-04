'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var Glyphicon = _react2['default'].createClass({
  displayName: 'Glyphicon',

  propTypes: {
    /**
     * bootstrap className
     * @private
     */
    bsClass: _react2['default'].PropTypes.string,
    /**
     * An icon name. See e.g. http://getbootstrap.com/components/#glyphicons
     */
    glyph: _react2['default'].PropTypes.string.isRequired,
    /**
     * Adds 'form-control-feedback' class
     * @private
     */
    formControlFeedback: _react2['default'].PropTypes.bool
  },

  getDefaultProps: function getDefaultProps() {
    return {
      bsClass: 'glyphicon',
      formControlFeedback: false
    };
  },

  render: function render() {
    var _classNames;

    var className = _classnames2['default'](this.props.className, (_classNames = {}, _classNames[this.props.bsClass] = true, _classNames['glyphicon-' + this.props.glyph] = true, _classNames['form-control-feedback'] = this.props.formControlFeedback, _classNames));

    return _react2['default'].createElement(
      'span',
      _extends({}, this.props, { className: className }),
      this.props.children
    );
  }
});

exports['default'] = Glyphicon;
module.exports = exports['default'];