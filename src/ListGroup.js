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
    } else {
      React.Children.forEach(this.props.children, (child) => {
        if (this.isAnchor(child.props)) {
          childrenAnchors = true;
        }

      });

    }

    if (childrenAnchors){
      return this.renderDiv(items);
    } else {
      return this.renderUL(items);
    }
  }

  isAnchor(props){
    return (props.href || props.onClick);
  }

  renderUL(items) {
    let listItems = ValidComponentChildren.map(items,
      (item, index) => cloneElement(item, { listItem: true })
    );

    return (
      <ul
        {...this.props}
        className={classNames(this.props.className, 'list-group')}>
        {listItems}
      </ul>
    );
  }

  renderDiv(items) {
    return (
      <div
        {...this.props}
        className={classNames(this.props.className, 'list-group')}>
        {items}
      </div>
    );
  }
}

ListGroup.propTypes = {
  className: React.PropTypes.string,
  id: React.PropTypes.string
};

export default ListGroup;
