import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import PageHeader from '../src/PageHeader';

describe('PageHeader', function () {
  it('Should output a div with content', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <PageHeader>
        <strong>Content</strong>
      </PageHeader>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a page-header class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <PageHeader>
        Content
      </PageHeader>
    );
    assert.ok(instance.getDOMNode().className.match(/\bpage-header\b/));
  });

});
