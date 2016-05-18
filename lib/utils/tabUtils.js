'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports.nextEnabled = nextEnabled;

var _ValidComponentChildren = require('./ValidComponentChildren');

var _ValidComponentChildren2 = _interopRequireDefault(_ValidComponentChildren);

var findChild = _ValidComponentChildren2['default'].find;

var TAB = 'tab';
exports.TAB = TAB;
var PANE = 'pane';

exports.PANE = PANE;

function nextEnabled(children, currentKey, keys, moveNext) {
  var lastIdx = keys.length - 1;
  var stopAt = keys[moveNext ? Math.max(lastIdx, 0) : 0];
  var nextKey = currentKey;

  function getNext() {
    var idx = keys.indexOf(nextKey);
    nextKey = moveNext ? keys[Math.min(lastIdx, idx + 1)] : keys[Math.max(0, idx - 1)];

    return findChild(children, function (_child) {
      return _child.props.eventKey === nextKey;
    });
  }

  var next = getNext();

  while (next.props.eventKey !== stopAt && next.props.disabled) {
    next = getNext();
  }

  return next.props.disabled ? currentKey : next.props.eventKey;
}