import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import ReactDOM from 'react-dom';

import BreadcrumbItem from '../src/BreadcrumbItem';

describe('BreadcrumbItem', () => {
  it('Should render `a` as inner element when is not active', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='#'>
        Crumb
      </BreadcrumbItem>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.notInclude(ReactDOM.findDOMNode(instance).className, 'active');
  });

  it('Should render `span.active` with `active` attribute set.', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem active>
        Active Crumb
      </BreadcrumbItem>
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'active');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
  });

  it('Should render `span.active` when active and has href', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href="#" active>
        Active Crumb
      </BreadcrumbItem>
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'active');

    const spanNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span');
    assert.ok(spanNode);
    assert.notOk(spanNode.hasAttribute('href'));

    assert.lengthOf(ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a'), 0);
  });

  it('Should add custom classes onto `li` wrapper element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem className="custom-one custom-two">
        Active Crumb
      </BreadcrumbItem>
    );

    const classes = ReactDOM.findDOMNode(instance).className;
    assert.include(classes, 'custom-one');
    assert.include(classes, 'custom-two');
  });

  it('Should spread additional props onto inner element', (done) => {
    const handleClick = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='#' onClick={handleClick}>
        Crumb
      </BreadcrumbItem>
    );

    const anchorNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    ReactTestUtils.Simulate.click(anchorNode);
  });

  it('Should apply id onto `li` wrapper element via `id` property', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='#' id='test-li-id'>
        Crumb
      </BreadcrumbItem>
    );

    assert.equal(ReactDOM.findDOMNode(instance).id, 'test-li-id');
  });

  it('Should apply id onto `a` inner alement via `linkId` property', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='#' linkId='test-link-id'>
        Crumb
      </BreadcrumbItem>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(linkNode.id, 'test-link-id');
  });

  it('Should apply `href` property onto `a` inner element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='http://getbootstrap.com/components/#breadcrumbs'>
        Crumb
      </BreadcrumbItem>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(linkNode.href, 'http://getbootstrap.com/components/#breadcrumbs');
  });

  it('Should apply `title` property onto `a` inner element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem title='test-title' href='http://getbootstrap.com/components/#breadcrumbs'>
        Crumb
      </BreadcrumbItem>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(linkNode.title, 'test-title');
  });

  it('Should not apply properties for inner `anchor` onto `li` wrapper element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem title='test-title' href='/hi'>
        Crumb
      </BreadcrumbItem>
    );

    const liNode = ReactDOM.findDOMNode(instance);
    assert.notOk(liNode.hasAttribute('href'));
    assert.notOk(liNode.hasAttribute('title'));
  });

  it('Should set `target` attribute on `anchor`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem target='_blank' href='http://getbootstrap.com/components/#breadcrumbs'>
        Crumb
      </BreadcrumbItem>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    assert.equal(linkNode.target, '_blank');
  });
});
