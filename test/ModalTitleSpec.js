import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Modal from '../src/Modal';

describe('Modal.Title', () => {
  it('uses "h4" by default', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Title />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H4');
  });

  it('has "modal-title" class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Title />
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'modal-title');
  });

  it('should merge additional classes passed in', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Title className="custom-class" />
    );
    const classes = ReactDOM.findDOMNode(instance).className;

    assert.include(classes, 'modal-title');
    assert.include(classes, 'custom-class');
  });

  it('should allow custom elements instead of "h4"', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Title componentClass="h3" />
    );

    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'H3');
  });

  it('should render children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Modal.Title>
        <strong>Children</strong>
      </Modal.Title>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });
});
