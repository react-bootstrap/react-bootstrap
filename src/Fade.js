import classNames from 'classnames';
import transitionEnd from 'dom-helpers/transitionEnd';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Transition, {
  ENTERED,
  ENTERING,
} from 'react-transition-group/Transition';
import triggerBrowserReflow from './triggerBrowserReflow';

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

const Fade = React.forwardRef(({ className, children, ...props }, ref) => {
  const handleEnter = useCallback(
    (node) => {
      triggerBrowserReflow(node);
      if (props.onEnter) props.onEnter(node);
    },
    [props],
  );

  return (
    <Transition
      ref={ref}
      addEndListener={transitionEnd}
      {...props}
      onEnter={handleEnter}
    >
      {(status, innerProps) =>
        React.cloneElement(children, {
          ...innerProps,
          className: classNames(
            'fade',
            className,
            children.props.className,
            fadeStyles[status],
          ),
        })
      }
    </Transition>
  );
});

Fade.propTypes = propTypes;
Fade.defaultProps = defaultProps;
Fade.displayName = 'Fade';

export default Fade;
