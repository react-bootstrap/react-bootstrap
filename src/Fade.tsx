import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useCallback } from 'react';
import Transition, {
  TransitionStatus,
  ENTERED,
  ENTERING,
} from 'react-transition-group/Transition';
import { TransitionCallbacks } from '@restart/ui/types';
import transitionEndListener from './transitionEndListener';
import triggerBrowserReflow from './triggerBrowserReflow';
import TransitionWrapper from './TransitionWrapper';

export interface FadeProps extends TransitionCallbacks {
  className?: string;
  in?: boolean;
  mountOnEnter?: boolean;
  unmountOnExit?: boolean;
  appear?: boolean;
  timeout?: number;
  children: React.ReactElement;
  transitionClasses?: Record<string, string>;
}

const propTypes = {
  /**
   * Show the component; triggers the fade in or fade out animation
   */
  in: PropTypes.bool,

  /**
   * Wait until the first "enter" transition to mount the component (add it to the DOM)
   */
  mountOnEnter: PropTypes.bool,

  /**
   * Unmount the component (remove it from the DOM) when it is faded out
   */
  unmountOnExit: PropTypes.bool,

  /**
   * Run the fade in animation when the component mounts, if it is initially
   * shown
   */
  appear: PropTypes.bool,

  /**
   * Duration of the fade animation in milliseconds, to ensure that finishing
   * callbacks are fired even if the original browser transition end events are
   * canceled
   */
  timeout: PropTypes.number,

  /**
   * Callback fired before the component fades in
   */
  onEnter: PropTypes.func,
  /**
   * Callback fired after the component starts to fade in
   */
  onEntering: PropTypes.func,
  /**
   * Callback fired after the has component faded in
   */
  onEntered: PropTypes.func,
  /**
   * Callback fired before the component fades out
   */
  onExit: PropTypes.func,
  /**
   * Callback fired after the component starts to fade out
   */
  onExiting: PropTypes.func,
  /**
   * Callback fired after the component has faded out
   */
  onExited: PropTypes.func,

  /**
   * You must provide a single JSX child element to this component and that element cannot be a \<React.Fragment\>
   */
  children: PropTypes.element.isRequired,

  /**
   * Applies additional specified classes during the transition. Takes an object
   * where the keys correspond to the Transition status
   */
  transitionClasses: PropTypes.object,
};

const defaultProps = {
  in: false,
  timeout: 300,
  mountOnEnter: false,
  unmountOnExit: false,
  appear: false,
};

const fadeStyles = {
  [ENTERING]: 'show',
  [ENTERED]: 'show',
};

const Fade = React.forwardRef<Transition<any>, FadeProps>(
  ({ className, children, transitionClasses = {}, ...props }, ref) => {
    const handleEnter = useCallback(
      (node, isAppearing) => {
        triggerBrowserReflow(node);
        props.onEnter?.(node, isAppearing);
      },
      [props],
    );

    return (
      <TransitionWrapper
        ref={ref}
        addEndListener={transitionEndListener}
        {...props}
        onEnter={handleEnter}
        childRef={(children as any).ref}
      >
        {(status: TransitionStatus, innerProps: Record<string, unknown>) =>
          React.cloneElement(children, {
            ...innerProps,
            className: classNames(
              'fade',
              className,
              children.props.className,
              fadeStyles[status],
              transitionClasses[status],
            ),
          })
        }
      </TransitionWrapper>
    );
  },
);

Fade.propTypes = propTypes as any;
Fade.defaultProps = defaultProps;
Fade.displayName = 'Fade';

export default Fade;
