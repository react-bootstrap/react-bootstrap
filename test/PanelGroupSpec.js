import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import PanelGroup from '../src/PanelGroup';
import Panel from '../src/Panel';

describe('PanelGroup', () => {
  it('Should pass bsStyle to Panels', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default">
        <Panel>Panel 1</Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'default');
  });

  it('Should not override bsStyle on Panel', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default">
        <Panel bsStyle="primary">Panel 1</Panel>
      </PanelGroup>
    );

    let panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'primary');
  });

  it('Should not collapse panel by bubbling onSelect callback', () => {
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

  describe('Web Accessibility', () => {
    let instance, panelBodies, panelGroup, links;

    beforeEach(() => {
      instance = ReactTestUtils.renderIntoDocument(
        <PanelGroup defaultActiveKey='1' accordion>
          <Panel header='Collapsible Group Item #1' eventKey='1' id='Panel1ID'>Panel 1</Panel>
          <Panel header='Collapsible Group Item #2' eventKey='2' id='Panel2ID'>Panel 2</Panel>
        </PanelGroup>
      );
      let accordion = ReactTestUtils.findRenderedComponentWithType(instance, PanelGroup);
      panelGroup = ReactTestUtils.findRenderedDOMComponentWithClass(accordion, 'panel-group');
      panelBodies = ReactTestUtils.scryRenderedDOMComponentsWithClass(panelGroup, 'panel-collapse');
      links = ReactTestUtils.scryRenderedDOMComponentsWithClass(panelGroup, 'panel-heading')
        .map( header => ReactTestUtils.findRenderedDOMComponentWithTag(header, 'a') );
    });

    it('Should have a role of tablist', () => {
      assert.equal(panelGroup.props.role, 'tablist');
    });

    it('Should provide each header tab with role of tab', () => {
      assert.equal(links[0].props.role, 'tab');
      assert.equal(links[1].props.role, 'tab');
    });

    it('Should provide the panelBodies with role of tabpanel', () => {
      assert.equal(panelBodies[0].props.role, 'tabpanel');
    });

    it('Should provide each panel with an aria-labelledby referencing the corresponding header', () => {
      assert.equal(panelBodies[0].props.id, links[0].props['aria-controls']);
      assert.equal(panelBodies[1].props.id, links[1].props['aria-controls']);
    });

    it('Should maintain each tab aria-selected state', () => {
      assert.equal(links[0].props['aria-selected'], true);
      assert.equal(links[1].props['aria-selected'], false);
    });

    it('Should maintain each tab aria-hidden state', () => {
      assert.equal(panelBodies[0].props['aria-hidden'], false);
      assert.equal(panelBodies[1].props['aria-hidden'], true);
    });

    afterEach(() => {
      if (instance && ReactTestUtils.isCompositeComponent(instance) && instance.isMounted()) {
        React.unmountComponentAtNode(React.findDOMNode(instance));
      }
    });
  });
});
