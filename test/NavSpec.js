import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import tsp from 'teaspoon';
import keycode from 'keycode';

import Button from '../src/Button';
import Nav from '../src/Nav';
import NavItem from '../src/NavItem';

import {shouldWarn} from './helpers';

describe('Nav', () => {
  it('Should set the correct item active', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="pills" activeKey={1}>
        <NavItem eventKey={1}>Pill 1 content</NavItem>
        <NavItem eventKey={2}>Pill 2 content</NavItem>
      </Nav>
    );

    let items = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

    assert.ok(items[0].props.active);
    assert.notOk(items[1].props.active);
  });

  it('Should adds style class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-tabs'));
  });

  it('Should adds stacked variation class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" stacked activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-stacked'));
  });

  it('Should adds variation class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" justified activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-justified'));
  });

  it('Should add pull-right class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" pullRight activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'pull-right'));
  });

  it('Should add navbar-right class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
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
    let instance = ReactTestUtils.renderIntoDocument(
          <Nav bsStyle="tabs" activeKey={1} onSelect={handleSelect}>
            <NavItem eventKey={1}>Tab 1 content</NavItem>
            <NavItem eventKey={2}><span>Tab 2 content</span></NavItem>
          </Nav>
        );

    let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'A');

    ReactTestUtils.Simulate.click(items[1]);
  });

  it('Should set the correct item active by href', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="pills" activeHref="#item2">
        <NavItem eventKey={1} href="#item1">Pill 1 content</NavItem>
        <NavItem eventKey={2} href="#item2">Pill 2 content</NavItem>
      </Nav>
    );

    let items = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

    assert.ok(items[1].props.active);
    assert.notOk(items[0].props.active);
  });

  it('Should set navItem prop on passed in buttons', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="pills" activeHref="#item2">
        <Button eventKey={1}>Button 1 content</Button>
        <NavItem eventKey={2} href="#item2">Pill 2 content</NavItem>
      </Nav>
    );

    let items = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

    assert.ok(items[0].props.navItem);
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
      selectSpy = sinon.spy(activeKey => instance.props({ activeKey }));
      instance = tsp(
        <Nav activeKey={1} onSelect={selectSpy} role='tablist'>
          <NavItem eventKey={1}>NavItem 1 content</NavItem>
          <NavItem eventKey={2} disabled>NavItem 2 content</NavItem>
          <NavItem eventKey={3}>NavItem 3 content</NavItem>
        </Nav>
      )
      .render(true);
    });

    afterEach(() => instance.unmount());

    it('only the active tab should be focusable', () => {
      let links = instance.find('a').dom();

      expect(links[0].getAttribute('tabindex')).to.equal('0');
      expect(links[1].getAttribute('tabindex')).to.equal('-1');
      expect(links[2].getAttribute('tabindex')).to.equal('-1');
    });

    it('should focus the next tab on arrow key', () => {
      let links = instance.find('a').dom();

      let [firstAnchor, _, lastAnchor] = links;

      firstAnchor.focus();

      ReactTestUtils.Simulate.keyDown(firstAnchor, { keyCode: keycode('right') });

      expect(instance[0].getActiveKey()).to.equal(3);
      expect(document.activeElement).to.equal(lastAnchor);
    });

    it('should focus the previous tab on arrow key', () => {
      instance.props({ activeKey: 3 });

      let links = instance.find('a').dom();
      let [firstAnchor, _, lastAnchor] = links;

      lastAnchor.focus();

      ReactTestUtils.Simulate.keyDown(lastAnchor, { keyCode: keycode('left') });

      expect(instance[0].getActiveKey()).to.equal(1);
      expect(document.activeElement).to.equal(firstAnchor);
    });
  });

  describe('Web Accessibility', () => {

    it('Should have tablist and tab roles', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Nav role='tablist' bsStyle="tabs" activeKey={1}>
          <NavItem key={1}>Tab 1 content</NavItem>
          <NavItem key={2}>Tab 2 content</NavItem>
        </Nav>
      );

      let ul = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'ul')[0];
      let navItem = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a')[0];

      assert.equal(ul.getAttribute('role'), 'tablist');
      assert.equal(navItem.getAttribute('role'), 'tab');
    });
  });
});
