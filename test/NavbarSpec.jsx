/** @jsx React.DOM */
/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Nav            = require('../cjs/Navbar');

describe('Nav', function () {

  it('Should create nav element', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav />
        );
    var nav = instance.getDOMNode();
    assert.equal(nav.nodeName, 'NAV');
    assert.ok(nav.className.match(/\bnavbar\b/));
    assert.ok(nav.getAttribute('role'), 'navigation');
  });

  it('Should add fixedTop variation class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav fixedTop />
        );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-fixed-top'));
  });

  it('Should add fixedBottom variation class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav fixedBottom />
        );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-fixed-bottom'));
  });

  it('Should add staticTop variation class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav staticTop />
        );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-static-top'));
  });

  it('Should add inverse variation class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav inverse />
        );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-inverse'));
  });

  it('Should override role attribute', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav role="banner"/>
        );
    assert.ok(instance.getDOMNode().getAttribute('role'), 'banner');
  });

  it('Should override node class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
          <Nav componentClass={React.DOM.header}/>
        );
    assert.ok(instance.getDOMNode().nodeName, 'HEADER');
  });
});
