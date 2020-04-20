import React, { useEffect, useRef, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useTimeout from '@restart/hooks/useTimeout';
import Fade from './Fade';
import Header from './ToastHeader';
import Body from './ToastBody';
import { useBootstrapPrefix } from './ThemeProvider';
import ToastContext from './ToastContext';

const propTypes = {
  /**
   * @default 'toast'
   */
  bsPrefix: PropTypes.string,

  /**
   * Apply a CSS fade transition to the toast
   */
  animation: PropTypes.bool,

  /**
   * Auto hide the toast
   */
  autohide: PropTypes.bool,

  /**
   * Delay hiding the toast (ms)
   */
  delay: PropTypes.number,

  /**
   * A Callback fired when the close button is clicked.
   */
  onClose: PropTypes.func,

  /**
   * When `true` The modal will show itself.
   */
  show: PropTypes.bool,

  /**
   * A `react-transition-group` Transition component used to animate the Toast on dismissal.
   */
  transition: PropTypes.elementType,
};

const defaultProps = {
  animation: true,
  autohide: false,
  delay: 3000,
  show: true,
  transition: Fade,
};

const Toast = React.forwardRef(
  (
    {
      bsPrefix,
      className,
      children,
      transition: Transition,
      show,
      animation,
      delay,
      autohide,
      onClose,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix('toast');
    const delayRef = useRef(delay);
    const onCloseRef = useRef(onClose);

    useEffect(() => {
      // We use refs for these, because we don't want to restart the autohide
      // timer in case these values change.
      delayRef.current = delay;
      onCloseRef.current = onClose;
    }, [delay, onClose]);

    const autohideTimeout = useTimeout();
    const autohideFunc = useCallback(() => {
      if (!(autohide && show)) {
        return;
      }
      onCloseRef.current();
    }, [autohide, show]);

    autohideTimeout.set(autohideFunc, delayRef.current);

    const hasAnimation = useMemo(() => Transition && animation, [
      Transition,
      animation,
    ]);

    const toast = (
      <div
        {...props}
        ref={ref}
        className={classNames(
          bsPrefix,
          className,
          !hasAnimation && (show ? 'show' : 'hide'),
        )}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {children}
      </div>
    );

    const toastContext = {
      onClose,
    };

    return (
      <ToastContext.Provider value={toastContext}>
        {hasAnimation ? (
          <Transition in={show} unmountOnExit>
            {toast}
          </Transition>
        ) : (
          toast
        )}
      </ToastContext.Provider>
    );
  },
);

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;
Toast.displayName = 'Toast';

Toast.Body = Body;
Toast.Header = Header;

export default Toast;
