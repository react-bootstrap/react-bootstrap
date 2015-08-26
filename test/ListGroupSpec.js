import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ListGroup from '../src/ListGroup';
import ListGroupItem from '../src/ListGroupItem';

describe('ListGroup', function () {

  it('Should output a "div" with the class "list-group"', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroup/>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'DIV');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group'));
  });

  it('Should support a single "ListGroupItem" child', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroup>
        <ListGroupItem>Only Child</ListGroupItem>
      </ListGroup>
    );

    let items = ReactTestUtils.scryRenderedComponentsWithType(instance, ListGroupItem);

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(items[0], 'list-group-item'));
  });

  it('Should support a single "ListGroupItem" child contained in an array', function () {
    let child = [<ListGroupItem key={42}>Only Child in array</ListGroupItem>];
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroup>
        {child}
      </ListGroup>
    );

    let items = ReactTestUtils.scryRenderedComponentsWithType(instance, ListGroupItem);

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(items[0], 'list-group-item'));
  });

  it('Should output a "ul" when single "ListGroupItem" child is a list item', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroup>
        <ListGroupItem>Only Child</ListGroupItem>
      </ListGroup>
    );

    assert.equal(React.findDOMNode(instance).nodeName, 'UL');
    assert.equal(React.findDOMNode(instance).firstChild.nodeName, 'LI');
  });

  it('Should output a "div" when single "ListGroupItem" child is an anchor', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroup>
        <ListGroupItem href="#test">Only Child</ListGroupItem>
      </ListGroup>
    );

    assert.equal(React.findDOMNode(instance).nodeName, 'DIV');
    assert.equal(React.findDOMNode(instance).firstChild.nodeName, 'A');
  });

  it('Should support multiple "ListGroupItem" children', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroup>
        <ListGroupItem>1st Child</ListGroupItem>
        <ListGroupItem>2nd Child</ListGroupItem>
      </ListGroup>
    );

    let items = ReactTestUtils.scryRenderedComponentsWithType(instance, ListGroupItem);

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(items[0], 'list-group-item'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(items[1], 'list-group-item'));
  });

  it('Should support multiple "ListGroupItem" children including a subset contained in an array', function () {
    let itemArray = [
      <ListGroupItem key={0}>2nd Child nested</ListGroupItem>,
      <ListGroupItem key={1}>3rd Child nested</ListGroupItem>
    ];

    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroup>
        <ListGroupItem>1st Child</ListGroupItem>
        {itemArray}
        <ListGroupItem>4th Child</ListGroupItem>
      </ListGroup>
    );

    let items = ReactTestUtils.scryRenderedComponentsWithType(instance, ListGroupItem);

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(items[0], 'list-group-item'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(items[1], 'list-group-item'));
  });

  it('Should output a "ul" when children are list items', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroup>
        <ListGroupItem>1st Child</ListGroupItem>
        <ListGroupItem>2nd Child</ListGroupItem>
      </ListGroup>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group'));
    assert.equal(React.findDOMNode(instance).nodeName, 'UL');
    assert.equal(React.findDOMNode(instance).firstChild.nodeName, 'LI');
    assert.equal(React.findDOMNode(instance).lastChild.nodeName, 'LI');
  });


  it('Should output a "div" when "ListGroupItem" children are anchors and spans', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroup>
        <ListGroupItem href="#test">1st Child</ListGroupItem>
        <ListGroupItem>2nd Child</ListGroupItem>
      </ListGroup>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'DIV');
    assert.equal(React.findDOMNode(instance).firstChild.nodeName, 'A');
    assert.equal(React.findDOMNode(instance).lastChild.nodeName, 'SPAN');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group'));
  });



  it('Should output a "div" when "ListGroupItem" children have an onClick handler', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroup>
        <ListGroupItem onClick={() => null}>1st Child</ListGroupItem>
        <ListGroupItem>2nd Child</ListGroupItem>
      </ListGroup>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'DIV');
    assert.equal(React.findDOMNode(instance).firstChild.nodeName, 'BUTTON');
    assert.equal(React.findDOMNode(instance).lastChild.nodeName, 'SPAN');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group'));
  });

  it('Should support an element id through "id" prop', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroup id="testItem">
        <ListGroupItem>Child</ListGroupItem>
      </ListGroup>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group'));
    assert.equal(React.findDOMNode(instance).nodeName, 'UL');
    assert.equal(React.findDOMNode(instance).id, 'testItem');
  });

});
