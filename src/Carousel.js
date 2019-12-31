/* eslint-disable no-shadow */
import useIsomorphicEffect from '@restart/hooks/useIsomorphicEffect';
import useMergedRefs from '@restart/hooks/useMergedRefs';
import classNames from 'classnames';
import styles from 'dom-helpers/css';
import transitionEnd from 'dom-helpers/transitionEnd';
import PropTypes from 'prop-types';
import React, { cloneElement, useEffect, useRef, useState } from 'react';
import { useUncontrolled } from 'uncontrollable';
import CarouselCaption from './CarouselCaption';
import CarouselItem from './CarouselItem';
import { forEach, map } from './ElementChildren';
import SafeAnchor from './SafeAnchor';
import { useBootstrapPrefix } from './ThemeProvider';
import triggerBrowserReflow from './triggerBrowserReflow';

const countChildren = c =>
  React.Children.toArray(c).filter(React.isValidElement).length;

const SWIPE_THRESHOLD = 40;

// TODO: `slide` should be `animate`.

const propTypes = {
  /**
   * @default 'carousel'
   */
  bsPrefix: PropTypes.string,
  as: PropTypes.elementType,

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
   * Temporarily pause the slide interval when the mouse hovers over a slide.
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

  /**
   * Whether the carousel should support left/right swipe interactions on touchscreen devices.
   */
  touch: PropTypes.bool,
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
  defaultActiveIndex: 0,

  prevIcon: <span aria-hidden="true" className="carousel-control-prev-icon" />,
  prevLabel: 'Previous',

  nextIcon: <span aria-hidden="true" className="carousel-control-next-icon" />,
  nextLabel: 'Next',
  touch: true,
};

