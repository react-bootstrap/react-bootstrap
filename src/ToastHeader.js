import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import { useBootstrapPrefix } from './ThemeProvider';
import CloseButton from './CloseButton';

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

  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a Toast component, the onHide will automatically be propagated up to the
   * parent Toast `onHide`.
   */
  onClose: PropTypes.func,
};

const defaultProps = {
  closeLabel: 'Close',
  closeButton: true,
};

const ToastHeader = React.forwardRef(
  (
    {
      bsPrefix,
      closeLabel,
      closeButton,
      onClose,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-header');

    const handleClick = useEventCallback(() => {
      if (onClose) {
        onClose();
      }
    });

    return (
      <div ref={ref} {...props} className={classNames(className, bsPrefix)}>
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
