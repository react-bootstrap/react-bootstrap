import clsx from 'clsx';
import * as React from 'react';
import { Transition, type TransitionStatus } from 'react-transition-group';
import { getChildRef } from '@restart/ui/utils';
import transitionEndListener from './transitionEndListener.js';
import TransitionWrapper from './TransitionWrapper.js';
import { useBootstrapPrefix } from './ThemeProvider.js';
import type { TransitionCallbacks } from './types.js';

export interface OffcanvasTogglingProps extends TransitionCallbacks {
  /**
   * @default 'offcanvas'
   */
  bsPrefix?: string | undefined;

  className?: string;

  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in?: boolean | string;

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter?: boolean | undefined;

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit?: boolean | undefined;

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear?: boolean | undefined;

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout?: number | undefined;

  /**
   * You must provide a single JSX child element to this component and that element cannot be a \<React.Fragment\>
   */
  children: React.ReactElement;
}

const transitionStyles = {
  entering: 'show',
  entered: 'show',
};

const OffcanvasToggling = React.forwardRef<
  Transition<any>,
  OffcanvasTogglingProps
>(
  (
    {
      bsPrefix,
      className,
      children,
      in: inProp = false,
      mountOnEnter = false,
      unmountOnExit = false,
      appear = false,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas');

    return (
      <TransitionWrapper
        ref={ref}
        addEndListener={transitionEndListener}
        in={inProp}
        mountOnEnter={mountOnEnter}
        unmountOnExit={unmountOnExit}
        appear={appear}
        {...props}
        childRef={getChildRef(children)}
      >
        {(status: TransitionStatus, innerProps: Record<string, unknown>) =>
          React.cloneElement(children as any, {
            ...innerProps,
            className: clsx(
              className,
              (children.props as any).className,
              (status === 'entering' || status === 'exiting') &&
                `${bsPrefix}-toggling`,
              transitionStyles[status],
            ),
          })
        }
      </TransitionWrapper>
    );
  },
);

OffcanvasToggling.displayName = 'OffcanvasToggling';

export default OffcanvasToggling;
