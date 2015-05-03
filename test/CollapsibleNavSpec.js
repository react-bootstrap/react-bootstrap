import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Navbar from '../src/Navbar';
import CollapsibleNav from '../src/CollapsibleNav';
import Nav from '../src/Nav';
import NavItem from '../src/NavItem';
import {shouldWarn} from './helpers';

describe('CollapsibleNav', function () {
  it('Should create div and add collapse class', function () {
    let Parent = React.createClass({
      render: function() {
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

  it('Should handle multiple Nav elements', function () {
    let Parent = React.createClass({
      render: function() {
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

  it('Should just render children and move along if not in <Navbar>', function () {
    let Parent = React.createClass({
      render: function() {
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
    assert.notOk(collapsibleNav.getDOMNode().className.match(/\navbar-collapse\b/));
    let nav = ReactTestUtils.findRenderedComponentWithType(collapsibleNav.refs.nocollapse_0, Nav);
    assert.ok(nav);
  });

  it('Should retain childrens classes set by className', function () {
    let Parent = React.createClass({
      render: function() {
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

  it('Should should not duplicate classes', function () {
    let Parent = React.createClass({
      render: function() {
        return (
          <Navbar toggleNavKey={1}>
            <CollapsibleNav eventKey={1} ref='collapsible_object' className='foo navbar-collapse'>
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
    let classDOM = ReactTestUtils.findRenderedDOMComponentWithTag(instance.refs.collapsible_object, 'DIV').props.className
        , classArray = classDOM.split(' ')
        , idx = classArray.indexOf('navbar-collapse');
    assert.equal(classArray.indexOf('navbar-collapse', idx+1), -1);
  });

  it('Should warn about getCollapsableDOMNode', function () {
    let Parent = React.createClass({
      render: function() {
        return (
          <Navbar toggleNavKey={1}>
            <CollapsibleNav ref='collapsible_object' eventKey={1}>
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
    instance.refs.collapsible_object.getCollapsableDOMNode();
    shouldWarn('deprecated');
  });
  it('Should warn about getCollapsableDimensionValue', function () {
    let Parent = React.createClass({
      render: function() {
        return (
          <Navbar toggleNavKey={1}>
            <CollapsibleNav ref='collapsible_object' eventKey={1}>
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
    instance.refs.collapsible_object.getCollapsableDimensionValue();
    shouldWarn('deprecated');
  });
});
