import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Fade from './Fade';
import Header from './ToastHeader';
import Body from './ToastBody';
import { createBootstrapComponent } from './ThemeProvider';
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

const Toast = ({
  bsPrefix,
  className,
  children,
  transition: Transition,
  show,
  animation,
  delay,
  autohide,
  onClose,
  innerRef,
  ...props
}) => {
  useEffect(() => {
    if (autohide && show) {
      const timer = setTimeout(() => {
        onClose();
      }, delay);
      return () => {
        clearTimeout(timer);
      };
    }
    return () => null;
  }, [autohide, show]);
  const useAnimation = Transition && animation;
  const toast = (
    <div
      {...props}
      ref={innerRef}
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
};

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;

const DecoratedToast = createBootstrapComponent(Toast, 'toast');

DecoratedToast.Body = Body;
DecoratedToast.Header = Header;

export default DecoratedToast;
