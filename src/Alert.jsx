/** @jsx React.DOM */

var React          = require('react');
var merge          = require('react/lib/merge');
var BootstrapMixin = require('./BootstrapMixin');

var Alert = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onDismiss: React.PropTypes.func,
    dismissAfter: React.PropTypes.number
  },

  getDefaultProps: function () {
    return {
      bsClass: 'alert',
      bsStyle: 'info'
    };
  },

  renderDismissButton: function () {
    return (
      <button
        type="button"
        className="close"
        onClick={this.props.onDismiss}
        aria-hidden="true">
        &times;
      </button>
    );
  },

  render: function () {
    var classes = this.getClassSetFromString(this.extendClassName());
    var isDismissable = !!this.props.onDismiss;

    classes['alert-dismissable'] = isDismissable;

    var className = React.addons.classSet(classes);

    return this.transferPropsTo(
      <div className={className}>
        {isDismissable ? this.renderDismissButton() : null}
        {this.props.children}
      </div>
    );
  },

  componentDidMount: function() {
    if (this.props.dismissAfter && this.props.onDismiss) {
      this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
    }
  },

  componentWillUnmount: function() {
    clearTimeout(this.dismissTimer);
  }
});

module.exports = Alert;