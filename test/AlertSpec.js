import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Alert from '../src/Alert';

describe('<Alert>', () => {
  it('Should output a alert with message', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert>
        <strong>Message</strong>
      </Alert>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });

  it('Should have bsType by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Alert>Message</Alert>);
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\balert\b/));
  });

  it('Should have dismissable style with onDismiss', () => {
    let noOp = () => {};
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert onDismiss={noOp}>Message</Alert>
    );
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\balert-dismissable\b/)
    );
  });

  it('Should call onDismiss callback on dismiss click', done => {
    let doneOp = () => {
      done();
    };
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert onDismiss={doneOp}>Message</Alert>
    );
    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(instance).children[0]);
  });

  it('Should have a default bsStyle class', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Alert>Message</Alert>);
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\balert-\w+\b/));
  });

  it('Should have use bsStyle class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Alert bsStyle="danger">Message</Alert>
    );
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\balert-danger\b/)
    );
  });

  describe('Web Accessibility', () => {
    it('Should have alert role', () => {
      let instance = ReactTestUtils.renderIntoDocument(<Alert>Message</Alert>);

      assert.equal(
        ReactDOM.findDOMNode(instance).getAttribute('role'),
        'alert'
      );
    });

    it('Should call onDismiss callback when the sr-only dismiss link is activated', done => {
      let doneOp = () => {
        done();
      };
      let instance = ReactTestUtils.renderIntoDocument(
        <Alert onDismiss={doneOp}>Message</Alert>
      );

      ReactTestUtils.Simulate.click(
        ReactDOM.findDOMNode(instance).getElementsByClassName('sr-only')[0]
      );
    });
  });
});
