/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var PanelGroup     = require('../lib/PanelGroup');
var Panel          = require('../lib/Panel');

describe('PanelGroup', function () {
  it('Should pass bsStyle to Panels', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default">
        <Panel>Panel 1</Panel>
      </PanelGroup>
    );

    var panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'default');
  });

  it('Should not override bsStyle on Panel', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup bsStyle="default">
        <Panel bsStyle="primary">Panel 1</Panel>
      </PanelGroup>
    );

    var panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.equal(panel.props.bsStyle, 'primary');
  });

  it('Should not collapse panel by bubbling onSelect callback', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <PanelGroup accordion>
        <Panel>
          <input type="text" className="changeme" />
        </Panel>
      </PanelGroup>
    );

    var panel = ReactTestUtils.findRenderedComponentWithType(instance, Panel);

    assert.notOk(panel.state.collapsing);

    ReactTestUtils.Simulate.select(
      ReactTestUtils.findRenderedDOMComponentWithClass(panel, 'changeme').getDOMNode()
    );

    assert.notOk(panel.state.collapsing);
  });
});
