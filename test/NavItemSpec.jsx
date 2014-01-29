/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var NavItem        = require('../cjs/NavItem');

describe('NavItem', function () {
  it('Should add active class', function () {
    var instance = (
        <NavItem isActive={true}>Item content</NavItem>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });

  it('Should add disabled class', function () {
    var instance = (
        <NavItem disabled={true}>Item content</NavItem>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
  });

  it('Should add DOM properties', function () {
    var instance = (
        <NavItem href="/some/unique-thing/" title="content">Item content</NavItem>
      );

    ReactTestUtils.renderIntoDocument(instance);
    var linkElement = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a').getDOMNode();
    assert.ok(linkElement.href.indexOf('/some/unique-thing/') >= 0);
    assert.equal(linkElement.title, 'content');
  });

  it('Should call `onSelect` when item is selected', function (done) {
    function handleSelect(key) {
      assert.equal(key, 2);
      done();
    }
    var content = <span>Item content</span>;
    var instance = (
        <NavItem key={2} onSelect={handleSelect}>{content}</NavItem>
      );

    ReactTestUtils.renderIntoDocument(instance);
    ReactTestUtils.Simulate.click(content.getDOMNode());
  });

  it('Should not call `onSelect` when item disabled and is selected', function () {
    function handleSelect() {
      throw new Error('onSelect should not be called');
    }
    var content = <span>Item content</span>;
    var instance = (
        <NavItem disabled={true} onSelect={handleSelect}>{content}</NavItem>
      );

    ReactTestUtils.renderIntoDocument(instance);
    ReactTestUtils.Simulate.click(content.getDOMNode());
  });
});
