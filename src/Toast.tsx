import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';

import useTimeout from '@restart/hooks/useTimeout';
import Fade from './Fade';
import ToastHeader from './ToastHeader';
import ToastBody from './ToastBody';
import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import ToastContext from './ToastContext';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
  TransitionComponent,
} from './helpers';

export interface ToastProps extends BsPrefixPropsWithChildren {
  animation?: boolean;
  autohide?: boolean;
  delay?: number;
  onClose?: () => void;
  show?: boolean;
  transition?: TransitionComponent;
}

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

const Toast: BsPrefixRefForwardingComponent<
  'div',
  ToastProps
> = React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      bsPrefix,
      className,
      children,
      transition: Transition = Fade,
      show = true,
      animation = true,
      delay = 3000,
      autohide = false,
      onClose,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'toast');
    const classNames = useClassNameMapper();

    // We use refs for these, because we don't want to restart the autohide
    // timer in case these values change.
    const delayRef = useRef(delay);
    const onCloseRef = useRef(onClose);

    useEffect(() => {
      delayRef.current = delay;
      onCloseRef.current = onClose;
    }, [delay, onClose]);

    const autohideTimeout = useTimeout();
    const autohideToast = !!(autohide && show);

    const autohideFunc = useCallback(() => {
      if (autohideToast) {
        onCloseRef.current?.();
      }
    }, [autohideToast]);

    useEffect(() => {
      // Only reset timer if show or autohide changes.
      autohideTimeout.set(autohideFunc, delayRef.current);
    }, [autohideTimeout, autohideFunc]);

    const toastContext = useMemo(
      () => ({
        onClose,
      }),
      [onClose],
    );

    const hasAnimation = !!(Transition && animation);

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

    return (
      <ToastContext.Provider value={toastContext}>
        {hasAnimation && Transition ? (
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
Toast.displayName = 'Toast';

export default Object.assign(Toast, {
  Body: ToastBody,
  Header: ToastHeader,
});
