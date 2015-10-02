import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';

const Alert = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    onDismiss: React.PropTypes.func,
    dismissAfter: React.PropTypes.number,
    closeLabel: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      bsClass: 'alert',
      bsStyle: 'info',
      closeLabel: 'Close Alert'
    };
  },

  renderDismissButton() {
    return (
      <button
        type="button"
        className="close"
        onClick={this.props.onDismiss}
        aria-hidden="true">
        <span>&times;</span>
      </button>
    );
  },

  renderSrOnlyDismissButton() {
    return (
      <button
        type="button"
        className="close sr-only"
        onClick={this.props.onDismiss}>
        {this.props.closeLabel}
      </button>
    );
  },

  render() {
    let classes = this.getBsClassSet();
    let isDismissable = !!this.props.onDismiss;

    classes['alert-dismissable'] = isDismissable;

    return (
      <div {...this.props} role="alert" className={classNames(this.props.className, classes)}>
        {isDismissable ? this.renderDismissButton() : null}
        {this.props.children}
        {isDismissable ? this.renderSrOnlyDismissButton() : null}
      </div>
    );
  },

  componentDidMount() {
    if (this.props.dismissAfter && this.props.onDismiss) {
      this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
    }
  },

  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }
});

export default Alert;
