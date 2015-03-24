/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var NavItem        = require('../lib/NavItem');

describe('NavItem', function () {
  it('Should add active class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <NavItem active={true}>
        Item content
      </NavItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });

  it('Should add disabled class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <NavItem disabled={true}>
        Item content
      </NavItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
  });

  it('Should add DOM properties', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <NavItem href="/some/unique-thing/" title="content">
        Item content
      </NavItem>
    );
    var linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a').getDOMNode();
    assert.ok(linkElement.href.indexOf('/some/unique-thing/') >= 0);
    assert.equal(linkElement.title, 'content');
  });

  it('Should not add anchor properties to li', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <NavItem href='/hi' title='boom!'>
        Item content
      </NavItem>
    );

    assert.ok(!instance.getDOMNode().hasAttribute('href'));
    assert.ok(!instance.getDOMNode().hasAttribute('title'));
  });

  it('Should call `onSelect` when item is selected', function (done) {
    function handleSelect(key) {
      assert.equal(key, '2');
      done();
    }
    var instance = ReactTestUtils.renderIntoDocument(
      <NavItem eventKey='2' onSelect={handleSelect}>
        <span>Item content</span>
      </NavItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
  });

  it('Should not call `onSelect` when item disabled and is selected', function () {
    function handleSelect() {
      throw new Error('onSelect should not be called');
    }
    var instance = ReactTestUtils.renderIntoDocument(
      <NavItem disabled={true} onSelect={handleSelect}>
        <span>Item content</span>
      </NavItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
  });

  it('Should set target attribute on anchor', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <NavItem href="/some/unique-thing/" target="_blank">Item content</NavItem>
        );
    var linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a').getDOMNode();
    assert.equal(linkElement.target, '_blank');
  });

  it('Should call `onSelect` with target attribute', function (done) {
    function handleSelect(key, href, target) {
      assert.equal(target, '_blank');
      done();
    }
    var instance = ReactTestUtils.renderIntoDocument(
      <NavItem onSelect={handleSelect} target="_blank">
        <span>Item content</span>
      </NavItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
  });

  it('Should set role="button" when href=="#"', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <NavItem href="#" target="_blank">Item content</NavItem>
        );

    var linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a').getDOMNode();
    assert(linkElement.outerHTML.match('role="button"'), true);
  });

  it('Should not set role when href!="#"', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <NavItem href="/path/to/stuff" target="_blank">Item content</NavItem>
        );

    var linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a').getDOMNode();
    assert.equal(linkElement.outerHTML.match('role="button"'), null);
  });
});
