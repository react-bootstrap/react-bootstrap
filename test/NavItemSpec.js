import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import NavItem from '../src/NavItem';

describe('NavItem', function () {
  it('Should add active class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem active={true}>
        Item content
      </NavItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });

  it('Should add disabled class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem disabled={true}>
        Item content
      </NavItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
  });

  it('Should add DOM properties', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem href="/some/unique-thing/" title="content">
        Item content
      </NavItem>
    );
    let linkElement = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.ok(linkElement.href.indexOf('/some/unique-thing/') >= 0);
    assert.equal(linkElement.title, 'content');
  });

  it('Should not add anchor properties to li', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem href='/hi' title='boom!'>
        Item content
      </NavItem>
    );

    assert.ok(!React.findDOMNode(instance).hasAttribute('href'));
    assert.ok(!React.findDOMNode(instance).hasAttribute('title'));
  });

  it('Should call `onSelect` when item is selected', function (done) {
    function handleSelect(key) {
      assert.equal(key, '2');
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem eventKey='2' onSelect={handleSelect}>
        <span>Item content</span>
      </NavItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
  });

  it('Should not call `onSelect` when item disabled and is selected', function () {
    function handleSelect() {
      throw new Error('onSelect should not be called');
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem disabled={true} onSelect={handleSelect}>
        <span>Item content</span>
      </NavItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
  });

  it('Should set target attribute on anchor', function () {
    let instance = ReactTestUtils.renderIntoDocument(
          <NavItem href="/some/unique-thing/" target="_blank">Item content</NavItem>
        );
    let linkElement = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkElement.target, '_blank');
  });

  it('Should call `onSelect` with target attribute', function (done) {
    function handleSelect(key, href, target) {
      assert.equal(target, '_blank');
      done();
    }
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem onSelect={handleSelect} target="_blank">
        <span>Item content</span>
      </NavItem>
    );
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
  });

  it('Should set role="button" when href=="#"', function () {
    let instance = ReactTestUtils.renderIntoDocument(
          <NavItem href="#" target="_blank">Item content</NavItem>
        );

    let linkElement = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert(linkElement.outerHTML.match('role="button"'), true);
  });

  it('Should not set role when href!="#"', function () {
    let instance = ReactTestUtils.renderIntoDocument(
          <NavItem href="/path/to/stuff" target="_blank">Item content</NavItem>
        );

    let linkElement = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkElement.outerHTML.match('role="button"'), null);
  });

  describe('Web Accessibility', function(){

    it('Should pass aria-controls to the link', function () {
      let instance = ReactTestUtils.renderIntoDocument(
          <NavItem href="/path/to/stuff" target="_blank" aria-controls='hi'>Item content</NavItem>
        );

      let linkElement = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));

      assert.ok(linkElement.hasAttribute('aria-controls'));
    });

    it('Should add aria-selected to the link', function () {
      let instance = ReactTestUtils.renderIntoDocument(
          <NavItem active>Item content</NavItem>
        );

      let linkElement = React.findDOMNode(
        ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));

      assert.equal(linkElement.getAttribute('aria-selected'), 'true');
    });

    it('Should pass role down', function () {
      let instance = ReactTestUtils.renderIntoDocument(
          <NavItem role='tab'>Item content</NavItem>
        );

      let linkElement = React.findDOMNode(
        ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));

      assert.equal(linkElement.getAttribute('role'), 'tab');
    });
  });

});
