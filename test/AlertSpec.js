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
    assert.ok(React.findDOMNode(instance).className.match(/\balert\b/));
  });

  it('Should have dismissable style with onDismiss', function () {
    let noOp = function () {};
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert onDismiss={noOp}>
        Message
      </Alert>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\balert-dismissable\b/));
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
    ReactTestUtils.Simulate.click(React.findDOMNode(instance).children[0]);
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
    assert.ok(React.findDOMNode(instance).className.match(/\balert-\w+\b/));
  });

  it('Should have use bsStyle class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert bsStyle='danger'>
        Message
      </Alert>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\balert-danger\b/));
  });

  describe('Web Accessibility', function(){
    it('Should have alert role', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <Alert>Message</Alert>
      );

      assert.equal(React.findDOMNode(instance).getAttribute('role'), 'alert');
    });

    it('Should have add ARIAs to button', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <Alert onDismiss={()=>{}} closeLabel='close'>Message</Alert>
      );

      let button = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'button');

      assert.equal(React.findDOMNode(button).getAttribute('aria-label'), 'close');
      assert.equal(React.findDOMNode(button).children[0].getAttribute('aria-hidden'), 'true');
    });

  });
});
