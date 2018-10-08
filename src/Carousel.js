import classNames from 'classnames';
import styles from 'dom-helpers/style';
import transition from 'dom-helpers/transition';
import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import uncontrollable from 'uncontrollable';

import CarouselCaption from './CarouselCaption';
import CarouselItem from './CarouselItem';
import SafeAnchor from './SafeAnchor';
import { map, forEach } from './utils/ElementChildren';
import triggerBrowserReflow from './utils/triggerBrowserReflow';
import { createBootstrapComponent } from './ThemeProvider';

const countChildren = c =>
  React.Children.toArray(c).filter(React.isValidElement).length;

// TODO: `slide` should be `animate`.

const propTypes = {
  /**
   * @default 'carousel'
   */
  bsPrefix: PropTypes.string,

  /**
   * Enables animation on the Carousel as it transitions between slides.
   */
  slide: PropTypes.bool,

  /** Cross fade slides instead of the default slide animation */
  fade: PropTypes.bool,

  /** Slides will loop to the start when the last one transitions */
  wrap: PropTypes.bool,

  /**
   * Show a set of slide position indicators
   */
  indicators: PropTypes.bool,

  /**
   * The amount of time to delay between automatically cycling an item.
   * If `null`, carousel will not automatically cycle.
   */
  interval: PropTypes.number,

  /**
   * Show the Carousel previous and next arrows for changing the current slide
   */
  controls: PropTypes.bool,

  /**
   * Temporarily puase the slide interval when the mouse hovers over a slide.
   */
  pauseOnHover: PropTypes.bool,

  /** Enable keyboard navigation via the Arrow keys for changing slides */
  keyboard: PropTypes.bool,

  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: any, direction: 'prev' | 'next', ?event: Object) => any
   * ```
   *
   * @controllable activeIndex
   */
  onSelect: PropTypes.func,

  /** A callback fired after a slide transitions in */
  onSlideEnd: PropTypes.func,

  /**
   * Controls the current visible slide
   *
   * @controllable onSelect
   */
  activeIndex: PropTypes.number,

  /** Override the default button icon for the "previous" control */
  prevIcon: PropTypes.node,

  /**
   * Label shown to screen readers only, can be used to show the previous element
   * in the carousel.
   * Set to null to deactivate.
   */
  prevLabel: PropTypes.string,

  /** Override the default button icon for the "next" control */
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
  fade: false,
  interval: 5000,
  keyboard: true,
  pauseOnHover: true,
  wrap: true,
  indicators: true,
  controls: true,
  activeIndex: 0,

  prevIcon: <span aria-hidden="true" className="carousel-control-prev-icon" />,
  prevLabel: 'Previous',

  nextIcon: <span aria-hidden="true" className="carousel-control-next-icon" />,
  nextLabel: 'Next',
};

class Carousel extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      prevClasses: '',
      currentClasses: 'active',
    };
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
      const lastPossibleIndex = countChildren(nextProps.children) - 1;

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
    const { bsPrefix, slide } = this.props;
    if (
      !slide ||
      this.state.activeIndex === prevState.activeIndex ||
      this._isSliding
    )
      return;

    const { activeIndex, direction } = this.state;
    let orderClassName, directionalClassName;

    if (direction === 'next') {
      orderClassName = `${bsPrefix}-item-next`;
      directionalClassName = `${bsPrefix}-item-left`;
    } else if (direction === 'prev') {
      orderClassName = `${bsPrefix}-item-prev`;
      directionalClassName = `${bsPrefix}-item-right`;
    }

    this._isSliding = true;

    this.pause();

    // eslint-disable-next-line react/no-did-update-set-state
    this.safeSetState(
      { prevClasses: 'active', currentClasses: orderClassName },
      () => {
        const items = this.carousel.current.children;
        const nextElement = items[activeIndex];
        triggerBrowserReflow(nextElement);

        this.safeSetState(
          {
            prevClasses: classNames('active', directionalClassName),
            currentClasses: classNames(orderClassName, directionalClassName),
          },
          () =>
            transition.end(nextElement, () =>
              this.safeSetState(
                { prevClasses: '', currentClasses: 'active' },
                this.handleSlideEnd,
              ),
            ),
        );
      },
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
    this.isUnmounted = true;
  }

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

  handleKeyDown = event => {
    if (/input|textarea/i.test(event.target.tagName)) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.handlePrev(event);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.handleNext(event);
        break;
      default:
        break;
    }
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
    const count = countChildren(this.props.children);

    if (index > count - 1) {
      if (!wrap) return;

      index = 0;
    }

    this.select(index, e, 'next');
  };

  handlePrev = e => {
    if (this._isSliding) return;

    const { wrap, activeIndex } = this.props;

    let index = activeIndex - 1;

    if (index < 0) {
      if (!wrap) return;
      index = countChildren(this.props.children) - 1;
    }

    this.select(index, e, 'prev');
  };

  safeSetState(state, cb) {
    if (this.isUnmounted) return;
    this.setState(state, () => !this.isUnmounted && cb());
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
    if (index < 0 || index > countChildren(children) - 1) {
      return;
    }

    if (this._isSliding) {
      this._pendingIndex = index;
      return;
    }

    this.select(index, event);
  }

  select(index, event, direction) {
    clearTimeout(this.selectThrottle);
    if (event && event.persist) event.persist();

    // The timeout throttles fast clicks, in order to give any pending state
    // a chance to update and propagate back through props
    this.selectThrottle = setTimeout(() => {
      clearTimeout(this.timeout);

      const { activeIndex, onSelect } = this.props;
      if (index === activeIndex || this._isSliding || this.isUnmounted) return;

      onSelect(
        index,
        direction || (index < activeIndex ? 'prev' : 'next'),
        event,
      );
    }, 50);
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

    const count = countChildren(children);

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

    forEach(children, (child, index) => {
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
      fade,
      indicators,
      controls,
      wrap,
      prevIcon,
      prevLabel,
      nextIcon,
      nextLabel,
      className,
      children,
      keyboard,
      activeIndex: _5,
      pauseOnHover: _4,
      interval: _3,
      onSelect: _2,
      onSlideEnd: _1,
      ...props
    } = this.props;

    const {
      activeIndex,
      previousActiveIndex,
      prevClasses,
      currentClasses,
    } = this.state;

    return (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <div
        {...props}
        className={classNames(
          className,
          bsPrefix,
          slide && 'slide',
          fade && `${bsPrefix}-fade`,
        )}
        onKeyDown={keyboard ? this.handleKeyDown : undefined}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {indicators && this.renderIndicators(children, activeIndex)}

        <div className={`${bsPrefix}-inner`} ref={this.carousel}>
          {map(children, (child, index) => {
            const current = index === activeIndex;
            const previous = index === previousActiveIndex;

            return cloneElement(child, {
              className: classNames(
                child.props.className,
                `${bsPrefix}-item`,
                current && currentClasses,
                previous && prevClasses,
              ),
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
