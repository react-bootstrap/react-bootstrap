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
   * A Component type that provides the toast content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * toast component.
   */
  dialogAs: PropTypes.elementType,

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
};

class ToastDialog extends React.Component {
  state = {
    hiddenByAutohide: false,
  };

  modalContext = {
    onClose: () => this.props.onClose(),
  };

  componentDidMount() {
    this.startAutohide();
  }

  startAutohide = () => {
    const { autohide, delay } = this.props;
    if (autohide) {
      // const context = useContext(ToastContext);
      window.setTimeout(() => {
        this.setState({
          hiddenByAutohide: true,
        });
        // if (context) {
        //   context.onClose();
        // }
      }, delay);
    }
  };

  render() {
    const {
      bsPrefix,
      className,
      children,
      transition: Transition,
      show: _show,
      animation,
      delay: _delay,
      autohide: _autohide,
      ...props
    } = this.props;
    const { hiddenByAutohide } = this.state;

    const show = _show && !hiddenByAutohide;
    const useAnimation = Transition && animation;
    const toast = (
      <div
        {...props}
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
        {toast};
      </ToastContext.Provider>
    );
  }
}

ToastDialog.displayName = 'ToastDialog';
ToastDialog.propTypes = propTypes;

export default ToastDialog;
