/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var PageItem       = require('../lib/PageItem');

describe('PageItem', function () {
  it('Should output a "list item" as root element, and an "anchor" as a child item', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <PageItem href="#">Text</PageItem>
    );
    assert.equal(instance.getDOMNode().nodeName, 'LI');
    assert.equal(instance.getDOMNode().children.length, 1);
    assert.equal(instance.getDOMNode().children[0].nodeName, 'A');
  });

  it('Should output "disabled" attribute as a class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <PageItem disabled href="#">Text</PageItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
  });

  it('Should output "next" attribute as a class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <PageItem previous href="#">Previous</PageItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'previous'));
  });

  it('Should output "previous" attribute as a class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <PageItem next href="#">Next</PageItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'next'));
  });

  it('Should call "onSelect" when item is clicked', function (done) {
    function handleSelect(key, href) {
      assert.equal(key, 1);
      assert.equal(href, "#");
      done();
    }
    var instance = ReactTestUtils.renderIntoDocument(
      <PageItem eventKey={1} onSelect={handleSelect}>Next</PageItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });

  it('Should not call "onSelect" when item disabled and is clicked', function () {
    function handleSelect() {
      throw new Error('onSelect should not be called');
    }
    var instance = ReactTestUtils.renderIntoDocument(
      <PageItem disabled onSelect={handleSelect}>Next</PageItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });

  it('Should set target attribute on anchor', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <PageItem next href="#" target="_blank">Next</PageItem>
    );

    var anchor = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(anchor.getDOMNode().getAttribute('target'), '_blank');
  });

  it('Should call "onSelect" with target attribute', function (done) {
    function handleSelect(key, href, target) {
      assert.equal(target, "_blank");
      done();
    }
    var instance = ReactTestUtils.renderIntoDocument(
      <PageItem eventKey={1} onSelect={handleSelect} target="_blank">Next</PageItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
  });
});