import keycode from 'keycode';
import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import tsp from 'teaspoon';

import Nav from '../src/Nav';
import NavItem from '../src/NavItem';

import { shouldWarn } from './helpers';

describe('<Nav>', () => {
  it('Should set the correct item active', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="pills" activeKey={1}>
        <NavItem eventKey={1}>Pill 1 content</NavItem>
        <NavItem eventKey={2}>Pill 2 content</NavItem>
      </Nav>
    );

    const items = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

    assert.ok(items[0].props.active);
    assert.notOk(items[1].props.active);
  });

  it('Should adds style class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-tabs'));
  });

  it('Should adds stacked variation class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" stacked activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-stacked'));
  });

  it('Should adds variation class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" justified activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-justified'));
  });

  it('Should add pull-right class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" pullRight activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'pull-right'));
  });

  it('Should add navbar-right class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" navbar pullRight activeKey={1}>
        <NavItem key={1}>Tab 1 content</NavItem>
        <NavItem key={2}>Tab 2 content</NavItem>
      </Nav>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-right'));
  });

  it('Should call on select when item is selected', (done) => {
    function handleSelect(key) {
      assert.equal(key, '2');
      done();
    }
    const instance = ReactTestUtils.renderIntoDocument(
          <Nav bsStyle="tabs" activeKey={1} onSelect={handleSelect}>
            <NavItem eventKey={1}>Tab 1 content</NavItem>
            <NavItem eventKey={2}><span>Tab 2 content</span></NavItem>
          </Nav>
        );

    const items = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A');

    ReactTestUtils.Simulate.click(items[1]);
  });

  it('Should set the correct item active by href', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="pills" activeHref="#item2">
        <NavItem eventKey={1} href="#item1">Pill 1 content</NavItem>
        <NavItem eventKey={2} href="#item2">Pill 2 content</NavItem>
      </Nav>
    );

    const items = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

    assert.ok(items[1].props.active);
    assert.notOk(items[0].props.active);
  });

  it('Should warn when attempting to use a justified navbar nav', () => {
    shouldWarn('justified navbar `Nav`s are not supported');

    ReactTestUtils.renderIntoDocument(
      <Nav navbar justified />
    );
  });

  describe('keyboard navigation', () => {
    let instance;
    let selectSpy;

    beforeEach(() => {
      instance = tsp(
        <Nav activeKey={1} onSelect={selectSpy} role="tablist">
          <NavItem eventKey={1}>NavItem 1 content</NavItem>
          <NavItem eventKey={2} disabled>NavItem 2 content</NavItem>
          <NavItem eventKey={3}>NavItem 3 content</NavItem>
          <NavItem eventKey={4} disabled>NavItem 4 content</NavItem>
          <NavItem eventKey={5}>NavItem 5 content</NavItem>
        </Nav>
      )
        .render(true);
      selectSpy = sinon.spy(activeKey => instance.props({ activeKey }));
    });

    afterEach(() => instance.unmount());

    it('only the active tab should be focusable', () => {
      const links = instance.find('a').dom();

      expect(links[0].getAttribute('tabindex')).to.not.equal('-1');
      expect(links[1].getAttribute('tabindex')).to.equal('-1');
      expect(links[2].getAttribute('tabindex')).to.equal('-1');
      expect(links[3].getAttribute('tabindex')).to.equal('-1');
      expect(links[4].getAttribute('tabindex')).to.equal('-1');
    });

    it('should focus the next tab on arrow key', () => {
      const anchors = instance.find('a').dom();
      anchors[0].focus();

      ReactTestUtils.Simulate.keyDown(anchors[0], { keyCode: keycode('right') });

      expect(instance[0].props.activeKey).to.equal(3);
      expect(document.activeElement).to.equal(anchors[2]);
    });

    it('should focus the previous tab on arrow key', () => {
      instance.props({ activeKey: 5 });

      const anchors = instance.find('a').dom();
      anchors[4].focus();

      ReactTestUtils.Simulate.keyDown(anchors[4], { keyCode: keycode('left') });

      expect(instance[0].props.activeKey).to.equal(3);
      expect(document.activeElement).to.equal(anchors[2]);
    });

    it('should wrap to the next tab on arrow key', () => {
      instance.props({ activeKey: 5 });

      const anchors = instance.find('a').dom();
      anchors[4].focus();

      ReactTestUtils.Simulate.keyDown(anchors[4], { keyCode: keycode('down') });

      expect(instance[0].props.activeKey).to.equal(1);
      expect(document.activeElement).to.equal(anchors[0]);
    });

    it('should wrap to the previous tab on arrow key', () => {
      const anchors = instance.find('a').dom();
      anchors[0].focus();

      ReactTestUtils.Simulate.keyDown(anchors[0], { keyCode: keycode('up') });

      expect(instance[0].props.activeKey).to.equal(5);
      expect(document.activeElement).to.equal(anchors[4]);
    });
  });

  describe('event keys', () => {
    it('should accept any number as an event key', () => {
      let instance;
      let selectSpy = sinon.spy(activeKey => instance.props({ activeKey }));
      instance = tsp(
        <Nav activeKey={-100} onSelect={selectSpy} role="tablist">
          <NavItem eventKey={-100}>NavItem 1 content</NavItem>
          <NavItem eventKey={0}>NavItem 2 content</NavItem>
          <NavItem eventKey={1}>NavItem 3 content</NavItem>
        </Nav>
      ).render(true);

      const anchors = instance.find('a').dom();
      anchors[0].focus();

      ReactTestUtils.Simulate.keyDown(anchors[0], { keyCode: keycode('right') });

      expect(instance[0].props.activeKey).to.equal(0);
      expect(document.activeElement).to.equal(anchors[1]);

      instance.unmount();
    });

    it('should accept any string as an event key', () => {
      let instance;
      let selectSpy = sinon.spy(activeKey => instance.props({ activeKey }));
      instance = tsp(
        <Nav activeKey={''} onSelect={selectSpy} role="tablist">
          <NavItem eventKey={'a'}>NavItem 1 content</NavItem>
          <NavItem eventKey={'b'}>NavItem 2 content</NavItem>
          <NavItem eventKey={''}>NavItem 3 content</NavItem>
        </Nav>
      ).render(true);

      const anchors = instance.find('a').dom();
      anchors[2].focus();

      ReactTestUtils.Simulate.keyDown(anchors[2], { keyCode: keycode('right') });

      expect(instance[0].props.activeKey).to.equal('a');
      expect(document.activeElement).to.equal(anchors[0]);

      instance.unmount();
    });
  });

  describe('Web Accessibility', () => {

    it('Should have tablist and tab roles', () => {
      const instance = ReactTestUtils.renderIntoDocument(
        <Nav role="tablist" bsStyle="tabs" activeKey={1}>
          <NavItem key={1}>Tab 1 content</NavItem>
          <NavItem key={2}>Tab 2 content</NavItem>
        </Nav>
      );

      const ul = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'ul')[0];
      const navItem = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a')[0];

      assert.equal(ul.getAttribute('role'), 'tablist');
      assert.equal(navItem.getAttribute('role'), 'tab');
    });
  });
});
