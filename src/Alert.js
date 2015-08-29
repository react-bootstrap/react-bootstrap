import React from 'react';
import classNames from 'classnames';
import bootstrapUtils from './utils/bootstrapUtils';

const Alert = React.createClass({


  propTypes: {
    ...bootstrapUtils.propTypes,
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
        aria-label={this.props.closeLabel}
        onClick={this.props.onDismiss}>
        <span aria-hidden="true">&times;</span>
      </button>
    );
  },

  render() {
    let classes = bootstrapUtils.getClassSet(this.props);
    let isDismissable = !!this.props.onDismiss;

    classes['alert-dismissable'] = isDismissable;

    return (
      <div {...this.props} role='alert' className={classNames(this.props.className, classes)}>
        {isDismissable ? this.renderDismissButton() : null}
        {this.props.children}
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
