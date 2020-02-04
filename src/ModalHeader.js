import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import { useBootstrapPrefix } from './ThemeProvider';
import CloseButton from './CloseButton';
import ModalContext from './ModalContext';

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
   * a Modal component, the onHide will automatically be propagated up to the
   * parent Modal `onHide`.
   */
  onHide: PropTypes.func,
};

const defaultProps = {
  closeLabel: 'Close',
  closeButton: false,
};

const ModalHeader = React.forwardRef(
  (
    {
      bsPrefix,
      closeLabel,
      closeButton,
      onHide,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-header');

    const context = useContext(ModalContext);

    const handleClick = useEventCallback(() => {
      if (context) context.onHide();
      if (onHide) onHide();
    });

    return (
      <div ref={ref} {...props} className={classNames(className, bsPrefix)}>
        {children}

        {closeButton && (
          <CloseButton label={closeLabel} onClick={handleClick} />
        )}
      </div>
    );
  },
);

ModalHeader.displayName = 'ModalHeader';
ModalHeader.propTypes = propTypes;
ModalHeader.defaultProps = defaultProps;

export default ModalHeader;
