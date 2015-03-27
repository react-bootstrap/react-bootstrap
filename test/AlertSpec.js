import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Alert from '../src/Alert';

describe('Alert', function () {
  it('Should output a alert with message', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert>
        <strong>Message</strong>
      </Alert>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have bsType by default', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert>
        Message
      </Alert>
    );
    assert.ok(instance.getDOMNode().className.match(/\balert\b/));
  });

  it('Should have dismissable style with onDismiss', function () {
    let noOp = function () {};
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert onDismiss={noOp}>
        Message
      </Alert>
    );
    assert.ok(instance.getDOMNode().className.match(/\balert-dismissable\b/));
  });

  it('Should call onDismiss callback on dismiss click', function (done) {
    let doneOp = function () {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert onDismiss={doneOp}>
        Message
      </Alert>
    );
    ReactTestUtils.Simulate.click(instance.getDOMNode().children[0]);
  });

  it('Should call onDismiss callback on dismissAfter time', function (done) {
    let doneOp = function () {
      done();
    };
    ReactTestUtils.renderIntoDocument(
      <Alert onDismiss={doneOp} dismissAfter={1}>
        Message
      </Alert>
    );
  });

  it('Should have a default bsStyle class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert>
        Message
      </Alert>
    );
    assert.ok(instance.getDOMNode().className.match(/\balert-\w+\b/));
  });

  it('Should have use bsStyle class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert bsStyle='danger'>
        Message
      </Alert>
    );
    assert.ok(instance.getDOMNode().className.match(/\balert-danger\b/));
  });
});
