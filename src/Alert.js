import React from 'react';
import classNames from 'classnames';
import bootstrapUtils, { bsStyles, bsClass } from './utils/bootstrapUtils';
import { State } from './styleMaps';

let Alert = React.createClass({

  propTypes: {
    onDismiss: React.PropTypes.func,
    dismissAfter: React.PropTypes.number,
    closeLabel: React.PropTypes.string
  },

  getDefaultProps() {
    return {
      closeLabel: 'Close Alert'
    };
  },

  renderDismissButton() {
    return (
      <button
        type="button"
        className="close"
        onClick={this.props.onDismiss}
        aria-hidden="true"
        tabIndex="-1">
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
    let classes = bootstrapUtils.getClassSet(this.props);
    let isDismissable = !!this.props.onDismiss;

    classes[bootstrapUtils.prefix(this.props, 'dismissable')] = isDismissable;

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


export default bsStyles(State.values(), State.INFO,
  bsClass('alert', Alert)
);
