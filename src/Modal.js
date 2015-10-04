/* eslint-disable react/prop-types */
import React, { cloneElement } from 'react';
import classNames from 'classnames';
import domUtils from './utils/domUtils';
import getScrollbarSize from 'dom-helpers/util/scrollbarSize';
import EventListener from './utils/EventListener';
import createChainedFunction from './utils/createChainedFunction';
import elementType from 'react-prop-types/lib/elementType';

import canUseDOM from 'dom-helpers/util/inDOM';
import contains from 'dom-helpers/query/contains';
import activeElement from 'dom-helpers/activeElement';

import Portal from 'react-overlays/lib/Portal';

import Fade from './Fade';
import ModalDialog from './ModalDialog';
import Body from './ModalBody';
import Header from './ModalHeader';
import Title from './ModalTitle';
import Footer from './ModalFooter';

/**
 * Gets the correct clientHeight of the modal container
 * when the body/window/document you need to use the docElement clientHeight
 * @param  {HTMLElement} container
 * @param  {ReactElement|HTMLElement} context
 * @return {Number}
 */
function containerClientHeight(container, context) {
  let doc = domUtils.ownerDocument(context);

  return (container === doc.body || container === doc.documentElement)
      ? doc.documentElement.clientHeight
      : container.clientHeight;
}

function getContainer(context) {
  return (context.props.container && React.findDOMNode(context.props.container)) ||
    domUtils.ownerDocument(context).body;
}

let currentFocusListener;

/**
 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
 * IE8 can't do addEventListener, but does have onfocusin, so we use that in ie8
 *
 * We only allow one Listener at a time to avoid stack overflows
 *
 * @param  {ReactElement|HTMLElement} context
 * @param  {Function} handler
 */
function onFocus(context, handler) {
  let doc = domUtils.ownerDocument(context);
  let useFocusin = !doc.addEventListener;
  let remove;

  if (currentFocusListener) {
    currentFocusListener.remove();
  }

  if (useFocusin) {
    document.attachEvent('onfocusin', handler);
    remove = () => document.detachEvent('onfocusin', handler);
  } else {
    document.addEventListener('focus', handler, true);
    remove = () => document.removeEventListener('focus', handler, true);
  }

  currentFocusListener = { remove };

  return currentFocusListener;
}


