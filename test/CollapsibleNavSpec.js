import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Navbar from '../src/Navbar';
import CollapsibleNav from '../src/CollapsibleNav';
import Nav from '../src/Nav';
import NavItem from '../src/NavItem';

describe('CollapsibleNav', () => {
  it('Should create div and add collapse class', () => {
    let Parent = React.createClass({
      render() {
        return (
          <Navbar toggleNavKey={1}>
            <CollapsibleNav eventKey={1}>
              <Nav>
                <NavItem eventKey={1} ref='item1'>Item 1 content</NavItem>
                <NavItem eventKey={2} ref='item2'>Item 2 content</NavItem>
              </Nav>
            </CollapsibleNav>
          </Navbar>
        );
      }
    });
    let instance = ReactTestUtils.renderIntoDocument(<Parent />);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-collapse'));
  });

  it('Should handle multiple Nav elements', () => {
    let Parent = React.createClass({
      render() {
        return (
          <Navbar toggleNavKey={1}>
            <CollapsibleNav eventKey={1} ref='collapsible_object'>
              <Nav>
                <NavItem eventKey={1} ref='item1'>Item 1 content</NavItem>
                <NavItem eventKey={2} ref='item2'>Item 2 content</NavItem>
              </Nav>
              <Nav>
                <NavItem eventKey={1} ref='item1'>Item 1 content</NavItem>
                <NavItem eventKey={2} ref='item2'>Item 2 content</NavItem>
              </Nav>
            </CollapsibleNav>
          </Navbar>
        );
      }
    });
    let instance = ReactTestUtils.renderIntoDocument(<Parent />);
    assert.ok(ReactTestUtils.findRenderedComponentWithType(instance.refs.collapsible_object.refs.collapsible_0, Nav));
    assert.ok(ReactTestUtils.findRenderedComponentWithType(instance.refs.collapsible_object.refs.collapsible_1, Nav));
  });

  it('Should just render children and move along if not in <Navbar>', () => {
    let Parent = React.createClass({
      render() {
        return (
          <CollapsibleNav eventKey={1}>
            <Nav>
              <NavItem eventKey={1} ref='item1'>Item 1 content</NavItem>
              <NavItem eventKey={2} ref='item2'>Item 2 content</NavItem>
            </Nav>
          </CollapsibleNav>
        );
      }
    });
    let instance = ReactTestUtils.renderIntoDocument(<Parent />);
    let collapsibleNav = ReactTestUtils.findRenderedComponentWithType(instance, CollapsibleNav);
    assert.notOk(React.findDOMNode(collapsibleNav).className.match(/\navbar-collapse\b/));
    let nav = ReactTestUtils.findRenderedComponentWithType(collapsibleNav.refs.nocollapse_0, Nav);
    assert.ok(nav);
  });

  it('Should retain childrens classes set by className', () => {
    let Parent = React.createClass({
      render() {
        return (
          <Navbar toggleNavKey={1}>
            <CollapsibleNav eventKey={1} ref='collapsible_object'>
              <Nav>
                <NavItem eventKey={1} ref='item1' className='foo bar'>Item 1 content</NavItem>
                <NavItem eventKey={2} ref='item2' className='baz'>Item 2 content</NavItem>
              </Nav>
            </CollapsibleNav>
          </Navbar>
        );
      }
    });
    let instance = ReactTestUtils.renderIntoDocument(<Parent />);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.collapsible_object.refs.collapsible_0, 'foo'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.collapsible_object.refs.collapsible_0, 'bar'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.collapsible_object.refs.collapsible_0, 'baz'));
  });
});
