import React from 'react';
import ReactTestUtils from 'react/lib/ReactTestUtils';

import Carousel from '../src/Carousel';

describe('Carousel', () => {
  it('Should show the correct item', () => {

    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1}>
        <Carousel.Item ref="item1">Item 1 content</Carousel.Item>
        <Carousel.Item ref="item2">Item 2 content</Carousel.Item>
      </Carousel>
    );

    assert.equal(instance.refs.item1.props.active, false);
    assert.equal(instance.refs.item2.props.active, true);

    instance = ReactTestUtils.renderIntoDocument(
      <Carousel defaultActiveIndex={1}>
        <Carousel.Item ref="item1">Item 1 content</Carousel.Item>
        <Carousel.Item ref="item2">Item 2 content</Carousel.Item>
      </Carousel>
    );

    assert.equal(instance.refs.item1.props.active, false);
    assert.equal(instance.refs.item2.props.active, true);
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'carousel-indicators')
        .getElementsByTagName('li').length, 2
    );
  });

  it('Should handle null children', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1}>
        <Carousel.Item ref="item1">Item 1 content</Carousel.Item>
        {null}
        {false}
        <Carousel.Item ref="item2">Item 2 content</Carousel.Item>
      </Carousel>
    );

    assert.equal(instance.refs.item1.props.active, false);
    assert.equal(instance.refs.item2.props.active, true);
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'carousel-indicators')
        .getElementsByTagName('li').length, 2
    );
  });

  it('Should call onSelect when indicator selected', (done) => {
    function onSelect(index, ...args) {
      expect(index).to.equal(0);

      // By using rest arguments here, we can avoid triggering the logic to
      // persist and decorate the event.
      const [event] = args;
      expect(event).to.not.exist;

      done();
    }

    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1} onSelect={onSelect}>
        <Carousel.Item ref="item1">Item 1 content</Carousel.Item>
        <Carousel.Item ref="item2">Item 2 content</Carousel.Item>
      </Carousel>
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'carousel-indicators')
        .getElementsByTagName('li')[0]
    );
  });

  it('Should call onSelect with direction', (done) => {
    function onSelect(index, event) {
      expect(index).to.equal(0);
      expect(event.direction).to.equal('prev');
      expect(event.isPersistent()).to.be.true;

      done();
    }

    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1} onSelect={onSelect}>
        <Carousel.Item ref="item1">Item 1 content</Carousel.Item>
        <Carousel.Item ref="item2">Item 2 content</Carousel.Item>
      </Carousel>
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'carousel-indicators')
        .getElementsByTagName('li')[0]
    );
  });

  it('Should show all controls on the first/last image if wrap is true', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={0} controls={true} wrap={true}>
        <Carousel.Item ref="item1">Item 1 content</Carousel.Item>
        <Carousel.Item ref="item2">Item 2 content</Carousel.Item>
      </Carousel>
    );

    let backButton = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'left');

    assert.ok(backButton);
    assert.equal(backButton.getAttribute('href'), '#prev');

    instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1} controls={true} wrap={true}>
        <Carousel.Item ref="item1">Item 1 content</Carousel.Item>
        <Carousel.Item ref="item2">Item 2 content</Carousel.Item>
      </Carousel>
    );

    let nextButton = ReactTestUtils.findRenderedDOMComponentWithClass(instance, 'right');

    assert.ok(nextButton);
    assert.equal(nextButton.getAttribute('href'), '#next');
  });

  it('Should not show the prev button on the first image if wrap is false', () => {
    let instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={0} controls={true} wrap={false}>
        <Carousel.Item ref="item1">Item 1 content</Carousel.Item>
        <Carousel.Item ref="item2">Item 2 content</Carousel.Item>
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
        <Carousel.Item ref="item1">Item 1 content</Carousel.Item>
        <Carousel.Item ref="item2">Item 2 content</Carousel.Item>
        <Carousel.Item ref="item3">Item 3 content</Carousel.Item>
      </Carousel>
    );

    let backButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'ficon-left');
    let nextButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'ficon-right');

    assert.equal(backButtons.length, 1);
    assert.equal(nextButtons.length, 1);
  });
});
