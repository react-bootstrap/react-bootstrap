import classNames from 'classnames';
import css from 'dom-helpers/css';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import Transition, {
  TransitionStatus,
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';
import { TransitionCallbacks } from '@restart/ui/types';
import transitionEndListener from './transitionEndListener';
import createChainedFunction from './createChainedFunction';
import triggerBrowserReflow from './triggerBrowserReflow';
import TransitionWrapper from './TransitionWrapper';

type Dimension = 'height' | 'width';

export interface CollapseProps
  extends TransitionCallbacks,
    Pick<React.HTMLAttributes<HTMLElement>, 'role'> {
  className?: string;
  in?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  appear?: boolean;
  timeout?: number;
  dimension?: Dimension | (() => Dimension);
  getDimensionValue?: (dimension: Dimension, element: HTMLElement) => number;
  children: React.ReactElement;
}

const MARGINS: { [d in Dimension]: string[] } = {
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
    // @ts-ignore
    parseInt(css(elem, margins[0]), 10) +
    // @ts-ignore
    parseInt(css(elem, margins[1]), 10)
  );
}

const collapseStyles = {
  [EXITED]: 'collapse',
  [EXITING]: 'collapsing',
  [ENTERING]: 'collapsing',
  [ENTERED]: 'collapse show',
};

const propTypes = {
  /**
   * Show the component; triggers the expand or collapse animation
   */
  in: PropTypes.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is collapsed
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Run the expand animation when the component mounts, if it is initially
   * shown
   */
  appear: PropTypes.bool,

  /**
   * Duration of the collapse animation in milliseconds, to ensure that
   * finishing callbacks are fired even if the original browser transition end
   * events are canceled
   */
  timeout: PropTypes.number,

  /**
   * Callback fired before the component expands
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the component starts to expand
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the component has expanded
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired before the component collapses
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the component starts to collapse
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the component has collapsed
   */
  onExited: PropTypes.func,

  /**
   * The dimension used when collapsing, or a function that returns the
   * dimension
   */
  dimension: PropTypes.oneOfType([
    PropTypes.oneOf(['height', 'width']),
    PropTypes.func,
  ]),

  /**
   * Function that returns the height or width of the animating DOM node
   *
   * Allows for providing some custom logic for how much the Collapse component
   * should animate in its specified dimension. Called with the current
   * dimension prop value and the DOM node.
   *
   * @default element.offsetWidth | element.offsetHeight
   */
  getDimensionValue: PropTypes.func,

  /**
   * ARIA role of collapsible element
   */
  role: PropTypes.string,

  /**
   * You must provide a single JSX child element to this component and that element cannot be a \<React.Fragment\>
   */
  children: PropTypes.element.isRequired,
};

const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
  getDimensionValue: getDefaultDimensionValue,
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
        aria-expanded={props.role ? props.in : null}
        onEnter={handleEnter}
        onEntering={handleEntering}
        onEntered={handleEntered}
        onExit={handleExit}
        onExiting={handleExiting}
        childRef={(children as any).ref}
      >
        {(state: TransitionStatus, innerProps: Record<string, unknown>) =>
          React.cloneElement(children, {
            ...innerProps,
            className: classNames(
              className,
              children.props.className,
              collapseStyles[state],
              computedDimension === 'width' && 'collapse-horizontal',
            ),
          })
        }
      </TransitionWrapper>
    );
  },
);

// @ts-ignore
Collapse.propTypes = propTypes;
// @ts-ignore
Collapse.defaultProps = defaultProps;

export default Collapse;
