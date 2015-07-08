import React from 'react';

const Anchor = React.createClass({
  propTypes: {
    id: React.PropTypes.string
  },
  render() {
    return (
      <a id={this.props.id} href={'#' + this.props.id} className='anchor'>
        <span className='anchor-icon'>#</span>
        {this.props.children}
      </a>
    );
  }
});

export default Anchor;
