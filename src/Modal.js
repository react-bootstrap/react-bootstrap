import classNames from 'classnames';
import events from 'dom-helpers/events';
import ownerDocument from 'dom-helpers/ownerDocument';

import canUseDOM from 'dom-helpers/util/inDOM';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import React from 'react';
import PropTypes from 'prop-types';
import BaseModal from 'react-overlays/Modal';
import { elementType } from 'prop-types-extra';

import Fade from './Fade';
import Body from './ModalBody';
import ModalDialog from './ModalDialog';
import Footer from './ModalFooter';
import Header from './ModalHeader';
import Title from './ModalTitle';
import BootstrapModalManager from './utils/BootstrapModalManager';
import { createBootstrapComponent } from './ThemeProvider';
import ModalContext from './ModalContext';

const propTypes = {
  /**
   * Render a large or small modal.
   *
   * @type ('sm'|'lg')
   */
  size: PropTypes.string,

  /**
   * vertically center the Dialog in the window
   */
  centered: PropTypes.bool,

  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: PropTypes.oneOf(['static', true, false]),

  /**
   * Add an optional extra class name to .modal-backdrop
   * It could end up looking like class="modal-backdrop foo-modal-backdrop in".
   */
  backdropClassName: PropTypes.string,

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: PropTypes.bool,

  /**
   * Open and close the Modal with a slide and fade animation.
   */
  animation: PropTypes.bool,

  /**
   * A css class to apply to the Modal dialog DOM node.
   */
  dialogClassName: PropTypes.string,

  /**
   * A Component type that provides the modal content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * modal component.
   */
  dialogAs: elementType,

  /**
   * When `true` The modal will automatically shift focus to itself when it
   * opens, and replace it to the last focused element when it closes.
   * Generally this should never be set to false as it makes the Modal less
   * accessible to assistive technologies, like screen-readers.
   */
  autoFocus: PropTypes.bool,

  /**
   * When `true` The modal will prevent focus from leaving the Modal while
   * open. Consider leaving the default value here, as it is necessary to make
   * the Modal work well with assistive technologies, such as screen readers.
   */
  enforceFocus: PropTypes.bool,

  /**
   * When `true` The modal will restore focus to previously focused element once
   * modal is hidden
   */
  restoreFocus: PropTypes.bool,

  /**
   * When `true` The modal will show itself.
   */
  show: PropTypes.bool,

  /**
   * A callback fired when the header closeButton or non-static backdrop is
   * clicked. Required if either are specified.
   */
  onHide: PropTypes.func,

  /**
   * Callback fired before the Modal transitions in
   */
  onEnter: PropTypes.func,

  /**
   * Callback fired as the Modal begins to transition in
   */
  onEntering: PropTypes.func,

  /**
   * Callback fired after the Modal finishes transitioning in
   */
  onEntered: PropTypes.func,

  /**
   * Callback fired right before the Modal transitions out
   */
  onExit: PropTypes.func,

  /**
   * Callback fired as the Modal begins to transition out
   */
  onExiting: PropTypes.func,

  /**
   * Callback fired after the Modal finishes transitioning out
   */
  onExited: PropTypes.func,

  /**
   * @private
   */
  container: PropTypes.any,
};

const defaultProps = {
  show: false,
  backdrop: true,
  keyboard: true,
  autoFocus: true,
  enforceFocus: true,
  restoreFocus: true,
  animation: true,
  dialogAs: ModalDialog,
  manager: new BootstrapModalManager(),
};

/* eslint-disable no-use-before-define, react/no-multi-comp */
function DialogTransition(props) {
  return <Fade {...props} />;
}

function BackdropTransition(props) {
  return <Fade {...props} />;
}

/* eslint-enable no-use-before-define */

class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = { style: {} };
    this.modalContext = {
      onHide: () => this.props.onHide(),
    };
  }

  componentWillUnmount() {
    // Clean up the listener if we need to.
    events.off(window, 'resize', this.handleWindowResize);
  }

  setModalRef = ref => {
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
      dialogClassName,
      children,
      dialogAs: Dialog,

      /* BaseModal props */
      show,
      manager,
      animation,
      backdrop,
      keyboard,
      onEscapeKeyDown,
      onShow,
      onHide,
      container,
      autoFocus,
      enforceFocus,
      restoreFocus,
      onEntered,
      onExit,
      onExiting,
      onExited: _,
      onEntering: _1,
      onEnter: _6,
      onEntering: _4,
      backdropClassName: _2,
      backdropStyle: _3,
      ...props
    } = this.props;

    const clickHandler = backdrop === true ? this.handleClick : null;

    return (
      <ModalContext.Provider value={this.modalContext}>
        <BaseModal
          {...{
            show,
            backdrop,
            container,
            keyboard,
            autoFocus,
            enforceFocus,
            restoreFocus,
            onEscapeKeyDown,
            onShow,
            onHide,
            onEntered,
            onExit,
            onExiting,
            manager,
            ref: this.setModalRef,
            style: { ...style, ...this.state.style },
            className: classNames(className, bsPrefix),
            containerClassName: `${bsPrefix}-open`,
            transition: animation ? DialogTransition : undefined,
            backdropTransition: animation ? BackdropTransition : undefined,
            renderBackdrop: this.renderBackdrop,
            onClick: clickHandler,
            onMouseUp: this.handleMouseUp,
            onEnter: this.handleEnter,
            onEntering: this.handleEntering,
            onExited: this.handleExited,
          }}
        >
          <Dialog
            {...props}
            onMouseDown={this.handleDialogMouseDown}
            className={dialogClassName}
          >
            {children}
          </Dialog>
        </BaseModal>
      </ModalContext.Provider>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;

const DecoratedModal = createBootstrapComponent(Modal, 'modal');

DecoratedModal.Body = Body;
DecoratedModal.Header = Header;
DecoratedModal.Title = Title;
DecoratedModal.Footer = Footer;

DecoratedModal.Dialog = ModalDialog;

DecoratedModal.TRANSITION_DURATION = 300;
DecoratedModal.BACKDROP_TRANSITION_DURATION = 150;

export default DecoratedModal;
