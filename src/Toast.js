import classNames from 'classnames';
import events from 'dom-helpers/events';
import ownerDocument from 'dom-helpers/ownerDocument';

import canUseDOM from 'dom-helpers/util/inDOM';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import React from 'react';
import PropTypes from 'prop-types';

import Fade from './Fade';
import Header from './ToastHeader';
import Body from './ToastBody';
import { createBootstrapComponent } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'modal'
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
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onClose: PropTypes.func,

  /**
   * Callback fired right before the Toast transitions out
   */
  onExit: PropTypes.func,

  /**
   * Callback fired as the Toast begins to transition out
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the Toast finishes transitioning out
   */
  onExited: PropTypes.func,
};

const defaultProps = {
  animation: true,
  autohide: true,
  delay: 500,
};

/* eslint-disable no-use-before-define, react/no-multi-comp */
function DialogTransition(props) {
  return <Fade {...props} />;
}

function BackdropTransition(props) {
  return <Fade {...props} />;
}

/* eslint-enable no-use-before-define */

class Toast extends React.Component {
  state = { style: {} };

  componentWillUnmount() {
    // Clean up the listener if we need to.
    events.off(window, 'resize', this.handleWindowResize);
  }

  setToastRef = ref => {
    this._modal = ref;
  };

  // We prevent the modal from closing during a drag by detecting where the
  // the click originates from. If it starts in the modal and then ends outside
  // don't close.
  handleDialogMouseDown = () => {
    this._waitingForMouseUp = true;
  };

  handleMouseUp = e => {
    if (this._waitingForMouseUp && e.target === this._modal.dialog) {
      this._ignoreBackdropClick = true;
    }
    this._waitingForMouseUp = false;
  };

  handleClick = e => {
    if (this._ignoreBackdropClick || e.target !== e.currentTarget) {
      this._ignoreBackdropClick = false;
      return;
    }

    this.props.onHide();
  };

  handleEnter = (node, ...args) => {
    if (node) {
      node.style.display = 'block';
      this.updateDialogStyle(node);
    }

    if (this.props.onEnter) this.props.onEnter(node, ...args);
  };

  handleEntering = (node, ...args) => {
    if (this.props.onEntering) this.props.onEntering(node, ...args);

    // FIXME: This should work even when animation is disabled.
    events.on(window, 'resize', this.handleWindowResize);
  };

  handleExited = (node, ...args) => {
    if (node) node.style.display = ''; // RHL removes it sometimes
    if (this.props.onExited) this.props.onExited(...args);

    // FIXME: This should work even when animation is disabled.
    events.off(window, 'resize', this.handleWindowResize);
  };

  handleWindowResize = () => {
    this.updateDialogStyle(this._modal.dialog);
  };

  updateDialogStyle(node) {
    if (!canUseDOM) return;
    const { manager } = this.props;

    const containerIsOverflowing = manager.isContainerOverflowing(this._modal);

    const modalIsOverflowing =
      node.scrollHeight > ownerDocument(node).documentElement.clientHeight;

    this.setState({
      style: {
        paddingRight:
          containerIsOverflowing && !modalIsOverflowing
            ? getScrollbarSize()
            : undefined,
        paddingLeft:
          !containerIsOverflowing && modalIsOverflowing
            ? getScrollbarSize()
            : undefined,
      },
    });
  }

  renderBackdrop = props => {
    const { bsPrefix, backdropClassName } = this.props;

    return (
      <div
        {...props}
        className={classNames(`${bsPrefix}-backdrop`, backdropClassName)}
      />
    );
  };

  render() {
    const {
      bsPrefix,
      className,
      style,
      children,

      /* BaseToast props */
      animation,
      onExit,
      onExiting,
      onExited: _,
      ...props
    } = this.props;

    const baseToastStyle = {
      ...style,
      ...this.state.style,
    };

    // Sets `display` always block when `animation` is false
    if (!animation) baseToastStyle.display = 'block';

    return (
      <Dialog
        {...props}
        onMouseDown={this.handleDialogMouseDown}
        className={dialogClassName}
      >
        {children}
      </Dialog>
    );
  }
}

Toast.propTypes = propTypes;
Toast.defaultProps = defaultProps;

const DecoratedToast = createBootstrapComponent(Toast, 'modal');

DecoratedToast.Body = Body;
DecoratedToast.Header = Header;

export default DecoratedToast;
