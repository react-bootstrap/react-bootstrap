import React, { cloneElement } from 'react';
import classNames from 'classnames';
import ValidComponentChildren from './utils/ValidComponentChildren';

class ListGroup extends React.Component {
  render() {
    let items = ValidComponentChildren.map(
      this.props.children,
      (item, index) => cloneElement(item, { key: item.key ? item.key : index })
    );

    let shouldRenderDiv = false;

    if (!this.props.children) {
      shouldRenderDiv = true;
    } else {
      React.Children.forEach(this.props.children, (child) => {
        if (this.isAnchorOrButton(child.props)) {
          shouldRenderDiv = true;
        }
      });
    }

    if (shouldRenderDiv){
      return this.renderDiv(items);
    } else {
      return this.renderUL(items);
    }
  }

  isAnchorOrButton(props){
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
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

export default ListGroup;
