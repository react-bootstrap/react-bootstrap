/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var PageHeader      = require('../cjs/PageHeader');

describe('PageHeader', function () {
  it('Should output a div with content', function () {
    var instance = ReactTestUtils.renderIntoDocument(PageHeader({}, <strong>Content</strong>));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a page-header class', function () {
    var instance = ReactTestUtils.renderIntoDocument(PageHeader({}, 'Content'));
    assert.ok(instance.getDOMNode().className.match(/\bpage-header\b/));
  });

});