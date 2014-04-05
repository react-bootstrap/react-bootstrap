/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Well           = require('../cjs/Well');

describe('Well', function () {
  it('Should output a well with content', function () {
    var instance = ReactTestUtils.renderIntoDocument(Well({}, <strong>Content</strong>));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a well class', function () {
    var instance = ReactTestUtils.renderIntoDocument(Well({}, 'Content'));
    assert.ok(instance.getDOMNode().className.match(/\bwell\b/));
  });

  it('Should accept bsSize arguments', function () {
      var instance = ReactTestUtils.renderIntoDocument(Well({bsSize: 'small'}, 'Message'));
      assert.ok(instance.getDOMNode().className.match(/\bwell-sm\b/));
    });

});