import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import PageHeader from '../src/PageHeader';

describe('PageHeader', () => {
  it('Should output a div with content', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PageHeader>
        <strong>Content</strong>
      </PageHeader>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a page-header class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PageHeader>
        Content
      </PageHeader>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bpage-header\b/));
  });

});
