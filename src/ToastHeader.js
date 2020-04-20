import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import { useBootstrapPrefix } from './ThemeProvider';
import CloseButton from './CloseButton';
import ToastContext from './ToastContext';

const propTypes = {
  bsPrefix: PropTypes.string,

  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: PropTypes.string,

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: PropTypes.bool,
};

const defaultProps = {
  closeLabel: 'Close',
  closeButton: true,
};

const ToastHeader = React.forwardRef(
  (
    { bsPrefix, closeLabel, closeButton, className, children, ...props },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-header');

    const context = useContext(ToastContext);

    const handleClick = useEventCallback((e) => {
      if (context && context.onClose) {
        context.onClose(e);
      }
    });

    return (
      <div ref={ref} {...props} className={classNames(bsPrefix, className)}>
        {children}

        {closeButton && (
          <CloseButton
            label={closeLabel}
            onClick={handleClick}
            className="ml-2 mb-1"
            data-dismiss="toast"
          />
        )}
      </div>
    );
  },
);

ToastHeader.displayName = 'ToastHeader';
ToastHeader.propTypes = propTypes;
ToastHeader.defaultProps = defaultProps;

export default ToastHeader;
