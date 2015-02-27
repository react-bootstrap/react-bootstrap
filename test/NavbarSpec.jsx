/*global describe, it, assert */

var React          = require('react');
var ReactTestUtils = require('react/lib/ReactTestUtils');
var Navbar         = require('../lib/Navbar');
var Nav            = require('../lib/Nav');

describe('Nav', function () {

  it('Should create nav element', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar />
    );
    var nav = instance.getDOMNode();
    assert.equal(nav.nodeName, 'NAV');
    assert.ok(nav.className.match(/\bnavbar\b/));
    assert.ok(nav.getAttribute('role'), 'navigation');
  });

  it('Should add fixedTop variation class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar fixedTop />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-fixed-top'));
  });

  it('Should add fixedBottom variation class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar fixedBottom />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-fixed-bottom'));
  });

  it('Should add staticTop variation class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar staticTop />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-static-top'));
  });

  it('Should add inverse variation class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar inverse />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-inverse'));
  });

  it('Should add fluid variation class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar fluid />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'container-fluid'));
  });

  it('Should override role attribute', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar role="banner"/>
    );
    assert.ok(instance.getDOMNode().getAttribute('role'), 'banner');
  });

  it('Should override node class', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar componentClass={'header'}/>
    );
    assert.ok(instance.getDOMNode().nodeName, 'HEADER');
  });

  it('Should add header with brand', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar brand="Brand" />
    );

    var header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);

    var brand = ReactTestUtils.findRenderedDOMComponentWithClass(header, 'navbar-brand');

    assert.ok(brand);
    assert.equal(brand.getDOMNode().innerText, 'Brand');
  });

  it('Should add header with brand component', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar brand={<a>Brand</a>} />
    );

    var header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);

    var brand = ReactTestUtils.findRenderedDOMComponentWithClass(header, 'navbar-brand');

    assert.ok(brand);
    assert.equal(brand.getDOMNode().nodeName, 'A');
    assert.equal(brand.getDOMNode().innerText, 'Brand');
  });

  it('Should pass navbar prop to navs', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar brand="Brand">
        <Nav ref="nav"/>
      </Navbar>
    );

    assert.ok(instance.refs.nav.props.navbar);
  });

  it('Should pass nav prop to ul', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Nav />
    );

    var navNode = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav').getDOMNode();
    assert.ok(navNode);
    assert.equal(navNode.nodeName, 'UL');
    assert.equal(navNode.parentNode.nodeName, 'NAV');

    instance.setProps({navbar: true});

    navNode = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav').getDOMNode();
    assert.ok(navNode);
    assert.equal(navNode.nodeName, 'UL');
    assert.equal(navNode.parentNode.nodeName, 'DIV');
  });

  it('Should add header when toggleNavKey is 0', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={0}>
        <Nav eventKey={0}>
        </Nav>
      </Navbar>
    );

    var header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);
  });

  it('Should add header when toggleNavKey is 1', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={1}>
        <Nav eventKey={1}>
        </Nav>
      </Navbar>
    );

    var header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);
  });

  it('Should add header when toggleNavKey is string', function () {
    var instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={'string'}>
        <Nav eventKey={'string'}>
        </Nav>
      </Navbar>
    );

    var header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);
  });
});
