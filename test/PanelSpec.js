import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Panel from '../src/Panel';
import Table from '../src/Table';
import {shouldWarn} from './helpers';

describe('Panel', function () {
  it('Should have class and body', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel>Panel content</Panel>
    );
    assert.ok(instance.getDOMNode().className.match(/\bpanel\b/));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-body'));
  });

  it('Should have bootstrap style class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel bsStyle="default">Panel content</Panel>
    );
    assert.ok(instance.getDOMNode().className.match(/\bpanel-default\b/));
  });

  it('Should honour additional classes passed in, adding not overriding', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel className="bob"/>
    );
    assert.ok(instance.getDOMNode().className.match(/\bbob\b/));
    assert.ok(instance.getDOMNode().className.match(/\bpanel\b/));
  });

  it('Should have unwrapped header', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel header="Heading">Panel content</Panel>
    );
    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading').getDOMNode();
    assert.equal(header.innerHTML, 'Heading');
  });

  it('Should have custom component header', function () {
    let header = <h3>Heading</h3>,
        instance = ReactTestUtils.renderIntoDocument(
          <Panel header={header}>Panel content</Panel>
        );
    header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading').getDOMNode();
    assert.equal(header.firstChild.nodeName, 'H3');
    assert.ok(header.firstChild.className.match(/\bpanel-title\b/));
    assert.equal(header.firstChild.innerHTML, 'Heading');
  });

  it('Should have custom component header with anchor', function () {
    let header = <h3>Heading</h3>,
        instance = ReactTestUtils.renderIntoDocument(
          <Panel header={header} collapsible={true}>Panel content</Panel>
        );
    header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading').getDOMNode();
    assert.equal(header.firstChild.nodeName, 'H3');
    assert.ok(header.firstChild.className.match(/\bpanel-title\b/));
    assert.equal(header.firstChild.firstChild.nodeName, 'A');
    assert.equal(header.firstChild.firstChild.innerHTML, 'Heading');
  });

  it('Should have footer', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel footer="Footer">Panel content</Panel>
    );
    let footer = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-footer').getDOMNode();
    assert.equal(footer.innerText, 'Footer');
  });

  it('Should have collapse classes', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} expanded={true}>Panel content</Panel>
    );
    assert.ok(instance.getDOMNode().querySelector('.panel-collapse.collapse.in'));
  });

  it('Should pass through dom properties', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={false} id="testid">Panel content</Panel>
    );
    assert.equal(instance.getDOMNode().id, 'testid');
  });

  it('Should pass id to panel-collapse', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} id="testid" header="Heading">Panel content</Panel>
    );
    assert.notOk(instance.getDOMNode().id);
    let collapse = instance.getDOMNode().querySelector('.panel-collapse');
    let anchor = instance.getDOMNode().querySelector('.panel-title a');
    assert.equal(collapse.id, 'testid');
    assert.equal(anchor.getAttribute('href'), '#testid');
  });

  it('Should be open', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} expanded={true} header="Heading">Panel content</Panel>
    );
    let collapse = instance.getDOMNode().querySelector('.panel-collapse');
    let anchor = instance.getDOMNode().querySelector('.panel-title a');
    assert.ok(collapse.className.match(/\bin\b/));
    assert.notOk(anchor.className.match(/\bcollapsed\b/));
  });

  it('Should be closed', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} expanded={false} header="Heading">Panel content</Panel>
    );
    let collapse = instance.getDOMNode().querySelector('.panel-collapse');
    let anchor = instance.getDOMNode().querySelector('.panel-title a');
    assert.notOk(collapse.className.match(/\bin\b/));
    assert.ok(anchor.className.match(/\bcollapsed\b/));
  });

  it('Should be aria-expanded=true', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} expanded={true} header="Heading">Panel content</Panel>
    );
    let collapse = instance.getDOMNode().querySelector('.panel-collapse');
    let anchor = instance.getDOMNode().querySelector('.panel-title a');
    assert.equal(collapse.getAttribute('aria-expanded'), 'true');
    assert.equal(anchor.getAttribute('aria-expanded'), 'true');
  });

  it('Should be aria-expanded=false', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} expanded={false} header="Heading">Panel content</Panel>
    );
    let collapse = instance.getDOMNode().querySelector('.panel-collapse');
    let anchor = instance.getDOMNode().querySelector('.panel-title a');
    assert.equal(collapse.getAttribute('aria-expanded'), 'false');
    assert.equal(anchor.getAttribute('aria-expanded'), 'false');
  });

  it('Should call onSelect handler', function (done) {
    function handleSelect (e, key) {
      assert.equal(key, '1');
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} onSelect={handleSelect} header="Click me" eventKey='1'>Panel content</Panel>
    );
    let title = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-title');
    ReactTestUtils.Simulate.click(title.getDOMNode().firstChild);
  });

  it('Should toggle when uncontrolled', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} defaultExpanded={false} header="Click me">Panel content</Panel>
    );

    assert.notOk(instance.state.expanded);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-title').getDOMNode().firstChild
    );

    assert.ok(instance.state.expanded);
  });

  it('Should not wrap panel-filling tables in a panel body', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel>
        Panel content
        <Table fill />
        More panel content
      </Panel>
    );

    let children = instance.getDOMNode().children;
    assert.equal(children.length, 3);

    assert.equal(children[0].nodeName, 'DIV');
    assert.ok(children[0].className.match(/\bpanel-body\b/));

    assert.equal(children[1].nodeName, 'TABLE');
    assert.notOk(children[1].className.match(/\bpanel-body\b/));

    assert.equal(children[2].nodeName, 'DIV');
    assert.ok(children[2].className.match(/\bpanel-body\b/));
  });

  it('Should not wrap single panel-fill table in a panel body', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel>
        <Table fill />
      </Panel>
    );

    let children = instance.getDOMNode().children;
    assert.equal(children.length, 1);

    assert.equal(children[0].nodeName, 'TABLE');
    assert.notOk(children[0].className.match(/\bpanel-body\b/));
  });

  it('Should not warn about deprecation when collaps_i_ble property is used', function () {
    let Component = React.createClass({
      render: function() {
        return (
          <Panel collapsible />
        );
      }
    });
    ReactTestUtils.renderIntoDocument(<Component />);

    console.warn.called.should.be.false;
  });

  it('Should warn about deprecation when collaps_a_ble property is used', function () {
    let Component = React.createClass({
      render: function() {
        return (
          <Panel collapsable />
        );
      }
    });
    ReactTestUtils.renderIntoDocument(<Component />);

    shouldWarn('deprecated');
  });
});
