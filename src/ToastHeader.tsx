import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import CloseButton from './CloseButton';
import ToastContext from './ToastContext';
import {
  BsPrefixAndClassNameOnlyProps,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface ToastHeaderProps
  extends React.PropsWithChildren<BsPrefixAndClassNameOnlyProps> {
  closeLabel?: string;
  closeButton?: boolean;
}

type ToastHeader = BsPrefixRefForwardingComponent<'div', ToastHeaderProps>;

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

const ToastHeader: ToastHeader = React.forwardRef<
  HTMLDivElement,
  ToastHeaderProps
>(
  (
    {
      bsPrefix,
      closeLabel,
      closeButton,
      className,
      children,
      ...props
    }: ToastHeaderProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-header');
    const classNames = useClassNameMapper();

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
            className={classNames('ml-2 mb-1')}
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
