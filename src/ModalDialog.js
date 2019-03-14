import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /** @default 'modal' */
  bsPrefix: PropTypes.string,

  /**
   * Specifies a large or small modal.
   *
   * @type ('sm'|'lg')
   */
  size: PropTypes.string,

  /**
   * Specify whether the Component should be vertically centered
   */
  centered: PropTypes.bool,
};

const ModalDialog = React.forwardRef(
  ({ bsPrefix, className, centered, size, children, ...props }, ref) => {
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
        )}
      >
        <div className={classNames(`${bsPrefix}-content`)}>{children}</div>
      </div>
    );
  },
);

ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = propTypes;

export default ModalDialog;
