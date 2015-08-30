import React from 'react';

const Anchor = React.createClass({
  propTypes: {
    id: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ])
  },
  render() {
    return (
      <a id={this.props.id} href={'#' + this.props.id} className="anchor">
        <span className="anchor-icon">#</span>
        {this.props.children}
      </a>
    );
  }
});

export default Anchor;
