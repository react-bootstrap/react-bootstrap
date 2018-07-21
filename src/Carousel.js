import classNames from 'classnames';
import styles from 'dom-helpers/style';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import uncontrollable from 'uncontrollable';

import CarouselCaption from './CarouselCaption';
import CarouselItem from './CarouselItem';
import SafeAnchor from './SafeAnchor';
import { splitBsPropsAndOmit } from './utils/bootstrapUtils';
import * as ValidComponentChildren from './utils/ValidComponentChildren';
import { createBootstrapComponent } from './ThemeProvider';

// TODO: `slide` should be `animate`.

const propTypes = {
  /**
   * @default 'carousel'
   */
  bsPrefix: PropTypes.string,

  slide: PropTypes.bool,
  indicators: PropTypes.bool,
  /**
   * The amount of time to delay between automatically cycling an item.
   * If `null`, carousel will not automatically cycle.
   */
  interval: PropTypes.number,
  controls: PropTypes.bool,
  pauseOnHover: PropTypes.bool,
  wrap: PropTypes.bool,
  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: any, ?event: Object) => any
   * ```
   *
   * If this callback takes two or more arguments, the second argument will
   * be a persisted event object with `direction` set to the direction of the
   * transition.
   */
  onSelect: PropTypes.func,
  onSlideEnd: PropTypes.func,
  activeIndex: PropTypes.number,
  defaultActiveIndex: PropTypes.number,
  direction: PropTypes.oneOf(['prev', 'next']),
  prevIcon: PropTypes.node,

  /**
   * Label shown to screen readers only, can be used to show the previous element
   * in the carousel.
   * Set to null to deactivate.
   */
  prevLabel: PropTypes.string,

  nextIcon: PropTypes.node,
  /**
   * Label shown to screen readers only, can be used to show the next element
   * in the carousel.
   * Set to null to deactivate.
   */
  nextLabel: PropTypes.string,
};

const defaultProps = {
  slide: true,
  interval: 5000,
  pauseOnHover: true,
  wrap: true,
  indicators: true,
  controls: true,
  activeIndex: 0,

  prevIcon: <span className="carousel-control-prev-icon" aria-hidden="true" />,
  prevLabel: 'Previous',

  nextIcon: <span className="carousel-control-next-icon" aria-hidden="true" />,
  nextLabel: 'Next',
};

class Carousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {};
    this.isUnmounted = false;
    this.carousel = React.createRef();
  }

  componentDidMount() {
    this.cycle();
  }

  static getDerivedStateFromProps(
    nextProps,
    { activeIndex: previousActiveIndex },
  ) {
    if (nextProps.activeIndex !== previousActiveIndex) {
      const lastPossibleIndex =
        ValidComponentChildren.count(nextProps.children) - 1;

      const nextIndex = Math.max(
        0,
        Math.min(nextProps.activeIndex, lastPossibleIndex),
      );

      let direction;
      if (
        (nextIndex === 0 && previousActiveIndex >= lastPossibleIndex) ||
        previousActiveIndex <= nextIndex
      ) {
        direction = 'next';
      } else {
        direction = 'prev';
      }

      return {
        direction,
        previousActiveIndex,
        activeIndex: nextIndex,
      };
    }
    return null;
  }

  componentDidUpdate(_, prevState) {
    if (this.state.activeIndex !== prevState.activeIndex) {
      this.pause();
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.isUnmounted = true;
  }

  handleSlideStart = () => {
    this._isSliding = true;
  };

  handleSlideEnd = () => {
    const pendingIndex = this._pendingIndex;
    this._isSliding = false;
    this._pendingIndex = null;
    if (pendingIndex != null) this.to(pendingIndex);
    else this.cycle();
  };

  handleMouseOut = () => {
    this.cycle();
  };

  handleMouseOver = () => {
    if (this.props.pauseOnHover) this.pause();
  };

  handleNextWhenVisible = () => {
    if (
      !this.isUnmounted &&
      !document.hidden &&
      styles(this.carousel.current, 'visibility') !== 'hidden'
    ) {
      this.handleNext();
    }
  };

  handleNext = e => {
    if (this._isSliding) return;

    const { wrap, activeIndex } = this.props;

    let index = activeIndex + 1;
    const count = ValidComponentChildren.count(this.props.children);

    if (index > count - 1) {
      if (!wrap) return;

      index = 0;
    }

    this.select(index, e, 'next');
  };

  handlePrev(e) {
    if (this._isSliding) return;

    const { wrap, activeIndex } = this.props;

    let index = activeIndex - 1;

    if (index < 0) {
      if (!wrap) return;

      index = ValidComponentChildren.count(this.props.children) - 1;
    }

    this.select(index, e, 'prev');
  }

  // This might be a public API.
  pause() {
    this._isPaused = true;
    clearInterval(this._interval);
    this._interval = null;
  }

  cycle() {
    this._isPaused = false;

    clearInterval(this._interval);
    this._interval = null;

    if (this.props.interval && !this._isPaused) {
      this._interval = setInterval(
        document.visibilityState ? this.handleNextWhenVisible : this.handleNext,
        this.props.interval,
      );
    }
  }

  to(index, event) {
    const { children } = this.props;
    if (index < 0 || index > ValidComponentChildren.count(children) - 1) {
      return;
    }

    if (this._isSliding) {
      this._pendingIndex = index;
      return;
    }

    this.select(index, event);
  }

  select(index, event, direction) {
    clearTimeout(this.timeout);

    const { slide, activeIndex, onSelect } = this.props;

    const previousActiveIndex = slide ? activeIndex : null;

    onSelect(
      index,
      direction || previousActiveIndex > activeIndex ? 'prev' : 'next',
      event,
    );
  }

  renderControls(properties) {
    const { bsPrefix } = this.props;
    const {
      wrap,
      children,
      activeIndex,
      prevIcon,
      nextIcon,
      prevLabel,
      nextLabel,
    } = properties;

    const count = ValidComponentChildren.count(children);

    return [
      (wrap || activeIndex !== 0) && (
        <SafeAnchor
          key="prev"
          className={`${bsPrefix}-control-prev`}
          onClick={this.handlePrev}
        >
          {prevIcon}
          {prevLabel && <span className="sr-only">{prevLabel}</span>}
        </SafeAnchor>
      ),

      (wrap || activeIndex !== count - 1) && (
        <SafeAnchor
          key="next"
          className={`${bsPrefix}-control-next`}
          onClick={this.handleNext}
        >
          {nextIcon}
          {nextLabel && <span className="sr-only">{nextLabel}</span>}
        </SafeAnchor>
      ),
    ];
  }

  renderIndicators(children, activeIndex) {
    const { bsPrefix } = this.props;
    let indicators = [];

    ValidComponentChildren.forEach(children, (child, index) => {
      indicators.push(
        <li
          key={index}
          className={index === activeIndex ? 'active' : null}
          onClick={e => this.to(index, e)}
        />,

        // Force whitespace between indicator elements. Bootstrap requires
        // this for correct spacing of elements.
        ' ',
      );
    });

    return <ol className={`${bsPrefix}-indicators`}>{indicators}</ol>;
  }

  render() {
    const {
      bsPrefix,
      slide,
      activeIndex: _,
      indicators,
      controls,
      wrap,
      prevIcon,
      prevLabel,
      nextIcon,
      nextLabel,
      className,
      children,
      ...props
    } = this.props;

    const { activeIndex, previousActiveIndex, direction } = this.state;

    const [, elementProps] = splitBsPropsAndOmit(props, [
      'interval',
      'pauseOnHover',
      'onSelect',
      'onSlideEnd',
      'defaultActiveIndex',
      'direction',
    ]);

    return (
      <div
        {...elementProps}
        ref={this.carousel}
        className={classNames(className, bsPrefix, { slide })}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {indicators && this.renderIndicators(children, activeIndex)}

        <div className={`${bsPrefix}-inner`}>
          {ValidComponentChildren.map(children, (child, index) => {
            const active = index === activeIndex;
            const previousActive = slide && index === previousActiveIndex;

            return cloneElement(child, {
              active,
              index,
              direction,
              onSlideStart: previousActive ? this.handleSlideStart : null,
              onSlideEnd: previousActive ? this.handleSlideEnd : null,
            });
          })}
        </div>

        {controls &&
          this.renderControls({
            wrap,
            children,
            activeIndex,
            prevIcon,
            prevLabel,
            nextIcon,
            nextLabel,
          })}
      </div>
    );
  }
}
Carousel.defaultProps = defaultProps;
Carousel.propTypes = propTypes;

const DecoratedCarousel = createBootstrapComponent(
  uncontrollable(Carousel, { activeIndex: 'onSelect' }),
  'carousel',
);

DecoratedCarousel.Caption = CarouselCaption;
DecoratedCarousel.Item = CarouselItem;

export default DecoratedCarousel;
