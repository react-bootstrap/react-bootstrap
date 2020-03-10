import useEventCallback from '@restart/hooks/useEventCallback';
import useMounted from '@restart/hooks/useMounted';
import useUpdateEffect from '@restart/hooks/useUpdateEffect';
import useStateAsync from '@restart/hooks/useStateAsync';
import useTimeout from '@restart/hooks/useTimeout';
import classNames from 'classnames';
import transitionEnd from 'dom-helpers/transitionEnd';
import PropTypes from 'prop-types';
import React, {
  cloneElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from 'react';
import { useUncontrolled } from 'uncontrollable';
import CarouselCaption from './CarouselCaption';
import CarouselItem from './CarouselItem';
import { map } from './ElementChildren';
import SafeAnchor from './SafeAnchor';
import { useBootstrapPrefix } from './ThemeProvider';
import triggerBrowserReflow from './triggerBrowserReflow';

const SWIPE_THRESHOLD = 40;

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

  /**
   * Show the Carousel previous and next arrows for changing the current slide
   */
  controls: PropTypes.bool,

  /**
   * Show a set of slide position indicators
   */
  indicators: PropTypes.bool,

  /**
   * Controls the current visible slide
   *
   * @controllable onSelect
   */
  activeIndex: PropTypes.number,

  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: number, event: Object | null) => void
   * ```
   *
   * @controllable activeIndex
   */
  onSelect: PropTypes.func,

  /**
   * Callback fired when a slide transition starts.
   *
   * ```js
   * (eventKey: number, direction: 'left' | 'right') => void
   */
  onSlide: PropTypes.func,

  /**
   * Callback fired when a slide transition ends.
   *
   * ```js
   * (eventKey: number, direction: 'left' | 'right') => void
   */
  onSlid: PropTypes.func,

  /**
   * The amount of time to delay between automatically cycling an item. If `null`, carousel will not automatically cycle.
   */
  interval: PropTypes.number,

  /** Whether the carousel should react to keyboard events. */
  keyboard: PropTypes.bool,

  /**
   * If set to `"hover"`, pauses the cycling of the carousel on `mouseenter` and resumes the cycling of the carousel on `mouseleave`. If set to `false`, hovering over the carousel won't pause it.
   *
   * On touch-enabled devices, when set to `"hover"`, cycling will pause on `touchend` (once the user finished interacting with the carousel) for two intervals, before automatically resuming. Note that this is in addition to the above mouse behavior.
   */
  pause: PropTypes.oneOf(['hover', false]),

  /** Whether the carousel should cycle continuously or have hard stops. */
  wrap: PropTypes.bool,

  /**
   * Whether the carousel should support left/right swipe interactions on touchscreen devices.
   */
  touch: PropTypes.bool,

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
  controls: true,
  indicators: true,

  defaultActiveIndex: 0,
  interval: 5000,
  keyboard: true,
  pause: 'hover',
  wrap: true,
  touch: true,

  prevIcon: <span aria-hidden="true" className="carousel-control-prev-icon" />,
  prevLabel: 'Previous',

  nextIcon: <span aria-hidden="true" className="carousel-control-next-icon" />,
  nextLabel: 'Next',
};

function isVisible(element) {
  if (
    !element ||
    !element.style ||
    !element.parentNode ||
    !element.parentNode.style
  ) {
    return false;
  }

  const elementStyle = getComputedStyle(element);

  return (
    elementStyle.display !== 'none' &&
    elementStyle.visibility !== 'hidden' &&
    getComputedStyle(element.parentNode).display !== 'none'
  );
}

