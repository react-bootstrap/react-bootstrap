import classNames from 'classnames';
import css from 'dom-helpers/css';
import React, { useMemo } from 'react';
import Transition, {
  type TransitionStatus,
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';
import { getChildRef } from '@restart/ui/utils';
import transitionEndListener from './transitionEndListener';
import createChainedFunction from './createChainedFunction';
import triggerBrowserReflow from './triggerBrowserReflow';
import TransitionWrapper from './TransitionWrapper';
import type { TransitionCallbacks } from './types';

type Dimension = 'height' | 'width';

export interface CollapseProps
  extends TransitionCallbacks,
    Pick<React.HTMLAttributes<HTMLElement>, 'className' | 'role'> {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  in?: boolean | undefined;

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter?: boolean | undefined;

  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit?: boolean | undefined;

  /**
   * Run the expand animation when the component mounts, if it is initially shown
   */
  appear?: boolean | undefined;

  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout?: number | undefined;

  /**
   * The dimension used when collapsing, or a function that returns the
   * dimension
   *
   * @type {'height' | 'width' | (() => 'height' | 'width')  | undefined}
   */
  dimension?: Dimension | (() => Dimension) | undefined;

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   *
   * @type {((dimension: Dimension, element: HTMLElement) => number) | undefined}
   * @default element.offsetWidth | element.offsetHeight
   */
  getDimensionValue?:
    | ((dimension: Dimension, element: HTMLElement) => number)
    | undefined;

  /**
   * You must provide a single JSX child element to this component and that element cannot be a \<React.Fragment\>
   */
  children: React.ReactElement;
}

const MARGINS: Record<Dimension, string[]> = {
  height: ['marginTop', 'marginBottom'],
  width: ['marginLeft', 'marginRight'],
};

function getDefaultDimensionValue(
  dimension: Dimension,
  elem: HTMLElement,
): number {
  const offset = `offset${dimension[0].toUpperCase()}${dimension.slice(1)}`;
  const value = elem[offset];
  const margins = MARGINS[dimension];

  return (
    value +
    // @ts-expect-error TODO
    parseInt(css(elem, margins[0]), 10) +
    // @ts-expect-error TODO
    parseInt(css(elem, margins[1]), 10)
  );
}

const collapseStyles = {
  [EXITED]: 'collapse',
  [EXITING]: 'collapsing',
  [ENTERING]: 'collapsing',
  [ENTERED]: 'collapse show',
};

const Collapse = React.forwardRef<Transition<any>, CollapseProps>(
  (
    {
      onEnter,
      onEntering,
      onEntered,
      onExit,
      onExiting,
      className,
      children,
      dimension = 'height',
      in: inProp = false,
      timeout = 300,
      mountOnEnter = false,
      unmountOnExit = false,
      appear = false,
      getDimensionValue = getDefaultDimensionValue,
      ...props
    },
    ref,
  ) => {
    /* Compute dimension */
    const computedDimension =
      typeof dimension === 'function' ? dimension() : dimension;

    /* -- Expanding -- */
    const handleEnter = useMemo(
      () =>
        createChainedFunction((elem) => {
          elem.style[computedDimension] = '0';
        }, onEnter),
      [computedDimension, onEnter],
    );

    const handleEntering = useMemo(
      () =>
        createChainedFunction((elem) => {
          const scroll = `scroll${computedDimension[0].toUpperCase()}${computedDimension.slice(
            1,
          )}`;
          elem.style[computedDimension] = `${elem[scroll]}px`;
        }, onEntering),
      [computedDimension, onEntering],
    );

    const handleEntered = useMemo(
      () =>
        createChainedFunction((elem) => {
          elem.style[computedDimension] = null;
        }, onEntered),
      [computedDimension, onEntered],
    );

    /* -- Collapsing -- */
    const handleExit = useMemo(
      () =>
        createChainedFunction((elem) => {
          elem.style[computedDimension] = `${getDimensionValue(
            computedDimension,
            elem,
          )}px`;
          triggerBrowserReflow(elem);
        }, onExit),
      [onExit, getDimensionValue, computedDimension],
    );
    const handleExiting = useMemo(
      () =>
        createChainedFunction((elem) => {
          elem.style[computedDimension] = null;
        }, onExiting),
      [computedDimension, onExiting],
    );

    return (
      <TransitionWrapper
        ref={ref}
        addEndListener={transitionEndListener}
        {...props}
        aria-expanded={props.role ? inProp : null}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
        childRef={getChildRef(children)}
        in={inProp}
        timeout={timeout}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        appear={appear}
      >
        {(state: TransitionStatus, innerProps: Record<string, unknown>) =>
          React.cloneElement(children as any, {
            ...innerProps,
            className: classNames(
              className,
              (children.props as any).className,
              collapseStyles[state],
              computedDimension === 'width' && 'collapse-horizontal',
            ),
          })
        }
      </TransitionWrapper>
    );
  },
);

Collapse.displayName = 'Collapse';

export default Collapse;
