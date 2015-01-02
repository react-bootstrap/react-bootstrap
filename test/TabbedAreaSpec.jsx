/*global describe, beforeEach, afterEach, it, assert */

var React                  = require('react');
var ReactTestUtils         = require('react/lib/ReactTestUtils');
var TabbedArea             = require('../lib/TabbedArea');
var TabPane                = require('../lib/TabPane');
var ValidComponentChildren = require('../lib/utils/ValidComponentChildren');

describe('TabbedArea', function () {
  it('Should show the correct tab', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea activeKey={1}>
        <TabPane tab="Tab 1" eventKey={1} ref="pane1">Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2} ref="pane2">Tab 2 content</TabPane>
      </TabbedArea>
    );

    assert.equal(instance.refs.pane1.props.active, true);
    assert.equal(instance.refs.pane2.props.active, false);

    assert.equal(instance.refs.tabs.props.activeKey, 1);
  });

  it('Should only show the tabs with `TabPane.props.tab` set', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea activeKey={3}>
        <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
        <TabPane eventKey={2}>Tab 2 content</TabPane>
        <TabPane tab="Tab 2" eventKey={3}>Tab 3 content</TabPane>
      </TabbedArea>
    );

    assert.equal(ValidComponentChildren.numberOf(instance.refs.tabs.props.children), 2);
    assert.equal(instance.refs.tabs.props.activeKey, 3);
  });

  it('Should allow tab to have React components', function () {
    var tabTitle = (
      <strong className="special-tab">Tab 2</strong>
    );
    var instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea activeKey={2}>
        <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
        <TabPane tab={tabTitle} eventKey={2}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.tabs, 'special-tab'));
  });

  it('Should call onSelect when tab is selected', function (done) {
    function onSelect(key) {
      assert.equal(key, '2');
      done();
    }

    var tab2 = <span className="tab2">Tab2</span>;
    var instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea onSelect={onSelect} activeKey={1}>
        <TabPane tab="Tab 1" eventKey='1'>Tab 1 content</TabPane>
        <TabPane tab={tab2} eventKey='2' ref="tab2">Tab 2 content</TabPane>
      </TabbedArea>
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab2')
    );
  });

  it('Should have children with the correct DOM properties', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea activeKey={1}>
        <TabPane tab="Tab 1" className="custom" id="pane0id" eventKey={1} ref="pane1">Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    assert.ok(instance.refs.pane1.getDOMNode().className.match(/\bcustom\b/));
    assert.equal(instance.refs.pane1.getDOMNode().id, 'pane0id');
  });

  it('Should show the correct initial pane', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea defaultActiveKey={2}>
        <TabPane tab="Tab 1" eventKey={1} ref="pane1">Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2} ref="pane2">Tab 2 content</TabPane>
      </TabbedArea>
    );

    assert.equal(instance.refs.pane1.props.active, false);
    assert.equal(instance.refs.pane2.props.active, true);

    assert.equal(instance.refs.tabs.props.activeKey, 2);
  });

  it('Should show the correct first tab with no active key value', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea>
        <TabPane tab="Tab 1" eventKey={1} ref="pane1">Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2} ref="pane2">Tab 2 content</TabPane>
      </TabbedArea>
    );

    assert.equal(instance.refs.pane1.props.active, true);
    assert.equal(instance.refs.pane2.props.active, false);

    assert.equal(instance.refs.tabs.props.activeKey, 1);
  });

  it('Should show the correct first tab with `React.Children.map` children values', function () {
    var panes = [
      <div>Tab 1 content</div>,
      <div>Tab 2 content</div>
    ];
    var paneComponents = React.Children.map(panes, function(child, index) {
      return <TabPane eventKey={index} tab={'Tab #' + index}>{child}</TabPane>;
    });

    var instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea>
        {paneComponents}
        {null}
      </TabbedArea>
    );

    assert.equal(instance.refs.tabs.props.activeKey, 0);
  });

  it('Should show the correct tab when selected', function () {
    var tab1 = <span className="tab1">Tab 1</span>;
    var instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea defaultActiveKey={2} animation={false}>
        <TabPane tab={tab1} eventKey={1} ref="pane1">Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2} ref="pane2">Tab 2 content</TabPane>
      </TabbedArea>
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab1')
    );

    assert.equal(instance.refs.pane1.props.active, true);
    assert.equal(instance.refs.pane2.props.active, false);
    assert.equal(instance.refs.tabs.props.activeKey, 1);
  });

  it('Should pass default bsStyle (of "tabs") to Nav', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea defaultActiveKey={1} animation={false}>
        <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-tabs'));
  });

  it('Should pass bsStyle to Nav', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea bsStyle="pills" defaultActiveKey={1} animation={false}>
        <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-pills'));
  });
});
