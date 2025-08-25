import * as React from 'react';
import { useEffect, useMemo, useRef, useCallback } from 'react';
import clsx from 'clsx';
import useTimeout from '@restart/hooks/useTimeout';
import type {
  DynamicRefForwardingComponent,
  TransitionComponent,
} from '@restart/ui/types';
import ToastFade from './ToastFade.js';
import ToastHeader from './ToastHeader.js';
import ToastBody from './ToastBody.js';
import { useBootstrapPrefix } from './ThemeProvider.js';
import ToastContext from './ToastContext.js';
import type { TransitionCallbacks, Variant } from './types.js';

export interface ToastProps
  extends TransitionCallbacks,
    React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'toast'
   */
  bsPrefix?: string | undefined;

  /**
   * Apply a CSS fade transition to the toast
   */
  animation?: boolean | undefined;

  /**
   * Auto hide the toast
   */
  autohide?: boolean | undefined;

  /**
   * Delay hiding the toast (ms)
   */
  delay?: number | undefined;

  /**
   * A Callback fired when the close button is clicked.
   *
   * @type {((e?: React.MouseEvent | React.KeyboardEvent) => void) | undefined}
   */
  onClose?: ((e?: React.MouseEvent | React.KeyboardEvent) => void) | undefined;

  /**
   * When `true` The toast will show itself.
   */
  show?: boolean | undefined;

  /**
   * A `react-transition-group` Transition component used to animate the Toast on dismissal.
   *
   * @default ToastFade
   */
  transition?: TransitionComponent | undefined;

  /**
   * Sets Toast background
   *
   * @type {'primary' | 'secondary' | 'success' |'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined}
   */
  bg?: Variant | undefined;
}

const Toast: DynamicRefForwardingComponent<'div', ToastProps> =
  React.forwardRef<HTMLDivElement, ToastProps>(
    (
      {
        bsPrefix,
        className,
        transition: Transition = ToastFade,
        show = true,
        animation = true,
        delay = 5000,
        autohide = false,
        onClose,
        onEntered,
        onExit,
        onExiting,
        onEnter,
        onEntering,
        onExited,
        bg,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'toast');

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
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          {...props}
          ref={ref}
          className={clsx(
            bsPrefix,
            className,
            bg && `bg-${bg}`,
            !hasAnimation && (show ? 'show' : 'hide'),
          )}
        />
      );

      return (
        <ToastContext.Provider value={toastContext}>
          {hasAnimation && Transition ? (
            <Transition
              in={show}
              onEnter={onEnter}
              onEntering={onEntering}
              onEntered={onEntered}
              onExit={onExit}
              onExiting={onExiting}
              onExited={onExited}
              unmountOnExit
            >
              {toast}
            </Transition>
          ) : (
            toast
          )}
        </ToastContext.Provider>
      );
    },
  );

Toast.displayName = 'Toast';

export default Object.assign(Toast, {
  Body: ToastBody,
  Header: ToastHeader,
});
