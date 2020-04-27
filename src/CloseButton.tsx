import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export interface CloseButtonProps {
  label?: string;
  onClick?: React.MouseEventHandler<CloseButton>;
}

declare class CloseButton extends React.Component<CloseButtonProps> {}

const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  label: 'Close',
};

const CloseButton = React.forwardRef(
  ({ label, onClick, className, ...props }, ref) => (
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
CloseButton.defaultProps = defaultProps;

export default CloseButton;
