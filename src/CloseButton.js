import PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

const defaultProps = {
  label: 'Close',
};

const CloseButton = React.forwardRef(({ label, onClick }, ref) => (
  <button ref={ref} type="button" className="close" onClick={onClick}>
    <span aria-hidden="true">&times;</span>
    <span className="sr-only">{label}</span>
  </button>
));

CloseButton.displayName = 'CloseButton';
CloseButton.propTypes = propTypes;
CloseButton.defaultProps = defaultProps;

export default CloseButton;
