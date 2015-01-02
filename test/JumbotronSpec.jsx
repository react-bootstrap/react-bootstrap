/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Jumbotron      = require('../lib/Jumbotron');

describe('Jumbotron', function () {
  it('Should output a div with content', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Jumbotron>
        <strong>Content</strong>
      </Jumbotron>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'strong'));
  });

  it('Should have a jumbotron class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Jumbotron>
        Content
      </Jumbotron>
    );
    assert.ok(instance.getDOMNode().className.match(/\bjumbotron\b/));
  });

});
