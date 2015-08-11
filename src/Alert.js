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
  
  _initDismissTimer() {
    if (this.props.dismissAfter && this.props.onDismiss) {
      this.dismissTimer = setTimeout(this.props.onDismiss, this.props.dismissAfter);
    }
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
    let classes = this.getBsClassSet();
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
    this._initDismissTimer();
  },
  
  componentDidUpdate() {
    clearTimeout(this.dismissTimer);
    this._initDismissTimer();
  },
  
  componentWillUnmount() {
    clearTimeout(this.dismissTimer);
  }
});

export default Alert;
