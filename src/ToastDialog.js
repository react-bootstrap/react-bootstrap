import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /** @default 'toast' */
  bsPrefix: PropTypes.string,

  /**
   * When `true` The modal will show itself.
   */
  show: PropTypes.bool,

  /** A `react-transition-group` Transition component used to animate the Alert on dismissal. */
  transition: PropTypes.elementType,
};

const ToastDialog = ({
  bsPrefix,
  className,
  children,
  transition: Transition,
  show,
  ...props
}) => {
  bsPrefix = useBootstrapPrefix(bsPrefix, 'toast');
  const dialogClass = `${bsPrefix}`;
  return (
    <Transition in={show}>
      <div
        {...props}
        className={classNames(dialogClass, className, show && 'show')}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        {children}
      </div>
    </Transition>
  );
};

ToastDialog.displayName = 'ToastDialog';
ToastDialog.propTypes = propTypes;

export default ToastDialog;
