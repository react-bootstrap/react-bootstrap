import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Label from '../src/Label';

describe('Label', function () {

  it('Should output a label with message', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Label>
        <strong>Message</strong>
      </Label>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have bsClass by default', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Label>
        Message
      </Label>
    );
    assert.ok(instance.getDOMNode().className.match(/\blabel\b/));
  });

  it('Should have bsStyle by default', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Label>
        Message
      </Label>
    );
    assert.ok(instance.getDOMNode().className.match(/\blabel-default\b/));
  });

});
