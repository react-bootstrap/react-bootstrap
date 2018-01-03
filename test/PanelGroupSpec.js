import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';

import { mount } from 'enzyme';

import Panel from '../src/Panel';
import PanelGroup from '../src/PanelGroup';

describe('<PanelGroup>', () => {
  it('Should pass bsStyle to Panels', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default" id="panel">
        <Panel>
          <Panel.Body>Panel 1</Panel.Body>
        </Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'default');
  });

  it('Should not override bsStyle on Panel', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default" id="panel">
        <Panel bsStyle="primary">
          <Panel.Body>Panel 1</Panel.Body>
        </Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'primary');
  });

  it('Should not collapse panel by bubbling onSelect callback', () => {
    mount(
      <PanelGroup
        accordion
        id="panel"
        onSelect={() => {
          throw new Error();
        }}
      >
        <Panel>
          <input type="text" className="changeme" />
        </Panel>
      </PanelGroup>
    )
      .assertSingle('input.changeme')
      .simulate('select');
  });

  it('Should call onSelect handler with eventKey', done => {
    function handleSelect(eventKey, e) {
      e.should.exist;
      eventKey.should.equal('1');
      done();
    }

    mount(
      <PanelGroup accordion onSelect={handleSelect} id="panel">
        <Panel eventKey="1">
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <Panel.Body collapsible>Panel 1</Panel.Body>
        </Panel>
      </PanelGroup>
    )
      .find('a')
      .simulate('click');
  });

  describe('Web Accessibility', () => {
    let panelBodies, panelGroup, headers, links; // eslint-disable-line

    beforeEach(() => {
      const inst = mount(
        <PanelGroup accordion defaultActiveKey="1" id="panel">
          <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>foo</Panel.Title>
            </Panel.Heading>

            <Panel.Body collapsible>Panel 1</Panel.Body>
          </Panel>
          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle>foo</Panel.Title>
            </Panel.Heading>

            <Panel.Body collapsible>Panel 2</Panel.Body>
          </Panel>
        </PanelGroup>
      );

      panelGroup = inst.getDOMNode();
      panelBodies = inst.find('.panel-collapse').map(n => n.getDOMNode());
      headers = inst.find('.panel-heading').map(n => n.getDOMNode());
      links = inst.find('.panel-heading a').map(n => n.getDOMNode());
    });

    it('Should have a role of tablist', () => {
      assert.equal(panelGroup.getAttribute('role'), 'tablist');
    });

    it('Should provide each header tab with role of tab', () => {
      assert.equal(headers[0].getAttribute('role'), 'tab');
      assert.equal(headers[1].getAttribute('role'), 'tab');
    });

    it('Should provide the panelBodies with role of tabpanel', () => {
      assert.equal(panelBodies[0].getAttribute('role'), 'tabpanel');
    });

    it('Should provide each panel with an aria-labelledby referencing the corresponding header', () => {
      assert.equal(panelBodies[0].id, links[0].getAttribute('aria-controls'));
      assert.equal(panelBodies[1].id, links[1].getAttribute('aria-controls'));
    });

    it('Should maintain each tab aria-expanded state', () => {
      assert.equal(links[0].getAttribute('aria-expanded'), 'true');
      assert.equal(panelBodies[0].getAttribute('aria-expanded'), 'true');

      assert.equal(links[1].getAttribute('aria-expanded'), 'false');
      assert.equal(panelBodies[1].getAttribute('aria-expanded'), 'false');
    });
  });
});
