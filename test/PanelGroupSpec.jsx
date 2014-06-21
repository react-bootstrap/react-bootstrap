/** @jsx React.DOM */
/*global describe, it, assert */

var ReactTestUtils = require('react/lib/ReactTestUtils');
var PanelGroup     = require('../cjs/PanelGroup');
var Panel          = require('../cjs/Panel');

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
});