const Modal = React.createClass({
  propTypes: {
    ...Portal.propTypes,
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
    dialogComponent: elementType,

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
    show: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsClass: 'modal',
      dialogComponent: ModalDialog,
      show: false,
      animation: true,
      backdrop: true,
      keyboard: true,
      autoFocus: true,
      enforceFocus: true
    };
  },

  getInitialState() {
    return {
      exited: !this.props.show
    };
  },

  render() {
    let { children, animation, backdrop, ...props } = this.props;
    let { onExit, onExiting, onEnter, onEntering, onEntered } = props;

    let show = !!props.show;
    let Dialog = props.dialogComponent;

    const mountModal = show || (animation && !this.state.exited);
    if (!mountModal) {
      return null;
    }

    let modal = (
      <Dialog
        {...props}
        ref={this._setDialogRef}
        className={classNames(this.props.className, { in: show && !animation })}
        onClick={backdrop === true ? this.handleBackdropClick : null}>
        { this.renderContent() }
      </Dialog>
    );

    if (animation) {
      modal = (
        <Fade
          transitionAppear
          unmountOnExit
          in={show}
          timeout={Modal.TRANSITION_DURATION}
          onExit={onExit}
          onExiting={onExiting}
          onExited={this.handleHidden}
          onEnter={onEnter}
          onEntering={onEntering}
          onEntered={onEntered}>
          { modal }
        </Fade>
      );
    }

    if (backdrop) {
      modal = this.renderBackdrop(modal);
    }

    return (
      <Portal container={props.container}>
        { modal }
      </Portal>
    );
  },

  renderContent() {
    return React.Children.map(this.props.children, child => {
      // TODO: use context in 0.14
      if (child && child.type && child.type.__isModalHeader) {
        return cloneElement(child, {
          onHide: createChainedFunction(this.props.onHide, child.props.onHide)
        });
      }
      return child;
    });
  },

  renderBackdrop(modal) {
    let { animation, bsClass } = this.props;
    let duration = Modal.BACKDROP_TRANSITION_DURATION;

    // Don't handle clicks for "static" backdrops
    let onClick = this.props.backdrop === true ?
      this.handleBackdropClick : null;

    let backdrop = (
      <div
        ref="backdrop"
        className={classNames(`${bsClass}-backdrop`, { in: this.props.show && !animation })}
        onClick={onClick}/>
    );

    return (
      <div
        ref="modal">
        { animation
            ? <Fade transitionAppear in={this.props.show} timeout={duration}>{backdrop}</Fade>
            : backdrop
        }
        {modal}
      </div>
    );
  },

  _setDialogRef(ref) {
    // issue #1074
    // due to: https://github.com/facebook/react/blob/v0.13.3/src/core/ReactCompositeComponent.js#L842
    //
    // when backdrop is `false` react hasn't had a chance to reassign the refs to a usable object, b/c there are no other
    // "classic" refs on the component (or they haven't been processed yet)
    // TODO: Remove the need for this in next breaking release
    if (Object.isFrozen(this.refs) && !Object.keys(this.refs).length) {
      this.refs = {};
    }

    this.refs.dialog = ref;

    // maintains backwards compat with older component breakdown
    if (!this.props.backdrop) {
      this.refs.modal = ref;
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.setState({exited: false});
    } else if (!nextProps.animation) {
      // Otherwise let handleHidden take care of marking exited.
      this.setState({exited: true});
    }
  },

  componentWillUpdate(nextProps) {
    if (nextProps.show) {
      this.checkForFocus();
    }
  },

  componentDidMount() {
    if (this.props.show) {
      this.onShow();
    }
  },

  componentDidUpdate(prevProps) {
    let { animation } = this.props;

    if (prevProps.show && !this.props.show && !animation) {
      // otherwise handleHidden will call this.
      this.onHide();
    } else if (!prevProps.show && this.props.show) {
      this.onShow();
    }
  },

  componentWillUnmount() {
    if (this.props.show) {
      this.onHide();
    }
  },

  onShow() {
    const doc = domUtils.ownerDocument(this);
    const win = domUtils.ownerWindow(this);

    this._onDocumentKeyupListener =
      EventListener.listen(doc, 'keyup', this.handleDocumentKeyUp);

    this._onWindowResizeListener =
      EventListener.listen(win, 'resize', this.handleWindowResize);

    if (this.props.enforceFocus) {
      this._onFocusinListener = onFocus(this, this.enforceFocus);
    }

    let container = getContainer(this);

    container.className += container.className.length ? ' modal-open' : 'modal-open';

    this._containerIsOverflowing = container.scrollHeight > containerClientHeight(container, this);

    this._originalPadding = container.style.paddingRight;

    if (this._containerIsOverflowing) {
      container.style.paddingRight = parseInt(this._originalPadding || 0, 10) + getScrollbarSize() + 'px';
    }

    if (this.props.backdrop) {
      this.iosClickHack();
    }

    this.setState(this._getStyles(), () => this.focusModalContent());
  },

  onHide() {
    this._onDocumentKeyupListener.remove();
    this._onWindowResizeListener.remove();

    if (this._onFocusinListener) {
      this._onFocusinListener.remove();
    }

    let container = getContainer(this);

    container.style.paddingRight = this._originalPadding;

    container.className = container.className.replace(/ ?modal-open/, '');

    this.restoreLastFocus();
  },

  handleHidden(...args) {
    this.setState({ exited: true });

    this.onHide();

    if (this.props.onExited) {
      this.props.onExited(...args);
    }
  },

  handleBackdropClick(e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onHide();
  },

  handleDocumentKeyUp(e) {
    if (this.props.keyboard && e.keyCode === 27) {
      this.props.onHide();
    }
  },

  handleWindowResize() {
    this.setState(this._getStyles());
  },

  checkForFocus() {
    if (canUseDOM) {
      this.lastFocus = activeElement(document);
    }
  },

  focusModalContent() {
    let modalContent = React.findDOMNode(this.refs.dialog);
    let current = activeElement(domUtils.ownerDocument(this));
    let focusInModal = current && contains(modalContent, current);


    if (modalContent && this.props.autoFocus && !focusInModal) {
      this.lastFocus = current;
      modalContent.focus();
    }
  },

  restoreLastFocus() {
    if (this.lastFocus && this.lastFocus.focus) {
      this.lastFocus.focus();
      this.lastFocus = null;
    }
  },

  enforceFocus() {
    if (!this.isMounted()) {
      return;
    }

    let active = activeElement(domUtils.ownerDocument(this));
    let modal = React.findDOMNode(this.refs.dialog);

    if (modal && modal !== active && !contains(modal, active)) {
      modal.focus();
    }
  },

  iosClickHack() {
    // IOS only allows click events to be delegated to the document on elements
    // it considers 'clickable' - anchors, buttons, etc. We fake a click handler on the
    // DOM nodes themselves. Remove if handled by React: https://github.com/facebook/react/issues/1169
    React.findDOMNode(this.refs.modal).onclick = () => {};
    React.findDOMNode(this.refs.backdrop).onclick = () => {};
  },

  _getStyles() {
    if (!canUseDOM) {
      return {};
    }

    let node = React.findDOMNode(this.refs.modal);
    let scrollHt = node.scrollHeight;
    let container = getContainer(this);
    let containerIsOverflowing = this._containerIsOverflowing;
    let modalIsOverflowing = scrollHt > containerClientHeight(container, this);

    return {
      dialogStyles: {
        paddingRight: containerIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : void 0,
        paddingLeft: !containerIsOverflowing && modalIsOverflowing ? getScrollbarSize() : void 0
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

export default Modal;
