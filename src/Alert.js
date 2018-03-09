import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import {
  bsClass,
  bsStyles,
  getClassSet,
  prefix,
  splitBsProps
} from './utils/bootstrapUtils';
import { State } from './utils/StyleConfig';
import CloseButton from './CloseButton';

const propTypes = {
  onDismiss: PropTypes.func,
  closeLabel: PropTypes.string,
  headingComponent: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  headingText: PropTypes.string
};

const defaultProps = {
  closeLabel: 'Close alert',
  headingComponent: 'h4'
};

class Alert extends React.Component {
  render() {
    const {
      onDismiss,
      closeLabel,
      headingComponent: HeadingComponent,
      headingText,
      className,
      children,
      ...props
    } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const dismissable = !!onDismiss;
    const classes = {
      ...getClassSet(bsProps),
      [prefix(bsProps, 'dismissable')]: dismissable
    };

    return (
      <div
        {...elementProps}
        role="alert"
        className={classNames(className, classes)}
      >
        {dismissable && <CloseButton onClick={onDismiss} label={closeLabel} />}
        {!!headingText && (
          <HeadingComponent className="alert-heading">
            {headingText}
          </HeadingComponent>
        )}
        {children}
      </div>
    );
  }
}

Alert.propTypes = propTypes;
Alert.defaultProps = defaultProps;

export default bsStyles(
  Object.values(State),
  State.INFO,
  bsClass('alert', Alert)
);
