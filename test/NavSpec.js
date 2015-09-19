import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Nav from '../src/Nav';
import NavItem from '../src/NavItem';
import Button from '../src/Button';

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
          <Nav bsStyle="tabs" right activeKey={1}>
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

  it('Should apply className only to the wrapper nav element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" activeKey={1} className="nav-specific">
        <NavItem key={1}>Tab 1 content</NavItem>
        <NavItem key={2}>Tab 2 content</NavItem>
      </Nav>
    );

    let ulNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ul'));
    assert.notInclude(ulNode.className, 'nav-specific');

    let navNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'nav'));
    assert.include(navNode.className, 'nav-specific');
  });

  it('Should apply ulClassName to the inner ul element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" activeKey={1} className="nav-specific" ulClassName="ul-specific">
        <NavItem key={1}>Tab 1 content</NavItem>
        <NavItem key={2}>Tab 2 content</NavItem>
      </Nav>
    );

    let ulNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ul'));
    assert.include(ulNode.className, 'ul-specific');
    assert.notInclude(ulNode.className, 'nav-specific');

    let navNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'nav'));
    assert.notInclude(navNode.className, 'ul-specific');
    assert.include(navNode.className, 'nav-specific');
  });

  it('Should apply id to the wrapper nav element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" activeKey={1} id="nav-id">
        <NavItem key={1}>Tab 1 content</NavItem>
        <NavItem key={2}>Tab 2 content</NavItem>
      </Nav>
    );

    let navNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'nav'));
    assert.equal(navNode.id, 'nav-id');

    let ulNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ul'));
    assert.notEqual(ulNode.id, 'nav-id');
  });

  it('Should apply ulId to the inner ul element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Nav bsStyle="tabs" activeKey={1} id="nav-id" ulId="ul-id">
        <NavItem key={1}>Tab 1 content</NavItem>
        <NavItem key={2}>Tab 2 content</NavItem>
      </Nav>
    );

    let ulNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ul'));
    assert.equal(ulNode.id, 'ul-id');

    let navNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'nav'));
    assert.equal(navNode.id, 'nav-id');
  });


  describe('Web Accessibility', () => {

    it('Should have tablist and tab roles', () => {
      let instance = ReactTestUtils.renderIntoDocument(
          <Nav bsStyle="tabs" activeKey={1}>
            <NavItem key={1}>Tab 1 content</NavItem>
            <NavItem key={2}>Tab 2 content</NavItem>
          </Nav>
        );

      let ul = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'ul')[0];
      let navItem = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a')[0];

      assert.equal(React.findDOMNode(ul).getAttribute('role'), 'tablist');
      assert.equal(React.findDOMNode(navItem).getAttribute('role'), 'tab');
    });
  });
});
