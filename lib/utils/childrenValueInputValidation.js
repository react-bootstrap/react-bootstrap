'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = valueValidation;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPropTypesLibSinglePropFrom = require('react-prop-types/lib/singlePropFrom');

var _reactPropTypesLibSinglePropFrom2 = _interopRequireDefault(_reactPropTypesLibSinglePropFrom);

function valueValidation(props, propName, componentName) {
  var error = _reactPropTypesLibSinglePropFrom2['default']('children', 'value')(props, propName, componentName);

  if (!error) {
    error = _react2['default'].PropTypes.node(props, propName, componentName);
  }

  return error;
}

module.exports = exports['default'];