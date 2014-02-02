/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Panel        = require('../cjs/Panel');

describe('Panel', function () {
  it('Should have class and body', function () {
    var instance = (
        <Panel>Panel content</Panel>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\bpanel\b/));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-body'));
  });

  it('Should have boostrap style class', function () {
    var instance = (
        <Panel bsStyle="default">Panel content</Panel>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\bpanel-default\b/));
  });

  it('Should have header wrapped in h4', function () {
    var instance = (
        <Panel header="Heading">Panel content</Panel>
      );

    ReactTestUtils.renderIntoDocument(instance);
    var header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading').getDOMNode();
    assert.equal(header.firstChild.nodeName, 'H4');
    assert.ok(header.firstChild.className.match(/\bpanel-title\b/));
    assert.equal(header.firstChild.innerText, 'Heading');
  });

  it('Should have custom component header', function () {
    var header = <h3>Heading</h3>,
        instance = (
        <Panel header={header}>Panel content</Panel>
      );

    ReactTestUtils.renderIntoDocument(instance);
    var header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading').getDOMNode();
    assert.equal(header.firstChild.nodeName, 'H3');
    assert.ok(header.firstChild.className.match(/\bpanel-title\b/));
    assert.equal(header.firstChild.innerText, 'Heading');
  });

  it('Should have footer', function () {
    var instance = (
        <Panel footer="Footer">Panel content</Panel>
      );

    ReactTestUtils.renderIntoDocument(instance);
    var footer = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-footer').getDOMNode();
    assert.equal(footer.innerText, 'Footer');
  });

  it('Should have collapse classes', function () {
    var instance = (
        <Panel isCollapsable={true}>Panel content</Panel>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\bpanel-collapse\b/));
    assert.ok(instance.getDOMNode().className.match(/\bcollapse\b/));
    assert.notOk(instance.getDOMNode().className.match(/\bin\b/));
  });

  it('Should be open', function () {
    var instance = (
        <Panel isOpen={true}>Panel content</Panel>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.getDOMNode().className.match(/\bin\b/));
  });

  it('Should call onSelect handler', function (done) {
    function handleSelect (key) {
      assert.equal(key, 1);
      done();
    }
    var instance = (
        <Panel onSelect={handleSelect} header="Click me" key={1}>Panel content</Panel>
      );

    ReactTestUtils.renderIntoDocument(instance);
    var title = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-title');
    ReactTestUtils.Simulate.click(title.getDOMNode());
  });
});