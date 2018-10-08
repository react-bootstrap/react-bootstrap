import React from 'react';
import { mount } from 'enzyme';

import Tab from '../src/Tab';
import Tabs from '../src/Tabs';

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
      </Tabs>,
    );

    wrapper.assertSingle('TabPane[eventKey=1] .active');
    wrapper.assertSingle('NavLink[eventKey=1] a.active');
  });

  it('Should allow tab to have React components', () => {
    const tabTitle = <strong className="special-tab">Tab 2</strong>;

    mount(
      <Tabs id="test" defaultActiveKey={2}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title={tabTitle} eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    ).assertSingle('NavLink a .special-tab');
  });

  it('Should call onSelect when tab is selected', done => {
    function onSelect(key) {
      assert.equal(key, '2');
      done();
    }

    mount(
      <Tabs id="test" onSelect={onSelect} activeKey={1}>
        <Tab title="Tab 1" eventKey="1">
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey="2">
          Tab 2 content
        </Tab>
      </Tabs>,
    )
      .find('NavLink[eventKey="2"] a')
      .simulate('click');
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
      </Tabs>,
    );

    wrapper.assertSingle('a.nav-link.tcustom');
    wrapper.assertNone('a.nav-link.custom');
    wrapper.assertSingle('div.tab-pane.custom#test-tabpane-1');
  });

  it('Should pass variant to Nav', () => {
    mount(
      <Tabs id="test" variant="pills" defaultActiveKey={1} transition={false}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2}>
          Tab 2 content
        </Tab>
      </Tabs>,
    ).assertSingle('nav.nav-pills');
  });

  it('Should pass disabled to Nav', () => {
    mount(
      <Tabs id="test" defaultActiveKey={1}>
        <Tab title="Tab 1" eventKey={1}>
          Tab 1 content
        </Tab>
        <Tab title="Tab 2" eventKey={2} disabled>
          Tab 2 content
        </Tab>
      </Tabs>,
    ).assertSingle('a.nav-link.disabled');
  });
});
