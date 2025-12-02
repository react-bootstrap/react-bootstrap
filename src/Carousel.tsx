import useEventCallback from '@restart/hooks/useEventCallback';
import useUpdateEffect from '@restart/hooks/useUpdateEffect';
import useCommittedRef from '@restart/hooks/useCommittedRef';
import useTimeout from '@restart/hooks/useTimeout';
import Anchor from '@restart/ui/Anchor';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import clsx from 'clsx';
import type { TransitionStatus } from 'react-transition-group';
import * as React from 'react';
import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useUncontrolled } from 'uncontrollable';
import CarouselCaption from './CarouselCaption.js';
import CarouselItem from './CarouselItem.js';
import { map, forEach } from './ElementChildren.js';
import { useBootstrapPrefix, useIsRTL } from './ThemeProvider.js';
import transitionEndListener from './transitionEndListener.js';
import triggerBrowserReflow from './triggerBrowserReflow.js';
import TransitionWrapper from './TransitionWrapper.js';

export type CarouselVariant = 'dark' | string;

export interface CarouselRef {
  element?: HTMLElement | null;
  prev: (e?: React.SyntheticEvent) => void;
  next: (e?: React.SyntheticEvent) => void;
}

export interface CarouselProps extends Omit<
  React.HTMLAttributes<HTMLElement>,
  'onSelect'
> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'carousel'
   */
  bsPrefix?: string | undefined;

  /**
   * Enables animation on the Carousel as it transitions between slides.
   */
  slide?: boolean | undefined;

  /**
   * Animates slides with a crossfade animation instead of the default slide animation.
   */
  fade?: boolean | undefined;

  /**
   * Show the Carousel previous and next arrows for changing the current slide.
   */
  controls?: boolean | undefined;

  /**
   * Show a set of slide position indicators.
   */
  indicators?: boolean | undefined;

  /**
   * An array of labels for the indicators. Defaults to "Slide #" if not provided.
   */
  indicatorLabels?: string[] | undefined;

  /**
   * Controls the current visible slide.
   *
   * @controllable onSelect
   */
  activeIndex?: number | undefined;

  /**
   * The default active index that is shown when the component is first rendered.
   */
  defaultActiveIndex?: number | undefined;

  /**
   * Callback fired when the active item changes.
   *
   * ```js
   * (eventKey: number, event: Object | null) => void
   * ```
   *
   * @type {((eventKey: number, event: Record<string, unknown> | null) => void) | undefined}
   * @controllable activeIndex
   */
  onSelect?:
    | ((eventKey: number, event: Record<string, unknown> | null) => void)
    | undefined;

  /**
   * Callback fired when a slide transition starts.
   *
   * ```js
   * (eventKey: number, direction: 'left' | 'right') => void
   * ```
   *
   * @type {((eventKey: number, direction: 'left' | 'right') => void) | undefined}
   */
  onSlide?:
    | ((eventKey: number, direction: 'start' | 'end') => void)
    | undefined;

  /**
   * Callback fired when a slide transition ends.
   *
   * ```js
   * (eventKey: number, direction: 'left' | 'right') => void
   * ```
   *
   * @type {((eventKey: number, direction: 'left' | 'right') => void) | undefined}
   */
  onSlid?: ((eventKey: number, direction: 'start' | 'end') => void) | undefined;

  /**
   * The amount of time to delay between automatically cycling an item. If `null`, carousel will not automatically cycle.
   */
  interval?: number | null | undefined;

  /**
   * Whether the carousel should react to keyboard events.
   */
  keyboard?: boolean | undefined;

  /**
   * If set to `"hover"`, pauses the cycling of the carousel on `mouseenter` and resumes the cycling of the carousel on
   * `mouseleave`. If set to `false`, hovering over the carousel won't pause it.
   *
   * On touch-enabled devices, when set to `"hover"`, cycling will pause on `touchend` (once the user finished interacting
   * with the carousel) for two intervals, before automatically resuming. Note that this is in addition to the above mouse
   * behavior.
   */
  pause?: 'hover' | false | undefined;

  /**
   * Whether the carousel should cycle continuously or have hard stops.
   */
  wrap?: boolean | undefined;

  /**
   * Whether the carousel should support left/right swipe interactions on touchscreen devices.
   */
  touch?: boolean | undefined;

  /**
   * Override the default button icon for the "previous" control.
   */
  prevIcon?: React.ReactNode | undefined;

  /**
   * Label shown to screen readers only, can be used to show the previous element in the carousel.
   * Set to null to deactivate.
   */
  prevLabel?: React.ReactNode | undefined;

  /**
   * Override the default button icon for the "next" control
   */
  nextIcon?: React.ReactNode | undefined;

  /**
   * Label shown to screen readers only, can be used to show the next element in the carousel.
   * Set to null to deactivate.
   */
  nextLabel?: React.ReactNode | undefined;

  /**
   * Color variant that controls the colors of the controls, indicators
   * and captions.
   */
  variant?: CarouselVariant | undefined;

  /**
   * Carousel ref.
   */
  ref?: React.Ref<CarouselRef> | undefined;
}

