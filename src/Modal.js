import classNames from 'classnames';
import events from 'dom-helpers/events';
import ownerDocument from 'dom-helpers/ownerDocument';
import canUseDOM from 'dom-helpers/util/inDOM';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import BaseModal from 'react-overlays/lib/Modal';
import isOverflowing from 'react-overlays/lib/utils/isOverflowing';
import elementType from 'react-prop-types/lib/elementType';

import Fade from './Fade';
import Body from './ModalBody';
import ModalDialog from './ModalDialog';
import Footer from './ModalFooter';
import Header from './ModalHeader';
import Title from './ModalTitle';
import { bsClass, bsSizes, prefix } from './utils/bootstrapUtils';
import createChainedFunction from './utils/createChainedFunction';
import splitComponentProps from './utils/splitComponentProps';
import { Size } from './utils/StyleConfig';

const propTypes = {
  ...BaseModal.propTypes,
  ...ModalDialog.propTypes,

  /**
   * Include a backdrop component. Specify 'static' for a backdrop that doesn't
   * trigger an "onHide" when clicked.
   */
  backdrop: PropTypes.oneOf(['static', true, false]),

  /**
   * Close the modal when escape key is pressed
   */
  keyboard: PropTypes.bool,

  /**
   * Open and close the Modal with a slide and fade animation.
   */
  animation: PropTypes.bool,

  /**
   * A Component type that provides the modal content Markup. This is a useful
   * prop when you want to use your own styles and markup to create a custom
   * modal component.
   */
  dialogComponentClass: elementType,

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
  container: BaseModal.propTypes.container,
};

const defaultProps = {
  ...BaseModal.defaultProps,
  animation: true,
  dialogComponentClass: ModalDialog,
};

const childContextTypes = {
  $bs_modal: PropTypes.shape({
    onHide: PropTypes.func,
  }),
};

class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleEntering = this.handleEntering.bind(this);
    this.handleExited = this.handleExited.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
    this.handleDialogClick = this.handleDialogClick.bind(this);

    this.state = {
      style: {},
    };
  }

  getChildContext() {
    return {
      $bs_modal: {
        onHide: this.props.onHide,
      },
    };
  }

  componentWillUnmount() {
    // Clean up the listener if we need to.
    this.handleExited();
  }

  handleEntering() {
    // FIXME: This should work even when animation is disabled.
    events.on(window, 'resize', this.handleWindowResize);
    this.updateStyle();
  }

  handleExited() {
    // FIXME: This should work even when animation is disabled.
    events.off(window, 'resize', this.handleWindowResize);
  }

  handleWindowResize() {
    this.updateStyle();
  }

  handleDialogClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onHide();
  }

  updateStyle() {
    if (!canUseDOM) {
      return;
    }

    const dialogNode = this._modal.getDialogElement();
    const dialogHeight = dialogNode.scrollHeight;

    const document = ownerDocument(dialogNode);
    const bodyIsOverflowing = isOverflowing(
      ReactDOM.findDOMNode(this.props.container || document.body)
    );
    const modalIsOverflowing =
      dialogHeight > document.documentElement.clientHeight;

    this.setState({
      style: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ?
          getScrollbarSize() : undefined,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ?
          getScrollbarSize() : undefined
      }
    });
  }

  render() {
    const {
      backdrop,
      animation,
      show,
      dialogComponentClass: Dialog,
      className,
      style,
      children, // Just in case this get added to BaseModal propTypes.
      onEntering,
      onExited,
      ...props
    } = this.props;

    const [baseModalProps, dialogProps] =
      splitComponentProps(props, BaseModal);

    const inClassName = show && !animation && 'in';

    return (
      <BaseModal
        {...baseModalProps}
        ref={c => { this._modal = c; }}
        show={show}
        onEntering={createChainedFunction(onEntering, this.handleEntering)}
        onExited={createChainedFunction(onExited, this.handleExited)}
        backdrop={backdrop}
        backdropClassName={classNames(prefix(props, 'backdrop'), inClassName)}
        containerClassName={prefix(props, 'open')}
        transition={animation ? Fade : undefined}
        dialogTransitionTimeout={Modal.TRANSITION_DURATION}
        backdropTransitionTimeout={Modal.BACKDROP_TRANSITION_DURATION}
      >
        <Dialog
          {...dialogProps}
          style={{ ...this.state.style, ...style }}
          className={classNames(className, inClassName)}
          onClick={backdrop === true ? this.handleDialogClick : null}
        >
          {children}
        </Dialog>
      </BaseModal>
    );
  }
}

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
Modal.childContextTypes = childContextTypes;

Modal.Body = Body;
Modal.Header = Header;
Modal.Title = Title;
Modal.Footer = Footer;

Modal.Dialog = ModalDialog;

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

export default bsClass('modal',
  bsSizes([Size.LARGE, Size.SMALL], Modal)
);
