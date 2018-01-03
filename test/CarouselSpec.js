import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import ReactDOM from 'react-dom';

import Carousel from '../src/Carousel';

describe('<Carousel>', () => {
  const items = [
    <Carousel.Item key={1}>Item 1 content</Carousel.Item>,
    <Carousel.Item key={2}>Item 2 content</Carousel.Item>
  ];

  it('Should show the correct item', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1}>{items}</Carousel>
    );

    const [item1, item2] = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      Carousel.Item
    );

    assert.equal(item1.props.active, false);
    assert.equal(item2.props.active, true);
  });

  it('Should show the correct item with defaultActiveIndex', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel defaultActiveIndex={1}>{items}</Carousel>
    );

    const [item1, item2] = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      Carousel.Item
    );

    assert.equal(item1.props.active, false);
    assert.equal(item2.props.active, true);
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'carousel-indicators'
      ).getElementsByTagName('li').length,
      2
    );
  });

  it('Should handle null children', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1}>
        <Carousel.Item>Item 1 content</Carousel.Item>
        {null}
        {false}
        <Carousel.Item>Item 2 content</Carousel.Item>
      </Carousel>
    );

    const [item1, item2] = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      Carousel.Item
    );

    assert.equal(item1.props.active, false);
    assert.equal(item2.props.active, true);
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'carousel-indicators'
      ).getElementsByTagName('li').length,
      2
    );
  });

  it('Should call onSelect when indicator selected', done => {
    function onSelect(index, ...args) {
      expect(index).to.equal(0);

      // By using rest arguments here, we can avoid triggering the logic to
      // persist and decorate the event.
      const [event] = args;
      expect(event).to.not.exist;

      done();
    }

    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1} onSelect={onSelect}>
        {items}
      </Carousel>
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'carousel-indicators'
      ).getElementsByTagName('li')[0]
    );
  });

  it('Should call onSelect with direction', done => {
    function onSelect(index, event) {
      expect(index).to.equal(0);
      expect(event.direction).to.equal('prev');
      expect(event.isPersistent()).to.be.true;

      done();
    }

    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1} onSelect={onSelect}>
        {items}
      </Carousel>
    );

    ReactTestUtils.Simulate.click(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'carousel-indicators'
      ).getElementsByTagName('li')[0]
    );
  });

  it('Should call onSelect with direction when there is no event', done => {
    function onSelect(index, event) {
      expect(index).to.equal(0);
      expect(event.direction).to.equal('next');
      expect(event.target).to.not.exist;

      done();
    }

    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel activeIndex={1} onSelect={onSelect}>
        {items}
      </Carousel>
    );

    instance.handleNext();
  });

  it('Should show back button control on the first image if wrap is true', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel defaultActiveIndex={0} controls wrap>
        {items}
      </Carousel>
    );

    const prevButton = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'left'
    );
    assert.ok(prevButton);

    assert.equal(instance.state.activeIndex, 0);
    ReactTestUtils.Simulate.click(prevButton);
    assert.equal(instance.state.activeIndex, 1);
  });

  it('Should show next button control on the last image if wrap is true', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel defaultActiveIndex={1} controls wrap>
        {items}
      </Carousel>
    );

    const nextButton = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'right'
    );
    assert.ok(nextButton);

    assert.equal(instance.state.activeIndex, 1);
    ReactTestUtils.Simulate.click(nextButton);
    assert.equal(instance.state.activeIndex, 0);
  });

  it('Should not show the prev button on the first image if wrap is false', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel defaultActiveIndex={0} controls wrap={false}>
        {items}
      </Carousel>
    );

    const prevButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      instance,
      'left'
    );
    const nextButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      instance,
      'right'
    );

    assert.equal(prevButtons.length, 0);
    assert.equal(nextButtons.length, 1);

    const nextButton = nextButtons[0];
    assert.equal(instance.state.activeIndex, 0);
    ReactTestUtils.Simulate.click(nextButton);
    assert.equal(instance.state.activeIndex, 1);
  });

  it('Should not show the next button on the last image if wrap is false', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel defaultActiveIndex={1} controls wrap={false}>
        {items}
      </Carousel>
    );

    const prevButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      instance,
      'left'
    );
    const nextButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      instance,
      'right'
    );

    assert.equal(prevButtons.length, 1);
    assert.equal(nextButtons.length, 0);

    const prevButton = prevButtons[0];
    assert.equal(instance.state.activeIndex, 1);
    ReactTestUtils.Simulate.click(prevButton);
    assert.equal(instance.state.activeIndex, 0);
  });

  it('Should allow user to specify a previous and next icon', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel
        activeIndex={1}
        controls
        wrap={false}
        prevIcon={<span className="ficon ficon-left" />}
        nextIcon={<span className="ficon ficon-right" />}
      >
        <Carousel.Item>Item 1 content</Carousel.Item>
        <Carousel.Item>Item 2 content</Carousel.Item>
        <Carousel.Item>Item 3 content</Carousel.Item>
      </Carousel>
    );

    const prevButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      instance,
      'ficon-left'
    );
    const nextButtons = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      instance,
      'ficon-right'
    );

    assert.equal(prevButtons.length, 1);
    assert.equal(nextButtons.length, 1);
  });

  it('Should allow user to specify a previous and next SR label', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel
        activeIndex={1}
        controls
        wrap={false}
        prevLabel="Previous awesomeness"
        nextLabel="Next awesomeness"
      >
        <Carousel.Item>Item 1 content</Carousel.Item>
        <Carousel.Item>Item 2 content</Carousel.Item>
        <Carousel.Item>Item 3 content</Carousel.Item>
      </Carousel>
    );

    const labels = ReactTestUtils.scryRenderedDOMComponentsWithClass(
      instance,
      'sr-only'
    );

    assert.equal(labels.length, 2);
    assert.equal(labels[0].textContent, 'Previous awesomeness');
    assert.equal(labels[1].textContent, 'Next awesomeness');
  });

  it('Should not render labels when values are falsy', () => {
    [null, ''].forEach(falsyValue => {
      const instance = ReactTestUtils.renderIntoDocument(
        <Carousel
          activeIndex={1}
          controls
          wrap={false}
          prevLabel={falsyValue}
          nextLabel={falsyValue}
        >
          <Carousel.Item>Item 1 content</Carousel.Item>
          <Carousel.Item>Item 2 content</Carousel.Item>
          <Carousel.Item>Item 3 content</Carousel.Item>
        </Carousel>
      );

      const labels = ReactTestUtils.scryRenderedDOMComponentsWithClass(
        instance,
        'sr-only'
      );
      assert.equal(
        labels.length,
        0,
        `should not render labels for value ${falsyValue}`
      );
    });
  });

  it('Should transition properly when slide animation is disabled', () => {
    const instance = ReactTestUtils.renderIntoDocument(
      <Carousel defaultActiveIndex={0} slide={false}>
        {items}
      </Carousel>
    );

    const nextButton = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'right'
    );
    assert.ok(nextButton);

    const prevButton = ReactTestUtils.findRenderedDOMComponentWithClass(
      instance,
      'left'
    );
    assert.ok(prevButton);

    assert.equal(instance.state.activeIndex, 0);

    ReactTestUtils.Simulate.click(nextButton);
    assert.equal(instance.state.activeIndex, 1);

    ReactTestUtils.Simulate.click(prevButton);
    assert.equal(instance.state.activeIndex, 0);
  });

  it('Should render on update, default active item > new child length', () => {
    let div = document.createElement('div');

    // default active is the 2nd item, which will be removed on
    // subsequent render
    let instance = ReactDOM.render(
      <Carousel defaultActiveIndex={1}>{items}</Carousel>,
      div
    );

    const [item1, item2] = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      Carousel.Item
    );

    assert.equal(item1.props.active, false);
    assert.equal(item2.props.active, true);
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'carousel-indicators'
      ).getElementsByTagName('li').length,
      2
    );

    let fewerItems = items.slice();
    fewerItems.pop();
    instance = ReactDOM.render(
      <Carousel defaultActiveIndex={0}>{fewerItems}</Carousel>,
      div
    );

    const [item3] = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      Carousel.Item
    );

    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'carousel-indicators'
      ).getElementsByTagName('li').length,
      1
    );
    assert.equal(
      ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'item')
        .length,
      1
    );
    assert.equal(item3.props.active, true);
  });

  it('Should render on update, active item > new child length', () => {
    let div = document.createElement('div');

    // default active is the 2nd item, which will be removed on
    // subsequent render
    let instance = ReactDOM.render(
      <Carousel activeIndex={1}>{items}</Carousel>,
      div
    );

    const [item1, item2] = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      Carousel.Item
    );

    assert.equal(item1.props.active, false);
    assert.equal(item2.props.active, true);
    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'carousel-indicators'
      ).getElementsByTagName('li').length,
      2
    );

    let fewerItems = items.slice();
    fewerItems.pop();
    instance = ReactDOM.render(<Carousel>{fewerItems}</Carousel>, div);

    const [item3] = ReactTestUtils.scryRenderedComponentsWithType(
      instance,
      Carousel.Item
    );

    assert.equal(
      ReactTestUtils.findRenderedDOMComponentWithClass(
        instance,
        'carousel-indicators'
      ).getElementsByTagName('li').length,
      1
    );
    assert.equal(
      ReactTestUtils.scryRenderedDOMComponentsWithClass(instance, 'item')
        .length,
      1
    );
    assert.equal(item3.props.active, true);
  });
});
