import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import CloseButton from '../src/CloseButton';

describe('<CloseButton>', () => {
  it('Should output a button', () => {
    let noOp = () => {};
    let label = 'Close';
    let instance = ReactTestUtils.renderIntoDocument(
      <CloseButton
        onClick={noOp}
        label={label}
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'BUTTON');
  });

  it('Should have type=button by default', () => {
    let noOp = () => {};
    let label = 'Close';
    let instance = ReactTestUtils.renderIntoDocument(
      <CloseButton
        onClick={noOp}
        label={label}
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('type'), 'button');
  });

  it('Should have class=close by default', () => {
    let noOp = () => {};
    let label = 'Close';
    let instance = ReactTestUtils.renderIntoDocument(
      <CloseButton
        onClick={noOp}
        label={label}
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('class'), 'close');
  });

  it('Should call onClick callback', (done) => {
    let doneOp = () => {
      done();
    };
    let label = 'Close';
    let instance = ReactTestUtils.renderIntoDocument(
      <CloseButton
        onClick={doneOp}
        label={label}
      />
    );
    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance));
  });

  it('Should have a span with aria-hidden=true', () => {
    let noOp = () => {};
    let label = 'Close';
    let instance = ReactTestUtils.renderIntoDocument(
      <CloseButton
        onClick={noOp}
        label={label}
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).children[0].getAttribute('aria-hidden'), 'true');
  });

  it('Should have a span with text of &times; (char code 215)', () => {
    let noOp = () => {};
    let label = 'Close';
    let instance = ReactTestUtils.renderIntoDocument(
      <CloseButton
        onClick={noOp}
        label={label}
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).children[0].innerHTML.charCodeAt(0), '215');
  });

  it('Should have a span with class=sr-only', () => {
    let noOp = () => {};
    let label = 'Close';
    let instance = ReactTestUtils.renderIntoDocument(
      <CloseButton
        onClick={noOp}
        label={label}
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).children[1].getAttribute('class'), 'sr-only');
  });

  it('Should have a span with text of the label', () => {
    let noOp = () => {};
    let label = 'Close Item';
    let instance = ReactTestUtils.renderIntoDocument(
      <CloseButton
        onClick={noOp}
        label={label}
      />
    );
    assert.equal(ReactDOM.findDOMNode(instance).children[1].innerHTML, label);
  });
});
