/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var ListGroup      = require('../lib/ListGroup');
var ListGroupItem  = require('../lib/ListGroupItem');

describe('ListGroup', function () {

  it('Should output a "div" with the class "list-group"', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ListGroup/>
    );
    assert.equal(instance.getDOMNode().nodeName, "DIV");
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group'));
  });

  it('Should support "ListGroupItem" childs', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ListGroup>
        <ListGroupItem>1st Child</ListGroupItem>
        <ListGroupItem>2nd Child</ListGroupItem>
      </ListGroup>
    );

    var items = ReactTestUtils.scryRenderedComponentsWithType(instance, ListGroupItem);

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(items[0], 'list-group-item'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(items[1], 'list-group-item'));
  });

});
