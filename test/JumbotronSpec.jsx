/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Jumbotron      = require('../cjs/Jumbotron');

describe('Jumbotron', function () {
  it('Should output a div with content', function () {
    var instance = Jumbotron({}, <strong>Content</strong>);
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a jumbotron class', function () {
    var instance = Jumbotron({}, 'Content');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bjumbotron\b/));
  });

});