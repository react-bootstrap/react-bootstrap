import PropTypes from 'prop-types';
import React from 'react';

class Anchor extends React.Component {
  static propTypes = {
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  };

  render() {
    return (
      <a id={this.props.id} href={'#' + this.props.id} className="anchor">
        <span className="anchor-icon">#</span>
        {this.props.children}
      </a>
    );
  }
}

export default Anchor;
