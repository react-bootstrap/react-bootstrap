/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Badge          = require('../cjs/Badge');

describe('Badge', function () {
  it('Should output a badge with content', function () {
    var instance = ReactTestUtils.renderIntoDocument(Badge({}, <strong>Content</strong>));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a badge class', function () {
    var instance = ReactTestUtils.renderIntoDocument(Badge({}, 'Content'));
    assert.ok(instance.getDOMNode().className.match(/\bbadge\b/));
  });

  it('Should have a badge class pulled right', function () {
    var instance = ReactTestUtils.renderIntoDocument(Badge({pullRight: true}, 'Content'));
    assert.ok(instance.getDOMNode().className.match(/\bpull-right\b/));
  });

  it('Should not have a badge class when empty', function () {
    var instance = ReactTestUtils.renderIntoDocument(Badge({}));
    assert.notOk(instance.getDOMNode().className.match(/\bbadge\b/));
  });

});
