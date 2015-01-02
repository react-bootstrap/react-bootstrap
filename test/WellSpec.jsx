/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Well           = require('../lib/Well');

describe('Well', function () {
  it('Should output a well with content', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Well>
        <strong>Content</strong>
      </Well>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a well class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Well>
        Content
      </Well>
    );
    assert.ok(instance.getDOMNode().className.match(/\bwell\b/));
  });

  it('Should accept bsSize arguments', function () {
      var instance = ReactTestUtils.renderIntoDocument(
      <Well bsSize='small'>
        Content
      </Well>
      );
      assert.ok(instance.getDOMNode().className.match(/\bwell-sm\b/));
    });

});
