'use strict';

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styleMaps = require('./styleMaps');

var _utilsBootstrapUtils = require('./utils/bootstrapUtils');

/* eslint-disable react/prop-types */
var ModalDialog = _react2['default'].createClass({
  displayName: 'ModalDialog',

  propTypes: {
    /**
     * A css class to apply to the Modal dialog DOM node.
     */
    dialogClassName: _react2['default'].PropTypes.string,
    contentClassName: _react2['default'].PropTypes.string
  },

  render: function render() {
    var modalStyle = _extends({
      display: 'block'
    }, this.props.style);
    var bsClassPrefix = _utilsBootstrapUtils.prefix(this.props);
    var dialogClasses = _utilsBootstrapUtils.getClassSet(this.props);

    delete dialogClasses[bsClassPrefix];
    dialogClasses[_utilsBootstrapUtils.prefix(this.props, 'dialog')] = true;

    return _react2['default'].createElement(
      'div',
      _extends({}, this.props, {
        title: null,
        tabIndex: '-1',
        role: 'dialog',
        style: modalStyle,
        className: _classnames2['default'](this.props.className, bsClassPrefix)
      }),
      _react2['default'].createElement(
        'div',
        { className: _classnames2['default'](this.props.dialogClassName, dialogClasses) },
        _react2['default'].createElement(
          'div',
          { className: _classnames2['default'](this.props.contentClassName, _utilsBootstrapUtils.prefix(this.props, 'content')), role: 'document' },
          this.props.children
        )
      )
    );
  }
});

exports['default'] = _utilsBootstrapUtils.bsSizes([_styleMaps.Sizes.LARGE, _styleMaps.Sizes.SMALL], _utilsBootstrapUtils.bsClass('modal', ModalDialog));
module.exports = exports['default'];