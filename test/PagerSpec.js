import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';

import Pager from '../src/Pager';

describe('Pager', () => {
  it('Should output a unordered list as root element with class "pager"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager/>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'UL');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'pager'));
  });

  it('Should allow "Pager.Item" as child element', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager>
        <Pager.Item href="#">Top</Pager.Item>
      </Pager>
    );
    assert.equal(ReactDOM.findDOMNode(instance).children.length, 1);
    assert.equal(ReactDOM.findDOMNode(instance).children[0].nodeName, 'LI');
  });

  it('Should allow multiple "Pager.Item" as child elements', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager>
        <Pager.Item previous href="#">Previous</Pager.Item>
        <Pager.Item disabled href="#">Top</Pager.Item>
        <Pager.Item next href="#">Next</Pager.Item>
      </Pager>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'previous'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'next'));
  });

  it('Should call "onSelect" when item is clicked', (done) => {
    function handleSelect(key, e) {
      assert.equal(key, 2);
      assert.equal(e.target.hash, '#next');
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager onSelect={handleSelect}>
        <Pager.Item eventKey={1} href="#prev">Previous</Pager.Item>
        <Pager.Item eventKey={2} href="#next">Next</Pager.Item>
      </Pager>
    );

    let items = ReactTestUtils.scryRenderedComponentsWithType(instance, Pager.Item);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(items[1], 'a')
    );
  });
});
