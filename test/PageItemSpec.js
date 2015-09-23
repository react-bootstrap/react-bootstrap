import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import PageItem from '../src/PageItem';

describe('PageItem', () => {
  it('Should output a "list item" as root element, and an "anchor" as a child item', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PageItem href="#">Text</PageItem>
    );

    let node = React.findDOMNode(instance);
    assert.equal(node.nodeName, 'LI');
    assert.equal(node.children.length, 1);
    assert.equal(node.children[0].nodeName, 'A');
  });

  it('Should output "disabled" attribute as a class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PageItem disabled href="#">Text</PageItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
  });

  it('Should output "next" attribute as a class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PageItem previous href="#">Previous</PageItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'previous'));
  });

  it('Should output "previous" attribute as a class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PageItem next href="#">Next</PageItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'next'));
  });

  it('Should call "onSelect" when item is clicked', (done) => {
    function handleSelect(key, href) {
      assert.equal(key, 1);
      assert.equal(href, undefined);
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <PageItem eventKey={1} onSelect={handleSelect}>Next</PageItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });

  it('Should not call "onSelect" when item disabled and is clicked', () => {
    function handleSelect() {
      throw new Error('onSelect should not be called');
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <PageItem disabled onSelect={handleSelect}>Next</PageItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });

  it('Should set target attribute on anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PageItem next href="#" target="_blank">Next</PageItem>
    );

    let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(React.findDOMNode(anchor).getAttribute('target'), '_blank');
  });

  it('Should call "onSelect" with target attribute', (done) => {
    function handleSelect(key, href, target) {
      assert.equal(target, '_blank');
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <PageItem eventKey={1} onSelect={handleSelect} target="_blank">Next</PageItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });
});
