import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Navbar from '../src/Navbar';
import CollapsableNav from '../src/CollapsableNav';
import Nav from '../src/Nav';
import NavItem from '../src/NavItem';
import {shouldWarn} from './helpers';

describe('CollapsableNav', function () {
  it('Should create div and add collapse class and warn', function () {
    let Parent = React.createClass({
      render: function() {
        return (
          <Navbar toggleNavKey={1}>
            <CollapsableNav eventKey={1}>
              <Nav>
                <NavItem eventKey={1} ref='item1'>Item 1 content</NavItem>
                <NavItem eventKey={2} ref='item2'>Item 2 content</NavItem>
              </Nav>
            </CollapsableNav>
            </Navbar>
        );
      }
    });
    let instance = ReactTestUtils.renderIntoDocument(<Parent />);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-collapse'));
    shouldWarn('deprecated');
  });

  it('Should warn about getCollapsableDOMNode', function () {
    let Parent = React.createClass({
      render: function() {
        return (
          <Navbar toggleNavKey={1}>
            <CollapsableNav ref='collapsable_object' eventKey={1}>
              <Nav>
                <NavItem eventKey={1} ref='item1'>Item 1 content</NavItem>
                <NavItem eventKey={2} ref='item2'>Item 2 content</NavItem>
              </Nav>
            </CollapsableNav>
            </Navbar>
        );
      }
    });
    let instance = ReactTestUtils.renderIntoDocument(<Parent />);
    instance.refs.collapsable_object.getCollapsableDOMNode();
    shouldWarn('deprecated');
  });
  it('Should warn about getCollapsableDimensionValue', function () {
    let Parent = React.createClass({
      render: function() {
        return (
          <Navbar toggleNavKey={1}>
            <CollapsableNav ref='collapsable_object' eventKey={1}>
              <Nav>
                <NavItem eventKey={1} ref='item1'>Item 1 content</NavItem>
                <NavItem eventKey={2} ref='item2'>Item 2 content</NavItem>
              </Nav>
            </CollapsableNav>
            </Navbar>
        );
      }
    });
    let instance = ReactTestUtils.renderIntoDocument(<Parent />);
    instance.refs.collapsable_object.getCollapsableDimensionValue();
    shouldWarn('deprecated');
  });
});
