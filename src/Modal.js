
import classNames from 'classnames';

/* eslint-disable react/prop-types */
import PropTypes from 'prop-types';

import React from 'react';
import ReactDOM from 'react-dom';
import tbsUtils, { bsClass, bsSizes } from './utils/bootstrapUtils';
import { Sizes } from './styleMaps';

import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import canUseDOM from 'dom-helpers/util/inDOM';
import ownerDocument from 'dom-helpers/ownerDocument';
import events from 'dom-helpers/events';
import elementType from 'react-prop-types/lib/elementType';

import Fade from './Fade';
import ModalDialog from './ModalDialog';
import Body from './ModalBody';
import Header from './ModalHeader';
import Title from './ModalTitle';
import Footer from './ModalFooter';

import BaseModal from 'react-overlays/lib/Modal';
import isOverflowing from 'react-overlays/lib/utils/isOverflowing';
import pick from 'lodash-compat/object/pick';

class Modal extends React.Component {
  static propTypes = {
    ...BaseModal.propTypes,
    ...ModalDialog.propTypes,

    /**
     * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
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
     * A Component type that provides the modal content Markup. This is a useful prop when you want to use your own
     * styles and markup to create a custom modal component.
     */
    dialogComponent: elementType,

    /**
     * When `true` The modal will automatically shift focus to itself when it opens, and replace it to the last focused element when it closes.
     * Generally this should never be set to false as it makes the Modal less accessible to assistive technologies, like screen-readers.
     */
    autoFocus: PropTypes.bool,

    /**
     * When `true` The modal will prevent focus from leaving the Modal while open.
     * Consider leaving the default value here, as it is necessary to make the Modal work well with assistive technologies,
     * such as screen readers.
     */
    enforceFocus: PropTypes.bool,

    /**
     * Hide this from automatic props documentation generation.
     * @private
     */
    bsStyle: PropTypes.string,

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
    onExited: PropTypes.func
  };

  static childContextTypes = {
    '$bs_onModalHide': PropTypes.func
  };

  static defaultProps = {
    ...BaseModal.defaultProps,
    bsClass: 'modal',
    animation: true,
    dialogComponent: ModalDialog,
  };

  state = {
    modalStyles: {}
  };

  getChildContext() {
    return {
      $bs_onModalHide: this.props.onHide
    };
  }

  componentWillUnmount() {
    events.off(window, 'resize', this.handleWindowResize);
  }

  render() {
    let {
        className
      , children
      , dialogClassName
      , animation
      , ...props } = this.props;

    let { modalStyles } = this.state;

    let inClass = { in: props.show && !animation };
    let Dialog = props.dialogComponent;

    let parentProps = pick(props,
      Object.keys(BaseModal.propTypes).concat(
        ['onExit', 'onExiting', 'onEnter', 'onEntered']) // the rest are fired in _onHide() and _onShow()
    );

    let modal = (
      <Dialog
        key="modal"
        ref={ref => this._modal = ref}
        {...props}
        style={modalStyles}
        className={classNames(className, inClass)}
        dialogClassName={dialogClassName}
        onClick={props.backdrop === true ? this.handleDialogClick : null}
      >
        { this.props.children }
      </Dialog>
    );

    return (
      <BaseModal
        {...parentProps}
        show={props.show}
        ref={ref => {
          this._wrapper = (ref && ref.refs.modal);
          this._backdrop = (ref && ref.refs.backdrop);
        }}
        onEntering={this._onShow}
        onExited={this._onHide}
        backdropClassName={classNames(tbsUtils.prefix(props, 'backdrop'), inClass)}
        containerClassName={tbsUtils.prefix(props, 'open')}
        transition={animation ? Fade : undefined}
        dialogTransitionTimeout={Modal.TRANSITION_DURATION}
        backdropTransitionTimeout={Modal.BACKDROP_TRANSITION_DURATION}
      >
        { modal }
      </BaseModal>
    );
  }

  _onShow = (...args) => {
    events.on(window, 'resize', this.handleWindowResize);

    this.setState(
      this._getStyles()
    );

    if (this.props.onEntering) {
      this.props.onEntering(...args);
    }
  };

  _onHide = (...args) => {
    events.off(window, 'resize', this.handleWindowResize);

    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  };

  handleDialogClick = (e) => {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onHide();
  };

  handleWindowResize = () => {
    this.setState(this._getStyles());
  };

  _getStyles = () => {
    if (!canUseDOM) {
      return {};
    }

    let node = ReactDOM.findDOMNode(this._modal);
    let doc = ownerDocument(node);

    let scrollHt = node.scrollHeight;
    let bodyIsOverflowing = isOverflowing(ReactDOM.findDOMNode(this.props.container || doc.body));
    let modalIsOverflowing = scrollHt > doc.documentElement.clientHeight;

    return {
      modalStyles: {
        paddingRight: bodyIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : void 0,
        paddingLeft: !bodyIsOverflowing && modalIsOverflowing ? getScrollbarSize() : void 0
      }
    };
  };
}

Modal.Body = Body;
Modal.Header = Header;
Modal.Title = Title;
Modal.Footer = Footer;

Modal.Dialog = ModalDialog;

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

export default bsSizes([Sizes.LARGE, Sizes.SMALL],
  bsClass('modal', Modal)
);
