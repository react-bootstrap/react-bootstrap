import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Modal from '../src/Modal';

describe('Modal.Body', () => {
  it('uses "div" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Body />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'DIV');
  });

  it('has "modal-body" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Body />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'modal-body');
  });

  it('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Body className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'modal-body');
    assert.include(classes, 'custom-class');
  });

  it('should allow custom elements instead of "div"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Body componentClass="section" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'SECTION');
  });

  it('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Body>
        <strong>Content</strong>
      </Modal.Body>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
