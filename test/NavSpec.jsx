/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Nav            = require('../cjs/Nav');
var NavItem        = require('../cjs/NavItem');

describe('Nav', function () {
  it('Should set the correct item active', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav bsStyle="pills" activeKey={1}>
            <NavItem key={1} ref="item1">Pill 1 content</NavItem>
            <NavItem key={2} ref="item2">Pill 2 content</NavItem>
          </Nav>
        );
    assert.ok(instance.refs.item1.props.active);
    assert.notOk(instance.refs.item2.props.active);
  });

  it('Should adds style class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav bsStyle="tabs" activeKey={1}>
            <NavItem key={1} ref="item1">Tab 1 content</NavItem>
            <NavItem key={2} ref="item2">Tab 2 content</NavItem>
          </Nav>
        );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-tabs'));
  });

  it('Should adds stacked variation class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav bsStyle="tabs" stacked activeKey={1}>
            <NavItem key={1} ref="item1">Tab 1 content</NavItem>
            <NavItem key={2} ref="item2">Tab 2 content</NavItem>
          </Nav>
        );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-stacked'));
  });

  it('Should adds variation class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav bsStyle="tabs" justified activeKey={1}>
            <NavItem key={1} ref="item1">Tab 1 content</NavItem>
            <NavItem key={2} ref="item2">Tab 2 content</NavItem>
          </Nav>
        );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-justified'));
  });

  it('Should call on select when item is selected', function (done) {
    function handleSelect(key) {
      assert.equal(key, 2);
      done();
    }
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav bsStyle="tabs" activeKey={1} onSelect={handleSelect}>
            <NavItem key={1} ref="item1">Tab 1 content</NavItem>
            <NavItem key={2} ref="item2"><span>Tab 2 content</span></NavItem>
          </Nav>
        );
    ReactTestUtils.Simulate.click(instance.refs.item2.refs.anchor);
  });

  it('Should set the correct item active by href', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav bsStyle="pills" activeHref="#item2">
            <NavItem key={1} ref="item1" href="#item1">Pill 1 content</NavItem>
            <NavItem key={2} ref="item2" href="#item2">Pill 2 content</NavItem>
          </Nav>
        );
    assert.ok(instance.refs.item2.props.active);
    assert.notOk(instance.refs.item1.props.active);
  });
});
