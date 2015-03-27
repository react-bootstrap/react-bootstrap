import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import PanelGroup from '../src/PanelGroup';
import Panel from '../src/Panel';

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
      ReactTestUtils.findRenderedDOMComponentWithClass(panel, 'changeme').getDOMNode()
    );

    assert.notOk(panel.state.collapsing);
  });
});
