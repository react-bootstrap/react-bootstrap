import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Well from '../src/Well';

describe('Well', function () {
  it('Should output a well with content', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Well>
        <strong>Content</strong>
      </Well>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a well class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Well>
        Content
      </Well>
    );
    assert.ok(instance.getDOMNode().className.match(/\bwell\b/));
  });

  it('Should accept bsSize arguments', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Well bsSize='small'>
        Content
      </Well>
    );
    assert.ok(instance.getDOMNode().className.match(/\bwell-sm\b/));
  });
});
