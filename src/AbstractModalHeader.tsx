import * as React from 'react';
import { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';
import CloseButton, { type CloseButtonVariant } from './CloseButton.js';
import ModalContext from './ModalContext.js';

export interface AbstractModalHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
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

  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a ModalContext, the onHide will automatically be propagated up
   * to the parent `onHide`.
   *
   * @type {(() => void) | undefined}
   */
  onHide?: (() => void) | undefined;
}

const AbstractModalHeader = React.forwardRef<
  HTMLDivElement,
  AbstractModalHeaderProps
>(
  (
    {
      closeLabel = 'Close',
      closeVariant,
      closeButton = false,
      onHide,
      children,
      ...props
    },
    ref,
  ) => {
    const context = useContext(ModalContext);

    const handleClick = useEventCallback(() => {
      context?.onHide();
      onHide?.();
    });

    return (
      <div ref={ref} {...props}>
        {children}

        {closeButton && (
          <CloseButton
            aria-label={closeLabel}
            variant={closeVariant}
            onClick={handleClick}
          />
        )}
      </div>
    );
  },
);

AbstractModalHeader.displayName = 'AbstractModalHeader';

export default AbstractModalHeader;
