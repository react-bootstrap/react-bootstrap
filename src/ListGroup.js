import React, { cloneElement } from 'react';

import ValidComponentChildren from './utils/ValidComponentChildren';

const ListGroup = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },

  render() {
    return (
      <div className="list-group">
        {ValidComponentChildren.map(this.props.children, this.renderListItem)}
      </div>
    );
  },

  renderListItem(child, index) {
    return cloneElement(child, {
      key: child.key ? child.key : index
    });
  }
});

export default ListGroup;
