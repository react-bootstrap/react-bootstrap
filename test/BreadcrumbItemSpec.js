import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import BreadcrumbItem from '../src/BreadcrumbItem';
import { shouldWarn } from './helpers';

describe('BreadcrumbItem', () => {
  it('Should warn if `active` and `href` attributes set', () => {
    ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='#' active>
        Crumb
      </BreadcrumbItem>
    );

    shouldWarn('[react-bootstrap] `href` and `active` properties cannot be set at the same time');
  });

  it('Should render `a` as inner element when is not active', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='#'>
        Crumb
      </BreadcrumbItem>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.notInclude(React.findDOMNode(instance).className, 'active');
  });

  it('Should add `active` class with `active` attribute set.', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem active>
        Active Crumb
      </BreadcrumbItem>
    );

    assert.include(React.findDOMNode(instance).className, 'active');
  });

  it('Should render `span` as inner element when is active', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem active>
        Crumb
      </BreadcrumbItem>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
  });

  it('Should add custom classes onto `li` wrapper element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem className="custom-one custom-two">
        Active Crumb
      </BreadcrumbItem>
    );

    const classes = React.findDOMNode(instance).className;
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

    assert.equal(React.findDOMNode(instance).id, 'test-li-id');
  });

  it('Should apply id onto `a` inner alement via `linkId` property', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='#' linkId='test-link-id'>
        Crumb
      </BreadcrumbItem>
    );

    const linkNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkNode.id, 'test-link-id');
  });

  it('Should apply `href` property onto `a` inner element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='http://getbootstrap.com/components/#breadcrumbs'>
        Crumb
      </BreadcrumbItem>
    );

    const linkNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkNode.href, 'http://getbootstrap.com/components/#breadcrumbs');
  });

  it('Should apply `title` property onto `a` inner element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem title='test-title' href='http://getbootstrap.com/components/#breadcrumbs'>
        Crumb
      </BreadcrumbItem>
    );

    const linkNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkNode.title, 'test-title');
  });

  it('Should not apply properties for inner `anchor` onto `li` wrapper element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem title='test-title' href='/hi'>
        Crumb
      </BreadcrumbItem>
    );

    const liNode = React.findDOMNode(instance);
    assert.notOk(liNode.hasAttribute('href'));
    assert.notOk(liNode.hasAttribute('title'));
  });

  it('Should set `target` attribute on `anchor`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem target='_blank' href='http://getbootstrap.com/components/#breadcrumbs'>
        Crumb
      </BreadcrumbItem>
    );

    const linkNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkNode.target, '_blank');
  });
});
