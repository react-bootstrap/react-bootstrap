import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';

import Breadcrumb from '../src/Breadcrumb';

describe('<Breadcrumb.Item>', () => {
  it('Should render `a` as inner element when is not active', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.notInclude(ReactDOM.findDOMNode(instance).className, 'active');
  });

  it('Should render `span.active` with `active` attribute set.', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'active');
    assert.ok(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span'));
  });

  it('Should render `span.active` when active and has href', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb.Item href="#" active>
        Active Crumb
      </Breadcrumb.Item>
    );

    assert.include(ReactDOM.findDOMNode(instance).className, 'active');

    const spanNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'span'
    );
    assert.ok(spanNode);
    assert.notOk(spanNode.hasAttribute('href'));

    assert.lengthOf(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'a'),
      0
    );
  });

  it('Should add custom classes onto `li` wrapper element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb.Item className="custom-one custom-two">
        Active Crumb
      </Breadcrumb.Item>
    );

    const classes = ReactDOM.findDOMNode(instance).className;
    assert.include(classes, 'custom-one');
    assert.include(classes, 'custom-two');
  });

  it('Should spread additional props onto inner element', done => {
    const handleClick = () => {
      done();
    };

    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb.Item href="#" onClick={handleClick}>
        Crumb
      </Breadcrumb.Item>
    );

    const anchorNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'a'
    );
    ReactTestUtils.Simulate.click(anchorNode);
  });

  it('Should apply id onto the anchor', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'a'
    );
    assert.equal(linkNode.id, 'test-link-id');
  });

  it('Should apply `href` property onto `a` inner element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
        Crumb
      </Breadcrumb.Item>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'a'
    );
    assert.equal(
      linkNode.href,
      'http://getbootstrap.com/components/#breadcrumbs'
    );
  });

  it('Should apply `title` property onto `a` inner element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb.Item
        title="test-title"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'a'
    );
    assert.equal(linkNode.title, 'test-title');
  });

  it('Should not apply properties for inner `anchor` onto `li` wrapper element', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb.Item title="test-title" href="/hi">
        Crumb
      </Breadcrumb.Item>
    );

    const liNode = ReactDOM.findDOMNode(instance);
    assert.notOk(liNode.hasAttribute('href'));
    assert.notOk(liNode.hasAttribute('title'));
  });

  it('Should set `target` attribute on `anchor`', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb.Item
        target="_blank"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>
    );

    const linkNode = ReactTestUtils.findRenderedDOMComponentWithTag(
      instance,
      'a'
    );
    assert.equal(linkNode.target, '_blank');
  });
});
