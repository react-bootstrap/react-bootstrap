/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React      = require('react/addons');
var TabbedArea = require('../lib/TabbedArea');
var TabPane    = require('../lib/TabPane');

var ReactTestUtils;

describe('TabbedArea', function () {
  beforeEach(function() {
    ReactTestUtils = React.addons.ReactTestUtils;
  });

  it('Should show the correct tab initially', function () {
    var instance = (
        <TabbedArea activeIndex={0}>
          <TabPane tab="Tab 1">Tab 1 content</TabPane>
          <TabPane tab="Tab 2">Tab 2 content</TabPane>
        </TabbedArea>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert(instance.refs.pane0.getDOMNode().className.match(/\bopen\b/));
    assert(!instance.refs.pane1.getDOMNode().className.match(/\bopen\b/));
    assert(instance.refs.tab0.getDOMNode().className.match(/\active\b/));
    assert(!instance.refs.tab1.getDOMNode().className.match(/\active\b/));
  });

  it('Should call onSelect when tab is selected', function (done) {
    var onSelect = function (index) {
        assert.equal(index, 1);
        done();
      },
      instance = (
        <TabbedArea onSelect={onSelect} activeIndex={0}>
          <TabPane tab="Tab 1">Tab 1 content</TabPane>
          <TabPane tab="Tab 2">Tab 2 content</TabPane>
        </TabbedArea>
      );

    ReactTestUtils.renderIntoDocument(instance);

    ReactTestUtils.Simulate.click(instance.refs.tab1.refs.button.getDOMNode());
  });

  it('should have children with the correct props', function () {
    var instance = (
        <TabbedArea activeIndex={0}>
          <TabPane tab="Tab 1" className="custom" id="pane0id">Tab 1 content</TabPane>
          <TabPane tab="Tab 2">Tab 2 content</TabPane>
        </TabbedArea>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert(instance.refs.pane0.getDOMNode().className.match(/\bcustom\b/));
    assert.equal(instance.refs.pane0.getDOMNode().id, 'pane0id');
    assert.equal(
      instance.refs.tab0.refs.button.getDOMNode().getAttribute('href'),
      '#pane0id'
    );
  });

});