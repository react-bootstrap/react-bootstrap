import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';
import { useBootstrapPrefix } from './ThemeProvider.js';
import CloseButton, { type CloseButtonVariant } from './CloseButton.js';
import ToastContext from './ToastContext.js';

export interface ToastHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * @default 'toast-header'
   */
  bsPrefix?: string | undefined;

  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel?: string | undefined;

  /**
   * Sets the variant for close button.
   */
  closeVariant?: CloseButtonVariant | undefined;

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton?: boolean | undefined;
}

const ToastHeader = React.forwardRef<HTMLDivElement, ToastHeaderProps>(
  (
    {
      bsPrefix,
      closeLabel = 'Close',
      closeVariant,
      closeButton = true,
      className,
      children,
      ...props
    }: ToastHeaderProps,
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-header');

    const context = useContext(ToastContext);

    const handleClick = useEventCallback((e) => {
      context?.onClose?.(e);
    });

    return (
      <div ref={ref} {...props} className={clsx(bsPrefix, className)}>
        {children}

        {closeButton && (
          <CloseButton
            aria-label={closeLabel}
            variant={closeVariant}
            onClick={handleClick}
            data-dismiss="toast"
          />
        )}
      </div>
    );
  },
);

ToastHeader.displayName = 'ToastHeader';

export default ToastHeader;
