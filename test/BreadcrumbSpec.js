import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Breadcrumb from '../src/Breadcrumb';
import BreadcrumbItem from '../src/BreadcrumbItem';

describe('Breadcrumb', function () {
  it('Should able to wrap react component', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb>
        <BreadcrumbItem href="#">
          <span className="custom-span-class">Crumb 1</span>
        </BreadcrumbItem>
        <BreadcrumbItem active>
          <div className="custom-div-class">Active Crumb Component</div>
        </BreadcrumbItem>
      </Breadcrumb>
    );

    let items = ReactTestUtils.scryRenderedDOMComponentsWithTag(instance, 'li');

    let linkNode = React.findDOMNode(items[0]).childNodes[0];
    let spanNode = linkNode.childNodes[0];
    assert.equal(spanNode.className, 'custom-span-class');

    let divNode = React.findDOMNode(items[1]).childNodes[0].childNodes[0];
    assert.equal(divNode.className, 'custom-div-class');
  });

  it('Should apply id to the wrapper ol element', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb id="custom-id" />
    );

    let olNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ol'));
    assert.equal(olNode.id, 'custom-id');
  });

  it('Should have breadcrumb class', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb>
        <BreadcrumbItem href="#">
          Crumb 1
        </BreadcrumbItem>
        <BreadcrumbItem href="http://getbootstrap.com/components/#breadcrumbs">
          Crumb 2
        </BreadcrumbItem>
        <BreadcrumbItem active>
          Active Crumb
        </BreadcrumbItem>
      </Breadcrumb>
    );

    assert.ok(ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'breadcrumb'));

    let olNode = React.findDOMNode(ReactTestUtils.findRenderedDOMComponentWithTag(instance, 'ol'));
    assert.include(olNode.className, 'breadcrumb');
  });

  it('Should have custom classes', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb className="custom-one custom-two">
        <BreadcrumbItem href="#">
          Crumb 1
        </BreadcrumbItem>
        <BreadcrumbItem href="http://getbootstrap.com/components/#breadcrumbs">
          Crumb 2
        </BreadcrumbItem>
        <BreadcrumbItem active>
          Active Crumb
        </BreadcrumbItem>
      </Breadcrumb>
    );

    let olNode = React.findDOMNode(ReactTestUtils.findRenderedComponentWithType(instance, Breadcrumb));

    let classes = olNode.className;
    assert.include(classes, 'breadcrumb');
    assert.include(classes, 'custom-one');
    assert.include(classes, 'custom-two');
  });

  it('Should have a navigation role in ol', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb>
        <BreadcrumbItem href="#">
          Crumb 1
        </BreadcrumbItem>
        <BreadcrumbItem href="http://getbootstrap.com/components/#breadcrumbs">
          Crumb 2
        </BreadcrumbItem>
        <BreadcrumbItem active>
          Active Crumb
        </BreadcrumbItem>
      </Breadcrumb>
    );


    let olNode = React.findDOMNode(ReactTestUtils.findRenderedComponentWithType(instance, Breadcrumb));
    assert.equal(olNode.getAttribute('role'), 'navigation');
  });

  it('Should have a aria-label in ol', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Breadcrumb>
        <BreadcrumbItem href="#">
          Crumb 1
        </BreadcrumbItem>
        <BreadcrumbItem href="http://getbootstrap.com/components/#breadcrumbs">
          Crumb 2
        </BreadcrumbItem>
        <BreadcrumbItem active>
          Active Crumb
        </BreadcrumbItem>
      </Breadcrumb>
    );

    let olNode = React.findDOMNode(ReactTestUtils.findRenderedComponentWithType(instance, Breadcrumb));
    assert.equal(olNode.getAttribute('aria-label'), 'breadcrumbs');
  });
});
