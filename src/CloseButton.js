import * as PropTypes from 'prop-types';
import React from 'react';

const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

class CloseButton extends React.Component {
  render() {
    const { label, onClick } = this.props;
    return (
      <button
        type="button"
        className="close"
        onClick={onClick}
      >
        <span aria-hidden="true">&times;</span>
        <span className="sr-only">{label}</span>
      </button>
    );
  }
}

CloseButton.propTypes = propTypes;

export default CloseButton;
