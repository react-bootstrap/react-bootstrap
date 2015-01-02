/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var PageHeader     = require('../lib/PageHeader');

describe('PageHeader', function () {
  it('Should output a div with content', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <PageHeader>
        <strong>Content</strong>
      </PageHeader>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a page-header class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <PageHeader>
        Content
      </PageHeader>
    );
    assert.ok(instance.getDOMNode().className.match(/\bpage-header\b/));
  });

});
