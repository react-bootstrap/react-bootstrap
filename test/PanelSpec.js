import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Panel from '../src/Panel';
import Table from '../src/Table';

describe('<Panel>', () => {
  it('Should have class and body', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel>
        Panel content
      </Panel>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bpanel\b/));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bpanel-default\b/));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-body'));
  });

  it('Should have bootstrap style class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel bsStyle="primary">
        Panel content
      </Panel>
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bpanel-primary\b/));
  });

  it('Should honour additional classes passed in, adding not overriding', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel className="bob" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bbob\b/));
    assert.ok(ReactDOM.findDOMNode(instance).className.match(/\bpanel\b/));
  });

  it('Should have unwrapped header', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel>
        <Panel.Heading>Panel heading</Panel.Heading>
        Panel content
      </Panel>
    );
    const header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading');
    assert.equal(header.textContent, 'Panel heading');
  });

  it('Should have custom component header', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel>
        <Panel.Heading><h3 className="panel-title">Panel heading</h3></Panel.Heading>
        Panel content
      </Panel>
    );
    const header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading');
    assert.equal(header.firstChild.nodeName, 'H3');
    assert.ok(header.firstChild.className.match(/\bpanel-title\b/));
    assert.equal(header.firstChild.textContent, 'Panel heading');
  });

  it('Should have custom component header with anchor', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible>
        <Panel.Heading><a className="panel-title">Panel heading</a></Panel.Heading>
        Panel content
      </Panel>
    );
    const header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-heading');
    assert.equal(header.firstChild.nodeName, 'H3');
    assert.ok(header.firstChild.className.match(/\bpanel-title\b/));
    assert.equal(header.firstChild.firstChild.nodeName, 'A');
    assert.equal(header.firstChild.firstChild.textContent, 'Panel heading');
  });

  it('Should have footer', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel>
        Panel content
        <Panel.Footer>Footer</Panel.Footer>
      </Panel>
    );
    const footer = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-footer');
    assert.equal(footer.textContent, 'Footer');
  });

  it('Should have collapse classes', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible>
        <Panel.Body>
          Panel content
        </Panel.Body>
      </Panel>
    );
    assert.ok(ReactDOM.findDOMNode(instance).querySelector('.panel-collapse.collapse.in'));
  });

  it('Should pass through dom properties', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible={false} id="testid">
        Panel content
      </Panel>
    );
    assert.equal(ReactDOM.findDOMNode(instance).id, 'testid');
  });

  it('Should pass id to panel-collapse', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible id="testid">
        <Panel.Heading>
          <Panel.Title>
            Heading
          </Panel.Title>
        </Panel.Heading>
        Panel content
      </Panel>
    );
    assert.notOk(ReactDOM.findDOMNode(instance).id);
    const collapse = ReactDOM.findDOMNode(instance).querySelector('.panel-collapse');
    console.log(collapse)
    assert.equal(collapse.id, 'testid');
  });

  it('Should be open', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible expanded header="Heading">
        Panel content
      </Panel>
    );
    const collapse = ReactDOM.findDOMNode(instance).querySelector('.panel-collapse');
    const anchor = ReactDOM.findDOMNode(instance).querySelector('.panel-title a');
    assert.ok(collapse.className.match(/\bin\b/));
    assert.notOk(anchor.className.match(/\bcollapsed\b/));
  });

  it('Should be closed', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible expanded={false}>
        <Panel.Heading>
          Heading
        </Panel.Heading>
        Panel content
      </Panel>
    );
    const collapse = ReactDOM.findDOMNode(instance).querySelector('.panel-collapse');
    assert.notOk(collapse.className.match(/\bin\b/));
  });

  it('Should call onSelect handler', (done) => {
    function handleSelect(key) {
      assert.equal(key, '1');
      done();
    }
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible onSelect={handleSelect} header="Click me" eventKey="1">
        Panel content
      </Panel>
    );
    const title = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-title');
    ReactTestUtils.Simulate.click(title.firstChild);
  });

  it('Should obey onSelect handler', () => {
    function handleSelect(key, e) {
      if (e.target.className.indexOf('ignoreme') > -1) {
        e.selected = false;
      }
    }
    const header = (
      <div>
        <span className="clickme">Click me</span>
        <span className="ignoreme">Ignore me</span>
      </div>
    );
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible onSelect={handleSelect} header={header} eventKey="1">
        Panel content
      </Panel>
    );
    const panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);
    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'ignoreme')
    );
    assert.notOk(panel.state.expanded);
    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'clickme')
    );
    assert.ok(panel.state.expanded);
  });

  it('Should toggle when uncontrolled', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel collapsible expanded defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>
            Click me
          </Panel.Title>
        </Panel.Heading>
        Panel content
      </Panel>
    );

    assert.notOk(instance.state.expanded);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-title').firstChild
    );

    assert.ok(instance.state.expanded);
  });

  it('Should not wrap panel-filling tables in a panel body', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel>
        Panel content
        <Table fill />
        More panel content
      </Panel>
    );

    const children = ReactDOM.findDOMNode(instance).children;
    assert.equal(children.length, 3);

    assert.equal(children[0].nodeName, 'DIV');
    assert.ok(children[0].className.match(/\bpanel-body\b/));

    assert.equal(children[1].nodeName, 'TABLE');
    assert.notOk(children[1].className.match(/\bpanel-body\b/));

    assert.equal(children[2].nodeName, 'DIV');
    assert.ok(children[2].className.match(/\bpanel-body\b/));
  });

  it('Should not wrap single panel-fill table in a panel body', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Panel>
        <Panel.Body>
          <Table fill />
        </Panel.Body>
      </Panel>
    );

    const children = ReactDOM.findDOMNode(instance).children;
    assert.equal(children.length, 1);

    assert.equal(children[0].nodeName, 'TABLE');
    assert.notOk(children[0].className.match(/\bpanel-body\b/));
  });

  it('Should pass transition callbacks to Collapse', (done) => {
    let count = 0;
    const increment = () => { ++count; };

    let title;

    const instance = ReactTestUtils.renderIntoDocument(
      <Panel
        collapsible
        defaultExpanded={false}
        header="Click me"
        onExit={increment}
        onExiting={increment}
        onExited={() => {
          increment();
          expect(count).to.equal(6);
          done();
        }}
        onEnter={increment}
        onEntering={increment}
        onEntered={() => {
          increment();
          ReactTestUtils.Simulate.click(title.firstChild);
        }}
      >
        Panel content
      </Panel>
    );

    title = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'panel-title');
    ReactTestUtils.Simulate.click(title.firstChild);
  });

  describe('Web Accessibility', () => {

    it('Should be aria-expanded=true', () => {
      const instance = ReactTestUtils.renderIntoDocument(
        <Panel collapsible expanded>
          <Panel.Heading>
            <Panel.Title toggle>
              Heading
            </Panel.Title>
          </Panel.Heading>
          Panel content
        </Panel>
      );
      const anchor = ReactDOM.findDOMNode(instance).querySelector('.panel-title a');
      assert.equal(anchor.getAttribute('aria-expanded'), 'true');
    });

    it('Should be aria-expanded=false', () => {
      const instance = ReactTestUtils.renderIntoDocument(
        <Panel collapsible expanded={false}>
          <Panel.Heading>
            <Panel.Title toggle>
              Heading
            </Panel.Title>
          </Panel.Heading>
          Panel content
        </Panel>
      );
      const anchor = ReactDOM.findDOMNode(instance).querySelector('.panel-title a');
      assert.equal(anchor.getAttribute('aria-expanded'), 'false');
    });
  });
});
