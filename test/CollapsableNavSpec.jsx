/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Navbar            = require('../lib/Navbar');
var CollapsableNav    = require('../lib/CollapsableNav');
var Nav            = require('../lib/Nav');
var NavItem        = require('../lib/NavItem');

describe('CollapsableNav', function () {
  it('Should create div and add collapse class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={1}>
        <CollapsableNav eventKey={1}>
          <Nav>
            <NavItem eventKey={1} ref="item1">Item 1 content</NavItem>
            <NavItem eventKey={2} ref="item2">Item 2 content</NavItem>
          </Nav>
        </CollapsableNav>
      </Navbar>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-collapse'));
  });

  it('Should handle multiple Nav elements', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={1}>
        <CollapsableNav eventKey={1} ref="collapsable_object">
          <Nav>
            <NavItem eventKey={1} ref="item1">Item 1 content</NavItem>
            <NavItem eventKey={2} ref="item2">Item 2 content</NavItem>
          </Nav>
          <Nav>
            <NavItem eventKey={1} ref="item1">Item 1 content</NavItem>
            <NavItem eventKey={2} ref="item2">Item 2 content</NavItem>
          </Nav>
        </CollapsableNav>
      </Navbar>
    );
    assert.ok(ReactTestUtils.findRenderedComponentWithType(instance.refs.collapsable_object.refs.collapsable_0, Nav));
    assert.ok(ReactTestUtils.findRenderedComponentWithType(instance.refs.collapsable_object.refs.collapsable_1, Nav));
  });

  it('Should just render children and move along if not in <Navbar>', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <CollapsableNav eventKey={1}>
        <Nav>
          <NavItem eventKey={1} ref="item1">Item 1 content</NavItem>
          <NavItem eventKey={2} ref="item2">Item 2 content</NavItem>
        </Nav>
      </CollapsableNav>
    );
    assert.notOk(instance.getDOMNode().className.match(/\navbar-collapse\b/));
    assert.ok(ReactTestUtils.findRenderedComponentWithType(instance.refs.nocollapse_0, Nav));
  });

  it('Should retain childrens classes set by className', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={1}>
        <CollapsableNav eventKey={1} ref="collapsable_object">
          <Nav>
            <NavItem eventKey={1} ref="item1" className="foo bar">Item 1 content</NavItem>
            <NavItem eventKey={2} ref="item2" className="baz">Item 2 content</NavItem>
          </Nav>
        </CollapsableNav>
      </Navbar>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.collapsable_object.refs.collapsable_0, 'foo'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.collapsable_object.refs.collapsable_0, 'bar'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance.refs.collapsable_object.refs.collapsable_0, 'baz'));
  });

  it('Should should not duplicate classes', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={1}>
        <CollapsableNav eventKey={1} ref="collapsable_object" className="foo navbar-collapse">
          <Nav>
            <NavItem eventKey={1} ref="item1" className="foo bar">Item 1 content</NavItem>
            <NavItem eventKey={2} ref="item2" className="baz">Item 2 content</NavItem>
          </Nav>
        </CollapsableNav>
      </Navbar>
    );
    var classDOM = ReactTestUtils.findRenderedDOMComponentWithTag(instance.refs.collapsable_object, 'DIV').props.className
        , class_array = classDOM.split(" ")
        , idx = class_array.indexOf('navbar-collapse');
    assert.equal(class_array.indexOf('navbar-collapse',idx+1), -1);
  });
});
