/** @jsx React.DOM */

import React            from './react-es6';
import classSet         from './react-es6/lib/cx';
import BootstrapMixin   from './BootstrapMixin';


// TODO:
// - fade out
// - aria-labelledby
// - Add `modal-body` div if only one child passed in that doesn't already have it
// - Don't wrap props.title in H4 if it's a component
// - Tests

var Modal = React.createClass({
  mixins: [BootstrapMixin],

  getDefaultProps: function () {
    return {
      bsClass: 'modal',
      backdrop: true,
      keyboard: true
    };
  },

  componentDidMount: function () {
    document.addEventListener('keyup', this.handleKeyUp);

    setTimeout(this.fadeIn, 0);
  },

  fadeIn: function () {
    if (this.isMounted() && this.refs.modal.getDOMNode().className.match(/\bfade\b/)) {
      this.refs.modal.getDOMNode().className += ' in';
      this.refs.backdrop.getDOMNode().className += ' in';
    }
  },

  componentWillUnmount: function () {
    document.removeEventListener('keyup', this.handleKeyUp);
  },

  killClick: function (e) {
    e.stopPropagation();
  },

  handleBackdropClick: function () {
    this.props.onRequestClose();
  },

  handleKeyUp: function (e) {
    if (this.props.keyboard && e.keyCode === 27) {
      this.props.onRequestClose();
    }
  },

  render: function () {
    var classes = this.getBsClassSet();
    
    classes['fade'] = this.props.fade;

    var modal = this.transferPropsTo(
      <div
        bsClass="modal"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
        style={{display: 'block'}}
        className={classSet(classes)}
        onClick={this.handleBackdropClick}
        ref="modal"
      >
        <div className="modal-dialog">
          <div className="modal-content" onClick={this.killClick}>
            {this.props.title ? this.renderHeader() : null}
            {this.props.children}
          </div>
        </div>
      </div>
    );

    return this.props.backdrop ?
      this.renderBackdrop(modal) : modal;
  },

  renderBackdrop: function (modal) {
    var classes = {
      'modal-backdrop': true,
      'fade': this.props.fade
    };

    return (
      <div>
        <div className={classSet(classes)} ref="backdrop" />
        {modal}
      </div>
    );
  },

  renderHeader: function () {
    return (
      <div className="modal-header">
        <button type="button" className="close" aria-hidden="true" onClick={this.props.onRequestClose}>&times;</button>
        <h4 className="modal-title">{this.props.title}</h4>
      </div>
    );
  }
});

export default = Modal;