import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Nav from '../src/Nav';
import NavItem from '../src/NavItem';
import Button from '../src/Button';

describe('Nav', function () {
  it('Should set the correct item active', function () {
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

  it('Should adds style class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-tabs'));
  });

  it('Should adds stacked variation class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" stacked activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-stacked'));
  });

  it('Should adds variation class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" justified activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-justified'));
  });

  it('Should add pull-right class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" pullRight activeKey={1}>
        <NavItem eventKey={1}>Tab 1 content</NavItem>
        <NavItem eventKey={2}>Tab 2 content</NavItem>
      </Nav>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'pull-right'));
  });

  it('Should add navbar-right class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
          <Nav bsStyle="tabs" right activeKey={1}>
            <NavItem key={1}>Tab 1 content</NavItem>
            <NavItem key={2}>Tab 2 content</NavItem>
          </Nav>
        );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-right'));
  });

  it('Should call on select when item is selected', function (done) {
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

    let items = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

    ReactTestUtils.Simulate.click(items[1].refs.anchor);
  });

  it('Should set the correct item active by href', function () {
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

  it('Should set navItem prop on passed in buttons', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="pills" activeHref="#item2">
        <Button eventKey={1}>Button 1 content</Button>
        <NavItem eventKey={2} href="#item2">Pill 2 content</NavItem>
      </Nav>
    );

    let items = ReactTestUtils.scryRenderedComponentsWithType(instance, NavItem);

    assert.ok(items[0].props.navItem);
  });
});
