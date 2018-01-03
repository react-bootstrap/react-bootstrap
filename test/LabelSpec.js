import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Label from '../src/Label';

describe('Label', () => {
  it('Should output a label with message', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Label>
        <strong>Message</strong>
      </Label>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });

  it('Should have bsClass by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Label>Message</Label>);
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\blabel\b/));
  });

  it('Should have bsStyle by default', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Label>Message</Label>);
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\blabel-default\b/)
    );
  });

  it('Hides when empty', () => {
    let instance = ReactTestUtils.renderIntoDocument(<Label />);
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bhidden\b/));
  });
});