const Carousel = React.forwardRef((uncontrolledProps, ref) => {
  const {
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    bsPrefix,
    slide,
    fade,
    controls,
    indicators,
    activeIndex,
    onSelect,
    onSlide,
    onSlid,
    interval,
    keyboard,
    onKeyDown,
    pause,
    onMouseOver,
    onMouseOut,
    wrap,
    touch,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    prevIcon,
    prevLabel,
    nextIcon,
    nextLabel,
    className,
    children,
    ...props
  } = useUncontrolled(uncontrolledProps, {
    activeIndex: 'onSelect',
  });

  const prefix = useBootstrapPrefix(bsPrefix, 'carousel');

  const nextDirectionRef = useRef(null);
  const [direction, setDirection] = useState(null);

  const [prevActiveIndex, setPrevActiveIndex] = useState(null);
  const [renderedActiveIndex, setRenderedActiveIndex] = useState(activeIndex);

  const animationInProgress = prevActiveIndex != null;
  const [animationStarted, setAnimationStarted] = useStateAsync(false);

  const pendingActiveIndexRef = useRef(null);

  if (!animationInProgress) {
    if (pendingActiveIndexRef.current != null) {
      const nextActiveIndex = pendingActiveIndexRef.current;
      pendingActiveIndexRef.current = null;

      onSelect(nextActiveIndex, null);
    } else if (activeIndex !== renderedActiveIndex) {
      if (nextDirectionRef.current) {
        setDirection(nextDirectionRef.current);
        nextDirectionRef.current = null;
      } else {
        setDirection(activeIndex > renderedActiveIndex ? 'next' : 'prev');
      }

      if (slide) {
        setPrevActiveIndex(renderedActiveIndex);
      }

      setRenderedActiveIndex(activeIndex);
    }
  }

  const numChildren = React.Children.toArray(children).filter(
    React.isValidElement,
  ).length;

  const prev = useCallback(
    event => {
      if (animationInProgress) {
        return;
      }

      let nextActiveIndex = renderedActiveIndex - 1;
      if (nextActiveIndex < 0) {
        if (!wrap) {
          return;
        }

        nextActiveIndex = numChildren - 1;
      }

      nextDirectionRef.current = 'prev';

      onSelect(nextActiveIndex, event);
    },
    [animationInProgress, renderedActiveIndex, onSelect, wrap, numChildren],
  );

  // This is used in the setInterval, so it should not invalidate.
  const next = useEventCallback(
    event => {
      if (animationInProgress) {
        return;
      }

      let nextActiveIndex = renderedActiveIndex + 1;
      if (nextActiveIndex >= numChildren) {
        if (!wrap) {
          return;
        }

        nextActiveIndex = 0;
      }

      nextDirectionRef.current = 'next';

      onSelect(nextActiveIndex, event);
    },
    [animationInProgress, renderedActiveIndex, numChildren, onSelect, wrap],
  );

  const elementRef = useRef();

  useImperativeHandle(ref, () => ({ element: elementRef.current, prev, next }));

  const nextWhenVisible = useEventCallback(() => {
    if (!document.hidden && isVisible(elementRef.current)) {
      next();
    }
  });

  const handleSlide = useEventCallback(
    onSlide &&
      (() => {
        onSlide(renderedActiveIndex, direction === 'next' ? 'left' : 'right');
      }),
  );

  const handleSlid = useEventCallback(
    onSlid &&
      (() => {
        onSlid(renderedActiveIndex, direction === 'next' ? 'left' : 'right');
      }),
  );

  const activeChildRef = useRef();
  const isMounted = useMounted();

  useUpdateEffect(() => {
    handleSlide();

    if (!slide) {
      handleSlid();
      return;
    }

    triggerBrowserReflow(activeChildRef.current);

    setAnimationStarted(true).then(() => {
      if (!isMounted()) {
        return;
      }

      transitionEnd(activeChildRef.current, () => {
        if (!isMounted()) {
          return;
        }

        setAnimationStarted(false);
        setPrevActiveIndex(null);

        handleSlid();
      });
    });
  }, [renderedActiveIndex]);

  const handleKeyDown = useCallback(
    event => {
      if (/input|textarea/i.test(event.target.tagName)) {
        return;
      }

      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          prev(event);
          break;
        case 'ArrowRight':
          event.preventDefault();
          next(event);
          break;
        default:
          if (onKeyDown) {
            onKeyDown(event);
          }
      }
    },
    [prev, next, onKeyDown],
  );

  const [pausedOnHover, setPausedOnHover] = useState(false);

  const handleMouseOver = useCallback(
    event => {
      if (pause === 'hover') {
        setPausedOnHover(true);
      }

      if (onMouseOver) {
        onMouseOver(event);
      }
    },
    [pause, onMouseOver],
  );

  const handleMouseOut = useCallback(
    event => {
      setPausedOnHover(false);

      if (onMouseOut) {
        onMouseOut(event);
      }
    },
    [onMouseOut],
  );

  const touchStartXRef = useRef(0);
  const touchDeltaXRef = useRef(0);
  const [pausedOnTouch, setPausedOnTouch] = useState(false);
  const touchUnpauseTimeout = useTimeout();

  const handleTouchStart = useCallback(
    event => {
      touchStartXRef.current = event.touches[0].clientX;
      touchDeltaXRef.current = 0;

      setPausedOnTouch(true);

      if (onTouchStart) {
        onTouchStart(event);
      }
    },
    [onTouchStart],
  );

  const handleTouchMove = useCallback(
    event => {
      if (event.touches && event.touches.length > 1) {
        touchDeltaXRef.current = 0;
      } else {
        touchDeltaXRef.current =
          event.touches[0].clientX - touchStartXRef.current;
      }

      if (onTouchMove) {
        onTouchMove(event);
      }
    },
    [onTouchMove],
  );

  const handleTouchEnd = useCallback(
    event => {
      const touchDeltaX = touchDeltaXRef.current;

      if (Math.abs(touchDeltaX) <= SWIPE_THRESHOLD) {
        return;
      }

      if (touchDeltaX > 0) {
        prev(event);
      } else {
        next(event);
      }

      touchUnpauseTimeout.set(() => {
        setPausedOnTouch(false);
      }, interval);

      if (onTouchEnd) {
        onTouchEnd(event);
      }
    },
    [touchUnpauseTimeout, interval, onTouchEnd, prev, next],
  );

  const shouldPlay =
    interval != null &&
    !pausedOnHover &&
    !pausedOnTouch &&
    !animationInProgress;

  const intervalHandleRef = useRef();

  useEffect(() => {
    if (!shouldPlay) {
      return undefined;
    }

    intervalHandleRef.current = setInterval(
      document.visibilityState ? nextWhenVisible : next,
      interval,
    );

    return () => {
      clearInterval(intervalHandleRef.current);
    };
  }, [shouldPlay, next, interval, nextWhenVisible]);

  let prevActiveChildClassName;
  let renderedActiveChildClassName;

  if (!animationInProgress) {
    prevActiveChildClassName = null;
    renderedActiveChildClassName = 'active';
  } else {
    prevActiveChildClassName = 'active';
    renderedActiveChildClassName = `${prefix}-item-${direction}`;

    if (animationStarted) {
      const directionalClassName = `${prefix}-item-${
        direction === 'next' ? 'left' : 'right'
      }`;
      prevActiveChildClassName += ` ${directionalClassName}`;
      renderedActiveChildClassName += ` ${directionalClassName}`;
    }
  }

  return (
    <Component
      ref={elementRef}
      {...props}
      onKeyDown={keyboard ? handleKeyDown : undefined}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onTouchStart={touch ? handleTouchStart : undefined}
      onTouchMove={touch ? handleTouchMove : undefined}
      onTouchEnd={touch ? handleTouchEnd : undefined}
      className={classNames(
        className,
        prefix,
        slide && 'slide',
        fade && `${prefix}-fade`,
      )}
    >
      {indicators && (
        <ol className={`${prefix}-indicators`}>
          {map(children, (child, index) => (
            <li
              key={index}
              className={index === renderedActiveIndex ? 'active' : null}
              onClick={event => {
                if (animationInProgress) {
                  pendingActiveIndexRef.current = index;
                } else {
                  onSelect(index, event);
                }
              }}
            />
          ))}
        </ol>
      )}

      <div className={`${prefix}-inner`}>
        {map(children, (child, index) =>
          cloneElement(child, {
            ref: index === renderedActiveIndex ? activeChildRef : null,
            className: classNames(
              child.props.className,
              index === prevActiveIndex && prevActiveChildClassName,
              index === renderedActiveIndex && renderedActiveChildClassName,
            ),
          }),
        )}
      </div>

      {controls && (
        <>
          {(wrap || activeIndex !== 0) && (
            <SafeAnchor className={`${prefix}-control-prev`} onClick={prev}>
              {prevIcon}
              {prevLabel && <span className="sr-only">{prevLabel}</span>}
            </SafeAnchor>
          )}
          {(wrap || activeIndex !== numChildren - 1) && (
            <SafeAnchor className={`${prefix}-control-next`} onClick={next}>
              {nextIcon}
              {nextLabel && <span className="sr-only">{nextLabel}</span>}
            </SafeAnchor>
          )}
        </>
      )}
    </Component>
  );
});

Carousel.displayName = 'Carousel';
Carousel.propTypes = propTypes;
Carousel.defaultProps = defaultProps;

Carousel.Caption = CarouselCaption;
Carousel.Item = CarouselItem;

export default Carousel;
