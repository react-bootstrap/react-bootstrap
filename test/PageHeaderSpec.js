import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import PageHeader from '../src/PageHeader';

describe('PageHeader', () => {
  it('Should output a div with content', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PageHeader>
        <strong>Content</strong>
      </PageHeader>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong')
    );
  });

  it('Should have a page-header class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PageHeader>Content</PageHeader>
    );
    assert.ok(
      ReactDOM.findDOMNode(instance).className.match(/\bpage-header\b/)
    );
  });
});
