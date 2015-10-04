'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _domHelpersUtilInDOM = require('dom-helpers/util/inDOM');

var _domHelpersUtilInDOM2 = _interopRequireDefault(_domHelpersUtilInDOM);

var _domHelpersOwnerDocument = require('dom-helpers/ownerDocument');

var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);

var _domHelpersOwnerWindow = require('dom-helpers/ownerWindow');

var _domHelpersOwnerWindow2 = _interopRequireDefault(_domHelpersOwnerWindow);

var _domHelpersQueryContains = require('dom-helpers/query/contains');

var _domHelpersQueryContains2 = _interopRequireDefault(_domHelpersQueryContains);

var _domHelpersActiveElement = require('dom-helpers/activeElement');

var _domHelpersActiveElement2 = _interopRequireDefault(_domHelpersActiveElement);

var _domHelpersQueryOffset = require('dom-helpers/query/offset');

var _domHelpersQueryOffset2 = _interopRequireDefault(_domHelpersQueryOffset);

var _domHelpersQueryOffsetParent = require('dom-helpers/query/offsetParent');

var _domHelpersQueryOffsetParent2 = _interopRequireDefault(_domHelpersQueryOffsetParent);

var _domHelpersQueryPosition = require('dom-helpers/query/position');

var _domHelpersQueryPosition2 = _interopRequireDefault(_domHelpersQueryPosition);

var _domHelpersStyle = require('dom-helpers/style');

var _domHelpersStyle2 = _interopRequireDefault(_domHelpersStyle);

function ownerDocument(componentOrElement) {
  var elem = _react2['default'].findDOMNode(componentOrElement);
  return _domHelpersOwnerDocument2['default'](elem && elem.ownerDocument || document);
}

function ownerWindow(componentOrElement) {
  var doc = ownerDocument(componentOrElement);
  return _domHelpersOwnerWindow2['default'](doc);
}

// TODO remove in 0.26
function getComputedStyles(elem) {
  return ownerDocument(elem).defaultView.getComputedStyle(elem, null);
}

/**
 * Get the height of the document
 *
 * @returns {documentHeight: number}
 */
function getDocumentHeight() {
  return Math.max(document.documentElement.offsetHeight, document.height, document.body.scrollHeight, document.body.offsetHeight);
}

/**
 * Get an element's size
 *
 * @param {HTMLElement} elem
 * @returns {{width: number, height: number}}
 */
function getSize(elem) {
  var rect = {
    width: elem.offsetWidth || 0,
    height: elem.offsetHeight || 0
  };
  if (typeof elem.getBoundingClientRect !== 'undefined') {
    var _elem$getBoundingClientRect = elem.getBoundingClientRect();

    var width = _elem$getBoundingClientRect.width;
    var height = _elem$getBoundingClientRect.height;

    rect.width = width || rect.width;
    rect.height = height || rect.height;
  }
  return rect;
}

exports['default'] = {
  canUseDom: _domHelpersUtilInDOM2['default'],
  css: _domHelpersStyle2['default'],
  getComputedStyles: getComputedStyles,
  contains: _domHelpersQueryContains2['default'],
  ownerWindow: ownerWindow,
  ownerDocument: ownerDocument,
  getOffset: _domHelpersQueryOffset2['default'],
  getDocumentHeight: getDocumentHeight,
  getPosition: _domHelpersQueryPosition2['default'],
  getSize: getSize,
  activeElement: _domHelpersActiveElement2['default'],
  offsetParent: _domHelpersQueryOffsetParent2['default']
};
module.exports = exports['default'];