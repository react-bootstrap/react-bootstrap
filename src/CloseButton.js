import * as PropTypes from 'prop-types';
import React from 'react';

import Button from './Button';

const propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

class CloseButton extends React.Component {
  render() {
    const { label, onClick } = this.props;
    return (
      <Button
        className="close"
        onClick={onClick}
      >
        <span aria-hidden="true">&times;</span>
        <span className="sr-only">{label}</span>
      </Button>
    );
  }
}

CloseButton.propTypes = propTypes;

export default CloseButton;
