import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ListGroupItem from '../src/ListGroupItem';

describe('ListGroupItem', () => {

  it('Should output a "span" with the class "list-group-item"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem>Text</ListGroupItem>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'SPAN');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item'));
  });

  it('Should output an "anchor" if "href" prop is set', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem href='#test'>Anchor</ListGroupItem>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'A');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item'));
  });

  it('Should output a "button" if an "onClick" handler is set', () => {
    let noop = () => {};
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem onClick={noop}>Button</ListGroupItem>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'BUTTON');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item'));
  });

  it('Should output an "li" if "listItem" prop is set', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem listItem>Item 1</ListGroupItem>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'LI');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item'));
  });

  it('Should support "bsStyle" prop', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem bsStyle='success'>Item 1</ListGroupItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'list-group-item-success'));
  });

  it('Should support "active" and "disabled" prop', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem active>Item 1</ListGroupItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });

  it('Should support "disabled" prop', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem disabled>Item 2</ListGroupItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
  });

  it('Should support "header" prop as a string', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem header='Heading'>Item text</ListGroupItem>
    );

    let node = React.findDOMNode(instance);
    assert.equal(node.firstChild.nodeName, 'H4');
    assert.equal(node.firstChild.innerText, 'Heading');
    assert.ok(node.firstChild.className.match(/\blist-group-item-heading\b/));
    assert.equal(node.lastChild.nodeName, 'P');
    assert.equal(node.lastChild.innerText, 'Item text');
    assert.ok(node.lastChild.className.match(/\blist-group-item-text\b/));
  });

  it('Should support "header" prop as a ReactComponent', () => {
    let header = <h2>Heading</h2>;
    let instance = ReactTestUtils.renderIntoDocument(
      <ListGroupItem header={header}>Item text</ListGroupItem>
    );

    let node = React.findDOMNode(instance);
    assert.equal(node.firstChild.nodeName, 'H2');
    assert.equal(node.firstChild.innerText, 'Heading');
    assert.ok(node.firstChild.className.match(/\blist-group-item-heading\b/));
    assert.equal(node.lastChild.nodeName, 'P');
    assert.equal(node.lastChild.innerText, 'Item text');
    assert.ok(node.lastChild.className.match(/\blist-group-item-text\b/));
  });
});