const SWIPE_THRESHOLD = 40;

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

const Carousel: DynamicRefForwardingComponent<'div', CarouselProps> =
  React.forwardRef<CarouselRef, CarouselProps>(
    ({ defaultActiveIndex = 0, ...uncontrolledProps }, ref) => {
      const {
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        bsPrefix,
        slide = true,
        fade = false,
        controls = true,
        indicators = true,
        indicatorLabels = [],
        activeIndex,
        onSelect,
        onSlide,
        onSlid,
        interval = 5000,
        keyboard = true,
        onKeyDown,
        pause = 'hover',
        onMouseOver,
        onMouseOut,
        wrap = true,
        touch = true,
        onTouchStart,
        onTouchMove,
        onTouchEnd,
        prevIcon = (
          <span aria-hidden="true" className="carousel-control-prev-icon" />
        ),
        prevLabel = 'Previous',
        nextIcon = (
          <span aria-hidden="true" className="carousel-control-next-icon" />
        ),
        nextLabel = 'Next',
        variant,
        className,
        children,
        ...props
      } = useUncontrolled(
        { defaultActiveIndex, ...uncontrolledProps },
        {
          activeIndex: 'onSelect',
        },
      );

      const prefix = useBootstrapPrefix(bsPrefix, 'carousel');
      const isRTL = useIsRTL();

      const nextDirectionRef = useRef<string | null>(null);
      const [direction, setDirection] = useState('next');
      const [paused, setPaused] = useState(false);
      const [isSliding, setIsSliding] = useState(false);
      const [renderedActiveIndex, setRenderedActiveIndex] = useState<number>(
        activeIndex || 0,
      );

      useEffect(() => {
        if (!isSliding && activeIndex !== renderedActiveIndex) {
          if (nextDirectionRef.current) {
            setDirection(nextDirectionRef.current);
          } else {
            setDirection(
              (activeIndex || 0) > renderedActiveIndex ? 'next' : 'prev',
            );
          }

          if (slide) {
            setIsSliding(true);
          }

          setRenderedActiveIndex(activeIndex || 0);
        }
      }, [activeIndex, isSliding, renderedActiveIndex, slide]);

      useEffect(() => {
        if (nextDirectionRef.current) {
          nextDirectionRef.current = null;
        }
      });

      let numChildren = 0;
      let activeChildInterval: number | undefined;

      // Iterate to grab all of the children's interval values
      // (and count them, too)
      forEach(children, (child, index) => {
        ++numChildren;
        if (index === activeIndex) {
          activeChildInterval = child.props.interval as number | undefined;
        }
      });

      const activeChildIntervalRef = useCommittedRef(activeChildInterval);

      const prev = useCallback(
        (event?) => {
          if (isSliding) {
            return;
          }

          let nextActiveIndex = renderedActiveIndex - 1;
          if (nextActiveIndex < 0) {
            if (!wrap) {
              return;
            }

            nextActiveIndex = numChildren > 0 ? numChildren - 1 : 0;
          }

          nextDirectionRef.current = 'prev';
          onSelect?.(nextActiveIndex, event);
        },
        [isSliding, renderedActiveIndex, onSelect, wrap, numChildren],
      );

      // This is used in the setInterval, so it should not invalidate.
      const next = useEventCallback((event?) => {
        if (isSliding) {
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

        onSelect?.(nextActiveIndex, event);
      });

      const elementRef = useRef<HTMLElement>(null);

      useImperativeHandle(ref, () => ({
        element: elementRef.current,
        prev,
        next,
      }));

      // This is used in the setInterval, so it should not invalidate.
      const nextWhenVisible = useEventCallback(() => {
        if (!document.hidden && isVisible(elementRef.current)) {
          if (isRTL) {
            prev();
          } else {
            next();
          }
        }
      });

      const slideDirection = direction === 'next' ? 'start' : 'end';

      useUpdateEffect(() => {
        if (slide) {
          // These callbacks will be handled by the <Transition> callbacks.
          return;
        }

        onSlide?.(renderedActiveIndex, slideDirection);
        onSlid?.(renderedActiveIndex, slideDirection);
      }, [renderedActiveIndex]);

      const orderClassName = `${prefix}-item-${direction}`;
      const directionalClassName = `${prefix}-item-${slideDirection}`;

      const handleEnter = useCallback(
        (node) => {
          triggerBrowserReflow(node);

          onSlide?.(renderedActiveIndex, slideDirection);
        },
        [onSlide, renderedActiveIndex, slideDirection],
      );

      const handleEntered = useCallback(() => {
        setIsSliding(false);

        onSlid?.(renderedActiveIndex, slideDirection);
      }, [onSlid, renderedActiveIndex, slideDirection]);

      const handleKeyDown = useCallback(
        (event) => {
          if (keyboard && !/input|textarea/i.test(event.target.tagName)) {
            switch (event.key) {
              case 'ArrowLeft':
                event.preventDefault();
                if (isRTL) {
                  next(event);
                } else {
                  prev(event);
                }
                return;
              case 'ArrowRight':
                event.preventDefault();
                if (isRTL) {
                  prev(event);
                } else {
                  next(event);
                }
                return;
              default:
            }
          }

          onKeyDown?.(event);
        },
        [keyboard, onKeyDown, prev, next, isRTL],
      );

      const handleMouseOver = useCallback(
        (event) => {
          if (pause === 'hover') {
            setPaused(true);
          }

          onMouseOver?.(event);
        },
        [pause, onMouseOver],
      );

      const handleMouseOut = useCallback(
        (event) => {
          setPaused(false);

          onMouseOut?.(event);
        },
        [onMouseOut],
      );

      const touchStartXRef = useRef(0);
      const touchDeltaXRef = useRef(0);
      const touchUnpauseTimeout = useTimeout();

      const handleTouchStart = useCallback(
        (event) => {
          touchStartXRef.current = event.touches[0].clientX;
          touchDeltaXRef.current = 0;

          if (pause === 'hover') {
            setPaused(true);
          }

          onTouchStart?.(event);
        },
        [pause, onTouchStart],
      );

      const handleTouchMove = useCallback(
        (event) => {
          if (event.touches && event.touches.length > 1) {
            touchDeltaXRef.current = 0;
          } else {
            touchDeltaXRef.current =
              event.touches[0].clientX - touchStartXRef.current;
          }

          onTouchMove?.(event);
        },
        [onTouchMove],
      );

      const handleTouchEnd = useCallback(
        (event) => {
          if (touch) {
            const touchDeltaX = touchDeltaXRef.current;

            if (Math.abs(touchDeltaX) > SWIPE_THRESHOLD) {
              if (touchDeltaX > 0) {
                prev(event);
              } else {
                next(event);
              }
            }
          }

          if (pause === 'hover') {
            touchUnpauseTimeout.set(() => {
              setPaused(false);
            }, interval || undefined);
          }

          onTouchEnd?.(event);
        },
        [touch, pause, prev, next, touchUnpauseTimeout, interval, onTouchEnd],
      );

      const shouldPlay = interval != null && !paused && !isSliding;

      const intervalHandleRef = useRef<number | null>(null);

      useEffect(() => {
        if (!shouldPlay) {
          return undefined;
        }

        const nextFunc = isRTL ? prev : next;
        intervalHandleRef.current = window.setInterval(
          document.visibilityState ? nextWhenVisible : nextFunc,
          activeChildIntervalRef.current ?? interval ?? undefined,
        );

        return () => {
          if (intervalHandleRef.current !== null) {
            clearInterval(intervalHandleRef.current);
          }
        };
      }, [
        shouldPlay,
        prev,
        next,
        activeChildIntervalRef,
        interval,
        nextWhenVisible,
        isRTL,
      ]);

      const indicatorOnClicks = useMemo(
        () =>
          indicators &&
          Array.from({ length: numChildren }, (_, index) => (event) => {
            onSelect?.(index, event);
          }),
        [indicators, numChildren, onSelect],
      );

      return (
        <Component
          ref={elementRef}
          {...props}
          onKeyDown={handleKeyDown}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className={clsx(
            className,
            prefix,
            slide && 'slide',
            fade && `${prefix}-fade`,
            variant && `${prefix}-${variant}`,
          )}
        >
          {indicators && (
            <div className={`${prefix}-indicators`}>
              {map(children, (_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="" // Bootstrap requires this in their css.
                  aria-label={
                    indicatorLabels?.length
                      ? indicatorLabels[index]
                      : `Slide ${index + 1}`
                  }
                  className={
                    index === renderedActiveIndex ? 'active' : undefined
                  }
                  onClick={
                    indicatorOnClicks ? indicatorOnClicks[index] : undefined
                  }
                  aria-current={index === renderedActiveIndex}
                />
              ))}
            </div>
          )}

          <div className={`${prefix}-inner`}>
            {map(children, (child, index) => {
              const isActive = index === renderedActiveIndex;

              return slide ? (
                <TransitionWrapper
                  in={isActive}
                  onEnter={isActive ? handleEnter : undefined}
                  onEntered={isActive ? handleEntered : undefined}
                  addEndListener={transitionEndListener}
                >
                  {(
                    status: TransitionStatus,
                    innerProps: Record<string, unknown>,
                  ) =>
                    React.cloneElement(child, {
                      ...innerProps,
                      className: clsx(
                        child.props.className,
                        isActive && status !== 'entered' && orderClassName,
                        (status === 'entered' || status === 'exiting') &&
                          'active',
                        (status === 'entering' || status === 'exiting') &&
                          directionalClassName,
                      ),
                    })
                  }
                </TransitionWrapper>
              ) : (
                React.cloneElement(child, {
                  className: clsx(child.props.className, isActive && 'active'),
                })
              );
            })}
          </div>

          {controls && (
            <>
              {(wrap || activeIndex !== 0) && (
                <Anchor className={`${prefix}-control-prev`} onClick={prev}>
                  {prevIcon}
                  {prevLabel && (
                    <span className="visually-hidden">{prevLabel}</span>
                  )}
                </Anchor>
              )}
              {(wrap || activeIndex !== numChildren - 1) && (
                <Anchor className={`${prefix}-control-next`} onClick={next}>
                  {nextIcon}
                  {nextLabel && (
                    <span className="visually-hidden">{nextLabel}</span>
                  )}
                </Anchor>
              )}
            </>
          )}
        </Component>
      );
    },
  );

Carousel.displayName = 'Carousel';

export default Object.assign(Carousel, {
  Caption: CarouselCaption,
  Item: CarouselItem,
});
