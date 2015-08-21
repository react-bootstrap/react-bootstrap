'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = deprecationWarning;

var _reactLibWarning = require('react/lib/warning');

var _reactLibWarning2 = _interopRequireDefault(_reactLibWarning);

var warned = {};

function deprecationWarning(oldname, newname, link) {
  var warnKey = oldname + '\n' + newname;
  if (warned[warnKey]) {
    return;
  }

  var message = oldname + ' is deprecated. Use ' + newname + ' instead.';

  if (link) {
    message += '\nYou can read more about it at ' + link;
  }

  _reactLibWarning2['default'](false, message);
  warned[warnKey] = true;
}

module.exports = exports['default'];