/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Label          = require('../cjs/Label');

describe('Label', function () {

  it('Should output a label with message', function () {
    var instance = Label({}, <strong>Message</strong>);
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have bsClass by default', function () {
    var instance = Label({}, 'Message');
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\blabel\b/));
  });

  it('Should have bsStyle by default', function () {
    var instance = Label({}, 'Message');
    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\blabel-default\b/));
  });

});