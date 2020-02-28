import React, {
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useState,
} from 'react';
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
    const [transitionComplete, setTransitionComplete] = useState(false);

    useEffect(() => {
      if (show && transitionComplete) {
        setTransitionComplete(false);
      }
    }, [show, transitionComplete]);

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

    const useAnimation = useMemo(() => Transition && animation, [
      Transition,
      animation,
    ]);

    const handleTransitionEnd = () => {
      setTransitionComplete(true);
    };

    const toast = (
      <div
        {...props}
        ref={ref}
        className={classNames(
          bsPrefix,
          className,
          !useAnimation && show && 'show',
          !useAnimation && !show && 'hide',
          !show && transitionComplete && 'hide',
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

    const toastWithTransition = (
      <Transition in={show} onExited={handleTransitionEnd}>
        {toast}
      </Transition>
    );

    return (
      <ToastContext.Provider value={toastContext}>
        {useAnimation ? toastWithTransition : toast}
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
