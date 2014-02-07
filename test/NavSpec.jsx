/** @jsx React.DOM */
/*global describe, beforeEach, afterEach, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Nav            = require('../cjs/Nav');
var NavItem        = require('../cjs/NavItem');

describe('Nav', function () {
  it('Should set the correct item active', function () {
    var instance = (
        <Nav bsStyle="pills" activeKey={1}>
          <NavItem key={1} ref="item1">Pill 1 content</NavItem>
          <NavItem key={2} ref="item2">Pill 2 content</NavItem>
        </Nav>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(instance.refs.item1.props.isActive);
    assert.notOk(instance.refs.item2.props.isActive);
  });

  it('Should adds style class', function () {
    var instance = (
        <Nav bsStyle="tabs" activeKey={1}>
          <NavItem key={1} ref="item1">Tab 1 content</NavItem>
          <NavItem key={2} ref="item2">Tab 2 content</NavItem>
        </Nav>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav'));
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-tabs'));
  });

  it('Should adds variation class', function () {
    var instance = (
        <Nav bsStyle="tabs" bsVariation="stacked" activeKey={1}>
          <NavItem key={1} ref="item1">Tab 1 content</NavItem>
          <NavItem key={2} ref="item2">Tab 2 content</NavItem>
        </Nav>
      );

    ReactTestUtils.renderIntoDocument(instance);
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav-stacked'));
  });

  it('Should call on select when item is selected', function (done) {
    function handleSelect(key) {
      assert.equal(key, 2);
      done();
    }
    var tab2 = <span>Tab 2 content</span>;
    var instance = (
      <Nav bsStyle="tabs" activeKey={1} onSelect={handleSelect}>
        <NavItem key={1} ref="item1">Tab 1 content</NavItem>
        <NavItem key={2} ref="item2">{tab2}</NavItem>
      </Nav>
      );

    ReactTestUtils.renderIntoDocument(instance);
    ReactTestUtils.Simulate.click(tab2.getDOMNode());
  });
});
