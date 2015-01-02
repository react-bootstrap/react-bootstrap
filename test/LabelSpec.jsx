/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Label          = require('../lib/Label');

describe('Label', function () {

  it('Should output a label with message', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Label>
        <strong>Message</strong>
      </Label>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have bsClass by default', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Label>
        Message
      </Label>
    );
    assert.ok(instance.getDOMNode().className.match(/\blabel\b/));
  });

  it('Should have bsStyle by default', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Label>
        Message
      </Label>
    );
    assert.ok(instance.getDOMNode().className.match(/\blabel-default\b/));
  });

});
