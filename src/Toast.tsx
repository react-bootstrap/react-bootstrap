import React, { useCallback, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import useTimeout from '@restart/hooks/useTimeout';
import Fade from './Fade';
import ToastHeader from './ToastHeader';
import ToastBody from './ToastBody';
import { useBootstrapPrefix } from './ThemeProvider';
import ToastContext, { ToastContextType } from './ToastContext';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
  TransitionType,
} from './helpers';

export interface ToastProps extends BsPrefixPropsWithChildren {
  animation?: boolean;
  autohide?: boolean;
  delay?: number;
  onClose?: () => void;
  show?: boolean;
  transition?: TransitionType;
}

type Toast = BsPrefixRefForwardingComponent<'div', ToastProps> & {
  Body: typeof ToastBody;
  Header: typeof ToastHeader;
};

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

const Toast: Toast = (React.forwardRef<HTMLDivElement, ToastProps>(
  (
    {
      bsPrefix,
      className,
      children,
      transition,
      show,
      animation,
      delay,
      autohide,
      onClose,
      ...props
    }: ToastProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'toast');
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
      if (onCloseRef.current) {
        onCloseRef.current();
      }
    }, [autohide, show]);

    autohideTimeout.set(autohideFunc, delayRef.current);

    const hasAnimation = transition && animation;

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

    const toastContext: ToastContextType = {
      onClose,
    };

    const Transition = transition === true ? Fade : transition;

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
) as unknown) as Toast;

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps as any;
Toast.displayName = 'Toast';
Toast.Body = ToastBody;
Toast.Header = ToastHeader;

export default Toast;
