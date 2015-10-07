import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Well from '../src/Well';

describe('Well', () => {
  it('Should output a well with content', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Well>
        <strong>Content</strong>
      </Well>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a well class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Well>
        Content
      </Well>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bwell\b/));
  });

  it('Should accept bsSize arguments', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Well bsSize='small'>
        Content
      </Well>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bwell-sm\b/));
  });
});
