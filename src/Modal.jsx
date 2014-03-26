/** @jsx React.DOM */

import React            from './react-es6';
import classSet         from './react-es6/lib/cx';
import BootstrapMixin   from './BootstrapMixin';
import FadeMixin        from './FadeMixin';


// TODO:
// - aria-labelledby
// - Add `modal-body` div if only one child passed in that doesn't already have it
// - Tests

var Modal = React.createClass({
  mixins: [BootstrapMixin, FadeMixin],

  propTypes: {
    title: React.PropTypes.renderable,
    backdrop: React.PropTypes.oneOf(['static', true, false]),
    keyboard: React.PropTypes.bool,
    onRequestHide: React.PropTypes.func.isRequired
  },

  getDefaultProps: function () {
    return {
      bsClass: 'modal',
      backdrop: true,
      keyboard: true,
      animation: true
    };
  },

  render: function () {
    var modalStyle = {display: 'block'};
    var classes = this.getBsClassSet();

    classes['fade'] = this.props.animation;
    classes['in'] = !this.props.animation || !document.querySelectorAll;

    var modal = this.transferPropsTo(
      <div
        tabIndex="-1"
        role="dialog"
        style={modalStyle}
        className={classSet(classes)}
        onClick={this.props.backdrop === true ? this.handleBackdropClick : null}
        ref="modal">
        <div className="modal-dialog">
          <div className="modal-content">
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
      'fade': this.props.animation
    };

    classes['in'] = !this.props.animation || !document.querySelectorAll;

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
        <button type="button" className="close" aria-hidden="true" onClick={this.props.onRequestHide}>&times;</button>
        {this.renderTitle()}
      </div>
    );
  },

  renderTitle: function () {
    return (
      React.isValidComponent(this.props.title) ?
        this.props.title : <h4 className="modal-title">{this.props.title}</h4>
    );
  },

  componentDidMount: function () {
    document.addEventListener('keyup', this.handleDocumentKeyUp);
  },

  componentWillUnmount: function () {
    document.removeEventListener('keyup', this.handleDocumentKeyUp);
  },

  handleBackdropClick: function (e) {
    if (e.target !== e.currentTarget) {
      return;
    }

    this.props.onRequestHide();
  },

  handleDocumentKeyUp: function (e) {
    if (this.props.keyboard && e.keyCode === 27) {
      this.props.onRequestHide();
    }
  }
});

export default = Modal;
