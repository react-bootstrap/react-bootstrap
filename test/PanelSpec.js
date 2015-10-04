import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Panel from '../src/Panel';
import Table from '../src/Table';

describe('Panel', () => {
  it('Should have class and body', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel>Panel content</Panel>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bpanel\b/));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-body'));
  });

  it('Should have bootstrap style class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel bsStyle="default">Panel content</Panel>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bpanel-default\b/));
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel className="bob"/>
    );
    assert.ok(React.findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(React.findDOMNode(instance).className.match(/\bpanel\b/));
  });

  it('Should have unwrapped header', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel header="Heading">Panel content</Panel>
    );
    let header = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading'));
    assert.equal(header.innerHTML, 'Heading');
  });

  it('Should have custom component header', () => {
    let header = <h3>Heading</h3>;
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel header={header}>Panel content</Panel>
    );
    header = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading'));
    assert.equal(header.firstChild.nodeName, 'H3');
    assert.ok(header.firstChild.className.match(/\bpanel-title\b/));
    assert.equal(header.firstChild.innerHTML, 'Heading');
  });

  it('Should have custom component header with anchor', () => {
    let header = <h3>Heading</h3>;
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel header={header} collapsible={true}>Panel content</Panel>
    );
    header = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading'));
    assert.equal(header.firstChild.nodeName, 'H3');
    assert.ok(header.firstChild.className.match(/\bpanel-title\b/));
    assert.equal(header.firstChild.firstChild.nodeName, 'A');
    assert.equal(header.firstChild.firstChild.innerHTML, 'Heading');
  });

  it('Should have custom component header with custom class', () => {
    let header = <h3 className="custom-class">Heading</h3>;
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel header={header}>Panel content</Panel>
    );
    header = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading'));
    assert.equal(header.firstChild.nodeName, 'H3');
    assert.ok(header.firstChild.className.match(/\bpanel-title\b/));
    assert.ok(header.firstChild.className.match(/\bcustom-class\b/));
    assert.equal(header.firstChild.innerHTML, 'Heading');
  });

  it('Should have footer', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel footer="Footer">Panel content</Panel>
    );
    let footer = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-footer'));
    assert.equal(footer.innerText, 'Footer');
  });

  it('Should have collapse classes', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} expanded={true}>Panel content</Panel>
    );
    assert.ok(React.findDOMNode(instance).querySelector('.panel-collapse.collapse.in'));
  });

  it('Should pass through dom properties', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={false} id="testid">Panel content</Panel>
    );
    assert.equal(React.findDOMNode(instance).id, 'testid');
  });

  it('Should pass id to panel-collapse', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} id="testid" header="Heading">Panel content</Panel>
    );
    assert.notOk(React.findDOMNode(instance).id);
    let collapse = React.findDOMNode(instance).querySelector('.panel-collapse');
    let anchor = React.findDOMNode(instance).querySelector('.panel-title a');
    assert.equal(collapse.id, 'testid');
    assert.equal(anchor.getAttribute('href'), '#testid');
  });

  it('Should be open', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} expanded={true} header="Heading">Panel content</Panel>
    );
    let collapse = React.findDOMNode(instance).querySelector('.panel-collapse');
    let anchor = React.findDOMNode(instance).querySelector('.panel-title a');
    assert.ok(collapse.className.match(/\bin\b/));
    assert.notOk(anchor.className.match(/\bcollapsed\b/));
  });

  it('Should be closed', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} expanded={false} header="Heading">Panel content</Panel>
    );
    let collapse = React.findDOMNode(instance).querySelector('.panel-collapse');
    let anchor = React.findDOMNode(instance).querySelector('.panel-title a');
    assert.notOk(collapse.className.match(/\bin\b/));
    assert.ok(anchor.className.match(/\bcollapsed\b/));
  });

  it('Should call onSelect handler', (done) => {
    function handleSelect(e, key) {
      assert.equal(key, '1');
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} onSelect={handleSelect} header="Click me" eventKey='1'>Panel content</Panel>
    );
    let title = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-title');
    ReactTestUtils.Simulate.click(React.findDOMNode(title).firstChild);
  });

  it('Should toggle when uncontrolled', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={true} defaultExpanded={false} header="Click me">Panel content</Panel>
    );

    assert.notOk(instance.state.expanded);

    ReactTestUtils.Simulate.click(
      React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-title')).firstChild
    );

    assert.ok(instance.state.expanded);
  });

  it('Should not wrap panel-filling tables in a panel body', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel>
        Panel content
        <Table fill />
        More panel content
      </Panel>
    );

    let children = React.findDOMNode(instance).children;
    assert.equal(children.length, 3);

    assert.equal(children[0].nodeName, 'DIV');
    assert.ok(children[0].className.match(/\bpanel-body\b/));

    assert.equal(children[1].nodeName, 'TABLE');
    assert.notOk(children[1].className.match(/\bpanel-body\b/));

    assert.equal(children[2].nodeName, 'DIV');
    assert.ok(children[2].className.match(/\bpanel-body\b/));
  });

  it('Should not wrap single panel-fill table in a panel body', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Panel>
        <Table fill />
      </Panel>
    );

    let children = React.findDOMNode(instance).children;
    assert.equal(children.length, 1);

    assert.equal(children[0].nodeName, 'TABLE');
    assert.notOk(children[0].className.match(/\bpanel-body\b/));
  });

  describe('Web Accessibility', () => {

    it('Should be aria-expanded=true', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Panel collapsible={true} expanded={true} header="Heading">Panel content</Panel>
      );
      let anchor = React.findDOMNode(instance).querySelector('.panel-title a');
      assert.equal(anchor.getAttribute('aria-expanded'), 'true');
    });

    it('Should be aria-expanded=false', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Panel collapsible={true} expanded={false} header="Heading">Panel content</Panel>
      );
      let anchor = React.findDOMNode(instance).querySelector('.panel-title a');
      assert.equal(anchor.getAttribute('aria-expanded'), 'false');
    });

    it('Should add aria-controls with id', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Panel id='panel-1' collapsible expanded header="Heading">Panel content</Panel>
      );

      let collapse = React.findDOMNode(instance).querySelector('.panel-collapse');
      let anchor = React.findDOMNode(instance).querySelector('.panel-title a');

      assert.equal(collapse.getAttribute('id'), 'panel-1');
      assert.equal(anchor.getAttribute('aria-controls'), 'panel-1');
    });

  });
});
