import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import Panel from '../src/Panel';
import PanelGroup from '../src/PanelGroup';

import {getOne} from './helpers';

describe('PanelGroup', function () {
  it('Should pass bsStyle to Panels', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default">
        <Panel>Panel 1</Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'default');
  });

  it('Should not override bsStyle on Panel', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default">
        <Panel bsStyle="primary">Panel 1</Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'primary');
  });

  it('Should not collapse panel by bubbling onSelect callback', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup accordion>
        <Panel>
          <input type="text" className="changeme" />
        </Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.notOk(panel.state.collapsing);

    ReactTestUtils.Simulate.select(
      ReactTestUtils.findRenderedDOMComponentWithClass(panel, 'changeme')
    );

    assert.notOk(panel.state.collapsing);
  });

  describe('Web Accessibility', function() {
    let instance, panelBodies, panelGroup, links;

    beforeEach(function() {
      instance = ReactTestUtils.renderIntoDocument(
        <PanelGroup defaultActiveKey='1' accordion>
          <Panel header='Collapsible Group Item #1' eventKey='1' id='Panel1ID'>Panel 1</Panel>
          <Panel header='Collapsible Group Item #2' eventKey='2' id='Panel2ID'>Panel 2</Panel>
        </PanelGroup>
      );
      let accordion = ReactTestUtils.findRenderedComponentWithType(instance, PanelGroup);
      panelGroup = ReactTestUtils.findRenderedDOMComponentWithClass(accordion, 'panel-group');
      panelBodies = panelGroup.getElementsByClassName('panel-collapse');
      links = Array.from(panelGroup.getElementsByClassName('panel-heading'))
        .map(function(header) {
          return getOne(header.getElementsByTagName('a'));
        });
    });

    it('Should have a role of tablist', function() {
      assert.equal(panelGroup.getAttribute('role'), 'tablist');
    });

    it('Should provide each header tab with role of tab', function() {
      assert.equal(links[0].getAttribute('role'), 'tab');
      assert.equal(links[1].getAttribute('role'), 'tab');
    });

    it('Should provide the panelBodies with role of tabpanel', function() {
      assert.equal(panelBodies[0].getAttribute('role'), 'tabpanel');
    });

    it('Should provide each panel with an aria-labelledby referencing the corresponding header', function() {
      assert.equal(panelBodies[0].id, links[0].getAttribute('aria-controls'));
      assert.equal(panelBodies[1].id, links[1].getAttribute('aria-controls'));
    });

    it('Should maintain each tab aria-selected state', function() {
      assert.equal(links[0].getAttribute('aria-selected'), 'true');
      assert.equal(links[1].getAttribute('aria-selected'), 'false');
    });

    it('Should maintain each tab aria-hidden state', function() {
      assert.equal(panelBodies[0].getAttribute('aria-hidden'), 'false');
      assert.equal(panelBodies[1].getAttribute('aria-hidden'), 'true');
    });
  });
});
