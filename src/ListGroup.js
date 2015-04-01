import React, { cloneElement } from 'react';
import classSet from 'classnames';
import ValidComponentChildren from './utils/ValidComponentChildren';

class ListGroup extends React.Component {
  render() {
    let items = ValidComponentChildren.map(
      this.props.children,
      (item, index) => cloneElement(item, { key: item.key ? item.key : index })
    );

    let child;

    if (this.props.children) {
      if (Array.isArray(this.props.children)) {
        child = this.props.children[0];
      } else {
        child = this.props.children;
      }
    }

    // If child has an href prop, it is an
    // 'anchor' tag and ListGroup should be a Div.
    if (child && child.props.href){
      return this.renderDiv(items);
    } else {
      return this.renderUL(items);
    }
  }

  renderUL(items) {
    return (
      <ul className={classSet(this.props.className, 'list-group')}>
        {items}
      </ul>
    );
  }

  renderDiv(items) {
    return (
      <div className={classSet(this.props.className, 'list-group')}>
        {items}
      </div>
    );
  }
}

ListGroup.propTypes = {
  className: React.PropTypes.string
};

export default ListGroup;
