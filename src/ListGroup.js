import React, { cloneElement } from 'react';
import classSet from 'classnames';
import ValidComponentChildren from './utils/ValidComponentChildren';

class ListGroup extends React.Component {
  render() {
    let items = ValidComponentChildren.map(
      this.props.children,
      (item, index) => cloneElement(item, { key: item.key ? item.key : index })
    );

    let childrenAnchors = false;

    if (!this.props.children) {
      return this.renderDiv(items);
    } else {

      if (Array.isArray(this.props.children)) {
        this.props.children.forEach((child) => {
          if (child.props.href) {
            childrenAnchors = true;
          }
        });
      } else {
        if (this.props.children.props.href) {
          childrenAnchors = true;
        }
      }
    }

    if (childrenAnchors){
      return this.renderDiv(items);
    } else {
      return this.renderUL(items);
    }
  }

  renderUL(items) {
    let listItems = ValidComponentChildren.map(items,
      (item, index) => cloneElement(item, { listItem: true })
    );

    return (
      <ul className={classSet(this.props.className, 'list-group')}>
        {listItems}
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
