import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { bsClass, bsStyles, getClassSet, prefix, splitBsProps }
  from './utils/bootstrapUtils';
import { State } from './utils/StyleConfig';
import CloseButton from './CloseButton';

const propTypes = {
  onDismiss: PropTypes.func,
  closeLabel: PropTypes.string,
};

const defaultProps = {
  closeLabel: 'Close alert',
};

class Alert extends React.Component {
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
        {dismissable && (
          <CloseButton
            onClick={onDismiss}
            label={closeLabel}
          />
        )}
        {children}
      </div>
    );
  }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default bsStyles(Object.values(State), State.INFO,
  bsClass('alert', Alert)
);
