import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import BreadcrumbItem from '../src/BreadcrumbItem';

describe('BreadcrumbItem', function () {
  it('Should add active class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem active>
        Active Crumb
      </BreadcrumbItem>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));
  });

  it('Should not add active class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem>
        Crumb
      </BreadcrumbItem>
    );

    let liNode = React.findDOMNode(instance);
    assert.notInclude(liNode.className, 'active');
  });

  it('Should add custom classes', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem className="custom-one custom-two" active>
        Active Crumb
      </BreadcrumbItem>
    );

    let liNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'active'));

    let classes = liNode.className;
    assert.include(classes, 'active');
    assert.include(classes, 'custom-one');
    assert.include(classes, 'custom-two');
  });

  it('Should spread props onto an active item', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem herpa='derpa' active>
        Active Crumb
      </BreadcrumbItem>
    );

    let spanNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'span');

    spanNode.props.herpa.should.equal('derpa');
  });

  it('Should spread props onto anchor', function(done) {
    const handleClick = () => {
      done();
    };

    let instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='#' onClick={handleClick} herpa='derpa'>
        Crumb 1
      </BreadcrumbItem>
    );

    let anchorNode = ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a');
    ReactTestUtils.Simulate.click(anchorNode);

    anchorNode.props.herpa.should.equal('derpa');
  });

  it('Should add id for li element', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='#' id='test-li-id'>
        Crumb 1
      </BreadcrumbItem>
    );

    let liNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'li'));
    assert.equal(liNode.id, 'test-li-id');
  });

  it('Should add linkId', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='#' linkId='test-link-id'>
        Crumb 1
      </BreadcrumbItem>
    );

    let linkNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkNode.id, 'test-link-id');
  });

  it('Should add href', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem href='http://getbootstrap.com/components/#breadcrumbs'>
        Crumb 1
      </BreadcrumbItem>
    );

    let linkNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkNode.href, 'http://getbootstrap.com/components/#breadcrumbs');
  });

  it('Should have a title', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem title='test-title' href='http://getbootstrap.com/components/#breadcrumbs'>
        Crumb 1
      </BreadcrumbItem>
    );

    let linkNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkNode.title, 'test-title');
  });

  it('Should not add anchor properties to li', function() {
    let instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem title='test-title' href='/hi'>
        Crumb 1
      </BreadcrumbItem>
    );

    let liNode = React.findDOMNode(instance);
    assert.notOk(liNode.hasAttribute('href'));
    assert.notOk(liNode.hasAttribute('title'));
  });

  it('Should set target attribute on anchor', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <BreadcrumbItem target='_blank' href='http://getbootstrap.com/components/#breadcrumbs'>
        Crumb 1
      </BreadcrumbItem>
    );

    let linkNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'a'));
    assert.equal(linkNode.target, '_blank');
  });
});
