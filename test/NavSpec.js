import React from 'react';
import { mount } from 'enzyme';

import Nav from '../src/Nav';
import Navbar from '../src/Navbar';

import { shouldWarn } from './helpers';

describe('<Nav>', () => {
  let mountPoint;

  beforeEach(() => {
    mountPoint = document.createElement('div');
    document.body.appendChild(mountPoint);
  });

  afterEach(() => {
    document.body.removeChild(mountPoint);
  });

  it('Should set the correct item active', () => {
    const wrapper = mount(
      <Nav as="div" variant="pills" defaultActiveKey={1}>
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    );

    const items = wrapper.find('a.nav-link');

    assert.ok(items.at(0).is('.active'));
    assert.notOk(items.at(1).is('.active'));
  });

  it('Should adds variant class', () => {
    mount(
      <Nav as="div" variant="tabs">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    ).assertSingle('div.nav.nav-tabs');
  });

  it('Should adds justified class', () => {
    mount(
      <Nav justify as="div">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    ).assertSingle('div.nav.nav-justified');
  });

  it('Should adds fill class', () => {
    mount(
      <Nav fill as="div">
        <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
        <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
      </Nav>,
    ).assertSingle('div.nav.nav-fill');
  });

  it('Should be navbar aware', () => {
    mount(
      <Navbar>
        <Nav as="div">
          <Nav.Link eventKey={1}>Pill 1 content</Nav.Link>
          <Nav.Link eventKey={2}>Pill 2 content</Nav.Link>
        </Nav>
      </Navbar>,
    ).assertSingle('div.navbar-nav');
  });

  it('Should call on select when item is selected', done => {
    function handleSelect(key) {
      assert.equal(key, '2');
      done();
    }

    mount(
      <Nav as="div" onSelect={handleSelect}>
        <Nav.Link eventKey={1}>Tab 1 content</Nav.Link>
        <Nav.Link eventKey={2}>
          <span>Tab 2 content</span>
        </Nav.Link>
      </Nav>,
    )
      .find('a')
      .last()
      .simulate('click');
  });

  it('Should set the correct item active by href', () => {
    mount(
      <Nav as="div" defaultActiveKey="#item1">
        <Nav.Link href="#item1" className="test-selected">
          Pill 1 content
        </Nav.Link>
        <Nav.Link href="#item2">Pill 2 content</Nav.Link>
      </Nav>,
    ).assertSingle('a.test-selected.active');
  });

  it('Should warn when attempting to use a justify navbar nav', () => {
    shouldWarn('justify navbar `Nav`s are not supported');

    mount(<Nav navbar justify />);
  });

  describe('keyboard navigation', () => {
    let instance;
    let selectSpy;

    beforeEach(() => {
      selectSpy = sinon.spy(activeKey => {
        instance.setProps({ activeKey });
      });

      instance = mount(
        <Nav activeKey={1} onSelect={selectSpy} role="tablist">
          <Nav.Link eventKey={1}>Nav.Link 1 content</Nav.Link>
          <Nav.Link eventKey={2} disabled>
            Nav.Link 2 content
          </Nav.Link>
          <Nav.Link eventKey={3}>Nav.Link 3 content</Nav.Link>
          <Nav.Link eventKey={4} disabled>
            Nav.Link 4 content
          </Nav.Link>
          <Nav.Link eventKey={5}>Nav.Link 5 content</Nav.Link>
        </Nav>,
        { attachTo: mountPoint },
      );
    });

    afterEach(() => instance.unmount());

    it('only the active tab should be focusable', () => {
      const links = instance.find('a').map(n => n.getDOMNode());

      expect(links[0].getAttribute('tabindex')).to.not.equal('-1');
      expect(links[1].getAttribute('tabindex')).to.equal('-1');
      expect(links[2].getAttribute('tabindex')).to.equal('-1');
      expect(links[3].getAttribute('tabindex')).to.equal('-1');
      expect(links[4].getAttribute('tabindex')).to.equal('-1');
    });

    it('should focus the next tab on arrow key', () => {
      const anchors = instance.find('a');

      anchors
        .at(0)
        .tap(a => a.getDOMNode().focus())
        .simulate('keydown', {
          key: 'ArrowRight',
        });

      expect(instance.prop('activeKey')).to.equal('3');

      expect(document.activeElement).to.equal(anchors.at(2).getDOMNode());
    });

    it('should focus the previous tab on arrow key', () => {
      instance.setProps({ activeKey: 5 });

      const anchors = instance.find('a');

      anchors
        .at(4)
        .tap(a => a.getDOMNode().focus())
        .simulate('keydown', {
          key: 'ArrowLeft',
        });

      expect(instance.prop('activeKey')).to.equal('3');
      expect(document.activeElement).to.equal(anchors.at(2).getDOMNode());
    });

    it('should wrap to the next tab on arrow key', () => {
      instance.setProps({ activeKey: 5 });
      const anchors = instance.find('a');

      anchors
        .at(4)
        .tap(a => a.getDOMNode().focus())
        .simulate('keydown', {
          key: 'ArrowDown',
        });

      expect(instance.prop('activeKey')).to.equal('1');
      expect(document.activeElement).to.equal(anchors.at(0).getDOMNode());
    });

    it('should wrap to the previous tab on arrow key', () => {
      const anchors = instance.find('a');

      anchors
        .at(0)
        .tap(a => a.getDOMNode().focus())
        .simulate('keydown', {
          key: 'ArrowUp',
        });

      expect(instance.prop('activeKey')).to.equal('5');
      expect(document.activeElement).to.equal(anchors.at(4).getDOMNode());
    });
  });

  describe('Web Accessibility', () => {
    it('Should have tablist and tab roles', () => {
      const wrapper = mount(
        <Nav role="tablist" as="div">
          <Nav.Link key={1}>Tab 1 content</Nav.Link>
          <Nav.Link key={2}>Tab 2 content</Nav.Link>
        </Nav>,
      );

      wrapper.assertSingle('div[role="tablist"]');
      wrapper.find('a[role="tab"]').length.should.equal(2);
    });
  });
});
