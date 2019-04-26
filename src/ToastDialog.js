import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import ToastContext from './ToastContext';

const propTypes = {
  /** @default 'toast' */
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
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onClose: PropTypes.func,

  /**
   * When `true` The modal will show itself.
   */
  show: PropTypes.bool,

  /** A `react-transition-group` Transition component used to animate the Toast on dismissal. */
  transition: PropTypes.elementType,

  /** @ignore */
  innerRef: PropTypes.any,
};

class ToastDialog extends React.Component {
  constructor(props) {
    super(props);
    this.toastContext = {
      onClose: () => this.props.onClose(),
    };
  }

  componentDidUpdate(prevProps) {
    const { autohide, delay, show } = this.props;
    if (!this.autohideInterval && autohide && show !== prevProps.show) {
      this.autohideInterval = window.setTimeout(() => {
        this.props.onClose();
        this.autohideInterval = null;
      }, delay);
    }
  }

  render() {
    const {
      bsPrefix,
      className,
      children,
      transition: Transition,
      show,
      animation,
      delay: _delay,
      autohide: _autohide,
      innerRef,
      ...props
    } = this.props;

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

    if (useAnimation) {
      return (
        <ToastContext.Provider value={this.toastContext}>
          <Transition in={show}>{toast}</Transition>
        </ToastContext.Provider>
      );
    }
    return (
      <ToastContext.Provider value={this.toastContext}>
        {toast}
      </ToastContext.Provider>
    );
  }
}

ToastDialog.displayName = 'ToastDialog';
ToastDialog.propTypes = propTypes;

export default ToastDialog;
