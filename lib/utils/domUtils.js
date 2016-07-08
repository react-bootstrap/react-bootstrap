'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domHelpersOwnerDocument = require('dom-helpers/ownerDocument');

var _domHelpersOwnerDocument2 = _interopRequireDefault(_domHelpersOwnerDocument);

var _domHelpersOwnerWindow = require('dom-helpers/ownerWindow');

var _domHelpersOwnerWindow2 = _interopRequireDefault(_domHelpersOwnerWindow);

function ownerDocument(componentOrElement) {
  var elem = _reactDom2['default'].findDOMNode(componentOrElement);
  return _domHelpersOwnerDocument2['default'](elem && elem.ownerDocument || document);
}

function ownerWindow(componentOrElement) {
  var doc = ownerDocument(componentOrElement);
  return _domHelpersOwnerWindow2['default'](doc);
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
  ownerWindow: ownerWindow,
  ownerDocument: ownerDocument,
  getDocumentHeight: getDocumentHeight,
  getSize: getSize
};
module.exports = exports['default'];