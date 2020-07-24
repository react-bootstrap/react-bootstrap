import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

import { BsPrefixPropsWithChildren } from './helpers';

export interface ModalDialogProps
  extends React.HTMLAttributes<HTMLDivElement>,
    BsPrefixPropsWithChildren {
  size?: 'sm' | 'lg' | 'xl';
  fullScreen?: true | 'sm' | 'md' | 'lg' | 'xl';
  centered?: boolean;
  scrollable?: boolean;
}

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
   * Renders a fullscreen modal. Specifying a breakpoint will render the modal
   * as fullscreen __below__ the breakpoint size.
   *
   * @type (true|'sm'|'md'|'lg'|'xl')
   */
  fullScreen: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * Specify whether the Component should be vertically centered
   */
  centered: PropTypes.bool,

  /**
   * Allows scrolling the `<Modal.Body>` instead of the entire Modal when overflowing.
   */
  scrollable: PropTypes.bool,
};

const ModalDialog = React.forwardRef<HTMLDivElement, ModalDialogProps>(
  (
    {
      bsPrefix,
      className,
      centered,
      size,
      fullScreen,
      children,
      scrollable,
      ...props
    }: ModalDialogProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'modal');
    const dialogClass = `${bsPrefix}-dialog`;

    let fullScreenClass: string | undefined;
    if (fullScreen) {
      fullScreenClass =
        fullScreen === true
          ? `${bsPrefix}-fullscreen`
          : `${bsPrefix}-fullscreen-${fullScreen}-down`;
    }

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
          fullScreenClass,
        )}
      >
        <div className={`${bsPrefix}-content`}>{children}</div>
      </div>
    );
  },
);

ModalDialog.displayName = 'ModalDialog';
ModalDialog.propTypes = propTypes as any;

export default ModalDialog;
