/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Pager          = require('../lib/Pager');
var PageItem       = require('../lib/PageItem');

describe('Pager', function () {
  it('Should output a unordered list as root element with class "pager"', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Pager/>
    );
    assert.equal(instance.getDOMNode().nodeName, 'UL');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'pager'));
  });

  it('Should allow "PageItem" as child element', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Pager>
        <PageItem href="#">Top</PageItem>
      </Pager>
    );
    assert.equal(instance.getDOMNode().children.length, 1);
    assert.equal(instance.getDOMNode().children[0].nodeName, 'LI');
  });

  it('Should allow multiple "PageItem" as child elements', function () {
    var instance = ReactTestUtils.renderIntoDocument(
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

  it('Should call "onSelect" when item is clicked', function (done) {
    function handleSelect(key, href) {
      assert.equal(key, 2);
      assert.equal(href, "#next");
      done();
    }
    var instance = ReactTestUtils.renderIntoDocument(
      <Pager onSelect={handleSelect}>
        <PageItem eventKey={1} ref="item1" href="#prev">Previous</PageItem>
        <PageItem eventKey={2} ref="item2" href="#next">Next</PageItem>
      </Pager>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance.refs.item2, 'a'));
  });
});
