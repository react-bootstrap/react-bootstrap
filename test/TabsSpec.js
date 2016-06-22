import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Col from '../src/Col';
import Nav from '../src/Nav';
import NavItem from '../src/NavItem';
import Tab from '../src/Tab';
import TabPane from '../src/TabPane';
import Tabs from '../src/Tabs';

import ValidComponentChildren from '../src/utils/ValidComponentChildren';

import { render, shouldWarn } from './helpers';

describe('Tabs', () => {
  it('Should show the correct tab', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    assert.ok(ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/));
    assert.ok(!ReactDOM.findDOMNode(panes[1]).className.match(/\bactive\b/));

    let tabs = instance.refs.inner;

    assert.equal(tabs.refs.tabs.context.$bs_tabcontainer.activeKey, 1);
  });

  it('Should only show the tabs with `Tab.props.title` set', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' defaultActiveKey={3}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab eventKey={2}>Tab 2 content</Tab>
        <Tab title="Tab 2" eventKey={3}>Tab 3 content</Tab>
      </Tabs>
    );

    let tabs = instance.refs.inner.refs.tabs;

    assert.equal(ValidComponentChildren.count(tabs.props.children), 2);
  });

  it('Should allow tab to have React components', () => {
    let tabTitle = (
      <strong className="special-tab">Tab 2</strong>
    );
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' defaultActiveKey={2}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title={tabTitle} eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.inner.refs.tabs, 'special-tab'));
  });

  it('Should call onSelect when tab is selected', (done) => {
    function onSelect(key) {
      assert.equal(key, '2');
      done();
    }

    let tab2 = <span className="tab2">Tab2</span>;
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' onSelect={onSelect} activeKey={1}>
        <Tab title="Tab 1" eventKey='1'>Tab 1 content</Tab>
        <Tab title={tab2} eventKey='2'>Tab 2 content</Tab>
      </Tabs>
    );


    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab2')
    );
  });

  it('Should have children with the correct DOM properties', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' defaultActiveKey={1}>
        <Tab title="Tab 1" className="custom" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" tabClassName="tcustom" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, Tab);
    let navs = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

    assert.ok(ReactDOM.findDOMNode(panes[0]).className.match(/\bcustom\b/));
    assert.ok(ReactDOM.findDOMNode(navs[1]).className.match(/\btcustom\b/));
    assert.equal(ReactDOM.findDOMNode(panes[0]).id, 'test-pane-1');
  });

  it('Should show the correct first tab with no active key value', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test'>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    assert.ok(ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/));
    assert.ok(!ReactDOM.findDOMNode(panes[1]).className.match(/\bactive\b/));

    let tabs = instance.refs.inner;

    assert.equal(tabs.refs.tabs.context.$bs_tabcontainer.activeKey, 1);
  });

  it('Should show the correct first tab with `React.Children.map` children values', () => {
    let panes = [
      <div>Tab 1 content</div>,
      <div>Tab 2 content</div>
    ];
    let paneComponents = React.Children.map(panes, (child, index) => {
      return <Tab eventKey={index} tab={'Tab #' + index}>{child}</Tab>;
    });

    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test'>
        {paneComponents}
        {null}
      </Tabs>
    );

    assert.equal(instance.refs.inner.refs.tabs.context.$bs_tabcontainer.activeKey, 0);
  });

  it('Should show the correct tab when selected', () => {
    let tab1 = <span className="tab1">Tab 1</span>;
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' defaultActiveKey={2} animation={false}>
        <Tab title={tab1} eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let tabs = instance.refs.inner;
    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab1')
    );

    assert.ok(ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/));
    assert.ok(!ReactDOM.findDOMNode(panes[1]).className.match(/\bactive\b/));

    assert.equal(tabs.refs.tabs.context.$bs_tabcontainer.activeKey, 1);
  });

  it('Should mount initial tab and no others when unmountOnExit is true and animation is false', () => {
    let tab1 = <span className="tab1">Tab 1</span>;
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' defaultActiveKey={1} animation={false} unmountOnExit={true}>
        <Tab title={tab1} eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
        <Tab title="Tab 3" eventKey={3}>Tab 3 content</Tab>
      </Tabs>
    );

    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    expect(ReactDOM.findDOMNode(panes[0])).to.exist;
    expect(ReactDOM.findDOMNode(panes[1])).to.not.exist;
    expect(ReactDOM.findDOMNode(panes[2])).to.not.exist;
  });

  it('Should mount the correct tab when selected and unmount the previous when unmountOnExit is true and animation is false', () => {
    let tab1 = <span className="tab1">Tab 1</span>;
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' defaultActiveKey={2} animation={false} unmountOnExit={true}>
        <Tab title={tab1} eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let tabs = instance.refs.inner;
    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab1')
    );

    expect(ReactDOM.findDOMNode(panes[0])).to.exist;
    expect(ReactDOM.findDOMNode(panes[1])).to.not.exist;

    assert.equal(tabs.refs.tabs.context.$bs_tabcontainer.activeKey, 1);
  });

  it('Should treat active key of null as nothing selected', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' activeKey={null} onSelect={()=>{}}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    expect(instance.refs.inner.getActiveKey()).to.not.exist;
  });

  it('Should pass default bsStyle (of "tabs") to Nav', () => {
    let instance = ReactTestUtils.renderIntoDocument(
        <Tabs id='test' defaultActiveKey={1} animation={false}>
          <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
          <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
        </Tabs>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-tabs'));
  });

  it('Should pass bsStyle to Nav', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' bsStyle="pills" defaultActiveKey={1} animation={false}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-pills'));
  });

  it('Should pass disabled to Nav', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2} disabled={true}>Tab 2 content</Tab>
      </Tabs>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
  });

  it('Should not show content when clicking disabled tab', () => {
    let tab1 = <span className="tab1">Tab 1</span>;
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' defaultActiveKey={2} animation={false}>
        <Tab title={tab1} eventKey={1} disabled={true}>Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );

    let tabs = instance.refs.inner;
    let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab1')
    );

    assert.ok(!ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/));
    assert.ok(ReactDOM.findDOMNode(panes[1]).className.match(/\bactive\b/));

    assert.equal(tabs.refs.tabs.context.$bs_tabcontainer.activeKey, 2);
  });


  describe('when the position prop is not provided', () => {
    let instance;

    beforeEach(() => {
      instance = ReactTestUtils.renderIntoDocument(
        <Tabs id='test' defaultActiveKey={1}>
          <Tab title="A Tab" eventKey={1}>Tab content</Tab>
        </Tabs>
      ).refs.inner;
    });

    it('doesn\'t stack the tabs', () => {
      let nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);

      expect(nav.props.bsStyle).to.equal('tabs');
      expect(nav.props.stacked).to.not.be.ok;
    });

    it('doesn\'t apply column styling', () => {
      let tabs = instance.refs.tabs;
      let panes = instance.refs.panes;

      expect(ReactDOM.findDOMNode(tabs).className).to.not.match(/\bcol\b/);
      expect(ReactDOM.findDOMNode(panes).className).to.not.match(/\bcol\b/);
    });

    it('doesn\'t render grid elements', () => {
      const cols = ReactTestUtils.scryRenderedComponentsWithType(
        instance, Col
      );

      expect(cols).to.be.empty;
    });
  });


  describe('when the position prop is "left"', () => {
    beforeEach(() => {
      shouldWarn('deprecated');
    });

    describe('when tabWidth is not provided', () => {
      let instance;

      beforeEach(() => {
        instance = ReactTestUtils.renderIntoDocument(
          <Tabs id='test' defaultActiveKey={1} position="left">
            <Tab title="A Tab" eventKey={1}>Tab content</Tab>
          </Tabs>
        ).refs.inner;
      });

      it('Should stack the tabs', () => {
        let nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);

        expect(nav.props.bsStyle).to.equal('pills');
        expect(nav.props.stacked).to.be.ok;
      });

      it('Should have a left nav with a width of 2', () => {
        let tabs = instance.refs.tabs;
        let panes = instance.refs.panes;

        expect(ReactDOM.findDOMNode(tabs).className).to.match(/\bcol-xs-2\b/);
        expect(ReactDOM.findDOMNode(panes).className).to.match(/\bcol-xs-10\b/);
      });

      it('renders grid elements', () => {
        const cols = ReactTestUtils.scryRenderedComponentsWithType(
          instance, Col
        );

        expect(cols).to.have.length(2);
      });

      it('should render with clearfix', () => {
        expect(ReactDOM.findDOMNode(instance).className).to.match(/\bclearfix\b/);
      });
    });

    describe('when only tabWidth is provided', () => {
      it('Should have a left nav with the width that was provided', () => {
        let instance = ReactTestUtils.renderIntoDocument(
          <Tabs id='test' defaultActiveKey={1} position="left" tabWidth={3}>
            <Tab title="A Tab" eventKey={1}>Tab content</Tab>
          </Tabs>
        ).refs.inner;

        let tabs = instance.refs.tabs;
        let panes = instance.refs.panes;

        expect(ReactDOM.findDOMNode(tabs).className).to.match(/\bcol-xs-3\b/);
        expect(ReactDOM.findDOMNode(panes).className).to.match(/\bcol-xs-9\b/);
      });
    });

    describe('when simple tabWidth and paneWidth are provided', () => {
      let instance;

      beforeEach(() => {
        instance = ReactTestUtils.renderIntoDocument(
          <Tabs id='test' position="left" tabWidth={4} paneWidth={7}>
            <Tab title="A Tab" eventKey={1}>Tab content</Tab>
          </Tabs>
        ).refs.inner;
      });

      it('Should have the provided widths', () => {
        let tabs = instance.refs.tabs;
        let panes = instance.refs.panes;

        expect(ReactDOM.findDOMNode(tabs).className).to.match(/\bcol-xs-4\b/);
        expect(ReactDOM.findDOMNode(panes).className).to.match(/\bcol-xs-7\b/);
      });
    });

    describe('when complex tabWidth and paneWidth are provided', () => {
      let instance;

      beforeEach(() => {
        instance = ReactTestUtils.renderIntoDocument(
          <Tabs
            id='test'
            position="left"
            tabWidth={{xs: 4, md: 3}}
            paneWidth={{xs: 7, md: 8}}
          >
            <Tab title="A Tab" eventKey={1}>Tab content</Tab>
          </Tabs>
        ).refs.inner;
      });

      it('Should have the provided widths', () => {
        let tabs = instance.refs.tabs;
        let panes = instance.refs.panes;

        expect(ReactDOM.findDOMNode(tabs).className)
          .to.match(/\bcol-xs-4\b/).and.to.match(/\bcol-md-3\b/);
        expect(ReactDOM.findDOMNode(panes).className)
          .to.match(/\bcol-xs-7\b/).and.to.match(/\bcol-md-8\b/);
      });
    });

    describe('when standalone', () => {
      let instance;

      beforeEach(() => {
        instance = ReactTestUtils.renderIntoDocument(
          <Tabs id='test' defaultActiveKey={1} position="left" standalone>
            <Tab title="A Tab" eventKey={1}>Tab content</Tab>
          </Tabs>
        ).refs.inner;
      });

      it('should not render with clearfix', () => {
        expect(ReactDOM.findDOMNode(instance).className)
          .to.not.match(/\bclearfix\b/);
      });
    });
  });

  describe('animation', () => {
    let mountPoint;

    beforeEach(() => {
      mountPoint = document.createElement('div');
      document.body.appendChild(mountPoint);
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(mountPoint);
      document.body.removeChild(mountPoint);
    });

    function checkTabRemovingWithAnimation(animation) {
      it(`should correctly set "active" after Tab is removed with "animation=${animation}"`, () => {
        let instance = render(
          <Tabs id='test' defaultActiveKey={2} animation={animation}>
            <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
            <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
          </Tabs>
        , mountPoint);

        let panes = ReactTestUtils.scryRenderedComponentsWithType(instance, TabPane);

        assert.ok(!ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/));
        assert.ok(ReactDOM.findDOMNode(panes[1]).className.match(/\bactive\b/));

        // second tab has been removed
        render(
          <Tabs id='test' defaultActiveKey={1} animation={animation}>
            <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
          </Tabs>
        , mountPoint).refs.inner;

        assert.ok(ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/));
      });
    }

    checkTabRemovingWithAnimation(true);
    checkTabRemovingWithAnimation(false);
  });


  describe('Web Accessibility', () => {
    let instance;
    beforeEach(() => {
      instance = ReactTestUtils.renderIntoDocument(
        <Tabs defaultActiveKey={2} id='test'>
          <Tab title="Tab 1" eventKey={1}>Tab 1 content</Tab>
          <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
        </Tabs>
      );
    });

    it('Should generate ids from parent id', () => {
      let tabs = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

      tabs.every(tab =>
        assert.ok(tab.props['aria-controls'] && tab.props.id));
    });

    it('Should add aria-labelledby', () => {
      let panes = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'tab-pane');

      assert.equal(panes[0].getAttribute('aria-labelledby'), 'test-tab-1');
      assert.equal(panes[1].getAttribute('aria-labelledby'), 'test-tab-2');
    });

    it('Should add aria-controls', () => {
      let tabs = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

      assert.equal(tabs[0].props['aria-controls'], 'test-pane-1');
      assert.equal(tabs[1].props['aria-controls'], 'test-pane-2');
    });

    it('Should add role=tablist to the nav', () => {
      let nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);

      assert.equal(nav.props.role, 'tablist');
    });

    it('Should add aria-selected to the nav item for the selected tab', () => {
      let tabs = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);
      let link1 = ReactTestUtils.findRenderedDOMComponentWithTag(tabs[0], 'a');
      let link2 = ReactTestUtils.findRenderedDOMComponentWithTag(tabs[1], 'a');

      assert.equal(link1.getAttribute('aria-selected'), 'false');
      assert.equal(link2.getAttribute('aria-selected'), 'true');
    });
  });

  it('Should not pass className to Nav', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id='test' bsStyle="pills" defaultActiveKey={1} animation={false}>
        <Tab title="Tab 1" eventKey={1} className="my-tab-class">Tab 1 content</Tab>
        <Tab title="Tab 2" eventKey={2}>Tab 2 content</Tab>
      </Tabs>
    );
    let myTabClass = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-tab-class');
    let myNavItem = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'nav-pills')[0];
    assert.notDeepEqual(myTabClass, myNavItem);
  });

  it('Should pass className, Id, and style to Tabs', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs bsStyle="pills" defaultActiveKey={1} animation={false}
                  className="my-tabs-class" id="my-tabs-id" style={{opacity: 0.5}} />
    );
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('class'), 'my-tabs-class');
    assert.equal(ReactDOM.findDOMNode(instance).getAttribute('id'), 'my-tabs-id');
    // Decimal point string depends on locale
    assert.equal(parseFloat(ReactDOM.findDOMNode(instance).style.opacity), 0.5);
  });
});
