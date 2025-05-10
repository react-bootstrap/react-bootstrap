import classNames from 'classnames';
import * as React from 'react';
import { useCallback } from 'react';
import Transition, {
  TransitionStatus,
  ENTERED,
  ENTERING,
} from 'react-transition-group/Transition';
import { getChildRef } from '@restart/ui/utils';
import transitionEndListener from './transitionEndListener';
import triggerBrowserReflow from './triggerBrowserReflow';
import TransitionWrapper from './TransitionWrapper';
import type { TransitionCallbacks } from './types';

export interface FadeProps extends TransitionCallbacks {
  className?: string;

  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in?: boolean | undefined;

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter?: boolean | undefined;

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit?: boolean | undefined;

  /**
   * Run the fade in animation when the component mounts, if it is initially shown
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

  /**
   * Applies additional specified classes during the transition. Takes an object
   * where the keys correspond to the Transition status
   */
  transitionClasses?: Record<string, string> | undefined;
}

const fadeStyles = {
  [ENTERING]: 'show',
  [ENTERED]: 'show',
};

const Fade = React.forwardRef<Transition<any>, FadeProps>(
  ({ className, children, transitionClasses = {}, onEnter, ...rest }, ref) => {
    const props = {
      in: false,
      timeout: 300,
      mountOnEnter: false,
      unmountOnExit: false,
      appear: false,
      ...rest,
    };

    const handleEnter = useCallback(
      (node, isAppearing) => {
        triggerBrowserReflow(node);
        onEnter?.(node, isAppearing);
      },
      [onEnter],
    );

    return (
      <TransitionWrapper
        ref={ref}
        addEndListener={transitionEndListener}
        {...props}
        onEnter={handleEnter}
        childRef={getChildRef(children)}
      >
        {(status: TransitionStatus, innerProps: Record<string, unknown>) =>
          React.cloneElement(children as any, {
            ...innerProps,
            className: classNames(
              'fade',
              className,
              (children.props as any).className,
              fadeStyles[status],
              transitionClasses[status],
            ),
          })
        }
      </TransitionWrapper>
    );
  },
);

Fade.displayName = 'Fade';

export default Fade;
