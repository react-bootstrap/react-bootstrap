/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var ListGroup      = require('../cjs/ListGroup');
var ListGroupItem  = require('../cjs/ListGroupItem');

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
        <ListGroupItem ref="child1">1st Child</ListGroupItem>
        <ListGroupItem ref="child2">2nd Child</ListGroupItem>
      </ListGroup>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.child1, 'list-group-item'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.child2, 'list-group-item'));
  });

  it('Should call "onClick" when child item is clicked', function (done) {
    var item1Called = false,
        item2Called = false;
    function handleClick(key, href) {
      if (key === 1) {
        item1Called = true;
      } else if (key === 2) {
        item2Called = true;
      }
      if (item1Called && item2Called) {
        done();
      }
    }
    var instance = ReactTestUtils.renderIntoDocument(
      <ListGroup onClick={handleClick}>
        <ListGroupItem eventKey={1} ref="item1">Item 1</ListGroupItem>
        <ListGroupItem eventKey={2} ref="item2">Item 2</ListGroupItem>
        <ListGroupItem eventKey={3} ref="item3">Item 3</ListGroupItem>
      </ListGroup>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance.refs.item3, 'a'));
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance.refs.item2, 'a'));
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance.refs.item1, 'a'));
  });

});
