import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Navbar from '../src/Navbar';
import NavBrand from '../src/NavBrand';
import Nav from '../src/Nav';
import {shouldWarn} from './helpers';

describe('Navbar', () => {

  it('Should create nav element', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar />
    );
    let nav = React.findDOMNode(instance);
    assert.equal(nav.nodeName, 'NAV');
    assert.ok(nav.className.match(/\bnavbar\b/));
    assert.ok(nav.getAttribute('role'), 'navigation');
  });

  it('Should add fixedTop variation class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar fixedTop />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-fixed-top'));
  });

  it('Should add fixedBottom variation class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar fixedBottom />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-fixed-bottom'));
  });

  it('Should add staticTop variation class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar staticTop />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-static-top'));
  });

  it('Should add inverse variation class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar inverse />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-inverse'));
  });

  it('Should add fluid variation class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar fluid />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'container-fluid'));
  });

  it('Should override role attribute', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar role="banner"/>
    );
    assert.ok(React.findDOMNode(instance).getAttribute('role'), 'banner');
  });

  it('Should override node class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar componentClass={'header'}/>
    );
    assert.equal(React.findDOMNode(instance).nodeName, 'HEADER');
  });

  it('Should throw a deprecation warning message when brand is passed', () => {
    ReactTestUtils.renderIntoDocument(
      <Navbar brand="Brand" />
    );
    shouldWarn('deprecated');
  });

  it('Should add header with brand', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar brand="Brand" />
    );

    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);

    let brand = ReactTestUtils.findRenderedDOMComponentWithClass(header, 'navbar-brand');

    assert.ok(brand);
    assert.equal(React.findDOMNode(brand).nodeName, 'SPAN');
    assert.equal(React.findDOMNode(brand).innerText, 'Brand');
  });

  it('Should add span element with navbar-brand class using NavBrand Component', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <NavBrand>Brand</NavBrand>
      </Navbar>
    );

    let brand = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-brand');

    assert.ok(brand);
    assert.equal(React.findDOMNode(brand).nodeName, 'SPAN');
    assert.equal(React.findDOMNode(brand).innerText, 'Brand');
  });

  it('Should add header with brand component', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar brand={<a>Brand</a>} />
    );

    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);

    let brand = ReactTestUtils.findRenderedDOMComponentWithClass(header, 'navbar-brand');

    assert.ok(brand);
    assert.equal(React.findDOMNode(brand).nodeName, 'A');
    assert.equal(React.findDOMNode(brand).innerText, 'Brand');
  });

  it('Should add link element with navbar-brand class using NavBrand Component', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <NavBrand><a>Brand</a></NavBrand>
      </Navbar>
    );

    let brand = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-brand');

    assert.ok(brand);
    assert.equal(React.findDOMNode(brand).nodeName, 'A');
    assert.equal(React.findDOMNode(brand).innerText, 'Brand');
  });

  it('Should add only one element with navbar-brand class using NavBrand Component', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar brand="Brand">
        <NavBrand>Brand</NavBrand>
      </Navbar>
    );

    let brands = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'navbar-brand');

    assert.equal(brands.length, 1);
    assert.equal(React.findDOMNode(brands[0]).nodeName, 'SPAN');
    assert.equal(React.findDOMNode(brands[0]).innerText, 'Brand');
  });

  it('Should pass navbar prop to navs', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Nav />
      </Navbar>
    );

    let nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);

    assert.ok(nav.props.navbar);
  });

  it('Should pass nav prop to ul', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Nav />
    );

    let navNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav'));
    assert.ok(navNode);
    assert.equal(navNode.nodeName, 'UL');
    assert.equal(navNode.parentNode.nodeName, 'NAV');

    instance.setProps({navbar: true});

    navNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'nav'));
    assert.ok(navNode);
    assert.equal(navNode.nodeName, 'UL');
    assert.equal(navNode.parentNode.nodeName, 'DIV');
  });

  it('Should add header when toggleNavKey is 0', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={0}>
        <Nav eventKey={0} />
      </Navbar>
    );

    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);
  });

  it('Should add header when toggleNavKey is 1', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={1}>
        <Nav eventKey={1} />
      </Navbar>
    );

    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);
  });

  it('Should add header when toggleNavKey is string', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={'string'}>
        <Nav eventKey={'string'} />
      </Navbar>
    );

    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    assert.ok(header);
  });

  it('Should show toggle button when using NavBrand', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar toggleNavKey={0}>
        <NavBrand>Brand</NavBrand>
        <Nav eventKey={0} />
      </Navbar>
    );

    const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance, 'navbar-toggle'
    );
    expect(toggle).to.be.ok;
  });
});
