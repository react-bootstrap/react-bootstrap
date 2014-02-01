/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';


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
    var classes = this.getBsClassSet();
    var isDismissable = !!this.props.onDismiss;

    classes['alert-dismissable'] = isDismissable;

    return this.transferPropsTo(
      <div className={classSet(classes)}>
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

export default = Alert;