import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  (
    { label = 'Close', onClick, className, ...props }: CloseButtonProps,
    ref,
  ) => (
    <button
      ref={ref}
      type="button"
      className={classNames('close', className)}
      onClick={onClick}
      {...props}
    >
      <span aria-hidden="true">&times;</span>
      <span className="sr-only">{label}</span>
    </button>
  ),
);

CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;

export default CloseButton;
