import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Panel from '../src/Panel';
import PanelGroup from '../src/PanelGroup';

import { getOne } from './helpers';

describe('<PanelGroup>', () => {
  it('Should pass bsStyle to Panels', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default" id="test-id">
        <Panel>Panel 1</Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'default');
  });

  it('Should not override bsStyle on Panel', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default" id="test-id">
        <Panel bsStyle="primary">Panel 1</Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'primary');
  });

  it('Should not collapse panel by bubbling onSelect callback', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup accordion id="test-id">
        <Panel>
          <Panel.Body>
            <input type="text" className="changeme" />
          </Panel.Body>
        </Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.ok(panel.props.expanded);

    ReactTestUtils.Simulate.select(
      ReactTestUtils.findRenderedDOMComponentWithClass(panel, 'changeme')
    );

    assert.ok(panel.props.expanded);
  });

  it('Should obey onSelect handler', () => {

    let header = (
      <div>
        <span className="clickme">Click me</span>
        <span className="ignoreme">Ignore me</span>
      </div>
    );

    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup accordion onSelect={arg => arg} id="test-id">
        <Panel eventKey="1">
          <Panel.Heading>
            <Panel.Title toggle>
              {header}
            </Panel.Title>
          </Panel.Heading>
          <div>Panel body</div>
        </Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.notOk(panel.props.expanded);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(panel, 'clickme')
    );

    assert.ok(panel.props.expanded);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(panel, 'ignoreme')
    );

    assert.ok(panel.props.expanded);
  });

  describe('Web Accessibility', () => {
    let instance, panelBodies, panelGroup, links;

    beforeEach(() => {
      instance = ReactTestUtils.renderIntoDocument(
        <PanelGroup defaultActiveKey="1" id="test-id" accordion>
          <Panel eventKey="1" id="Panel1ID">
            <Panel.Heading>
              <Panel.Title toggle>
                Collapsible Group Item #1
              </Panel.Title>
            </Panel.Heading>
            Panel 1
          </Panel>
          <Panel eventKey="2" id="Panel2ID">
            <Panel.Heading>
              <Panel.Title toggle>
                Collapsible Group Item #2
              </Panel.Title>
            </Panel.Heading>
            Panel 2
          </Panel>
        </PanelGroup>
      );
      let accordion = ReactTestUtils.findRenderedComponentWithType(instance, PanelGroup);
      panelGroup = ReactTestUtils.findRenderedDOMComponentWithClass(accordion, 'panel-group');
      panelBodies = panelGroup.getElementsByClassName('panel-collapse');
      links = Array.from(panelGroup.getElementsByClassName('panel-heading'))
        .map(header => getOne(header.getElementsByTagName('a')));
    });

    it('Should have a role of tablist', () => {
      assert.equal(panelGroup.getAttribute('role'), 'tablist');
    });

    it('Should provide each header tab with role of button', () => {
      assert.equal(links[0].getAttribute('role'), 'button');
      assert.equal(links[1].getAttribute('role'), 'button');
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
      assert.equal(links[1].getAttribute('aria-expanded'), 'false');
    });

    it('Should maintain each tab aria-expanded state', () => {
      assert.equal(panelBodies[0].getAttribute('aria-expanded'), 'true');
      assert.equal(panelBodies[1].getAttribute('aria-expanded'), 'false');
    });
  });

  describe('Web Accessibility', () => {
    it('Should add aria-controls with id', () => {
      const instance = ReactTestUtils.renderIntoDocument(
        <PanelGroup id="panelgroup" accordion defaultActiveKey="1">
          <Panel id="panel-1" eventKey={1}>
            <Panel.Heading>
              <Panel.Title toggle>
                Heading
              </Panel.Title>
            </Panel.Heading>
            Panel content
          </Panel>
        </PanelGroup>
      );

      const collapse = ReactDOM.findDOMNode(instance).querySelector('.panel-collapse');
      const anchor = ReactDOM.findDOMNode(instance).querySelector('.panel-title a');

      assert.equal(collapse.getAttribute('id'), 'panelgroup-COLLAPSE-1');
      assert.equal(anchor.getAttribute('aria-controls'), 'panelgroup-COLLAPSE-1');
    });
  });
});
