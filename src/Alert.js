import classNames from 'classnames';
import React from 'react';

import { bsClass, bsStyles, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';
import { State } from './utils/StyleConfig';

const propTypes = {
  onDismiss: React.PropTypes.func,
  closeLabel: React.PropTypes.string,
};

const defaultProps = {
  closeLabel: 'Close alert',
};

class Alert extends React.Component {
  renderDismissButton(onDismiss) {
    return (
      <button
        type="button"
        className="close"
        onClick={onDismiss}
        aria-hidden="true"
        tabIndex="-1"
      >
        <span>&times;</span>
      </button>
    );
  }

  renderSrOnlyDismissButton(onDismiss, closeLabel) {
    return (
      <button
        type="button"
        className="close sr-only"
        onClick={onDismiss}
      >
        {closeLabel}
      </button>
    );
  }

  render() {
    const { onDismiss, closeLabel, className, children, ...props } =
      this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const dismissable = !!onDismiss;
    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'dismissable')]: dismissable,
    };

    return (
      <div
        {...elementProps}
        role="alert"
        className={classNames(className, classes)}
      >
        {dismissable && this.renderDismissButton(onDismiss)}
        {children}
        {dismissable && this.renderSrOnlyDismissButton(onDismiss, closeLabel)}
      </div>
    );
  }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default bsStyles(Object.values(State), State.INFO,
  bsClass('alert', Alert)
);
