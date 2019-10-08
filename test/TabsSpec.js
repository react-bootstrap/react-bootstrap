import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import { mount } from 'enzyme';

import Nav from '../src/Nav';
import NavItem from '../src/NavItem';
import Tab from '../src/Tab';
import TabPane from '../src/TabPane';
import Tabs from '../src/Tabs';
import ValidComponentChildren from '../src/utils/ValidComponentChildren';

describe('<Tabs>', () => {
  it('Should show the correct tab', () => {
    const wrapper = mount(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = wrapper.find(TabPane);

    assert.ok(
      panes
        .at(0)
        .getDOMNode()
        .className.match(/\bactive\b/)
    );
    assert.ok(
      !panes
        .at(1)
        .getDOMNode()
        .className.match(/\bactive\b/)
    );

    const nav = wrapper.find(Nav).instance();
    assert.equal(nav.context.$bs_tabContainer.activeKey, 1);
  });

  it('Should only show the tabs with `Tab.props.title` set', () => {
    const wrapper = mount(
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

    const nav = wrapper.find(Nav).instance();
    assert.equal(ValidComponentChildren.count(nav.props.children), 2);
  });

  it('Should allow tab to have React components', () => {
    const tabTitle = <strong className="special-tab">Tab 2</strong>;
    const wrapper = mount(
      <Tabs id="test" defaultActiveKey={2}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title={tabTitle} eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const nav = wrapper.find(Nav).instance();
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
    const wrapper = mount(
      <Tabs id="test" onSelect={onSelect} activeKey={1}>
        <Tab title="Tab 1" eventKey="1">
          Tab 1 content
        </Tab>
        <Tab title={tab2} eventKey="2">
          Tab 2 content
        </Tab>
      </Tabs>
    );

    ReactTestUtils.Simulate.click(wrapper.find('.tab2').getDOMNode());
  });

  it('Should have children with the correct DOM properties', () => {
    const wrapper = mount(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" className="custom" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" tabClassName="tcustom" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = wrapper.find(Tab);
    const navs = wrapper.find(NavItem);

    assert.ok(
      panes
        .at(0)
        .getDOMNode()
        .className.match(/\bcustom\b/)
    );
    assert.ok(
      navs
        .at(1)
        .getDOMNode()
        .className.match(/\btcustom\b/)
    );
    assert.equal(panes.at(0).getDOMNode().id, 'test-pane-1');
  });

  it('Should show the correct first tab with no active key value', () => {
    const wrapper = mount(
      <Tabs id="test">
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = wrapper.find(TabPane);
    assert.ok(
      panes
        .at(0)
        .getDOMNode()
        .className.match(/\bactive\b/)
    );
    assert.ok(
      !panes
        .at(1)
        .getDOMNode()
        .className.match(/\bactive\b/)
    );

    const nav = wrapper.find(Nav).instance();
    assert.equal(nav.context.$bs_tabContainer.activeKey, 1);
  });

  it('Should show the correct first tab with children array', () => {
    const panes = [0, 1].map(index => (
      <Tab key={index} eventKey={index} title={`Tab #${index}`}>
        <div>content</div>
      </Tab>
    ));

    let wrapper = mount(
      <Tabs id="test">
        {panes}
        {null}
      </Tabs>
    );

    const nav = wrapper.find(Nav).instance();
    assert.equal(nav.context.$bs_tabContainer.activeKey, 0);
  });

  it('Should show the correct tab when selected', () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    const wrapper = mount(
      <Tabs id="test" defaultActiveKey={2} animation={false}>
        <Tab title={tab1} eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = wrapper.find(TabPane);

    ReactTestUtils.Simulate.click(wrapper.find('.tab1').getDOMNode());

    assert.ok(
      panes
        .at(0)
        .getDOMNode()
        .className.match(/\bactive\b/)
    );
    assert.ok(
      !panes
        .at(1)
        .getDOMNode()
        .className.match(/\bactive\b/)
    );

    const nav = wrapper.find(Nav).instance();
    assert.equal(nav.context.$bs_tabContainer.activeKey, 1);
  });

  it('Should mount initial tab and no others when unmountOnExit is true and animation is false', () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    const wrapper = mount(
      <Tabs id="test" defaultActiveKey={1} animation={false} unmountOnExit>
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

    const panes = wrapper.find(TabPane);
    expect(panes.at(0).getDOMNode()).to.exist;
    expect(panes.at(1).getDOMNode()).to.not.exist;
    expect(panes.at(2).getDOMNode()).to.not.exist;
  });

  it('Should mount the correct tab when selected and unmount the previous when unmountOnExit is true and animation is false', () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    const wrapper = mount(
      <Tabs id="test" defaultActiveKey={2} animation={false} unmountOnExit>
        <Tab title={tab1} eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = wrapper.find(TabPane);

    ReactTestUtils.Simulate.click(wrapper.find('.tab1').getDOMNode());

    expect(panes.at(0).getDOMNode()).to.exist;
    expect(panes.at(1).getDOMNode()).to.not.exist;

    const nav = wrapper.find(Nav).instance();
    assert.equal(nav.context.$bs_tabContainer.activeKey, 1);
  });

  it('Should treat active key of null as nothing selected', () => {
    const wrapper = mount(
      <Tabs id="test" activeKey={null} onSelect={() => {}}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const nav = wrapper.find(Nav).instance();
    expect(nav.context.$bs_tabContainer.activeKey).to.not.exist;
  });

  it('Should pass default bsStyle (of "tabs") to Nav', () => {
    const wrapper = mount(
      <Tabs id="test" defaultActiveKey={1} animation={false}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(wrapper.find('.nav-tabs').getDOMNode());
  });

  it('Should pass bsStyle to Nav', () => {
    const wrapper = mount(
      <Tabs id="test" bsStyle="pills" defaultActiveKey={1} animation={false}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(wrapper.find('.nav-pills').getDOMNode());
  });

  it('Should pass disabled to Nav', () => {
    const wrapper = mount(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    assert.ok(wrapper.find('.disabled').getDOMNode());
  });

  it('Should not show content when clicking disabled tab', () => {
    const tab1 = <span className="tab1">Tab 1</span>;
    const wrapper = mount(
      <Tabs id="test" defaultActiveKey={2} animation={false}>
        <Tab title={tab1} eventKey={1} disabled>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const panes = wrapper.find(TabPane);

    ReactTestUtils.Simulate.click(wrapper.find('.tab1').getDOMNode());

    assert.ok(
      !panes
        .at(0)
        .getDOMNode()
        .className.match(/\bactive\b/)
    );
    assert.ok(
      panes
        .at(1)
        .getDOMNode()
        .className.match(/\bactive\b/)
    );

    const nav = wrapper.find(Nav).instance();
    assert.equal(nav.context.$bs_tabContainer.activeKey, 2);
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

    [true, false].forEach(animation => {
      it(`should correctly set "active" after Tab is removed with "animation=${animation}"`, () => {
        let wrapper = mount(
          <Tabs
            id="test"
            activeKey={2}
            animation={animation}
            onSelect={() => {}}
          >
            <Tab title="Tab 1" eventKey={1}>
              Tab 1 content
            </Tab>
            <Tab title="Tab 2" eventKey={2}>
              Tab 2 content
            </Tab>
          </Tabs>,
          { attachTo: mountPoint }
        );

        let panes = wrapper.find(TabPane);

        assert.ok(
          !panes
            .at(0)
            .getDOMNode()
            .className.match(/\bactive\b/)
        );
        assert.ok(
          panes
            .at(1)
            .getDOMNode()
            .className.match(/\bactive\b/)
        );

        // second tab has been removed
        wrapper = mount(
          <Tabs
            id="test"
            activeKey={1}
            animation={animation}
            onSelect={() => {}}
          >
            <Tab title="Tab 1" eventKey={1}>
              Tab 1 content
            </Tab>
          </Tabs>,
          { attachTo: mountPoint }
        );

        panes = wrapper.find(TabPane);
        assert.ok(
          panes
            .at(0)
            .getDOMNode()
            .className.match(/\bactive\b/)
        );
      });
    });
  });

  describe('Web Accessibility', () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(
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
      const tabs = wrapper.find(NavItem);

      tabs.every(tab => assert.ok(tab.prop('aria-controls') && tab.prop('id')));
    });

    it('Should add aria-labelledby', () => {
      const panes = wrapper.find('.tab-pane');

      assert.equal(
        panes
          .at(0)
          .getDOMNode()
          .getAttribute('aria-labelledby'),
        'test-tab-1'
      );
      assert.equal(
        panes
          .at(1)
          .getDOMNode()
          .getAttribute('aria-labelledby'),
        'test-tab-2'
      );
    });

    it('Should add aria-controls', () => {
      const tabs = wrapper.find(NavItem);

      assert.equal(tabs.at(0).prop('aria-controls'), 'test-pane-1');
      assert.equal(tabs.at(1).prop('aria-controls'), 'test-pane-2');
    });

    it('Should add role=tablist to the nav', () => {
      const nav = wrapper.find(Nav).instance();

      assert.equal(nav.props.role, 'tablist');
    });

    it('Should add aria-selected to the nav item for the selected tab', () => {
      const tabs = wrapper.find(NavItem);
      const link1 = tabs
        .at(0)
        .find('a')
        .getDOMNode();
      const link2 = tabs
        .at(1)
        .find('a')
        .getDOMNode();

      assert.equal(link1.getAttribute('aria-selected'), 'false');
      assert.equal(link2.getAttribute('aria-selected'), 'true');
    });
  });

  it('Should not pass className to Nav', () => {
    const wrapper = mount(
      <Tabs id="test" bsStyle="pills" defaultActiveKey={1} animation={false}>
        <Tab title="Tab 1" eventKey={1} className="my-tab-class">
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>
    );

    const myTabClass = wrapper
      .find('.my-tab-class')
      .hostNodes()
      .getDOMNode();
    const myNavItem = wrapper
      .find('.nav-pills')
      .first()
      .getDOMNode();

    assert.notDeepEqual(myTabClass, myNavItem);
  });

  it('Should pass className, Id, and style to Tabs', () => {
    const wrapper = mount(
      <Tabs
        bsStyle="pills"
        defaultActiveKey={1}
        animation={false}
        className="my-tabs-class"
        id="my-tabs-id"
        style={{ opacity: 0.5 }}
      />
    );

    assert.equal(wrapper.getDOMNode().getAttribute('class'), 'my-tabs-class');
    assert.equal(wrapper.getDOMNode().getAttribute('id'), 'my-tabs-id');
    // Decimal point string depends on locale
    assert.equal(parseFloat(wrapper.getDOMNode().style.opacity), 0.5);
  });

  it('should derive bsClass from parent', () => {
    const wrapper = mount(
      <Tabs id="test" bsClass="my-tabs">
        <Tab eventKey={1} title="Tab 1" />
        <Tab eventKey={2} title="Tab 2" bsClass="my-pane" />
      </Tabs>
    );

    assert.lengthOf(wrapper.find('.my-tabs-pane'), 2);
    assert.lengthOf(wrapper.find('.my-pane'), 0);
  });
});
