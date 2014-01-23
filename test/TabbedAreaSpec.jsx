/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var TabbedArea     = require('../lib/TabbedArea');
var TabPane        = require('../lib/TabPane');

describe('TabbedArea', function () {
  it('Should show the correct tab', function () {
    var instance = (
        <TabbedArea activeKey={1}>
          <TabPane tab="Tab 1" key={1}>Tab 1 content</TabPane>
          <TabPane tab="Tab 2" key={2}>Tab 2 content</TabPane>
        </TabbedArea>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.refs.panes.getDOMNode().children[0].className.match(/\bopen\b/));
    assert.notOk(instance.refs.panes.getDOMNode().children[1].className.match(/\bopen\b/));
    assert.ok(instance.refs.tab1.getDOMNode().className.match(/\active\b/));
    assert.notOk(instance.refs.tab2.getDOMNode().className.match(/\active\b/));
  });

	it('Should only show the tabs with tab prop', function () {
    var instance = (
        <TabbedArea activeKey={3}>
          <TabPane tab="Tab 1" key={1}>Tab 1 content</TabPane>
          <TabPane key={2}>Tab 2 content</TabPane>
          <TabPane tab="Tab 2" key={3}>Tab 3 content</TabPane>
        </TabbedArea>
      );

    ReactTestUtils.renderIntoDocument(instance);
    var panes = instance.refs.panes.getDOMNode();
    assert.equal(panes.children.length, 3);
    assert.notOk(panes.children[0].className.match(/\bopen\b/));
    assert.notOk(panes.children[1].className.match(/\bopen\b/));
    assert.ok(panes.children[2].className.match(/\bopen\b/));
    var tabs = instance.refs.tabs.getDOMNode();
    assert.equal(tabs.children.length, 2);
    assert.notOk(tabs.children[0].className.match(/\active\b/));
    assert.ok(tabs.children[1].className.match(/\active\b/));
  });

	it('Should allow tab to have React components', function () {
    var tabTitle = (
      <strong>Tab 2</strong>
      );
    var instance = (
        <TabbedArea activeKey={3}>
          <TabPane tab="Tab 1" key={1}>Tab 1 content</TabPane>
          <TabPane tab={tabTitle} key={2}>Tab 2 content</TabPane>
        </TabbedArea>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance.refs.tab2, 'strong'));
  });

  it('Should call onSelect when tab is selected', function (done) {
    var onSelect = function (key) {
        assert.equal(key, 2);
        done();
      },
      instance = (
        <TabbedArea onSelect={onSelect} activeKey={1}>
          <TabPane tab="Tab 1" key={1}>Tab 1 content</TabPane>
          <TabPane tab="Tab 2" key={2}>Tab 2 content</TabPane>
        </TabbedArea>
      );

    ReactTestUtils.renderIntoDocument(instance);
    ReactTestUtils.Simulate.click(instance.refs.tab2.refs.button.getDOMNode());
  });

  it('Should have children with the correct props', function () {
    var instance = (
        <TabbedArea activeKey={1}>
          <TabPane tab="Tab 1" className="custom" id="pane0id" key={1}>Tab 1 content</TabPane>
          <TabPane tab="Tab 2" key={2}>Tab 2 content</TabPane>
        </TabbedArea>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.refs.panes.getDOMNode().children[0].className.match(/\bcustom\b/));
    assert.equal(instance.refs.panes.getDOMNode().children[0].id, 'pane0id');
    assert.equal(
      instance.refs.tab1.refs.button.getDOMNode().getAttribute('href'),
      '#pane0id'
    );
  });

});