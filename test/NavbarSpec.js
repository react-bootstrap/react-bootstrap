import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import Nav from '../src/Nav';
import Navbar from '../src/Navbar';

import { getOne, shouldWarn } from './helpers';
import utils from '../src/utils/bootstrapUtils';

describe('Navbar', () => {

  it('Should create nav element', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar />
    );
    let nav = ReactDOM.findDOMNode(instance);
    assert.equal(nav.nodeName, 'NAV');
    assert.ok(nav.className.match(/\bnavbar\b/));
    assert.ok(!nav.getAttribute('role'));
  });

  it('Should add "navigation" role when not using a `<nav>`', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar componentClass='div' />
    );
    let nav = ReactDOM.findDOMNode(instance);
    assert.equal(nav.nodeName, 'DIV');
    assert.ok(nav.getAttribute('role') === 'navigation');
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

  it('Should not add default class along with custom styles', () => {
    utils.addStyle(Navbar, ['custom']);

    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar bsStyle='custom' />
    );

    expect(() => ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-default'))
      .to.throw();
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
    assert.ok(ReactDOM.findDOMNode(instance).getAttribute('role'), 'banner');
  });

  it('Should override node class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar componentClass={'header'}/>
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'HEADER');
  });

  it('Should add header with brand', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>Brand</Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );

    let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    let brand = getOne(header.getElementsByClassName('navbar-brand'));

    assert.ok(brand);
    assert.equal(brand.nodeName, 'SPAN');
    assert.equal(brand.innerText, 'Brand');
  });

  it('Should add link element with navbar-brand class using NavBrand Component', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand><a>Brand</a></Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );

    let brand = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-brand');

    assert.ok(brand);
    assert.equal(brand.nodeName, 'A');
    assert.equal(brand.innerText, 'Brand');
  });

  it('Should pass navbar context to navs', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Nav />
      </Navbar>
    );

    let nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);

    assert.ok(nav.context.$bs_navbar);
  });

  it('Should add default toggle', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-toggle');
    ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'icon-bar');
  });

  it('Should add custom toggle', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle>
            <span className='test'>hi</span>
          </Navbar.Toggle>
        </Navbar.Header>
      </Navbar>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-toggle');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'test');
  });

  it('Should trigger onToggle', () => {
    let toggleSpy = sinon.spy();
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar onToggle={toggleSpy}>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );

    let toggle = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-toggle');

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(toggle));

    expect(toggleSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledWith(true);
  });

  it('Should render collapse', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Collapse>
          hello
        </Navbar.Collapse>
      </Navbar>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-collapse');
  });

  it('Should pass expanded to Collapse', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar defaultExpanded>
        <Navbar.Collapse>
          hello
        </Navbar.Collapse>
      </Navbar>
    );

    let collapse = ReactTestUtils.findRenderedComponentWithType(instance, Navbar.Collapse);

    expect(collapse.context.$bs_navbar_expanded).to.equal(true);
  });

  it('Should wire the toggle to the collapse', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          hello
        </Navbar.Collapse>
      </Navbar>
    );

    let toggle = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-toggle');
    let collapse = ReactTestUtils.findRenderedComponentWithType(instance, Navbar.Collapse);

    expect(collapse.context.$bs_navbar_expanded).to.not.be.ok;

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(toggle));

    expect(collapse.context.$bs_navbar_expanded).to.equal(true);
  });

  it('Should pass `bsClass` down to sub components', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Navbar bsClass='my-navbar'>
        <Navbar.Header>
          <Navbar.Brand />
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form/>
          <Navbar.Text/>
          <Navbar.Link/>
          <Nav pullRight/>
        </Navbar.Collapse>
      </Navbar>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-navbar');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-navbar-header');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-navbar-brand');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-navbar-toggle');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-navbar-text');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-navbar-link');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-navbar-form');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-navbar-collapse');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-navbar-nav');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'my-navbar-right');
  });

  describe('deprecations', ()=> {
    it('Should add header with brand', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Navbar brand="Brand" />
      );

      let header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

      assert.ok(header);

      let brand = getOne(header.getElementsByClassName('navbar-brand'));

      assert.ok(brand);
      assert.equal(brand.nodeName, 'SPAN');
      assert.equal(brand.innerText, 'Brand');

      shouldWarn('deprecated');
    });

    it('Should add header when toggleNavKey is 0', () => {
      let instance = ReactTestUtils.renderIntoDocument(
        <Navbar toggleNavKey={0}>
          <Nav eventKey={0} />
        </Navbar>
      );

      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-toggle');

      shouldWarn('deprecated');
    });
  });

});
