import React from 'react';
import { mount } from 'enzyme';

import Carousel from '../src/Carousel';

describe('<Carousel>', () => {
  const items = [
    <Carousel.Item key={1}>Item 1 content</Carousel.Item>,
    <Carousel.Item key={2}>Item 2 content</Carousel.Item>,
  ];

  it('Should show the correct item', () => {
    const wrapper = mount(<Carousel defaultActiveIndex={1}>{items}</Carousel>);

    const carouselItems = wrapper.find('CarouselItem');

    assert.equal(carouselItems.at(0).is('.active'), false);
    assert.equal(carouselItems.at(1).is('.active'), true);
  });

  it('Should show the correct item with defaultActiveIndex', () => {
    const wrapper = mount(<Carousel defaultActiveIndex={1}>{items}</Carousel>);

    const carouselItems = wrapper.find('CarouselItem');

    assert.equal(carouselItems.at(0).is('.active'), false);
    assert.equal(carouselItems.at(1).is('.active'), true);

    wrapper.find('.carousel-indicators > li').length.should.equal(2);
  });

  it('Should handle null children', () => {
    const wrapper = mount(
      <Carousel defaultActiveIndex={1}>
        <Carousel.Item>Item 1 content</Carousel.Item>
        {null}
        {false}
        <Carousel.Item>Item 2 content</Carousel.Item>
      </Carousel>,
    );

    const carouselItems = wrapper.find('CarouselItem');

    assert.equal(carouselItems.at(0).is('.active'), false);
    assert.equal(carouselItems.at(1).is('.active'), true);

    wrapper.find('.carousel-indicators > li').length.should.equal(2);
  });

  it('Should call onSelect when indicator selected', done => {
    function onSelect(index) {
      expect(index).to.equal(0);

      done();
    }

    const wrapper = mount(
      <Carousel activeIndex={1} onSelect={onSelect}>
        {items}
      </Carousel>,
    );

    wrapper
      .find('.carousel-indicators li')
      .first()
      .simulate('click');
  });

  it('Should call onSelect with direction', done => {
    function onSelect(index, direction, event) {
      expect(index).to.equal(0);
      expect(direction).to.equal('prev');
      expect(event).to.exist;

      done();
    }

    const wrapper = mount(
      <Carousel activeIndex={1} onSelect={onSelect}>
        {items}
      </Carousel>,
    );

    wrapper
      .find('.carousel-indicators li')
      .first()
      .simulate('click');
  });

  it('Should show back button control on the first image if wrap is true', () => {
    const wrapper = mount(
      <Carousel defaultActiveIndex={0} controls wrap>
        {items}
      </Carousel>,
    ).find('Carousel');

    wrapper.assertSingle('a.carousel-control-prev');
  });

  it('Should show next button control on the last image if wrap is true', () => {
    const wrapper = mount(
      <Carousel defaultActiveIndex={1} controls wrap>
        {items}
      </Carousel>,
    ).find('Carousel');

    wrapper.assertSingle('a.carousel-control-next');
  });

  it('Should not show the prev button on the first image if wrap is false', () => {
    mount(
      <Carousel defaultActiveIndex={0} controls wrap={false}>
        {items}
      </Carousel>,
    ).assertNone('a.carousel-control-prev');
  });

  it('Should not show the next button on the last image if wrap is false', () => {
    mount(
      <Carousel defaultActiveIndex={1} controls wrap={false}>
        {items}
      </Carousel>,
    ).assertNone('a.carousel-control-next');
  });

  it('Should allow user to specify a previous and next icon', () => {
    const wrapper = mount(
      <Carousel
        controls
        wrap={false}
        defaultActiveIndex={1}
        prevIcon={<span className="ficon ficon-left" />}
        nextIcon={<span className="ficon ficon-right" />}
      >
        <Carousel.Item>Item 1 content</Carousel.Item>
        <Carousel.Item>Item 2 content</Carousel.Item>
        <Carousel.Item>Item 3 content</Carousel.Item>
      </Carousel>,
    );

    wrapper.assertSingle('.ficon-left');
    wrapper.assertSingle('.ficon-right');
  });

  it('Should allow user to specify a previous and next SR label', () => {
    const wrapper = mount(
      <Carousel
        controls
        wrap={false}
        defaultActiveIndex={1}
        prevLabel="Previous awesomeness"
        nextLabel="Next awesomeness"
      >
        <Carousel.Item>Item 1 content</Carousel.Item>
        <Carousel.Item>Item 2 content</Carousel.Item>
        <Carousel.Item>Item 3 content</Carousel.Item>
      </Carousel>,
    );

    const labels = wrapper.find('.sr-only');

    assert.equal(labels.length, 2);
    assert.equal(labels.at(0).text(), 'Previous awesomeness');
    assert.equal(labels.at(1).text(), 'Next awesomeness');
  });

  it('Should not render labels when values are falsy', () => {
    [null, ''].forEach(falsyValue => {
      const wrapper = mount(
        <Carousel
          controls
          wrap={false}
          defaultActiveIndex={1}
          prevLabel={falsyValue}
          nextLabel={falsyValue}
        >
          <Carousel.Item>Item 1 content</Carousel.Item>
          <Carousel.Item>Item 2 content</Carousel.Item>
          <Carousel.Item>Item 3 content</Carousel.Item>
        </Carousel>,
      );

      assert.equal(
        wrapper.find('.sr-only').length,
        0,
        `should not render labels for value ${falsyValue}`,
      );
    });
  });

  it('Should transition properly when slide animation is disabled', done => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Carousel defaultActiveIndex={0} slide={false} onSelect={spy}>
        {items}
      </Carousel>,
    );

    wrapper.find('a.carousel-control-next').simulate('click');

    setTimeout(() => {
      spy.should.have.calledOnce;

      wrapper.find('a.carousel-control-prev').simulate('click');

      setTimeout(() => {
        spy.should.have.calledTwice;

        done();
      }, 150);
    }, 150);
  });

  it('Should render on update, active item > new child length', () => {
    // default active is the 2nd item, which will be removed on
    // subsequent render
    let wrapper = mount(<Carousel defaultActiveIndex={1}>{items}</Carousel>);

    let carouselItems = wrapper.find('CarouselItem');

    assert.equal(carouselItems.at(0).is('.active'), false);
    assert.equal(carouselItems.at(1).is('.active'), true);

    wrapper.find('.carousel-indicators > li').length.should.equal(2);

    let fewerItems = items.slice();
    fewerItems.pop();

    wrapper.setProps({ children: fewerItems });

    carouselItems = wrapper.find('CarouselItem');

    wrapper.find('.carousel-indicators > li').length.should.equal(1);
    wrapper.find('div.carousel-item').length.should.equal(1);
  });

  it('Should have div as default component', () => {
    const wrapper = mount(<Carousel>{items}</Carousel>);
    wrapper.find('div').length.should.equal(4);
  });
});
