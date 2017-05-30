import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Nav from '../src/Nav';
import Navbar from '../src/Navbar';
import NavItem from '../src/NavItem';

import { addStyle } from '../src/utils/bootstrapUtils';

import { getOne } from './helpers';

describe('<Navbar>', () => {
  it('Should create nav element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar />
    );
    const nav = ReactDOM.findDOMNode(instance);
    assert.equal(nav.nodeName, 'NAV');
    assert.ok(nav.className.match(/\bnavbar\b/));
    assert.notOk(nav.getAttribute('role'));
  });

  it('Should add "navigation" role when not using a `<nav>`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar componentClass="div" />
    );
    const nav = ReactDOM.findDOMNode(instance);
    assert.equal(nav.nodeName, 'DIV');
    assert.ok(nav.getAttribute('role') === 'navigation');
  });

  it('Should add fixedTop variation class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar fixedTop />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-fixed-top'));
  });

  it('Should add fixedBottom variation class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar fixedBottom />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-fixed-bottom'));
  });

  it('Should add staticTop variation class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar staticTop />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-static-top'));
  });

  it('Should add inverse variation class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar inverse />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-inverse'));
  });

  it('Should not add default class along with custom styles', () => {
    addStyle(Navbar, 'custom');

    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar bsStyle="custom" />
    );

    expect(() => ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-default'))
      .to.throw();
  });

  it('Should add fluid variation class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar fluid />
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'container-fluid'));
  });

  it('Should override role attribute', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar role="banner" />
    );
    assert.ok(ReactDOM.findDOMNode(instance).getAttribute('role'), 'banner');
  });

  it('Should override node class', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar componentClass="header" />
    );
    assert.equal(ReactDOM.findDOMNode(instance).nodeName, 'HEADER');
  });

  it('Should add header with brand', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>Brand</Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );

    const header = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-header');

    const brand = getOne(header.getElementsByClassName('navbar-brand'));

    assert.ok(brand);
    assert.equal(brand.nodeName, 'SPAN');
    assert.equal(brand.textContent, 'Brand');
  });

  it('Should add link element with navbar-brand class using NavBrand Component', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand><a>Brand</a></Navbar.Brand>
        </Navbar.Header>
      </Navbar>
    );

    const brand = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-brand');

    assert.ok(brand);
    assert.equal(brand.nodeName, 'A');
    assert.equal(brand.textContent, 'Brand');
  });

  it('Should pass navbar context to navs', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Nav />
      </Navbar>
    );

    const nav = ReactTestUtils.findRenderedComponentWithType(instance, Nav);

    assert.ok(nav.context.$bs_navbar);
  });

  it('Should add default toggle', () => {
    const instance = ReactTestUtils.renderIntoDocument(
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
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle>
            <span className="test">hi</span>
          </Navbar.Toggle>
        </Navbar.Header>
      </Navbar>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-toggle');
    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'test');
  });

  it('Should trigger onToggle', () => {
    const toggleSpy = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar onToggle={toggleSpy}>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
      </Navbar>
    );

    const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-toggle');

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(toggle));

    expect(toggleSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledWith(true);
  });

  it('Should support custom props', () => {
    const clickSpy = sinon.spy();

    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle
            onClick={clickSpy}
            className="foo bar"
            style={{ height: 100 }}
          />
        </Navbar.Header>
      </Navbar>
    );

    const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-toggle');

    expect(toggle.className).to.match(/foo bar/);
    expect(toggle.style.height).to.equal('100px');

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(toggle));
    expect(clickSpy).to.have.been.called;
  });

  it('Should render collapse', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Collapse>
          hello
        </Navbar.Collapse>
      </Navbar>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-collapse');
  });

  it('Should pass expanded to Collapse', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar defaultExpanded>
        <Navbar.Collapse>
          hello
        </Navbar.Collapse>
      </Navbar>
    );

    const collapse = ReactTestUtils.findRenderedComponentWithType(instance, Navbar.Collapse);

    expect(collapse.context.$bs_navbar.expanded).to.equal(true);
  });

  it('Should wire the toggle to the collapse', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          hello
        </Navbar.Collapse>
      </Navbar>
    );

    const toggle = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'navbar-toggle');
    const collapse = ReactTestUtils.findRenderedComponentWithType(instance, Navbar.Collapse);

    expect(collapse.context.$bs_navbar.expanded).to.not.be.ok;
    expect(toggle.className).to.match(/collapsed/);

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(toggle));

    expect(collapse.context.$bs_navbar.expanded).to.equal(true);
    expect(toggle.className).to.not.match(/collapsed/);
  });

  it('Should collapseOnSelect & fire Nav subcomponent onSelect event if expanded', () => {
    const toggleSpy = sinon.spy();
    const navItemSpy = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar collapseOnSelect onToggle={toggleSpy} defaultExpanded>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#" onClick={navItemSpy}>
              <span className="link-text">
                Option 1
              </span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    const link = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'link-text');

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(link));

    expect(navItemSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledOnce;
    expect(toggleSpy).to.be.calledWith(false);
  });

  it('Should fire onSelect with eventKey for nav children', () => {
    const selectSpy = sinon.spy();
    const navItemSpy = sinon.spy();
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar onSelect={selectSpy}>
        <Navbar.Header>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#" onClick={navItemSpy}>
              <span className="onselect-text">
                Option 1
              </span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );

    const link = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'onselect-text');

    ReactTestUtils.Simulate.click(ReactDOM.findDOMNode(link));

    expect(navItemSpy).to.be.calledOnce;
    expect(selectSpy).to.be.calledOnce;
    expect(selectSpy).to.be.calledWith(1);
  });

  it('Should pass `bsClass` down to sub components', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar bsClass="my-navbar">
        <Navbar.Header>
          <Navbar.Brand />
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Navbar.Form />
          <Navbar.Text />
          <Navbar.Link />
          <Nav pullRight />
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

  it('Should add custom className to header', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Navbar>
        <Navbar.Header className="test">
          <Navbar.Brand />
        </Navbar.Header>
      </Navbar>
    );

    ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'test');
  });
});
