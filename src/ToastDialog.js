import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /** @default 'toast' */
  bsPrefix: PropTypes.string,

  /**
   * When `true` The modal will show itself.
   */
  show: PropTypes.bool,

  /** A `react-transition-group` Transition component used to animate the Toast on dismissal. */
  transition: PropTypes.elementType,
};

class ToastDialog extends React.Component {
  state = {
    show: true,
  };

  componentDidMount() {
    const { animation, transition, delay } = this.props;
    if (!transition || !animation) {
      window.setTimeout(() => {
        this.setState({
          show: false,
        });
      }, delay);
    }
  }

  render() {
    const {
      bsPrefix,
      className,
      children,
      transition: Transition,
      show: _show,
      animation,
      delay,
      ...props
    } = this.props;

    const show = this.state.show || _show;
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
        <Transition in={show} unmountOnExit>
          {toast}
        </Transition>
      );
    }
    return toast;
  }
}

ToastDialog.displayName = 'ToastDialog';
ToastDialog.propTypes = propTypes;

export default ToastDialog;
