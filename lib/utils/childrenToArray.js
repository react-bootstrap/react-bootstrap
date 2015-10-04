'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = childrenAsArray;

var _ValidComponentChildren = require('./ValidComponentChildren');

var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);

function childrenAsArray(children) {
  var result = [];

  if (children === undefined) {
    return result;
  }

  _ValidComponentChildren2['default'].forEach(children, function (child) {
    result.push(child);
  });

  return result;
}

module.exports = exports['default'];