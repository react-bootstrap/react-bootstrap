/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var ListGroupItem  = require('../lib/ListGroupItem');

describe('ListGroupItem', function () {

  it('Should output a "span" with the class "list-group-item"', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem>Text</ListGroupItem>
    );
    assert.equal(instance.getDOMNode().nodeName, "SPAN");
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item'));
  });

  it('Should output a "anchor" if "href" prop is set', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem href="#test">Achor</ListGroupItem>
    );
    assert.equal(instance.getDOMNode().nodeName, "A");
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item'));
  });

  it('Should support "bsStyle" prop', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem bsStyle="success">Item 1</ListGroupItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item-success'));
  });

  it('Should support "active" and "disabled" prop', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem active>Item 1</ListGroupItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });

  it('Should support "disabled" prop', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem disabled>Item 2</ListGroupItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, "disabled"));
  });

  it('Should support "header" prop as a string', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem header="Heading">Item text</ListGroupItem>
    );
    assert.equal(instance.getDOMNode().firstChild.nodeName, "H4");
    assert.equal(instance.getDOMNode().firstChild.innerText, "Heading");
    assert.ok(instance.getDOMNode().firstChild.className.match(/\blist-group-item-heading\b/));
    assert.equal(instance.getDOMNode().lastChild.nodeName, "P");
    assert.equal(instance.getDOMNode().lastChild.innerText, "Item text");
    assert.ok(instance.getDOMNode().lastChild.className.match(/\blist-group-item-text\b/));
  });

  it('Should support "header" prop as a ReactComponent', function () {
    var header = <h2>Heading</h2>,
        instance = ReactTestUtils.renderIntoDocument(
          <ListGroupItem header={header}>Item text</ListGroupItem>
        );
    assert.equal(instance.getDOMNode().firstChild.nodeName, "H2");
    assert.equal(instance.getDOMNode().firstChild.innerText, "Heading");
    assert.ok(instance.getDOMNode().firstChild.className.match(/\blist-group-item-heading\b/));
    assert.equal(instance.getDOMNode().lastChild.nodeName, "P");
    assert.equal(instance.getDOMNode().lastChild.innerText, "Item text");
    assert.ok(instance.getDOMNode().lastChild.className.match(/\blist-group-item-text\b/));
  });

});
