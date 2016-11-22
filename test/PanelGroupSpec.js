import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';

import tsp from 'teaspoon';

import Panel from '../src/Panel';
import PanelGroup from '../src/PanelGroup';

describe('<PanelGroup>', () => {
  it('Should pass bsStyle to Panels', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default" id="panel">
        <Panel>Panel 1</Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'default');
  });

  it('Should not override bsStyle on Panel', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default" id="panel">
        <Panel bsStyle="primary">Panel 1</Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'primary');
  });

  it('Should not collapse panel by bubbling onSelect callback', () => {
    tsp(
      <PanelGroup accordion id="panel" onSelect={() => { throw new Error(); }}>
        <Panel>
          <input type="text" className="changeme" />
        </Panel>
      </PanelGroup>
    )
    .render()
    .single('input.changeme')
    .trigger('select');
  });

  it('Should call onSelect handler with eventKey', (done) => {
    function handleSelect(eventKey, e) {
      e.should.exist;
      eventKey.should.equal('1');
      done();
    }

    tsp(
      <PanelGroup accordion onSelect={handleSelect} id="panel">
        <Panel eventKey="1">
          <Panel.Heading>
            <Panel.Title toggle>foo</Panel.Title>
          </Panel.Heading>

          <div>Panel body</div>
        </Panel>
      </PanelGroup>
    )
    .render()
    .find('a')
    .trigger('click');
  });

  describe('Web Accessibility', () => {
    let panelBodies, panelGroup, headers, links;

    beforeEach(() => {
      const inst = tsp(
        <PanelGroup accordion defaultActiveKey="1" id="panel">
          <Panel eventKey="1">
            <Panel.Heading>
              <Panel.Title toggle>foo</Panel.Title>
            </Panel.Heading>

            Panel 1
          </Panel>
          <Panel eventKey="2">
            <Panel.Heading>
              <Panel.Title toggle>foo</Panel.Title>
            </Panel.Heading>

            Panel 2
          </Panel>
        </PanelGroup>
      )
      .render();

      panelGroup = inst.dom();
      panelBodies = inst.find('.panel-collapse').dom();
      headers = inst.find('.panel-heading').dom();
      links = inst.find('.panel-heading a').dom();
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
