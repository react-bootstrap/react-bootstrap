import PropTypes from 'prop-types';
import * as React from 'react';
import classNames from 'classnames';

export type CloseButtonVariant = 'white' | string;

export interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: CloseButtonVariant;
}

const propTypes = {
  /** An accessible label indicating the relevant information about the Close Button. */
  'aria-label': PropTypes.string,

  /** A callback fired after the Close Button is clicked. */
  onClick: PropTypes.func,

  /**
   * Render different color variant for the button.
   *
   * Omitting this will render the default dark color.
   */
  variant: PropTypes.oneOf<CloseButtonVariant>(['white']),
};

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  (
    { className, variant, 'aria-label': ariaLabel = 'Close', ...props },
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      className={classNames(
        'btn-close',
        variant && `btn-close-${variant}`,
        className,
      )}
      aria-label={ariaLabel}
      {...props}
    />
  ),
);

CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;

export default CloseButton;