const Carousel = React.forwardRef((uncontrolledProps, ref) => {
  let {
    activeIndex: activeIndexProp,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    bsPrefix,
    children,
    className,
    controls,
    fade,
    indicators,
    interval,
    keyboard,
    nextIcon,
    nextLabel,
    onSelect,
    onSlideEnd,
    pauseOnHover,
    prevIcon,
    prevLabel,
    slide,
    touch,
    wrap,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    activeIndex: 'onSelect',
  });

  const prefix = useBootstrapPrefix(bsPrefix, 'carousel');

  const [classPair, setClassPair] = useState({
    prevClasses: '',
    currentClasses: 'active',
  });
  let activeIndex = useRef(undefined);
  let previousActiveIndex = useRef(undefined);
  let direction = useRef('');

  const isUnmounted = useRef(true);
  const _isPaused = useRef(false);
  const _interval = useRef(null);
  const _isSliding = useRef(false);
  const _pendingIndex = useRef(null);
  const animationStage = useRef(1);
  const touchStartX = useRef(0);
  const selectThrottle = useRef(null);
  const nextElement = useRef(false);
  const carouselNode = useRef(null);

  if (activeIndexProp !== activeIndex.current) {
    const lastPossibleIndex = countChildren(children) - 1;

    const nextIndex = Math.max(0, Math.min(activeIndexProp, lastPossibleIndex));

    if (
      (nextIndex === 0 && activeIndex.current >= lastPossibleIndex) ||
      activeIndex.current <= nextIndex
    ) {
      direction.current = 'next';
    } else {
      direction.current = 'prev';
    }

    previousActiveIndex.current = activeIndex.current;
    activeIndex.current = nextIndex;
  }

  const safeSetState = (state, setState) => {
    if (isUnmounted.current) return;
    setState(state);
  };

  const select = (index, event, direction) => {
    clearTimeout(selectThrottle.current);
    if (event && event.persist) event.persist();

    // The timeout throttles fast clicks, in order to give any pending state
    // a chance to update and propagate back through props
    selectThrottle.current = setTimeout(() => {
      if (
        index === activeIndex.current ||
        _isSliding.current ||
        isUnmounted.current
      )
        return;

      onSelect(
        index,
        direction || (index < activeIndex.current ? 'prev' : 'next'),
        event,
      );
    }, 50);
  };

  const handleNext = e => {
    if (_isSliding.current) return;

    let index = activeIndexProp + 1;
    const count = countChildren(children);

    if (index > count - 1) {
      if (!wrap) return;

      index = 0;
    }

    select(index, e, 'next');
  };

  const handlePrev = e => {
    if (_isSliding.current) return;

    let index = activeIndexProp - 1;

    if (index < 0) {
      if (!wrap) return;
      index = countChildren(children) - 1;
    }

    select(index, e, 'prev');
  };

  const handleNextWhenVisible = () => {
    if (
      !isUnmounted.current &&
      !document.hidden &&
      styles(carouselNode.current, 'visibility') !== 'hidden'
    ) {
      handleNext();
    }
  };

  const cycle = () => {
    _isPaused.current = false;

    clearInterval(_interval.current);
    _interval.current = null;

    if (interval && !_isPaused.current) {
      _interval.current = setInterval(
        document.visibilityState ? handleNextWhenVisible : handleNext,
        interval,
      );
    }
  };

  const to = (index, event) => {
    if (index < 0 || index > countChildren(children) - 1) {
      return;
    }

    if (_isSliding.current) {
      _pendingIndex.current = index;
      return;
    }

    select(index, event);
  };

  const handleSlideEnd = () => {
    const pendingIndex = _pendingIndex.current;
    _isSliding.current = false;
    _pendingIndex.current = null;

    if (pendingIndex != null) to(pendingIndex);
    else cycle();
  };

  const pause = () => {
    _isPaused.current = true;
    clearInterval(_interval.current);
    _interval.current = null;
  };

  const handleMouseOut = () => {
    cycle();
  };

  const handleMouseOver = () => {
    if (pauseOnHover) pause();
  };

  const handleTouchStart = e => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = e => {
    // If the swipe is under the threshold, don't do anything.
    if (
      Math.abs(e.changedTouches[0].screenX - touchStartX.current) <
      SWIPE_THRESHOLD
    )
      return;

    if (e.changedTouches[0].screenX < touchStartX.current) {
      // Swiping left to navigate to next item.
      handleNext(e);
    } else {
      // Swiping right to navigate to previous item.
      handlePrev(e);
    }
  };

  const handleKeyDown = event => {
    if (/input|textarea/i.test(event.target.tagName)) return;

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        handlePrev(event);
        break;
      case 'ArrowRight':
        event.preventDefault();
        handleNext(event);
        break;
      default:
        break;
    }
  };

  useIsomorphicEffect(() => {
    if (
      !isUnmounted.current &&
      activeIndex.current !== previousActiveIndex.current &&
      slide
    ) {
      let orderClassName, directionalClassName;

      if (direction.current === 'next') {
        orderClassName = `${prefix}-item-next`;
        directionalClassName = `${prefix}-item-left`;
      } else if (direction.current === 'prev') {
        orderClassName = `${prefix}-item-prev`;
        directionalClassName = `${prefix}-item-right`;
      }

      if (animationStage.current === 1) {
        _isSliding.current = true;
        pause();

        safeSetState(
          {
            prevClasses: 'active',
            currentClasses: orderClassName,
          },
          setClassPair,
        );

        animationStage.current++;
      } else if (animationStage.current === 2) {
        const items = carouselNode.current.children;
        nextElement.current = items[activeIndex.current];
        triggerBrowserReflow(nextElement.current);

        safeSetState(
          {
            prevClasses: classNames('active', directionalClassName),
            currentClasses: classNames(orderClassName, directionalClassName),
          },
          setClassPair,
        );

        animationStage.current++;
      } else if (animationStage.current === 3) {
        transitionEnd(nextElement.current, () => {
          animationStage.current = 4;

          safeSetState(
            {
              prevClasses: '',
              currentClasses: 'active',
            },
            setClassPair,
          );

          if (onSlideEnd) {
            onSlideEnd();
          }
        });
      } else if (animationStage.current === 4) {
        animationStage.current = 1;
        handleSlideEnd();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndexProp, classPair]);

  useEffect(() => {
    isUnmounted.current = false;

    cycle();

    return () => {
      isUnmounted.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderControls = properties => {
    const {
      activeIndex,
      children,
      nextIcon,
      nextLabel,
      prevIcon,
      prevLabel,
      wrap,
    } = properties;

    const count = countChildren(children);

    return [
      (wrap || activeIndex.current !== 0) && (
        <SafeAnchor
          key="prev"
          className={`${prefix}-control-prev`}
          onClick={handlePrev}
        >
          {prevIcon}
          {prevLabel && <span className="sr-only">{prevLabel}</span>}
        </SafeAnchor>
      ),

      (wrap || activeIndex.current !== count - 1) && (
        <SafeAnchor
          key="next"
          className={`${prefix}-control-next`}
          onClick={handleNext}
        >
          {nextIcon}
          {nextLabel && <span className="sr-only">{nextLabel}</span>}
        </SafeAnchor>
      ),
    ];
  };

  const renderIndicators = () => {
    let indicators = [];

    forEach(children, (child, index) => {
      indicators.push(
        <li
          key={index}
          className={index === activeIndex.current ? 'active' : null}
          onClick={e => to(index, e)}
        />,

        // Force whitespace between indicator elements. Bootstrap requires
        // this for correct spacing of elements.
        ' ',
      );
    });

    return <ol className={`${prefix}-indicators`}>{indicators}</ol>;
  };

  const mergedRef = useMergedRefs(ref, carouselNode);

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <Component
      onTouchStart={touch ? handleTouchStart : undefined}
      onTouchEnd={touch ? handleTouchEnd : undefined}
      {...props}
      className={classNames(
        className,
        prefix,
        slide && 'slide',
        fade && `${prefix}-fade`,
      )}
      onKeyDown={keyboard ? handleKeyDown : undefined}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {indicators && renderIndicators()}

      <div className={`${prefix}-inner`} ref={mergedRef}>
        {map(children, (child, index) => {
          const current = index === activeIndex.current;
          const previous = index === previousActiveIndex.current;

          return cloneElement(child, {
            className: classNames(
              child.props.className,
              current && classPair.currentClasses,
              previous && classPair.prevClasses,
            ),
          });
        })}
      </div>
      {controls &&
        renderControls({
          activeIndex,
          children,
          nextIcon,
          nextLabel,
          prevIcon,
          prevLabel,
          wrap,
        })}
    </Component>
  );
});

Carousel.displayName = 'Carousel';
Carousel.defaultProps = defaultProps;
Carousel.propTypes = propTypes;

Carousel.Caption = CarouselCaption;
Carousel.Item = CarouselItem;

export default Carousel;
