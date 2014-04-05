/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Badge          = require('../cjs/Badge');

describe('Badge', function () {
  it('Should output a badge with content', function () {
    var instance = Badge({}, <strong>Content</strong>);
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a badge class', function () {
    var instance = Badge({}, 'Content');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bbadge\b/));
  });

});