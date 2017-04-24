import React from 'react';
import tsp from 'teaspoon';

import Panel from '../src/Panel';

describe('<Panel>', () => {
  it('Should have class and body', () => {
    const inst = tsp(
      <Panel>
        <Panel.Body>Panel content</Panel.Body>
      </Panel>
    )
    .render();

    inst.single('div.panel.panel-default');
    inst.single('div.panel-body');
  });

  it('Should have bootstrap style class', () => {
    tsp(
      <Panel bsStyle="primary">
        <Panel.Body>Panel content</Panel.Body>
      </Panel>
    )
    .render()
    .single('div.panel-primary');
  });

  it('Should honor additional classes passed in; adding not overriding', () => {
    tsp(
      <Panel className="foo" />
    )
    .render()
    .single('div.foo');
  });

  it('Should have unwrapped header', () => {
    tsp(
      <Panel>
        <Panel.Heading>Heading</Panel.Heading>
      </Panel>
    )
    .render()
    .single('div.panel-heading')
    .text().should.equal('Heading');
  });

  it('Should have custom component header', () => {
    tsp(
      <Panel>
        <Panel.Heading componentClass="h3">Heading</Panel.Heading>
      </Panel>
    )
    .render()
    .single('h3.panel-heading')
    .text().should.equal('Heading');
  });

  describe('<PanelTitle>', () => {
    it('Should render a title', () => {
      tsp(
        <Panel.Title>foo</Panel.Title>
      )
      .render()
      .single('div.panel-title')
      .text().should.equal('foo');
    });

    it('Should render a custom component', () => {
      tsp(
        <Panel.Title componentClass="h3">foo</Panel.Title>
      )
      .render()
      .single('h3.panel-title');
    });

    it('Should render with a toggle', () => {
      tsp(
        <Panel.Title toggle>foo</Panel.Title>
      )
      .render()
      .single('.panel-title > PanelToggle');
    });
  });

  describe('<PanelToggle>', () => {
    it('Should render a Toggle a SafeAnchor', () => {
      tsp(
        <Panel.Toggle>foo</Panel.Toggle>
      )
      .render()
      .single('SafeAnchor')
      .single('a[role=button][href=#]');
    });

    it('Should render a custom component', () => {
      tsp(
        <Panel.Toggle componentClass="h3">foo</Panel.Toggle>
      )
      .render()
      .single('h3');
    });

    it('Should trigger onToggle', (done) => {
      tsp(
        <Panel onToggle={() => done()}>
          <Panel.Toggle>foo</Panel.Toggle>
        </Panel>
      )
      .render()
      .single('PanelToggle')
      .trigger('click');
    });
  });

  it('Should have a footer', () => {
    tsp(
      <Panel>
        <Panel.Footer>foo</Panel.Footer>
      </Panel>
    )
    .render()
    .single('div.panel-footer');
  });

  it('Should have collapse classes', () => {
    tsp(
      <Panel defaultExpanded>
        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    )
    .render()
    .single('div.panel-collapse.collapse.in');
  });

  it('Should pass through dom properties', () => {
    tsp(
      <Panel id="testid">
        Panel content
      </Panel>
    )
    .render()
    .single('div#testid');
  });

  it('Should set ids on toggle and collapse', () => {
    const inst = tsp(
      <Panel id="testid">
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    )
    .render();

    inst.single('#testid--COLLAPSE.panel-collapse');
    inst.single('#testid--HEADING.panel-heading');
  });

  it('Should be open', () => {
    const inst = tsp(
      <Panel defaultExpanded>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    )
    .render();

    inst.single('.in.panel-collapse');
    inst.none('a.collapsed');
  });

  it('Should be closed', () => {
    const inst = tsp(
      <Panel defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    )
    .render();

    inst.none('.in.panel-collapse');
    inst.single('a.collapsed');
  });


  it('Should toggle when uncontrolled', () => {
    const inst = tsp(
      <Panel defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    )
    .render();

    inst.single('a').trigger('click');

    inst.find('* > *') // get pass controlled wrapper
      .props('expanded')
      .should.equal(true);
  });


  describe('Web Accessibility', () => {

    it('Should be aria-expanded=true', () => {
      tsp(
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      )
      .render()
      .single('.panel-title a[aria-expanded]');
    });

    it('Should be aria-expanded=false', () => {
      tsp(
        <Panel defaultExpanded={false}>
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      )
      .render()
      .single('.panel-title a')
      .none('[aria-expanded]');
    });

    it('Should add aria-controls with id', () => {
      const inst = tsp(
        <Panel id="testid">
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      )
      .render();

      inst.single('a[aria-controls=testid--COLLAPSE]');
      inst.single('.panel-collapse[aria-labelledby=testid--HEADING]');
    });
  });
});
