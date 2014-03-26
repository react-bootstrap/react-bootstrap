/** @jsx React.DOM */
/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Panel        = require('../cjs/Panel');

describe('Panel', function () {
  it('Should have class and body', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Panel>Panel content</Panel>
        );
    assert.ok(instance.getDOMNode().className.match(/\bpanel\b/));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-body'));
  });

  it('Should have boostrap style class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Panel bsStyle="default">Panel content</Panel>
        );
    assert.ok(instance.getDOMNode().className.match(/\bpanel-default\b/));
  });

  it('Should have unwrapped header', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Panel header="Heading">Panel content</Panel>
        );
    var header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading').getDOMNode();
    assert.equal(header.innerHTML, 'Heading');
  });

  it('Should have custom component header', function () {
    var header = <h3>Heading</h3>,
        instance = ReactTestUtils.renderIntoDocument(
          <Panel header={header}>Panel content</Panel>
        );
    header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading').getDOMNode();
    assert.equal(header.firstChild.nodeName, 'H3');
    assert.ok(header.firstChild.className.match(/\bpanel-title\b/));
    assert.equal(header.firstChild.innerHTML, 'Heading');
  });

  it('Should have custom component header with anchor', function () {
    var header = <h3>Heading</h3>,
        instance = ReactTestUtils.renderIntoDocument(
          <Panel header={header} isCollapsable={true}>Panel content</Panel>
        );
    header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading').getDOMNode();
    assert.equal(header.firstChild.nodeName, 'H3');
    assert.ok(header.firstChild.className.match(/\bpanel-title\b/));
    assert.equal(header.firstChild.firstChild.nodeName, 'A');
    assert.equal(header.firstChild.firstChild.innerHTML, 'Heading');
  });

  it('Should have footer', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Panel footer="Footer">Panel content</Panel>
        );
    var footer = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-footer').getDOMNode();
    assert.equal(footer.innerText, 'Footer');
  });

  it('Should have collapse classes', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Panel isCollapsable={true} isOpen={true}>Panel content</Panel>
        );
    assert.ok(instance.getDOMNode().querySelector('.panel-collapse.collapse.in'));
  });

  it('Should pass through dom properties', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Panel isCollapsable={false} id="testid">Panel content</Panel>
        );
    assert.equal(instance.getDOMNode().id, 'testid');
  });

  it('Should pass id to panel-collapse', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Panel isCollapsable={true} id="testid" header="Heading">Panel content</Panel>
        );
    assert.notOk(instance.getDOMNode().id);
    var collapse = instance.getDOMNode().querySelector('.panel-collapse');
    var anchor = instance.getDOMNode().querySelector('.panel-title a');
    assert.equal(collapse.id, 'testid');
    assert.equal(anchor.getAttribute('href'), '#testid');
  });

  it('Should be open', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Panel isCollapsable={true} isOpen={true} header="Heading">Panel content</Panel>
        );
    var collapse = instance.getDOMNode().querySelector('.panel-collapse');
    var anchor = instance.getDOMNode().querySelector('.panel-title a');
    assert.ok(collapse.className.match(/\bin\b/));
    assert.notOk(anchor.className.match(/\bcollapsed\b/));
  });

  it('Should be closed', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Panel isCollapsable={true} isOpen={false} header="Heading">Panel content</Panel>
        );
    var collapse = instance.getDOMNode().querySelector('.panel-collapse');
    var anchor = instance.getDOMNode().querySelector('.panel-title a');
    assert.notOk(collapse.className.match(/\bin\b/));
    assert.ok(anchor.className.match(/\bcollapsed\b/));
  });

  it('Should call onSelect handler', function (done) {
    function handleSelect (key) {
      assert.equal(key, 1);
      done();
    }
    var instance = ReactTestUtils.renderIntoDocument(
          <Panel isCollapsable={true} onSelect={handleSelect} header="Click me" key={1}>Panel content</Panel>
        );
    var title = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-title');
    ReactTestUtils.Simulate.click(title.getDOMNode().firstChild);
  });

  it('Should toggle when uncontrolled', function (done) {
    var instance = ReactTestUtils.renderIntoDocument(
          <Panel isCollapsable={true} defaultOpen={false} header="Click me">Panel content</Panel>
        );

    assert.notOk(instance.state.isOpen);
    // TODO: update to `ReactTestUtils#nextUpdate()`
    instance.componentDidUpdate = function () {
      assert.ok(instance.state.isOpen);
      done();
    };

    var title = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-title');
    ReactTestUtils.Simulate.click(title.getDOMNode().firstChild);
  });
});