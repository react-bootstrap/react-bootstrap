/*eslint-disable react/prop-types */
import React, { cloneElement } from 'react';

import classNames from 'classnames';
import createChainedFunction from './utils/createChainedFunction';
import BootstrapMixin from './BootstrapMixin';
import domUtils from './utils/domUtils';
import EventListener from './utils/EventListener';

import Portal from './Portal';
import Fade from './Fade';

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

function getContainer(context){
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

  if ( currentFocusListener ) {
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

let scrollbarSize;

function getScrollbarSize(){
  if ( scrollbarSize !== undefined ){
    return scrollbarSize;
  }

  let scrollDiv = document.createElement('div');

  scrollDiv.style.position = 'absolute';
  scrollDiv.style.top = '-9999px';
  scrollDiv.style.width = '50px';
  scrollDiv.style.height = '50px';
  scrollDiv.style.overflow = 'scroll';

  document.body.appendChild(scrollDiv);
  scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
  document.body.removeChild(scrollDiv);

  scrollDiv = null;
  return scrollbarSize;
}


const ModalMarkup = React.createClass({

  mixins: [ BootstrapMixin ],

  propTypes: {

    /**
     * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
     */
    backdrop: React.PropTypes.oneOf(['static', true, false]),
    /**
     * Include a backdrop component. Specify 'static' for a backdrop that doesn't trigger an "onHide" when clicked.
     */
    keyboard: React.PropTypes.bool,

    /**
     * Open and close the Modal with a slide and fade animation.
     */
    animation: React.PropTypes.bool,

    /**
     * A Callback fired when the header closeButton or non-static backdrop is clicked.
     * @type {function}
     * @required
     */
    onHide: React.PropTypes.func.isRequired,

    /**
     * A css class to apply to the Modal dialog DOM node.
     */
    dialogClassName: React.PropTypes.string,

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
    enforceFocus: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsClass: 'modal',
      backdrop: true,
      keyboard: true,
      animation: true,
      closeButton: true,

      autoFocus: true,
      enforceFocus: true
    };
  },

  getInitialState(){
    return { };
  },

  render() {
    let state = this.state;
    let modalStyle = { ...state.dialogStyles, display: 'block'};
    let dialogClasses = this.getBsClassSet();

    delete dialogClasses.modal;
    dialogClasses['modal-dialog'] = true;

    let classes = {
      modal: true,
      in: this.props.show && !this.props.animation
    };

    let modal = (
      <div
        {...this.props}
        title={null}
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
        className={classNames(this.props.className, classes)}
        onClick={this.props.backdrop === true ? this.handleBackdropClick : null}
        ref="modal">
        <div className={classNames(this.props.dialogClassName, dialogClasses)}>
          <div className="modal-content" role='document'>
            { this.renderContent() }
          </div>
        </div>
      </div>
    );

    return this.props.backdrop ?
      this.renderBackdrop(modal, state.backdropStyles) : modal;
  },

  renderContent() {

    return React.Children.map(this.props.children, child => {
      // TODO: use context in 0.14
      if (child.type.__isModalHeader) {
        return cloneElement(child, {
          onHide: createChainedFunction(this.props.onHide, child.props.onHide)
        });
      }
      return child;
    });
  },

  renderBackdrop(modal) {
    let { animation } = this.props;
    let duration = Modal.BACKDROP_TRANSITION_DURATION; //eslint-disable-line no-use-before-define

    let backdrop = (
      <div ref="backdrop"
       className={classNames('modal-backdrop', { in: this.props.show && !animation })}
       onClick={this.handleBackdropClick}
      />
    );

    return (
      <div>
        { animation
            ? <Fade transitionAppear in={this.props.show} duration={duration}>{backdrop}</Fade>
            : backdrop
        }
        {modal}
      </div>
    );
  },

  iosClickHack() {
    // IOS only allows click events to be delegated to the document on elements
    // it considers 'clickable' - anchors, buttons, etc. We fake a click handler on the
    // DOM nodes themselves. Remove if handled by React: https://github.com/facebook/react/issues/1169
    React.findDOMNode(this.refs.modal).onclick = function () {};
    React.findDOMNode(this.refs.backdrop).onclick = function () {};
  },

  componentWillMount(){
    this.checkForFocus();
  },

  componentDidMount() {
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

    this.setState(this._getStyles() //eslint-disable-line react/no-did-mount-set-state
      , () => this.focusModalContent());
  },

  componentDidUpdate(prevProps) {
    if (this.props.backdrop && this.props.backdrop !== prevProps.backdrop) {
      this.iosClickHack();
      this.setState(this._getStyles()); //eslint-disable-line react/no-did-update-set-state
    }

    if (this.props.container !== prevProps.container) {
      let container = getContainer(this);
      this._containerIsOverflowing = container.scrollHeight > containerClientHeight(container, this);
    }
  },

  componentWillUnmount() {
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

  checkForFocus(){
    if ( domUtils.canUseDom ) {
      try {
        this.lastFocus = document.activeElement;
      }
      catch (e) {} // eslint-disable-line no-empty
    }
  },

  focusModalContent () {
    let modalContent = React.findDOMNode(this.refs.modal);
    let current = domUtils.activeElement(this);
    let focusInModal = current && domUtils.contains(modalContent, current);

    if (this.props.autoFocus && !focusInModal) {
      this.lastFocus = current;

      modalContent.focus();
    }
  },

  restoreLastFocus () {
    if (this.lastFocus) {
      this.lastFocus.focus();
      this.lastFocus = null;
    }
  },

  enforceFocus() {
    if ( !this.isMounted() ) {
      return;
    }

    let active = domUtils.activeElement(this);
    let modal = React.findDOMNode(this.refs.modal);

    if (modal !== active && !domUtils.contains(modal, active)){
      modal.focus();
    }
  },

  _getStyles() {
    if ( !domUtils.canUseDom ) { return {}; }

    let node = React.findDOMNode(this.refs.modal);
    let scrollHt = node.scrollHeight;
    let container = getContainer(this);
    let containerIsOverflowing = this._containerIsOverflowing;
    let modalIsOverflowing = scrollHt > containerClientHeight(container, this);

    return {
      dialogStyles: {
        paddingRight: containerIsOverflowing && !modalIsOverflowing ? getScrollbarSize() : void 0,
        paddingLeft:  !containerIsOverflowing && modalIsOverflowing ? getScrollbarSize() : void 0
      }
    };
  }
});

const Modal = React.createClass({
  propTypes: {
    ...Portal.propTypes,
    ...ModalMarkup.propTypes
  },

  getDefaultProps(){
    return {
      show: false,
      animation: true
    };
  },

  render() {
    let { children, ...props } = this.props;

    let show = !!props.show;

    let modal = (
      <ModalMarkup {...props} ref='modal'>
        { children }
      </ModalMarkup>
    );

    return (
      <Portal container={props.container}>
        { props.animation
            ? (
              <Fade
                in={show}
                transitionAppear={show}
                duration={Modal.TRANSITION_DURATION}
                unmountOnExit
              >
                { modal }
              </Fade>
            )
            : show && modal
        }

      </Portal>
    );
  }
});

Modal.Body = Body;
Modal.Header = Header;
Modal.Title = Title;
Modal.Footer = Footer;

Modal.TRANSITION_DURATION = 300;
Modal.BACKDROP_TRANSITION_DURATION = 150;

export default Modal;
