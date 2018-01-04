import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Pager from '../src/Pager';

describe('PagerItem', () => {
  it('Should output a "list item" as root element, and an "anchor" as a child item', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager.Item href="#">Text</Pager.Item>
    );

    let node = ReactDOM.findDOMNode(instance);
    assert.equal(node.nodeName, 'LI');
    assert.equal(node.children.length, 1);
    assert.equal(node.children[0].nodeName, 'A');
  });

  it('Should output "disabled" attribute as a class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager.Item disabled href="#">
        Text
      </Pager.Item>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled')
    );
  });

  it('Should output "next" attribute as a class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager.Item previous href="#">
        Previous
      </Pager.Item>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'previous')
    );
  });

  it('Should output "previous" attribute as a class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager.Item next href="#">
        Next
      </Pager.Item>
    );
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'next')
    );
  });

  it('Should call "onSelect" when item is clicked', done => {
    function handleSelect(key) {
      assert.equal(key, 1);
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager.Item eventKey={1} onSelect={handleSelect}>
        Next
      </Pager.Item>
    );
    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a')
    );
  });

  it('Should not call "onSelect" when item disabled and is clicked', () => {
    function handleSelect() {
      throw new Error('onSelect should not be called');
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager.Item disabled onSelect={handleSelect}>
        Next
      </Pager.Item>
    );
    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a')
    );
  });

  it('Should set target attribute on anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager.Item next href="#" target="_blank">
        Next
      </Pager.Item>
    );

    let anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(anchor.getAttribute('target'), '_blank');
  });

  it('Should call "onSelect" with target attribute', done => {
    function handleSelect(key, e) {
      assert.equal(e.target.target, '_blank');
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager.Item eventKey={1} onSelect={handleSelect} target="_blank">
        Next
      </Pager.Item>
    );
    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a')
    );
  });
});
