import React from 'react';
import getOwnerDocument from 'dom-helpers/ownerDocument';
import getOwnerWindow from 'dom-helpers/ownerWindow';

function ownerDocument(componentOrElement) {
  let elem = React.findDOMNode(componentOrElement);
  return getOwnerDocument((elem && elem.ownerDocument) || document);
}

function ownerWindow(componentOrElement) {
  let doc = ownerDocument(componentOrElement);
  return getOwnerWindow(doc);
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
  let rect = {
    width: elem.offsetWidth || 0,
    height: elem.offsetHeight || 0
  };
  if (typeof elem.getBoundingClientRect !== 'undefined') {
    let {width, height} = elem.getBoundingClientRect();
    rect.width = width || rect.width;
    rect.height = height || rect.height;
  }
  return rect;
}

export default {
  ownerWindow,
  ownerDocument,
  getDocumentHeight,
  getSize,
};
