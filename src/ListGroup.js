import React, { cloneElement } from 'react';
import classNames from 'classnames';
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
    } else if (React.Children.count(this.props.children) === 1) {
      let child = this.props.children;

      childrenAnchors = child.props.href ? true : false;

    } else {

      childrenAnchors = Array.prototype.some.call(this.props.children, (child) => {
        return child.props.href;
      });

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
      <ul className={classNames(this.props.className, 'list-group')}>
        {listItems}
      </ul>
    );
  }

  renderDiv(items) {
    return (
      <div className={classNames(this.props.className, 'list-group')}>
        {items}
      </div>
    );
  }
}

ListGroup.propTypes = {
  className: React.PropTypes.string
};

export default ListGroup;
