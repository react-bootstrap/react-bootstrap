import PropTypes from 'prop-types';
import React from 'react';
import { useClassNameMapper } from './ThemeProvider';

export interface CloseButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
}

const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  label: 'Close',
};

const CloseButton = React.forwardRef<HTMLButtonElement, CloseButtonProps>(
  ({ label, onClick, className, ...props }: CloseButtonProps, ref) => {
    const classNames = useClassNameMapper();
    return (
      <button
        ref={ref}
        type="button"
        className={classNames('close', className)}
        onClick={onClick}
        {...props}
      >
        <span aria-hidden="true">&times;</span>
        <span className={classNames('sr-only')}>{label}</span>
      </button>
    );
  },
);

CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
