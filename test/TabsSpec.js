import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Fade from '../src/Fade';
import Nav from '../src/Nav';
import NavLink from '../src/NavLink';
import Tab from '../src/Tab';
import TabPane from '../src/TabPane';
import Tabs from '../src/Tabs';
import * as ValidComponentChildren from '../src/utils/ValidComponentChildren';

import { render } from './helpers';

describe('<Tabs>', () => {
  it('Should show the correct tab', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      TabPane
    );

    assert.ok(ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/));
    assert.ok(!ReactDOM.findDOMNode(panes[1]).className.match(/\bactive\b/));

    const nav = ReactTestUtils.findRenderedComponentWithType(
      instance,
      Nav._Nav
    );

    assert.equal(nav.props.activeKey, 1);
  });

  it('Should only show the tabs with `Tab.props.title` set', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" defaultActiveKey={3}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab eventKey={2}>Tab 2 content</Tab>
        <Tab title="Tab 2" eventKey={3}>
          Tab 3 content
        </Tab>
      </Tabs>
    );

    const nav = ReactTestUtils.findRenderedComponentWithType(
      instance,
      Nav._Nav
    );
    assert.equal(ValidComponentChildren.count(nav.props.children), 2);
  });

  it('Should allow tab to have React components', () => {
    const tabTitle = <strong className="special-tab">Tab 2</strong>;
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" defaultActiveKey={2}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title={tabTitle} eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);
    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(nav, 'special-tab')
    );
  });

  it('Should call onSelect when tab is selected', done => {
    function onSelect(key) {
      assert.equal(key, '2');
      done();
    }

    const tab2 = <span className="tab2">Tab2</span>;
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" onSelect={onSelect} activeKey={1}>
        <Tab title="Tab 1" eventKey="1">
          Tab 1 content
        </Tab>
        <Tab title={tab2} eventKey="2">
          Tab 2 content
        </Tab>
      </Tabs>
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab2')
    );
  });

  it('Should have children with the correct DOM properties', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" className="custom" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" tabClassName="tcustom" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      TabPane
    );
    const navs = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      NavLink
    );

    assert.ok(ReactDOM.findDOMNode(panes[0]).className.match(/\bcustom\b/));
    assert.ok(ReactDOM.findDOMNode(navs[1]).className.match(/\btcustom\b/));
    assert.equal(ReactDOM.findDOMNode(panes[0]).id, 'test-tabpane-1');
  });

  it('Should show the correct first tab with no active key value', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test">
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      TabPane
    );
    assert.ok(ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/));
    assert.ok(!ReactDOM.findDOMNode(panes[1]).className.match(/\bactive\b/));

    const nav = ReactTestUtils.findRenderedComponentWithType(
      instance,
      Nav._Nav
    );
    assert.equal(nav.props.activeKey, 1);
  });

  it('Should show the correct first tab with children array', () => {
    const panes = [0, 1].map(index => (
      <Tab key={index} eventKey={index} title={`Tab #${index}`}>
        <div>content</div>
      </Tab>
    ));

    let instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test">
        {panes}
        {null}
      </Tabs>
    );

    const nav = ReactTestUtils.findRenderedComponentWithType(
      instance,
      Nav._Nav
    );
    assert.equal(nav.props.activeKey, 0);
  });

  it('Should show the correct tab when selected', () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" defaultActiveKey={2} transition={false}>
        <Tab title={tab1} eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      TabPane
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab1')
    );

    assert.ok(ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/));
    assert.ok(!ReactDOM.findDOMNode(panes[1]).className.match(/\bactive\b/));

    const nav = ReactTestUtils.findRenderedComponentWithType(
      instance,
      Nav._Nav
    );
    assert.equal(nav.props.activeKey, 1);
  });

  it('Should mount initial tab and no others when unmountOnExit is true and transition is false', () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" defaultActiveKey={1} transition={false} unmountOnExit>
        <Tab title={tab1} eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
        <Tab title="Tab 3" eventKey={3}>
          Tab 3 content
        </Tab>
      </Tabs>
    );

    const panes = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      TabPane
    );
    expect(ReactDOM.findDOMNode(panes[0])).to.exist;
    expect(ReactDOM.findDOMNode(panes[1])).to.not.exist;
    expect(ReactDOM.findDOMNode(panes[2])).to.not.exist;
  });

  it('Should mount the correct tab when selected and unmount the previous when unmountOnExit is true and transition is false', () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" defaultActiveKey={2} transition={false} unmountOnExit>
        <Tab title={tab1} eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      TabPane
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab1')
    );

    expect(ReactDOM.findDOMNode(panes[0])).to.exist;
    expect(ReactDOM.findDOMNode(panes[1])).to.not.exist;

    const nav = ReactTestUtils.findRenderedComponentWithType(
      instance,
      Nav._Nav
    );
    assert.equal(nav.props.activeKey, 1);
  });

  it('Should treat active key of null as nothing selected', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" activeKey={null} onSelect={() => {}}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const nav = ReactTestUtils.findRenderedComponentWithType(
      instance,
      Nav._Nav
    );
    expect(nav.props.activeKey).to.not.exist;
  });

  it('Should pass default bsStyle (of "tabs") to Nav', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" defaultActiveKey={1} transition={false}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-tabs')
    );
  });

  it('Should pass bsStyle to Nav', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" bsStyle="pills" defaultActiveKey={1} transition={false}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-pills')
    );
  });

  it('Should pass disabled to Nav', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled')
    );
  });

  it('Should not show content when clicking disabled tab', () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" defaultActiveKey={2} transition={false}>
        <Tab title={tab1} eventKey={1} disabled>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      TabPane
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'tab1')
    );

    assert.ok(!ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/));
    assert.ok(ReactDOM.findDOMNode(panes[1]).className.match(/\bactive\b/));

    const nav = ReactTestUtils.findRenderedComponentWithType(
      instance,
      Nav._Nav
    );
    assert.equal(nav.props.activeKey, 2);
  });

  describe('active state invariants', () => {
    let mountPoint;

    beforeEach(() => {
      mountPoint = document.createElement('div');
      document.body.appendChild(mountPoint);
    });

    afterEach(() => {
      ReactDOM.unmountComponentAtNode(mountPoint);
      document.body.removeChild(mountPoint);
    });

    [Fade, false].forEach(transition => {
      it(`should correctly set "active" after Tab is removed with "transition=${transition}"`, () => {
        const instance = render(
          <Tabs
            id="test"
            activeKey={2}
            transition={transition}
            onSelect={() => {}}
          >
            <Tab title="Tab 1" eventKey={1}>
              Tab 1 content
            </Tab>
            <Tab title="Tab 2" eventKey={2}>
              Tab 2 content
            </Tab>
          </Tabs>,
          mountPoint
        );

        const panes = ReactTestUtils.scryRenderedComponentsWithType(
          instance,
          TabPane
        );

        assert.ok(
          !ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/)
        );
        assert.ok(ReactDOM.findDOMNode(panes[1]).className.match(/\bactive\b/));

        // second tab has been removed
        render(
          <Tabs
            id="test"
            activeKey={1}
            transition={transition}
            onSelect={() => {}}
          >
            <Tab title="Tab 1" eventKey={1}>
              Tab 1 content
            </Tab>
          </Tabs>,
          mountPoint
        ).inner;

        assert.ok(ReactDOM.findDOMNode(panes[0]).className.match(/\bactive\b/));
      });
    });
  });

  describe('Web Accessibility', () => {
    let instance;

    beforeEach(() => {
      instance = ReactTestUtils.renderIntoDocument(
        <Tabs defaultActiveKey={2} id="test">
          <Tab title="Tab 1" eventKey={1}>
            Tab 1 content
          </Tab>
          <Tab title="Tab 2" eventKey={2}>
            Tab 2 content
          </Tab>
        </Tabs>
      );
    });

    it('Should generate ids from parent id', () => {
      const tabs = ReactTestUtils.scryRenderedDOMComponentsWithTag(
        instance,
        'a'
      );

      assert.ok(tabs[0].hasAttribute('aria-controls') && tabs[0].id);
      assert.ok(tabs[1].hasAttribute('aria-controls') && tabs[1].id);
    });

    it('Should add aria-labelledby', () => {
      const panes = ReactTestUtils.scryRenderedDOMComponentsWithClass(
        instance,
        'tab-pane'
      );

      assert.equal(panes[0].getAttribute('aria-labelledby'), 'test-tab-1');
      assert.equal(panes[1].getAttribute('aria-labelledby'), 'test-tab-2');
    });

    it('Should add aria-controls', () => {
      const tabs = ReactTestUtils.scryRenderedDOMComponentsWithTag(
        instance,
        'a'
      );

      assert.equal(tabs[0].getAttribute('aria-controls'), 'test-tabpane-1');
      assert.equal(tabs[1].getAttribute('aria-controls'), 'test-tabpane-2');
    });

    it('Should add role=tablist to the nav', () => {
      const nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);

      assert.equal(nav.props.role, 'tablist');
    });

    it('Should add aria-selected to the nav item for the selected tab', () => {
      const links = ReactTestUtils.scryRenderedDOMComponentsWithTag(
        instance,
        'a'
      );

      assert.equal(links[0].getAttribute('aria-selected'), 'false');
      assert.equal(links[1].getAttribute('aria-selected'), 'true');
    });
  });

  it('Should not pass className to Nav', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" bsStyle="pills" defaultActiveKey={1} transition={false}>
        <Tab title="Tab 1" eventKey={1} className="my-tab-class">
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const myTabClass = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'my-tab-class'
    );
    const myNavItem = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      instance,
      'nav-pills'
    )[0];

    assert.notDeepEqual(myTabClass, myNavItem);
  });

  it('Should pass className, Id, and style to Tabs', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs
        bsStyle="pills"
        defaultActiveKey={1}
        transition={false}
        className="my-tabs-class"
        id="my-tabs-id"
        style={{ opacity: 0.5 }}
      />
    );

    assert.equal(
      ReactDOM.findDOMNode(instance).getAttribute('class'),
      'my-tabs-class'
    );
    assert.equal(
      ReactDOM.findDOMNode(instance).getAttribute('id'),
      'my-tabs-id'
    );
    // Decimal point string depends on locale
    assert.equal(parseFloat(ReactDOM.findDOMNode(instance).style.opacity), 0.5);
  });

  it('should derive bsClass from parent', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Tabs id="test" bsClass="my-tabs">
        <Tab eventKey={1} title="Tab 1" />
        <Tab eventKey={2} title="Tab 2" bsClass="my-pane" />
      </Tabs>
    );

    assert.lengthOf(
      ReactTestUtils.scryRenderedDOMComponentsWithClass(
        instance,
        'my-tabs-pane'
      ),
      2
    );
    assert.lengthOf(
      ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'my-pane'),
      0
    );
  });
});
