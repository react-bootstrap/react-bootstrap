import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import TabbedArea from '../src/TabbedArea';
import NavItem from '../src/NavItem';
import TabPane from '../src/TabPane';
import ValidComponentChildren from '../src/utils/ValidComponentChildren';
import { render } from './helpers';

describe('TabbedArea', function () {
  it('Should show the correct tab', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea activeKey={1}>
        <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    assert.equal(panes[0].props.active, true);
    assert.equal(panes[1].props.active, false);

    let tabbedArea = ReactTestUtils.findRenderedComponentWithType(instance, TabbedArea);

    assert.equal(tabbedArea.refs.tabs.props.activeKey, 1);
  });

  it('Should only show the tabs with `TabPane.props.tab` set', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea activeKey={3}>
        <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
        <TabPane eventKey={2}>Tab 2 content</TabPane>
        <TabPane tab="Tab 2" eventKey={3}>Tab 3 content</TabPane>
      </TabbedArea>
    );

    let tabbedArea = ReactTestUtils.findRenderedComponentWithType(instance, TabbedArea);

    assert.equal(ValidComponentChildren.numberOf(instance.refs.tabs.props.children), 2);
    assert.equal(tabbedArea.refs.tabs.props.activeKey, 3);
  });

  it('Should allow tab to have React components', function () {
    let tabTitle = (
      <strong className="special-tab">Tab 2</strong>
    );
    let instance = ReactTestUtils.renderIntoDocument(
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

    let tab2 = <span className="tab2">Tab2</span>;
    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea onSelect={onSelect} activeKey={1}>
        <TabPane tab="Tab 1" eventKey='1'>Tab 1 content</TabPane>
        <TabPane tab={tab2} eventKey='2'>Tab 2 content</TabPane>
      </TabbedArea>
    );


    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab2')
    );
  });

  it('Should have children with the correct DOM properties', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea activeKey={1}>
        <TabPane tab="Tab 1" className="custom" id="pane0id" eventKey={1}>Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    assert.ok(React.findDOMNode(panes[0]).className.match(/\bcustom\b/));
    assert.equal(React.findDOMNode(panes[0]).id, 'pane0id');
  });

  it('Should show the correct initial pane', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea defaultActiveKey={2}>
        <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    let tabbedArea = ReactTestUtils.findRenderedComponentWithType(instance, TabbedArea);

    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    assert.equal(panes[0].props.active, false);
    assert.equal(panes[1].props.active, true);

    assert.equal(tabbedArea.refs.tabs.props.activeKey, 2);
  });

  it('Should show the correct first tab with no active key value', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea>
        <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    let tabbedArea = ReactTestUtils.findRenderedComponentWithType(instance, TabbedArea);
    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    assert.equal(panes[0].props.active, true);
    assert.equal(panes[1].props.active, false);

    assert.equal(tabbedArea.refs.tabs.props.activeKey, 1);
  });

  it('Should show the correct first tab with `React.Children.map` children values', function () {
    let panes = [
      <div>Tab 1 content</div>,
      <div>Tab 2 content</div>
    ];
    let paneComponents = React.Children.map(panes, function(child, index) {
      return <TabPane eventKey={index} tab={'Tab #' + index}>{child}</TabPane>;
    });

    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea>
        {paneComponents}
        {null}
      </TabbedArea>
    );

    assert.equal(instance.refs.tabs.props.activeKey, 0);
  });

  it('Should show the correct tab when selected', function () {
    let tab1 = <span className="tab1">Tab 1</span>;
    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea defaultActiveKey={2} animation={false}>
        <TabPane tab={tab1} eventKey={1}>Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    let tabbedArea = ReactTestUtils.findRenderedComponentWithType(instance, TabbedArea);
    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab1')
    );

    assert.equal(panes[0].props.active, true);
    assert.equal(panes[1].props.active, false);
    assert.equal(tabbedArea.refs.tabs.props.activeKey, 1);
  });

  it('Should pass default bsStyle (of "tabs") to Nav', function () {
    let instance = ReactTestUtils.renderIntoDocument(
        <TabbedArea defaultActiveKey={1} animation={false}>
          <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
          <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
        </TabbedArea>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-tabs'));
  });

  it('Should pass bsStyle to Nav', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea bsStyle="pills" defaultActiveKey={1} animation={false}>
        <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-pills'));
  });

  it('Should pass className to rendered Tab NavItem', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea activeKey={3}>
        <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
        <TabPane className="pull-right" tab="Tab 2" eventKey={3}>Tab 3 content</TabPane>
      </TabbedArea>
    );

    let tabPane = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    assert.equal(tabPane.length, 2);
    assert.equal(React.findDOMNode(tabPane[1]).getAttribute('class').match(/pull-right/)[0], 'pull-right');
  });

  it('Should pass disabled to NavItem', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea activeKey={1}>
        <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2} disabled={true}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
  });

  it('Should not show content when clicking disabled tab', function () {
    let tab1 = <span className="tab1">Tab 1</span>;
    let instance = ReactTestUtils.renderIntoDocument(
      <TabbedArea defaultActiveKey={2} animation={false}>
        <TabPane tab={tab1} eventKey={1} disabled={true}>Tab 1 content</TabPane>
        <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
      </TabbedArea>
    );

    let tabbedArea = ReactTestUtils.findRenderedComponentWithType(instance, TabbedArea);
    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab1')
    );

    assert.equal(panes[0].props.active, false);
    assert.equal(panes[1].props.active, true);
    assert.equal(tabbedArea.refs.tabs.props.activeKey, 2);
  });

  describe('animation', function () {
    let mountPoint;

    beforeEach(()=>{
      mountPoint = document.createElement('div');
      document.body.appendChild(mountPoint);
    });

    afterEach(function () {
      React.unmountComponentAtNode(mountPoint);
      document.body.removeChild(mountPoint);
    });

    function checkTabRemovingWithAnimation(animation) {
      it(`should correctly set "active" after tabPane is removed with "animation=${animation}"`, function() {
        let instance = render(
          <TabbedArea activeKey={2} animation={animation}>
            <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
            <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
          </TabbedArea>
        , mountPoint);

        let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

        assert.equal(panes[0].props.active, false);
        assert.equal(panes[1].props.active, true);

        // second tab has been removed
        render(
          <TabbedArea activeKey={1} animation={animation}>
            <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
          </TabbedArea>
        , mountPoint);

        assert.equal(panes[0].props.active, true);
      });
    }

    checkTabRemovingWithAnimation(true);
    checkTabRemovingWithAnimation(false);
  });

  describe('Web Accessibility', function(){

    it('Should generate ids from parent id', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <TabbedArea defaultActiveKey={2} id='tabs'>
          <TabPane tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
          <TabPane tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
        </TabbedArea>
      );

      let tabs = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

      tabs.every(tab =>
        assert.ok(tab.props['aria-controls'] && tab.props.linkId));
    });

    it('Should add aria-controls', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <TabbedArea defaultActiveKey={2} id='tabs'>
          <TabPane id='pane-1' tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
          <TabPane id='pane-2' tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
        </TabbedArea>
      );

      let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

      assert.equal(panes[0].props['aria-labelledby'], 'pane-1___tab');
      assert.equal(panes[1].props['aria-labelledby'], 'pane-2___tab');
    });

    it('Should add aria-controls', function () {
      let instance = ReactTestUtils.renderIntoDocument(
        <TabbedArea defaultActiveKey={2} id='tabs'>
          <TabPane id='pane-1' tab="Tab 1" eventKey={1}>Tab 1 content</TabPane>
          <TabPane id='pane-2' tab="Tab 2" eventKey={2}>Tab 2 content</TabPane>
        </TabbedArea>
      );

      let tabs = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

      assert.equal(tabs[0].props['aria-controls'], 'pane-1');
      assert.equal(tabs[1].props['aria-controls'], 'pane-2');
    });

  });
});
