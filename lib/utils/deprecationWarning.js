'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = deprecationWarning;

function deprecationWarning(oldname, newname, link) {
  if (process.env.NODE_ENV !== 'production') {
    if (typeof console === 'undefined' || typeof console.warn !== 'function') {
      return;
    }

    var message = oldname + ' is deprecated. Use ' + newname + ' instead.';
    console.warn(message);

    if (link) {
      console.warn('You can read more about it at ' + link);
    }
  }
}

module.exports = exports['default'];