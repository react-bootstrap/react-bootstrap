import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Navbar from '../src/Navbar';
import Nav from '../src/Nav';

describe('Nav', function () {

  it('Should create nav element', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar />
    );
    let nav = instance.getDOMNode();
    assert.equal(nav.nodeName, 'NAV');
    assert.ok(nav.className.match(/\bnavbar\b/));
    assert.ok(nav.getAttribute('role'), 'navigation');
  });

  it('Should add fixedTop variation class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar fixedTop />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-fixed-top'));
  });

  it('Should add fixedBottom variation class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar fixedBottom />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-fixed-bottom'));
  });

  it('Should add staticTop variation class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar staticTop />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-static-top'));
  });

  it('Should add inverse variation class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar inverse />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-inverse'));
  });

  it('Should add fluid variation class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar fluid />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'container-fluid'));
  });

  it('Should override role attribute', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar role="banner"/>
    );
    assert.ok(instance.getDOMNode().getAttribute('role'), 'banner');
  });

  it('Should override node class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar componentClass={'header'}/>
    );
    assert.ok(instance.getDOMNode().nodeName, 'HEADER');
  });

  it('Should add header with brand', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar brand="Brand" />
    );

    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);

    let brand = ReactTestUtils.findRenderedDOMComponentWithClass(header, 'navbar-brand');

    assert.ok(brand);
    assert.equal(brand.getDOMNode().innerText, 'Brand');
  });

  it('Should add header with brand component', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar brand={<a>Brand</a>} />
    );

    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);

    let brand = ReactTestUtils.findRenderedDOMComponentWithClass(header, 'navbar-brand');

    assert.ok(brand);
    assert.equal(brand.getDOMNode().nodeName, 'A');
    assert.equal(brand.getDOMNode().innerText, 'Brand');
  });

  it('Should pass navbar prop to navs', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar brand="Brand">
        <Nav />
      </Navbar>
    );

    let nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);

    assert.ok(nav.props.navbar);
  });

  it('Should pass nav prop to ul', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav />
    );

    let navNode = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav').getDOMNode();
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
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={0}>
        <Nav eventKey={0} />
      </Navbar>
    );

    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);
  });

  it('Should add header when toggleNavKey is 1', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={1}>
        <Nav eventKey={1} />
      </Navbar>
    );

    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);
  });

  it('Should add header when toggleNavKey is string', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={'string'}>
        <Nav eventKey={'string'} />
      </Navbar>
    );

    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);
  });
});
