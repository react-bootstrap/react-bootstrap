/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Well           = require('../cjs/Well');

describe('Well', function () {
  it('Should output a well with content', function () {
    var instance = Well({}, <strong>Content</strong>);
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a well class', function () {
    var instance = Well({}, 'Content');
    ReactTestUtils.renderIntoDocument(instance);

    assert.ok(instance.getDOMNode().className.match(/\bwell\b/));
  });

  it('Should accept bsSize arguments', function () {
      var instance = Well({bsSize: 'small'}, 'Message');
      ReactTestUtils.renderIntoDocument(instance);
      assert.ok(instance.getDOMNode().className.match(/\bwell-sm\b/));
    });

});