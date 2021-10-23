import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';
import CloseButton, { CloseButtonVariant } from './CloseButton';
import ModalContext from './ModalContext';

export interface AbstractModalHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  closeLabel?: string;
  closeVariant?: CloseButtonVariant;
  closeButton?: boolean;
  onHide?: () => void;
}

const propTypes = {
  /**
   * Provides an accessible label for the close
   * button. It is used for Assistive Technology when the label text is not
   * readable.
   */
  closeLabel: PropTypes.string,

  /**
   * Sets the variant for close button.
   */
  closeVariant: PropTypes.oneOf<CloseButtonVariant>(['white']),

  /**
   * Specify whether the Component should contain a close button
   */
  closeButton: PropTypes.bool,

  /**
   * A Callback fired when the close button is clicked. If used directly inside
   * a ModalContext, the onHide will automatically be propagated up
   * to the parent `onHide`.
   */
  onHide: PropTypes.func,
};

const defaultProps = {
  closeLabel: 'Close',
  closeButton: false,
};

const AbstractModalHeader = React.forwardRef<
  HTMLDivElement,
  AbstractModalHeaderProps
>(
  (
    { closeLabel, closeVariant, closeButton, onHide, children, ...props },
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

AbstractModalHeader.propTypes = propTypes;
AbstractModalHeader.defaultProps = defaultProps;

export default AbstractModalHeader;
