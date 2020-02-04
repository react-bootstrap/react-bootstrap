import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';

import Breadcrumb from '../src/Breadcrumb';

describe('<Breadcrumb.Item>', () => {
  it('Should render `a` as inner element when is not active', () => {
    mount(<Breadcrumb.Item href="#">Crumb</Breadcrumb.Item>)
      .find('a.active')
      .should.have.length(0);
  });

  it('Should render `span.active` with `active` attribute set.', () => {
    mount(<Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>)
      .find('span.active')
      .should.have.length(1);
  });

  it('Should render `span.active` when active and has href', () => {
    const instance = mount(
      <Breadcrumb.Item href="#" active>
        Active Crumb
      </Breadcrumb.Item>,
    );
    instance.find('span.active').should.have.length(1);
    instance.find('span[href="#"]').should.have.length(0);
    instance.find('a').should.have.length(0);
  });

  it('Should add custom classes onto `li` wrapper element', () => {
    mount(
      <Breadcrumb.Item className="custom-one custom-two">a</Breadcrumb.Item>,
    )
      .find('li.custom-one.custom-two')
      .should.have.length(1);
  });

  it('Should add aria-current to active element', () => {
    mount(<Breadcrumb.Item active>Active Crumb</Breadcrumb.Item>)
      .find('li.active[aria-current="page"]')
      .should.have.length(1);
  });

  it('Should spread additional props onto inner element', () => {
    const handleClick = sinon.spy();

    const instance = mount(
      <Breadcrumb.Item href="#" onClick={handleClick}>
        Crumb
      </Breadcrumb.Item>,
    );

    instance.find('a').simulate('click');

    expect(handleClick.callCount).to.equal(1);
  });

  it('Should apply id onto the anchor', () => {
    mount(
      <Breadcrumb.Item href="#" id="test-link-id">
        Crumb
      </Breadcrumb.Item>,
    )
      .find('a#test-link-id')
      .should.have.length(1);
  });

  it('Should apply `href` property onto `a` inner element', () => {
    const instance = mount(
      <Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
        Crumb
      </Breadcrumb.Item>,
    );

    instance
      .find('a')
      .prop('href')
      .should.eq('http://getbootstrap.com/components/#breadcrumbs');
  });

  it('Should apply `title` property onto `a` inner element', () => {
    const instance = mount(
      <Breadcrumb.Item
        title="test-title"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>,
    );

    instance
      .find('a')
      .prop('title')
      .should.eq('test-title');
  });

  it('Should not apply properties for inner `anchor` onto `li` wrapper element', () => {
    const instance = mount(
      <Breadcrumb.Item title="test-title" href="/hi">
        Crumb
      </Breadcrumb.Item>,
    );
    expect(instance.find('li[href="/hi"]').exists()).to.equal(false);
    expect(instance.find('li[title="test-title"]').exists()).to.equal(false);
  });

  it('Should set `target` attribute on `anchor`', () => {
    const instance = mount(
      <Breadcrumb.Item
        target="_blank"
        href="http://getbootstrap.com/components/#breadcrumbs"
      >
        Crumb
      </Breadcrumb.Item>,
    );
    instance
      .find('a')
      .prop('target')
      .should.eq('_blank');
  });

  it('Should have li as default component', () => {
    mount(<Breadcrumb.Item />).assertSingle('li');
  });
});
