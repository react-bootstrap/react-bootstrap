import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import Col from '../src/Col';
import Grid from '../src/Grid';
import Nav from '../src/Nav';
import NavItem from '../src/NavItem';
import Row from '../src/Row';
import Tab from '../src/Tab';
import Tabs from '../src/Tabs';

import ValidComponentChildren from '../src/utils/ValidComponentChildren';

import { render } from './helpers';

describe('Tabs', function () {
  it('Should show the correct tab', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs activeKey={1}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, Tab);

    assert.equal(panes[0].props.active, true);
    assert.equal(panes[1].props.active, false);

    let tabs = ReactTestUtils.findRenderedComponentWithType(instance, Tabs);

    assert.equal(tabs.refs.tabs.props.activeKey, 1);
  });

  it('Should only show the tabs with `Tab.props.title` set', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs activeKey={3}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab eventKey={2}>Tab 2 content</Tab>
        <Tab title="Tab 2" eventKey={3}>Tab 3 content</Tab>
      </Tabs>
    );

    let tabs = ReactTestUtils.findRenderedComponentWithType(instance, Tabs);

    assert.equal(ValidComponentChildren.numberOf(instance.refs.tabs.props.children), 2);
    assert.equal(tabs.refs.tabs.props.activeKey, 3);
  });

  it('Should allow tab to have React components', function () {
    let tabTitle = (
      <strong className="special-tab">Tab 2</strong>
    );
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs activeKey={2}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title={tabTitle} eventKey={2}>Tab 2 content</Tab>
      </Tabs>
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
      <Tabs onSelect={onSelect} activeKey={1}>
        <Tab title="Tab 1" eventKey='1'>Tab 1 content</Tab>
        <Tab title={tab2} eventKey='2'>Tab 2 content</Tab>
      </Tabs>
    );


    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab2')
    );
  });

  it('Should have children with the correct DOM properties', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs activeKey={1}>
        <Tab title="Tab 1" className="custom" id="pane0id" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, Tab);

    assert.ok(React.findDOMNode(panes[0]).className.match(/\bcustom\b/));
    assert.equal(React.findDOMNode(panes[0]).id, 'pane0id');
  });

  it('Should show the correct initial pane', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs defaultActiveKey={2}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let tabs = ReactTestUtils.findRenderedComponentWithType(instance, Tabs);

    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, Tab);

    assert.equal(panes[0].props.active, false);
    assert.equal(panes[1].props.active, true);

    assert.equal(tabs.refs.tabs.props.activeKey, 2);
  });

  it('Should show the correct first tab with no active key value', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let tabs = ReactTestUtils.findRenderedComponentWithType(instance, Tabs);
    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, Tab);

    assert.equal(panes[0].props.active, true);
    assert.equal(panes[1].props.active, false);

    assert.equal(tabs.refs.tabs.props.activeKey, 1);
  });

  it('Should show the correct first tab with `React.Children.map` children values', function () {
    let panes = [
      <div>Tab 1 content</div>,
      <div>Tab 2 content</div>
    ];
    let paneComponents = React.Children.map(panes, function(child, index) {
      return <Tab eventKey={index} tab={'Tab #' + index}>{child}</Tab>;
    });

    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs>
        {paneComponents}
        {null}
      </Tabs>
    );

    assert.equal(instance.refs.tabs.props.activeKey, 0);
  });

  it('Should show the correct tab when selected', function () {
    let tab1 = <span className="tab1">Tab 1</span>;
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs defaultActiveKey={2} animation={false}>
        <Tab title={tab1} eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let tabs = ReactTestUtils.findRenderedComponentWithType(instance, Tabs);
    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, Tab);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab1')
    );

    assert.equal(panes[0].props.active, true);
    assert.equal(panes[1].props.active, false);
    assert.equal(tabs.refs.tabs.props.activeKey, 1);
  });

  it('Should treat active key of null as nothing selected', function () {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs activeKey={null}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    expect(instance.getActiveKey()).to.not.exist;
  });

  it('Should pass default bsStyle (of "tabs") to Nav', function () {
    let instance = ReactTestUtils.renderIntoDocument(
        <Tabs defaultActiveKey={1} animation={false}>
          <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
          <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
        </Tabs>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-tabs'));
  });

  it('Should pass bsStyle to Nav', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs bsStyle="pills" defaultActiveKey={1} animation={false}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-pills'));
  });

  it('Should pass disabled to Nav', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs activeKey={1}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2} disabled={true}>Tab 2 content</Tab>
      </Tabs>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
  });

  it('Should not show content when clicking disabled tab', function () {
    let tab1 = <span className="tab1">Tab 1</span>;
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs defaultActiveKey={2} animation={false}>
        <Tab title={tab1} eventKey={1} disabled={true}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let tabs = ReactTestUtils.findRenderedComponentWithType(instance, Tabs);
    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, Tab);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab1')
    );

    assert.equal(panes[0].props.active, false);
    assert.equal(panes[1].props.active, true);
    assert.equal(tabs.refs.tabs.props.activeKey, 2);
  });


  describe('when the position prop is not provided', function() {
    let instance;

    beforeEach(function() {
      instance = ReactTestUtils.renderIntoDocument(
        <Tabs defaultActiveKey={1}>
          <Tab title="A Tab" eventKey={1}>Tab content</Tab>
        </Tabs>
      );
    });

    it('doesn\'t stack the tabs', function () {
      let nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);

      expect(nav.props.bsStyle).to.equal('tabs');
      expect(nav.props.stacked).to.not.be.ok;
    });

    it('doesn\'t apply column styling', function () {
      let tabs = instance.refs.tabs;
      let panes = instance.refs.panes;

      expect(React.findDOMNode(tabs).className).to.not.match(/\bcol\b/);
      expect(React.findDOMNode(panes).className).to.not.match(/\bcol\b/);
    });

    it('doesn\'t render grid elements', function () {
      const grids = ReactTestUtils.scryRenderedComponentsWithType(
        instance, Grid
      );
      const rows = ReactTestUtils.scryRenderedComponentsWithType(
        instance, Row
      );
      const cols = ReactTestUtils.scryRenderedComponentsWithType(
        instance, Col
      );

      expect(grids).to.be.empty;
      expect(rows).to.be.empty;
      expect(cols).to.be.empty;
    });
  });


  describe('when the position prop is "left"', function() {
    describe('when tabWidth is not provided', function() {
      let instance;

      beforeEach(function () {
        instance = ReactTestUtils.renderIntoDocument(
          <Tabs defaultActiveKey={1} position="left">
            <Tab title="A Tab" eventKey={1}>Tab content</Tab>
          </Tabs>
        );
      });

      it('Should stack the tabs', function () {
        let nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);

        expect(nav.props.bsStyle).to.equal('pills');
        expect(nav.props.stacked).to.be.ok;
      });

      it('Should have a left nav with a width of 2', function() {
        let tabs = instance.refs.tabs;
        let panes = instance.refs.panes;

        expect(React.findDOMNode(tabs).className).to.match(/\bcol-xs-2\b/);
        expect(React.findDOMNode(panes).className).to.match(/\bcol-xs-10\b/);
      });

      it('renders grid elements', function () {
        const grids = ReactTestUtils.scryRenderedComponentsWithType(
          instance, Grid
        );
        const rows = ReactTestUtils.scryRenderedComponentsWithType(
          instance, Row
        );
        const cols = ReactTestUtils.scryRenderedComponentsWithType(
          instance, Col
        );

        expect(grids).to.have.length(1);
        expect(rows).to.have.length(1);
        expect(cols).to.have.length(2);
      });
    });

    describe('when only tabWidth is provided', function() {
      it('Should have a left nav with the width that was provided', function() {
        let instance = ReactTestUtils.renderIntoDocument(
          <Tabs defaultActiveKey={1} position="left" tabWidth={3}>
            <Tab title="A Tab" eventKey={1}>Tab content</Tab>
          </Tabs>
        );

        let tabs = instance.refs.tabs;
        let panes = instance.refs.panes;

        expect(React.findDOMNode(tabs).className).to.match(/\bcol-xs-3\b/);
        expect(React.findDOMNode(panes).className).to.match(/\bcol-xs-9\b/);
      });
    });

    describe('when simple tabWidth and paneWidth are provided', function() {
      let instance;

      beforeEach(function () {
        instance = ReactTestUtils.renderIntoDocument(
          <Tabs position="left" tabWidth={4} paneWidth={7}>
            <Tab title="A Tab" eventKey={1}>Tab content</Tab>
          </Tabs>
        );
      });

      it('Should have the provided widths', function() {
        let tabs = instance.refs.tabs;
        let panes = instance.refs.panes;

        expect(React.findDOMNode(tabs).className).to.match(/\bcol-xs-4\b/);
        expect(React.findDOMNode(panes).className).to.match(/\bcol-xs-7\b/);
      });
    });

    describe('when complex tabWidth and paneWidth are provided', function() {
      let instance;

      beforeEach(function () {
        instance = ReactTestUtils.renderIntoDocument(
          <Tabs
            position="left"
            tabWidth={{xs: 4, md: 3}}
            paneWidth={{xs: 7, md: 8}}
          >
            <Tab title="A Tab" eventKey={1}>Tab content</Tab>
          </Tabs>
        );
      });

      it('Should have the provided widths', function() {
        let tabs = instance.refs.tabs;
        let panes = instance.refs.panes;

        expect(React.findDOMNode(tabs).className)
          .to.match(/\bcol-xs-4\b/).and.to.match(/\bcol-md-3\b/);
        expect(React.findDOMNode(panes).className)
          .to.match(/\bcol-xs-7\b/).and.to.match(/\bcol-md-8\b/);
      });
    });
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
      it(`should correctly set "active" after Tab is removed with "animation=${animation}"`, function() {
        let instance = render(
          <Tabs activeKey={2} animation={animation}>
            <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
            <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
          </Tabs>
        , mountPoint);

        let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, Tab);

        assert.equal(panes[0].props.active, false);
        assert.equal(panes[1].props.active, true);

        // second tab has been removed
        render(
          <Tabs activeKey={1} animation={animation}>
            <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
          </Tabs>
        , mountPoint);

        assert.equal(panes[0].props.active, true);
      });
    }

    checkTabRemovingWithAnimation(true);
    checkTabRemovingWithAnimation(false);
  });

  describe('Web Accessibility', function(){
    let instance;
    beforeEach(function(){
      instance = ReactTestUtils.renderIntoDocument(
        <Tabs defaultActiveKey={2} id='tabs'>
          <Tab id='pane-1' title="Tab 1" eventKey={1}>Tab 1 content</Tab>
          <Tab id='pane-2' title="Tab 2" eventKey={2}>Tab 2 content</Tab>
        </Tabs>
      );
    });

    it('Should generate ids from parent id', function () {
      let tabs = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

      tabs.every(tab =>
        assert.ok(tab.props['aria-controls'] && tab.props.linkId));
    });

    it('Should add aria-controls', function () {
      let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, Tab);

      assert.equal(panes[0].props['aria-labelledby'], 'pane-1___tab');
      assert.equal(panes[1].props['aria-labelledby'], 'pane-2___tab');
    });

    it('Should add aria-controls', function () {
      let tabs = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

      assert.equal(tabs[0].props['aria-controls'], 'pane-1');
      assert.equal(tabs[1].props['aria-controls'], 'pane-2');
    });

    it('Should add role=tablist to the nav', function () {
      let nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);

      assert.equal(nav.props.role, 'tablist');
    });

    it('Should add aria-selected to the nav item for the selected tab', function() {
      let tabs = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);
      let link1 = ReactTestUtils.findRenderedDOMComponentWithTag(tabs[0], 'a');
      let link2 = ReactTestUtils.findRenderedDOMComponentWithTag(tabs[1], 'a');

      assert.equal(link1.props['aria-selected'], false);
      assert.equal(link2.props['aria-selected'], true);
    });
  });

  it('Should not pass className to Nav', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs bsStyle="pills" defaultActiveKey={1} animation={false}>
        <Tab title="Tab 1" eventKey={1} className="my-tab-class">Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );
    let myTabClass = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-tab-class');
    let myNavItem = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'nav-pills')[0];
    assert.notDeepEqual(myTabClass, myNavItem);
  });

  it('Should pass className, Id, and style to Tabs', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs bsStyle="pills" defaultActiveKey={1} animation={false}
                  className="my-tabs-class" id="my-tabs-id" style={{opacity: 0.5}} />
    );
    assert.equal(React.findDOMNode(instance).getAttribute('class'), 'my-tabs-class');
    assert.equal(React.findDOMNode(instance).getAttribute('id'), 'my-tabs-id');
    assert.deepEqual(React.findDOMNode(instance).getAttribute('style'), 'opacity:0.5;');

  });
});
