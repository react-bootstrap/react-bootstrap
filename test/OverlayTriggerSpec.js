import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import OverlayTrigger from '../src/OverlayTrigger';

describe('OverlayTrigger', function() {
  it('Should create OverlayTrigger element', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger overlay={<div>test</div>}>
        <button>button</button>
      </OverlayTrigger>
    );
    let overlayTrigger = instance.getDOMNode();
    assert.equal(overlayTrigger.nodeName, 'BUTTON');
  });

  it('Should pass OverlayTrigger onClick prop to child', function() {
    let called = false;
    let callback = function() {
      called = true;
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <OverlayTrigger overlay={<div>test</div>} onClick={callback}>
        <button>button</button>
      </OverlayTrigger>
    );
    let overlayTrigger = instance.getDOMNode();
    ReactTestUtils.Simulate.click(overlayTrigger);
    assert.equal(called, true);
  });
});
