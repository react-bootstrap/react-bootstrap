import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';
import Carousel from '../src/Carousel';
import CarouselItem from '../src/CarouselItem';

describe('Carousel', () => {
  it('Should show the correct item', () => {

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

  it('Should handle null children', () => {
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

  it('Should call onSelect when indicator selected', (done) => {
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

  it('Should show all controls on the first/last image if wrap is true', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={0} controls={true} wrap={true}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    let backButton = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'left');

    assert.ok(backButton);
    assert.equal(backButton.props.href, '#prev');

    instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1} controls={true} wrap={true}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    let nextButton = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'right');

    assert.ok(nextButton);
    assert.equal(nextButton.props.href, '#next');
  });

  it('Should not show the prev button on the first image if wrap is false', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={0} controls={true} wrap={false}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
      </Carousel>
    );

    let backButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'left');
    let nextButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'right');

    assert.equal(backButtons.length, 0);
    assert.equal(nextButtons.length, 1);
  });

  it('Should allow user to specify a previous and next icon', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1} controls={true} wrap={false}
        prevIcon={<span className='ficon ficon-left'/>}
        nextIcon={<span className='ficon ficon-right'/>}>
        <CarouselItem ref="item1">Item 1 content</CarouselItem>
        <CarouselItem ref="item2">Item 2 content</CarouselItem>
        <CarouselItem ref="item3">Item 3 content</CarouselItem>
      </Carousel>
    );

    let backButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'ficon-left');
    let nextButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'ficon-right');

    assert.equal(backButtons.length, 1);
    assert.equal(nextButtons.length, 1);
  });
});
