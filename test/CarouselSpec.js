import * as React from 'react';
import { mount } from 'enzyme';

import Carousel from '../src/Carousel';
import ThemeProvider from '../src/ThemeProvider';

describe('<Carousel>', () => {
  const items = [
    <Carousel.Item key={1}>Item 1 content</Carousel.Item>,
    <Carousel.Item key={2}>Item 2 content</Carousel.Item>,
    <Carousel.Item key={3}>Item 3 content</Carousel.Item>,
  ];

  it('should not throw an error with StrictMode', () => {
    const ref = React.createRef();

    mount(
      <React.StrictMode>
        <Carousel ref={ref} interval={null}>
          {items}
        </Carousel>
      </React.StrictMode>,
    );

    ref.current.next();
  });

  it('should show the first item by default and render all', () => {
    const wrapper = mount(<Carousel>{items}</Carousel>);

    const carouselItems = wrapper.find('CarouselItem');

    expect(carouselItems.at(0).is('.active')).to.be.true;
    expect(carouselItems.at(1).is('.active')).to.be.false;
    expect(wrapper.find('.carousel-indicators > button')).to.have.lengthOf(
      items.length,
    );
  });

  it('should show the correct item with defaultActiveIndex', () => {
    const wrapper = mount(<Carousel defaultActiveIndex={1}>{items}</Carousel>);

    const carouselItems = wrapper.find('CarouselItem');

    expect(carouselItems.at(0).is('.active')).to.be.false;
    expect(carouselItems.at(1).is('.active')).to.be.true;
  });

  it('should handle falsy children', () => {
    const wrapper = mount(
      <Carousel>
        {null}
        <Carousel.Item>Item 1 content</Carousel.Item>
        {false}
        {undefined}
        <Carousel.Item>Item 2 content</Carousel.Item>
      </Carousel>,
    );

    const carouselItems = wrapper.find('CarouselItem');

    expect(carouselItems.at(0).is('.active')).to.be.true;
    expect(carouselItems.at(0).text()).to.equal('Item 1 content');
    expect(wrapper.find('.carousel-indicators > button')).to.have.lengthOf(2);
  });

  it('should call onSelect when indicator selected', (done) => {
    function onSelect(index) {
      expect(index).to.equal(0);

      done();
    }

    const wrapper = mount(
      <Carousel activeIndex={1} onSelect={onSelect} interval={null}>
        {items}
      </Carousel>,
    );

    wrapper.find('.carousel-indicators button').first().simulate('click');
  });

  it('should render custom indicator labels', () => {
    const labels = ['custom1', 'custom2', 'custom3'];

    const wrapper = mount(
      <Carousel activeIndex={1} interval={null} indicatorLabels={labels}>
        {items}
      </Carousel>,
    );

    const indicators = wrapper.find('.carousel-indicators button');
    for (let i = 0; i < labels.length; i++) {
      const node = indicators.at(i).getDOMNode();
      expect(node.getAttribute('aria-label')).to.equal(labels[i]);
    }
  });

  it('should render variant', () => {
    mount(
      <Carousel activeIndex={1} interval={null} variant="dark">
        {items}
      </Carousel>,
    ).assertSingle('.carousel.carousel-dark');
  });

  describe('ref testing', () => {
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should allow refs to be attached and expose next, prev functions', () => {
      const ref = React.createRef();
      const onSelectSpy = sinon.spy();
      mount(
        <Carousel ref={ref} onSelect={onSelectSpy} defaultActiveIndex={1}>
          {items}
        </Carousel>,
      );
      expect(ref.current).to.have.property('next');
      expect(ref.current).to.have.property('prev');
      expect(ref.current).to.have.property('element');
      ref.current.next();
      clock.tick(50);
      expect(onSelectSpy).to.have.been.calledOnce;
      ref.current.prev();
      clock.tick(50);
      expect(onSelectSpy).to.have.been.calledTwice;
    });
  });

  ['onSlide', 'onSlid'].forEach((eventName) => {
    it(`should call ${eventName} with previous index and direction`, (done) => {
      function onEvent(index, direction) {
        expect(index).to.equal(0);
        expect(direction).to.equal('end');

        done();
      }

      const wrapper = mount(
        <Carousel
          defaultActiveIndex={1}
          interval={null}
          {...{ [eventName]: onEvent }}
        >
          {items}
        </Carousel>,
      );

      wrapper.find('.carousel-indicators button').first().simulate('click');
    });

    it(`should call ${eventName} with next index and direction`, (done) => {
      function onEvent(index, direction) {
        const lastPossibleIndex = items.length - 1;
        expect(index).to.equal(lastPossibleIndex);
        expect(direction).to.equal('start');

        done();
      }

      const wrapper = mount(
        <Carousel
          defaultActiveIndex={1}
          interval={null}
          {...{ [eventName]: onEvent }}
        >
          {items}
        </Carousel>,
      );

      wrapper.find('.carousel-indicators button').last().simulate('click');
    });
  });

  describe('Buttons and labels with and without wrapping', () => {
    it('should show back button control on the first image if wrap is true', () => {
      const wrapper = mount(
        <Carousel controls wrap>
          {items}
        </Carousel>,
      ).find('Carousel');

      wrapper.assertSingle('a.carousel-control-prev');
    });

    it('should show next button control on the last image if wrap is true', () => {
      const lastElementIndex = items.length - 1;

      const wrapper = mount(
        <Carousel defaultActiveIndex={lastElementIndex} controls wrap>
          {items}
        </Carousel>,
      ).find('Carousel');

      wrapper.assertSingle('a.carousel-control-next');
    });

    it('should not show the prev button on the first image if wrap is false', () => {
      mount(
        <Carousel controls wrap={false}>
          {items}
        </Carousel>,
      ).assertNone('a.carousel-control-prev');
    });

    it('should not show the next button on the last image if wrap is false', () => {
      const lastElementIndex = items.length - 1;

      mount(
        <Carousel defaultActiveIndex={lastElementIndex} controls wrap={false}>
          {items}
        </Carousel>,
      ).assertNone('a.carousel-control-next');
    });
  });

  it('should allow the user to specify a previous and next icon', () => {
    const wrapper = mount(
      <Carousel
        controls
        defaultActiveIndex={1}
        prevIcon={<span className="ficon ficon-left" />}
        nextIcon={<span className="ficon ficon-right" />}
      >
        {items}
      </Carousel>,
    );

    wrapper.assertSingle('.ficon-left');
    wrapper.assertSingle('.ficon-right');
  });

  it('should allow user to specify a previous and next SR label', () => {
    const wrapper = mount(
      <Carousel
        controls
        defaultActiveIndex={1}
        prevLabel="Previous awesomeness"
        nextLabel="Next awesomeness"
      >
        {items}
      </Carousel>,
    );

    const labels = wrapper.find('.visually-hidden');

    expect(labels).to.have.lengthOf(2);
    expect(labels.at(0).text()).to.equal('Previous awesomeness');
    expect(labels.at(1).text()).to.equal('Next awesomeness');
  });

  it('should not render labels when values are null or undefined', () => {
    // undefined (as in nothing passed) renders default labels
    [null, ''].forEach((falsyValue) => {
      const wrapper = mount(
        <Carousel
          controls
          defaultActiveIndex={1}
          prevLabel={falsyValue}
          nextLabel={falsyValue}
        >
          {items}
        </Carousel>,
      );

      expect(wrapper.find('.visually-hidden')).to.have.lengthOf(
        0,
        `should not render labels for value ${falsyValue}`,
      );
    });
  });

  it('should transition properly when slide animation is disabled', (done) => {
    const spy = sinon.spy();
    const wrapper = mount(
      <Carousel slide={false} onSelect={spy}>
        {items}
      </Carousel>,
    );

    wrapper.find('a.carousel-control-next').simulate('click');

    setTimeout(() => {
      spy.should.have.been.calledOnce;

      wrapper.find('a.carousel-control-prev').simulate('click');

      setTimeout(() => {
        spy.should.have.been.calledTwice;

        done();
      }, 150);
    }, 150);
  });

  it('should render on update, active item > new child length', () => {
    let wrapper = mount(
      <Carousel defaultActiveIndex={items.length - 1}>{items}</Carousel>,
    );

    expect(wrapper.find('.carousel-indicators > button')).to.have.lengthOf(
      items.length,
    );

    let fewerItems = items.slice(2);

    wrapper.setProps({ children: fewerItems });

    expect(wrapper.find('.carousel-indicators > button')).to.have.lengthOf(
      fewerItems.length,
    );
    expect(wrapper.find('div.carousel-item')).to.have.lengthOf(
      fewerItems.length,
    );
  });

  it('should render correctly when fade is set', () => {
    mount(
      <Carousel defaultActiveIndex={1} fade>
        {items}
      </Carousel>,
    ).assertSingle('.carousel-fade');
  });

  describe('automatic traversal', () => {
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should go through the items after given seconds', () => {
      const onSelectSpy = sinon.spy();
      const interval = 500;
      mount(
        <Carousel interval={interval} onSelect={onSelectSpy}>
          {items}
        </Carousel>,
      );

      clock.tick(interval * 1.5);
      expect(onSelectSpy).to.have.been.calledOnce;
    });

    it('should go through the items given the specified intervals', () => {
      const onSelectSpy = sinon.spy();
      mount(
        <Carousel interval={1000} onSelect={onSelectSpy}>
          <Carousel.Item interval={100}>Item 1 content</Carousel.Item>
          <Carousel.Item>Item 2 content</Carousel.Item>
        </Carousel>,
      );

      // should be long enough to handle false positive issues
      // but short enough to not trigger auto-play to occur twice
      // (since the interval for the second item should be `1000`)
      clock.tick(200);

      expect(onSelectSpy).to.have.been.calledOnce;
      expect(onSelectSpy.firstCall).to.have.been.calledWith(1);
    });

    it('should stop going through items on hover and continue afterwards', () => {
      const onSelectSpy = sinon.spy();
      const interval = 500;
      const wrapper = mount(
        <Carousel interval={interval} onSelect={onSelectSpy}>
          {items}
        </Carousel>,
      );
      wrapper.simulate('mouseOver');
      clock.tick(interval * 1.5);
      sinon.assert.notCalled(onSelectSpy);

      wrapper.simulate('mouseOut');
      clock.tick(interval * 1.5);
      sinon.assert.calledOnce(onSelectSpy);
    });

    it('should ignore hover if the prop is passed', () => {
      const onSelectSpy = sinon.spy();
      const interval = 500;
      const wrapper = mount(
        <Carousel interval={interval} onSelect={onSelectSpy} pause={false}>
          {items}
        </Carousel>,
      );
      wrapper.simulate('mouseOver');

      clock.tick(interval * 1.5);
      expect(onSelectSpy).to.have.been.calledOnce;
    });

    it('should stop going through the items after unmounting', () => {
      const onSelectSpy = sinon.spy();
      const interval = 500;
      const wrapper = mount(
        <Carousel interval={interval} onSelect={onSelectSpy}>
          {items}
        </Carousel>,
      );
      wrapper.unmount();
      clock.tick(interval * 1.5);
      expect(onSelectSpy).not.to.have.been.called;
    });
  });

  describe('wrapping', () => {
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should wrap to last from first', () => {
      const onSelectSpy = sinon.spy();

      const wrapper = mount(
        <Carousel activeIndex={0} onSelect={onSelectSpy}>
          {items}
        </Carousel>,
      );

      wrapper.simulate('keyDown', {
        key: 'ArrowLeft',
      });
      clock.tick(50);

      expect(onSelectSpy).to.have.been.calledOnceWith(items.length - 1);
    });

    it('should wrap from first to last', () => {
      const onSelectSpy = sinon.spy();

      const wrapper = mount(
        <Carousel activeIndex={items.length - 1} onSelect={onSelectSpy}>
          {items}
        </Carousel>,
      );

      wrapper.simulate('keyDown', {
        key: 'ArrowRight',
      });
      clock.tick(50);

      expect(onSelectSpy).to.have.been.calledOnceWith(0);
    });

    [
      {
        caseName: 'previous at first',
        activeIndex: 0,
        eventPayload: {
          key: 'ArrowLeft',
        },
      },
      {
        caseName: 'next at last',
        activeIndex: items.length - 1,
        eventPayload: {
          key: 'ArrowRight',
        },
      },
    ].forEach(({ caseName, activeIndex, eventPayload }) => {
      it(`should not wrap with wrap unset for ${caseName}`, () => {
        const onSelectSpy = sinon.spy();
        const wrapper = mount(
          <Carousel
            activeIndex={activeIndex}
            wrap={false}
            onSelect={onSelectSpy}
          >
            {items}
          </Carousel>,
        );

        wrapper.simulate('keyDown', eventPayload);
        clock.tick(50);

        const carouselItems = wrapper.find('CarouselItem');
        expect(carouselItems.at(activeIndex).is('.active')).to.be.true;
        sinon.assert.notCalled(onSelectSpy);
      });
    });
  });

  describe('keyboard events', () => {
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should go back for the keyboard event ArrowLeft', () => {
      const onSelectSpy = sinon.spy();
      const wrapper = mount(
        <Carousel activeIndex={1} onSelect={onSelectSpy}>
          {items}
        </Carousel>,
      );

      wrapper.simulate('keyDown', {
        key: 'ArrowLeft',
      });
      clock.tick(50);
      sinon.assert.calledOnce(onSelectSpy);
      sinon.assert.calledWith(onSelectSpy, 0);
    });

    it('should go forward for the keyboard event ArrowRight', () => {
      const onSelectSpy = sinon.spy();
      const wrapper = mount(
        <Carousel activeIndex={1} onSelect={onSelectSpy}>
          {items}
        </Carousel>,
      );

      wrapper.simulate('keyDown', {
        key: 'ArrowRight',
      });
      clock.tick(50);
      sinon.assert.calledOnce(onSelectSpy);
      sinon.assert.calledWith(onSelectSpy, 2);
    });

    it('should ignore keyEvents when the keyboard is disabled', () => {
      const onSelectSpy = sinon.spy();
      const wrapper = mount(
        <Carousel activeIndex={1} onSelect={onSelectSpy} keyboard={false}>
          {items}
        </Carousel>,
      );

      wrapper.simulate('keyDown', {
        key: 'ArrowRight',
      });
      clock.tick(50);
      sinon.assert.notCalled(onSelectSpy);
    });

    it('should handle a defined custom key event', () => {
      const onKeyDownSpy = sinon.spy();
      const wrapper = mount(
        <Carousel activeIndex={1} onKeyDown={onKeyDownSpy}>
          {items}
        </Carousel>,
      );

      wrapper.simulate('keyDown', {
        key: 'ArrowUp',
      });
      clock.tick(50);
      sinon.assert.calledOnce(onKeyDownSpy);
    });

    ['ArrowUp', 'ArrowRightLeft', 'Onwards'].forEach((key) => {
      it('should do nothing for non left or right keys', () => {
        const onSelectSpy = sinon.spy();
        const wrapper = mount(
          <Carousel activeIndex={1} onSelect={onSelectSpy}>
            {items}
          </Carousel>,
        );

        wrapper.simulate('keyDown', {
          key,
        });
        clock.tick(50);
        sinon.assert.notCalled(onSelectSpy);
      });
    });
  });

  describe('mouse events', () => {
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should handle a defined mouse over event', () => {
      const onMouseOverSpy = sinon.spy();
      const wrapper = mount(
        <Carousel activeIndex={1} onMouseOver={onMouseOverSpy}>
          {items}
        </Carousel>,
      );

      wrapper.simulate('mouseOver');
      clock.tick(1500);
      sinon.assert.calledOnce(onMouseOverSpy);
    });

    it('should handle a defined mouse out event', () => {
      const onMouseOutSpy = sinon.spy();
      const wrapper = mount(
        <Carousel activeIndex={1} onMouseOut={onMouseOutSpy}>
          {items}
        </Carousel>,
      );

      wrapper.simulate('mouseOut');
      clock.tick(50);
      sinon.assert.calledOnce(onMouseOutSpy);
    });
  });

  describe('touch events', () => {
    let clock,
      wrapper,
      onSelectSpy,
      onTouchStartSpy,
      onTouchMoveSpy,
      onTouchEndSpy;

    beforeEach(() => {
      onSelectSpy = sinon.spy();
      onTouchStartSpy = sinon.spy();
      onTouchMoveSpy = sinon.spy();
      onTouchEndSpy = sinon.spy();

      wrapper = mount(
        <Carousel
          activeIndex={1}
          interval={null}
          onSelect={onSelectSpy}
          onTouchStart={onTouchStartSpy}
          onTouchMove={onTouchMoveSpy}
          onTouchEnd={onTouchEndSpy}
          touch
        >
          {items}
        </Carousel>,
      );

      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should swipe right', () => {
      wrapper.simulate('touchStart', { touches: [{ clientX: 50 }] });
      wrapper.simulate('touchMove', { touches: [{ clientX: 0 }] });
      wrapper.simulate('touchEnd');

      clock.tick(50);

      expect(onSelectSpy).to.have.been.calledOnceWith(2);
    });

    it('should swipe left', () => {
      wrapper.simulate('touchStart', { touches: [{ clientX: 0 }] });
      wrapper.simulate('touchMove', { touches: [{ clientX: 50 }] });
      wrapper.simulate('touchEnd');

      clock.tick(50);

      expect(onSelectSpy).to.have.been.calledOnceWith(0);
    });

    it('should not swipe if swipe detected is under the swipe threshold', () => {
      wrapper.simulate('touchStart', { touches: [{ clientX: 0 }] });
      wrapper.simulate('touchMove', { touches: [{ clientX: 35 }] });
      wrapper.simulate('touchEnd');

      clock.tick(50);
      expect(onSelectSpy).to.not.have.been.called;
    });

    it('should do nothing with disabled touch right', () => {
      const noTouchWrapper = mount(
        <Carousel
          activeIndex={1}
          interval={null}
          onSelect={onSelectSpy}
          touch={false}
        >
          {items}
        </Carousel>,
      );
      noTouchWrapper.simulate('touchStart', {
        touches: [{ clientX: 50 }],
      });
      noTouchWrapper.simulate('touchMove', {
        touches: [{ clientX: 0 }],
      });
      noTouchWrapper.simulate('touchEnd');

      clock.tick(50);
      expect(onSelectSpy).to.not.have.been.called;

      const carouselItems = wrapper.find('CarouselItem');
      expect(carouselItems.at(1).is('.active')).to.be.true;
    });

    it('should handle a custom touch start and end event', () => {
      wrapper.simulate('touchStart', {
        touches: [{ clientX: 50 }],
      });
      wrapper.simulate('touchMove', {
        touches: [{ clientX: 0 }],
      });
      wrapper.simulate('touchEnd');
      clock.tick(50);
      sinon.assert.calledOnce(onTouchStartSpy);
      sinon.assert.calledOnce(onTouchMoveSpy);
      sinon.assert.calledOnce(onTouchEndSpy);
    });

    it('should handle a custom multi-touch move event', () => {
      wrapper.simulate('touchMove', {
        touches: [{ clientX: 0 }, { clientX: 50 }],
      });
      clock.tick(50);
      expect(onTouchMoveSpy).to.have.been.calledOnce;
    });
  });

  describe('callback tests', () => {
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should call onSlide when slide animation is disabled', () => {
      const onSlideSpy = sinon.spy();
      const wrapper = mount(
        <Carousel slide={false} onSelect={() => {}} onSlide={onSlideSpy}>
          {items}
        </Carousel>,
      );

      wrapper.find('a.carousel-control-next').simulate('click');
      clock.tick(150);
      onSlideSpy.should.have.been.calledOnce;

      wrapper.find('a.carousel-control-prev').simulate('click');
      clock.tick(150);
      onSlideSpy.should.have.been.calledTwice;
    });

    it('should call onSlid when slide animation is disabled', () => {
      const onSlidSpy = sinon.spy();
      const wrapper = mount(
        <Carousel slide={false} onSelect={() => {}} onSlid={onSlidSpy}>
          {items}
        </Carousel>,
      );

      wrapper.find('a.carousel-control-next').simulate('click');
      clock.tick(150);
      onSlidSpy.should.have.been.calledOnce;

      wrapper.find('a.carousel-control-prev').simulate('click');
      clock.tick(150);
      onSlidSpy.should.have.been.calledTwice;
    });

    it('should transition/call onSelect once if previous arrow double clicked', () => {
      const onSelectSpy = sinon.spy();
      const wrapper = mount(
        <Carousel onSelect={onSelectSpy}>{items}</Carousel>,
      );

      const prev = wrapper.find('a.carousel-control-prev');
      prev.simulate('click');
      prev.simulate('click');

      clock.tick(1000);
      onSelectSpy.should.have.been.calledOnce;
    });

    it('should transition/call onSelect once if next arrow double clicked', () => {
      const onSelectSpy = sinon.spy();
      const wrapper = mount(
        <Carousel onSelect={onSelectSpy}>{items}</Carousel>,
      );

      const next = wrapper.find('a.carousel-control-next');
      next.simulate('click');
      next.simulate('click');

      clock.tick(1000);
      onSelectSpy.should.have.been.calledOnce;
    });
  });

  describe('RTL', () => {
    let clock;

    beforeEach(() => {
      clock = sinon.useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should slide in correct direction on ArrowLeft when dir=rtl', () => {
      const onSelectSpy = sinon.spy();

      const wrapper = mount(
        <ThemeProvider dir="rtl">
          <Carousel activeIndex={1} onSelect={onSelectSpy}>
            {items}
          </Carousel>
        </ThemeProvider>,
      );

      wrapper.simulate('keyDown', {
        key: 'ArrowLeft',
      });
      clock.tick(50);

      expect(onSelectSpy).to.have.been.calledOnceWith(2);
    });

    it('should slide in correct direction on ArrowLeft when dir=rtl', () => {
      const onSelectSpy = sinon.spy();

      const wrapper = mount(
        <ThemeProvider dir="rtl">
          <Carousel activeIndex={1} onSelect={onSelectSpy}>
            {items}
          </Carousel>
        </ThemeProvider>,
      );

      wrapper.simulate('keyDown', {
        key: 'ArrowRight',
      });
      clock.tick(50);

      expect(onSelectSpy).to.have.been.calledOnceWith(0);
    });

    it('should slide in correct direction automatically when dir=rtl', () => {
      const onSelectSpy = sinon.spy();
      const interval = 300;

      mount(
        <ThemeProvider dir="rtl">
          <Carousel activeIndex={1} onSelect={onSelectSpy} interval={interval}>
            {items}
          </Carousel>
        </ThemeProvider>,
      );

      clock.tick(interval * 1.5);

      expect(onSelectSpy).to.have.been.calledOnceWith(0);
    });
  });
});
