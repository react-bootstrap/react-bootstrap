import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import FadeMixin from './FadeMixin';
import domUtils from './utils/domUtils';
import EventListener from './utils/EventListener';


// TODO:
// - aria-labelledby
// - Add `modal-body` div if only one child passed in that doesn't already have it
// - Tests

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

/**
 * Firefox doesn't have a focusin event so using capture is easiest way to get bubbling
 * IE8 can't do addEventListener, but does have onfocus in, so we use that in ie8
 * @param  {ReactElement|HTMLElement} context
 * @param  {Function} handler
 */
function onFocus(context, handler) {
  let doc = domUtils.ownerDocument(context);
  let useFocusin = !doc.addEventListener
    , remove;

  if (useFocusin) {
    document.attachEvent('onfocusin', handler);
    remove = () => document.detachEvent('onfocusin', handler);
  } else {
    document.addEventListener('focus', handler, true);
    remove = () => document.removeEventListener('focus', handler, true);
  }
  return { remove };
}

let scrollbarSize;

if ( domUtils.canUseDom) {
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
}

const Modal = React.createClass({

  mixins: [BootstrapMixin, FadeMixin],

  propTypes: {
    title: React.PropTypes.node,
    backdrop: React.PropTypes.oneOf(['static', true, false]),
    keyboard: React.PropTypes.bool,
    closeButton: React.PropTypes.bool,
    animation: React.PropTypes.bool,
    onRequestHide: React.PropTypes.func.isRequired,
    dialogClassName: React.PropTypes.string,
    enforceFocus: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsClass: 'modal',
      backdrop: true,
      keyboard: true,
      animation: true,
      closeButton: true,
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
      fade: this.props.animation,
      'in': !this.props.animation
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
          <div className="modal-content">
            {this.props.title ? this.renderHeader() : null}
            {this.props.children}
          </div>
        </div>
      </div>
    );

    return this.props.backdrop ?
      this.renderBackdrop(modal, state.backdropStyles) : modal;
  },

  renderBackdrop(modal) {
    let classes = {
      'modal-backdrop': true,
      fade: this.props.animation,
      'in': !this.props.animation
    };

    let onClick = this.props.backdrop === true ?
      this.handleBackdropClick : null;

    return (
      <div>
        <div className={classNames(classes)} ref="backdrop" onClick={onClick} />
        {modal}
      </div>
    );
  },

  renderHeader() {
    let closeButton;
    if (this.props.closeButton) {
      closeButton = (
        <button type="button" className="close" aria-hidden="true" onClick={this.props.onRequestHide}>&times;</button>
      );
    }

    return (
      <div className="modal-header">
        {closeButton}
        {this.renderTitle()}
      </div>
    );
  },

  renderTitle() {
    return (
      React.isValidElement(this.props.title) ?
        this.props.title : <h4 className="modal-title">{this.props.title}</h4>
    );
  },

  iosClickHack() {
    // IOS only allows click events to be delegated to the document on elements
    // it considers 'clickable' - anchors, buttons, etc. We fake a click handler on the
    // DOM nodes themselves. Remove if handled by React: https://github.com/facebook/react/issues/1169
    React.findDOMNode(this.refs.modal).onclick = function () {};
    React.findDOMNode(this.refs.backdrop).onclick = function () {};
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
      container.style.paddingRight = parseInt(this._originalPadding || 0, 10) + scrollbarSize + 'px';
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

    this.props.onRequestHide();
  },

  handleDocumentKeyUp(e) {
    if (this.props.keyboard && e.keyCode === 27) {
      this.props.onRequestHide();
    }
  },

  handleWindowResize() {
    this.setState(this._getStyles());
  },

  focusModalContent () {
    this.lastFocus = domUtils.activeElement(this);
    let modalContent = React.findDOMNode(this.refs.modal);
    modalContent.focus();
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

    let active = domUtils.activeElement(this)
      , modal = React.findDOMNode(this.refs.modal);

    if (modal !== active && !domUtils.contains(modal, active)){
      modal.focus();
    }
  },

  _getStyles() {
    if ( !domUtils.canUseDom ) { return {}; }

    let node = React.findDOMNode(this.refs.modal)
      , scrollHt = node.scrollHeight
      , container = getContainer(this)
      , containerIsOverflowing = this._containerIsOverflowing
      , modalIsOverflowing = scrollHt > containerClientHeight(container, this);

    return {
      dialogStyles: {
        paddingRight: containerIsOverflowing && !modalIsOverflowing ? scrollbarSize : void 0,
        paddingLeft:  !containerIsOverflowing && modalIsOverflowing ? scrollbarSize : void 0
      }
    };
  }
});

export default Modal;
