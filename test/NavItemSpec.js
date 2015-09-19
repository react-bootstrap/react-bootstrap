import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import NavItem from '../src/NavItem';

describe('NavItem', () => {
  it('Should add active class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem active={true}>
        Item content
      </NavItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });

  it('Should add disabled class', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem disabled={true}>
        Item content
      </NavItem>
    );
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'disabled'));
  });

  it('Should add DOM properties', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem href="/some/unique-thing/" title="content">
        Item content
      </NavItem>
    );
    let linkElement = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.ok(linkElement.href.indexOf('/some/unique-thing/') >= 0);
    assert.equal(linkElement.title, 'content');
  });

  it('Should not add anchor properties to li', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem href='/hi' title='boom!'>
        Item content
      </NavItem>
    );

    assert.ok(!React.findDOMNode(instance).hasAttribute('href'));
    assert.ok(!React.findDOMNode(instance).hasAttribute('title'));
  });

  it('Should pass tabIndex to the anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <NavItem href='/hi' tabIndex='3' title='boom!'>
        Item content
      </NavItem>
    );

    let node = React.findDOMNode(instance);

    expect(node.hasAttribute('tabindex')).to.equal(false);
    expect(node.firstChild.getAttribute('tabindex')).to.equal('3');

  });

  it('Should call `onSelect` when item is selected', (done) => {
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

  it('Should not call `onSelect` when item disabled and is selected', () => {
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

  it('Should set target attribute on anchor', () => {
    let instance = ReactTestUtils.renderIntoDocument(
          <NavItem href="/some/unique-thing/" target="_blank">Item content</NavItem>
        );
    let linkElement = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkElement.target, '_blank');
  });

  it('Should call `onSelect` with target attribute', (done) => {
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

  it('Should set role="button" when href=="#"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
          <NavItem href="#" target="_blank">Item content</NavItem>
        );

    let linkElement = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert(linkElement.outerHTML.match('role="button"'), true);
  });

  it('Should not set role when href!="#"', () => {
    let instance = ReactTestUtils.renderIntoDocument(
          <NavItem href="/path/to/stuff" target="_blank">Item content</NavItem>
        );

    let linkElement = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkElement.outerHTML.match('role="button"'), null);
  });

  describe('Web Accessibility', () => {

    it('Should pass aria-controls to the link', () => {
      let instance = ReactTestUtils.renderIntoDocument(
          <NavItem href="/path/to/stuff" target="_blank" aria-controls='hi'>Item content</NavItem>
        );

      let linkElement = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));

      assert.ok(linkElement.hasAttribute('aria-controls'));
    });

    it('Should add aria-selected to the link', () => {
      let instance = ReactTestUtils.renderIntoDocument(
          <NavItem active>Item content</NavItem>
        );

      let linkElement = React.findDOMNode(
        ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));

      assert.equal(linkElement.getAttribute('aria-selected'), 'true');
    });

    it('Should pass role down', () => {
      let instance = ReactTestUtils.renderIntoDocument(
          <NavItem role='tab'>Item content</NavItem>
        );

      let linkElement = React.findDOMNode(
        ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));

      assert.equal(linkElement.getAttribute('role'), 'tab');
    });
  });

});
