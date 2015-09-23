import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Pager from '../src/Pager';
import PageItem from '../src/PageItem';

describe('Pager', () => {
  it('Should output a unordered list as root element with class "pager"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager/>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'UL');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'pager'));
  });

  it('Should allow "PageItem" as child element', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager>
        <PageItem href="#">Top</PageItem>
      </Pager>
    );
    assert.equal(React.findDOMNode(instance).children.length, 1);
    assert.equal(React.findDOMNode(instance).children[0].nodeName, 'LI');
  });

  it('Should allow multiple "PageItem" as child elements', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager>
        <PageItem previous href="#">Previous</PageItem>
        <PageItem disabled href="#">Top</PageItem>
        <PageItem next href="#">Next</PageItem>
      </Pager>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'previous'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'next'));
  });

  it('Should call "onSelect" when item is clicked', (done) => {
    function handleSelect(key, href) {
      assert.equal(key, 2);
      assert.equal(href, '#next');
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <Pager onSelect={handleSelect}>
        <PageItem eventKey={1} href="#prev">Previous</PageItem>
        <PageItem eventKey={2} href="#next">Next</PageItem>
      </Pager>
    );

    let items = ReactTestUtils.scryRenderedComponentsWithType(instance, PageItem);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithTag(items[1], 'a')
    );
  });
});
