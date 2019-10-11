import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /** @default 'modal' */
  bsPrefix: PropTypes.string,

  /**
   * Render a large, extra large or small modal.
   *
   * @type ('sm'|'lg','xl')
   */
  size: PropTypes.string,

  /**
   * Specify whether the Component should be vertically centered
   */
  centered: PropTypes.bool,

  /**
   * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
   */
  scrollable: PropTypes.bool,
};

const ModalDialog = React.forwardRef(
  (
    { bsPrefix, className, centered, size, children, scrollable, ...props },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');
    const dialogClass = `${bsPrefix}-dialog`;

    return (
      <div
        {...props}
        ref={ref}
        className={classNames(
          dialogClass,
          className,
          size && `${bsPrefix}-${size}`,
          centered && `${dialogClass}-centered`,
          scrollable && `${dialogClass}-scrollable`,
        )}
      >
        <div className={`${bsPrefix}-content`}>{children}</div>
      </div>
    );
  },
);

ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = propTypes;

export default ModalDialog;
