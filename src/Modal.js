import classNames from 'classnames';
import events from 'dom-helpers/events';
import ownerDocument from 'dom-helpers/ownerDocument';
import canUseDOM from 'dom-helpers/util/inDOM';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import pick from 'lodash-compat/object/pick';
import React from 'react';
import ReactDOM from 'react-dom';
import BaseModal from 'react-overlays/lib/Modal';
import isOverflowing from 'react-overlays/lib/utils/isOverflowing';
import deprecated from 'react-prop-types/lib/deprecated';
import elementType from 'react-prop-types/lib/elementType';

import { Sizes } from './styleMaps';
import { bsClass, bsSizes, prefix } from './utils/bootstrapUtils';

import Fade from './Fade';
import ModalDialog from './ModalDialog';
import Body from './ModalBody';
import Header from './ModalHeader';
import Title from './ModalTitle';
import Footer from './ModalFooter';

/* eslint-disable react/prop-types */
const Modal = React.createClass({

  propTypes: {
    ...BaseModal.propTypes,
    ...ModalDialog.propTypes,

    /**
     * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
     */
    backdrop: React.PropTypes.oneOf(['static', true, false]),

    /**
     * Close the modal when escape key is pressed
     */
    keyboard: React.PropTypes.bool,

    /**
     * Open and close the Modal with a slide and fade animation.
     */
    animation: React.PropTypes.bool,

    /**
     * A Component type that provides the modal content Markup. This is a useful prop when you want to use your own
     * styles and markup to create a custom modal component.
     */
    dialogComponentClass: elementType,

    /**
     * @private
     */
    dialogComponent: deprecated(elementType, 'Use `dialogComponentClass`.'),

    /**
     * When `true` The modal will automatically shift focus to itself when it opens, and replace it to the last focused element when it closes.
     * Generally this should never be set to false as it makes the Modal less accessible to assistive technologies, like screen-readers.
     */
    autoFocus: React.PropTypes.bool,

    /**
     * When `true` The modal will prevent focus from leaving the Modal while open.
     * Consider leaving the default value here, as it is necessary to make the Modal work well with assistive technologies,
     * such as screen readers.
     */
    enforceFocus: React.PropTypes.bool,

    /**
     * Hide this from automatic props documentation generation.
     * @private
     */
    bsStyle: React.PropTypes.string,

    /**
     * When `true` The modal will show itself.
     */
    show: React.PropTypes.bool,

    /**
     * A callback fired when the header closeButton or non-static backdrop is
     * clicked. Required if either are specified.
     */
    onHide: React.PropTypes.func,

    /**
     * Callback fired before the Modal transitions in
     */
    onEnter: React.PropTypes.func,

    /**
     * Callback fired as the Modal begins to transition in
     */
    onEntering: React.PropTypes.func,

    /**
     * Callback fired after the Modal finishes transitioning in
     */
    onEntered: React.PropTypes.func,

    /**
     * Callback fired right before the Modal transitions out
     */
    onExit: React.PropTypes.func,

    /**
     * Callback fired as the Modal begins to transition out
     */
    onExiting: React.PropTypes.func,

    /**
     * Callback fired after the Modal finishes transitioning out
     */
    onExited: React.PropTypes.func
  },

  childContextTypes: {
    '$bs_onModalHide': React.PropTypes.func
  },

  getDefaultProps() {
    return {
      ...BaseModal.defaultProps,
      bsClass: 'modal',
      animation: true,
      dialogComponentClass: ModalDialog,
    };
  },

  getInitialState() {
    return {
      modalStyles: {}
    };
  },

  getChildContext() {
    return {
      $bs_onModalHide: this.props.onHide
    };
  },

  componentWillUnmount() {
    events.off(window, 'resize', this.handleWindowResize);
  },

  render() {
    let {
        className
      , children
      , dialogClassName
      , animation
      , ...props } = this.props;

    let { modalStyles } = this.state;

    let inClass = { in: props.show && !animation };
    let Dialog = props.dialogComponent || props.dialogComponentClass;

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
        backdropClassName={classNames(prefix(props, 'backdrop'), inClass)}
        containerClassName={prefix(props, 'open')}
        transition={animation ? Fade : undefined}
        dialogTransitionTimeout={Modal.TRANSITION_DURATION}
        backdropTransitionTimeout={Modal.BACKDROP_TRANSITION_DURATION}
      >
        { modal }
      </BaseModal>
    );
  },


  _onShow(...args) {
    events.on(window, 'resize', this.handleWindowResize);

    this.setState(
      this._getStyles()
    );

    if (this.props.onEntering) {
      this.props.onEntering(...args);
    }
  },

  _onHide(...args) {
    events.off(window, 'resize', this.handleWindowResize);

    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  },

  handleDialogClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onHide();
  },

  handleWindowResize() {
    this.setState(this._getStyles());
  },

  _getStyles() {
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
  }
});

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
