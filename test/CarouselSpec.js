import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Carousel from '../src/Carousel';
import CarouselItem from '../src/CarouselItem';

describe('Carousel', function () {
  it('Should show the correct item', function () {

    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    assert.equal(instance.refs.item1.props.active, false);
    assert.equal(instance.refs.item2.props.active, true);

    instance = ReactTestUtils.renderIntoDocument(
      <Carousel defaultActiveIndex={1}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    assert.equal(instance.refs.item1.props.active, false);
    assert.equal(instance.refs.item2.props.active, true);
    assert.equal(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(
        ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'carousel-indicators'), 'li'
      ).length, 2
    );
  });

  it('Should handle null children', function () {
    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        {null}
        {false}
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    assert.equal(instance.refs.item1.props.active, false);
    assert.equal(instance.refs.item2.props.active, true);
    assert.equal(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(
        ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'carousel-indicators'), 'li'
      ).length, 2
    );
  });

  it('Should call onSelect when indicator selected', function (done) {
    function onSelect(index, direction) {
      assert.equal(index, 0);
      assert.equal(direction, 'prev');
      done();
    }

    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1} onSelect={onSelect}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.scryRenderedDOMComponentsWithTag(
        ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'carousel-indicators'), 'li'
      )[0]
    );
  });
});
