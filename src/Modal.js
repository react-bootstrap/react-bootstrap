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

const Modal = React.createClass({
  mixins: [BootstrapMixin, FadeMixin],

  propTypes: {
    title: React.PropTypes.node,
    backdrop: React.PropTypes.oneOf(['static', true, false]),
    keyboard: React.PropTypes.bool,
    closeButton: React.PropTypes.bool,
    animation: React.PropTypes.bool,
    onRequestHide: React.PropTypes.func.isRequired
  },

  getDefaultProps() {
    return {
      bsClass: 'modal',
      backdrop: true,
      keyboard: true,
      animation: true,
      closeButton: true
    };
  },

  render() {
    let modalStyle = {display: 'block'};
    let dialogClasses = this.getBsClassSet();
    delete dialogClasses.modal;
    dialogClasses['modal-dialog'] = true;

    let classes = {
      modal: true,
      fade: this.props.animation,
      'in': !this.props.animation || !document.querySelectorAll
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
        <div className={classNames(dialogClasses)}>
          <div className="modal-content" style={{overflow: 'hidden'}}>
            {this.props.title ? this.renderHeader() : null}
            {this.props.children}
          </div>
        </div>
      </div>
    );

    return this.props.backdrop ?
      this.renderBackdrop(modal) : modal;
  },

  renderBackdrop(modal) {
    let classes = {
      'modal-backdrop': true,
      'fade': this.props.animation
    };

    classes.in = !this.props.animation || !document.querySelectorAll;

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

    let style = this.props.bsStyle;
    let classes = {
      'modal-header': true
    };
    classes['bg-' + style] = style;
    classes['text-' + style] = style;

    let className = classNames(classes);

    return (
      <div className={className}>
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
    this._onDocumentKeyupListener =
      EventListener.listen(domUtils.ownerDocument(this), 'keyup', this.handleDocumentKeyUp);

    let container = (this.props.container && React.findDOMNode(this.props.container)) ||
          domUtils.ownerDocument(this).body;
    container.className += container.className.length ? ' modal-open' : 'modal-open';

    if (this.props.backdrop) {
      this.iosClickHack();
    }
  },

  componentDidUpdate(prevProps) {
    if (this.props.backdrop && this.props.backdrop !== prevProps.backdrop) {
      this.iosClickHack();
    }
  },

  componentWillUnmount() {
    this._onDocumentKeyupListener.remove();
    let container = (this.props.container && React.findDOMNode(this.props.container)) ||
          domUtils.ownerDocument(this).body;
    container.className = container.className.replace(/ ?modal-open/, '');
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
  }
});

export default Modal;
