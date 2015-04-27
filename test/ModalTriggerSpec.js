import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ModalTrigger from '../src/ModalTrigger';

describe('ModalTrigger', function() {
  it('Should create ModalTrigger element', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalTrigger modal={<div>test</div>}>
        <button>button</button>
      </ModalTrigger>
    );
    let modalTrigger = instance.getDOMNode();
    assert.equal(modalTrigger.nodeName, 'BUTTON');
  });

  it('Should pass ModalTrigger onMouseOver prop to child', function() {
    let called = false;
    let callback = function() {
      called = true;
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalTrigger modal={<div>test</div>} onMouseOver={callback}>
        <button>button</button>
      </ModalTrigger>
    );
    let modalTrigger = instance.getDOMNode();
    ReactTestUtils.Simulate.mouseOver(modalTrigger);
    assert.equal(called, true);
  });

  it('Should pass ModalTrigger onMouseOut prop to child', function() {
    let called = false;
    let callback = function() {
      called = true;
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalTrigger modal={<div>test</div>} onMouseOut={callback}>
        <button>button</button>
      </ModalTrigger>
    );
    let modalTrigger = instance.getDOMNode();
    ReactTestUtils.Simulate.mouseOut(modalTrigger);
    assert.equal(called, true);
  });

  it('Should pass ModalTrigger onFocus prop to child', function() {
    let called = false;
    let callback = function() {
      called = true;
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalTrigger modal={<div>test</div>} onFocus={callback}>
        <button>button</button>
      </ModalTrigger>
    );
    let modalTrigger = instance.getDOMNode();
    ReactTestUtils.Simulate.focus(modalTrigger);
    assert.equal(called, true);
  });

  it('Should pass ModalTrigger onBlur prop to child', function() {
    let called = false;
    let callback = function() {
      called = true;
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <ModalTrigger modal={<div>test</div>} onBlur={callback}>
        <button>button</button>
      </ModalTrigger>
    );
    let modalTrigger = instance.getDOMNode();
    ReactTestUtils.Simulate.blur(modalTrigger);
    assert.equal(called, true);
  });
});
