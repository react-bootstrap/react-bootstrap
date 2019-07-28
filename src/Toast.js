import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

  /** @ignore */
  innerRef: PropTypes.any,
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

    // We use refs for these, because we don't want to restart the autohide
    // timer in case these values change.
    delayRef.current = delay;
    onCloseRef.current = onClose;

    useEffect(() => {
      if (!(autohide && show)) {
        return undefined;
      }

      const autohideHandle = setTimeout(() => {
        onCloseRef.current();
      }, delayRef.current);

      return () => {
        clearTimeout(autohideHandle);
      };
    }, [autohide, show]);

    const useAnimation = Transition && animation;
    const toast = (
      <div
        {...props}
        ref={ref}
        className={classNames(
          bsPrefix,
          className,
          !useAnimation && show && 'show',
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
        {useAnimation ? <Transition in={show}>{toast}</Transition> : toast}
      </ToastContext.Provider>
    );
  },
);

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;

Toast.Body = Body;
Toast.Header = Header;

export default Toast;
