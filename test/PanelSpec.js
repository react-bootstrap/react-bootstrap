import React from 'react';

import { mount } from 'enzyme';

import Panel from '../src/Panel';

describe('<Panel>', () => {
  it('Should have class and body', () => {
    const inst = mount(
      <Panel>
        <Panel.Body>Panel content</Panel.Body>
      </Panel>
    );

    inst.assertSingle('div.panel.panel-default');
    inst.assertSingle('div.panel-body');
  });

  it('Should have bootstrap style class', () => {
    mount(
      <Panel bsStyle="primary">
        <Panel.Body>Panel content</Panel.Body>
      </Panel>
    ).assertSingle('div.panel-primary');
  });

  it('Should honor additional classes passed in; adding not overriding', () => {
    mount(<Panel className="foo" />).assertSingle('div.foo');
  });

  it('Should have unwrapped header', () => {
    mount(
      <Panel>
        <Panel.Heading>Heading</Panel.Heading>
      </Panel>
    )
      .assertSingle('div.panel-heading')
      .text()
      .should.equal('Heading');
  });

  it('Should have custom component header', () => {
    mount(
      <Panel>
        <Panel.Heading componentClass="h3">Heading</Panel.Heading>
      </Panel>
    )
      .assertSingle('h3.panel-heading')
      .text()
      .should.equal('Heading');
  });

  describe('<PanelTitle>', () => {
    it('Should render a title', () => {
      mount(<Panel.Title>foo</Panel.Title>)
        .assertSingle('div.panel-title')
        .text()
        .should.equal('foo');
    });

    it('Should render a custom component', () => {
      mount(<Panel.Title componentClass="h3">foo</Panel.Title>).assertSingle(
        'h3.panel-title'
      );
    });

    it('Should render with a toggle', () => {
      mount(<Panel.Title toggle>foo</Panel.Title>).assertSingle(
        '.panel-title > PanelToggle'
      );
    });
  });

  describe('<PanelToggle>', () => {
    it('Should render a Toggle a SafeAnchor', () => {
      mount(<Panel.Toggle>foo</Panel.Toggle>)
        .assertSingle('SafeAnchor')
        .assertSingle('a[role="button"][href="#"]');
    });

    it('Should render a custom component', () => {
      mount(<Panel.Toggle componentClass="h3">foo</Panel.Toggle>).assertSingle(
        'h3'
      );
    });

    it('Should simulate onToggle', done => {
      mount(
        <Panel onToggle={() => done()}>
          <Panel.Toggle>foo</Panel.Toggle>
        </Panel>
      )
        .assertSingle('PanelToggle')
        .simulate('click');
    });
  });

  it('Should have a footer', () => {
    mount(
      <Panel>
        <Panel.Footer>foo</Panel.Footer>
      </Panel>
    ).assertSingle('div.panel-footer');
  });

  it('Should have collapse classes', () => {
    mount(
      <Panel defaultExpanded>
        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    ).assertSingle('div.panel-collapse.collapse.in');
  });

  it('Should pass through dom properties', () => {
    mount(<Panel id="testid">Panel content</Panel>).assertSingle('div#testid');
  });

  it('Should set ids on toggle and collapse', () => {
    const inst = mount(
      <Panel id="testid">
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    inst.assertSingle('#testid--body.panel-collapse');
    inst.assertSingle('#testid--heading.panel-heading');
  });

  it('Should be open', () => {
    const inst = mount(
      <Panel defaultExpanded>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    inst.assertSingle('.in.panel-collapse');
    inst.assertNone('a.collapsed');
  });

  it('Should be closed', () => {
    const inst = mount(
      <Panel defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    inst.assertNone('.in.panel-collapse');
    inst.assertSingle('a.collapsed');
  });

  it('Should toggle when uncontrolled', () => {
    const inst = mount(
      <Panel defaultExpanded={false}>
        <Panel.Heading>
          <Panel.Title toggle>foo</Panel.Title>
        </Panel.Heading>

        <Panel.Body collapsible>Panel content</Panel.Body>
      </Panel>
    );

    inst.assertSingle('a').simulate('click');

    inst
      .children() // get pass controlled wrapper
      .prop('expanded')
      .should.equal(true);
  });

  describe('Web Accessibility', () => {
    it('Should be aria-expanded=true', () => {
      mount(
        <Panel defaultExpanded>
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      ).assertSingle('.panel-title a[aria-expanded=true]');
    });

    it('Should be aria-expanded=false', () => {
      mount(
        <Panel defaultExpanded={false}>
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      )
        .assertSingle('.panel-title a')
        .assertSingle('[aria-expanded=false]');
    });

    it('Should add aria-controls with id', () => {
      const inst = mount(
        <Panel id="testid">
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel content</Panel.Body>
        </Panel>
      );

      inst.assertSingle('a[aria-controls="testid--body"]');
      inst.assertSingle('.panel-collapse[aria-labelledby="testid--heading"]');
    });
  });
});
