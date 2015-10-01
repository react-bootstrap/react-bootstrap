import React, { cloneElement } from 'react';
import ListGroupItem from './ListGroupItem';
import classNames from 'classnames';
import ValidComponentChildren from './utils/ValidComponentChildren';

class ListGroup extends React.Component {
  render() {
    let items = ValidComponentChildren.map(
      this.props.children,
      (item, index) => cloneElement(item, { key: item.key ? item.key : index })
    );

    if (this.areCustomChildren(items)) {
      let Component = this.props.componentClass;
      return (
        <Component
          {...this.props}
          className={classNames(this.props.className, 'list-group')}>
          {items}
        </Component>
      );
    }

    let shouldRenderDiv = false;

    if (!this.props.children) {
      shouldRenderDiv = true;
    } else {
      ValidComponentChildren.forEach(this.props.children, (child) => {
        if (this.isAnchorOrButton(child.props)) {
          shouldRenderDiv = true;
        }
      });
    }

    return shouldRenderDiv ? this.renderDiv(items) : this.renderUL(items);
  }

  isAnchorOrButton(props) {
    return (props.href || props.onClick);
  }

  areCustomChildren(children) {
    let customChildren = false;

    ValidComponentChildren.forEach(children, (child) => {
      if (child.type !== ListGroupItem) {
        customChildren = true;
      }
    }, this);

    return customChildren;
  }

  renderUL(items) {
    let listItems = ValidComponentChildren.map(items,
      (item) => cloneElement(item, { listItem: true })
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

ListGroup.defaultProps = {
  componentClass: 'div'
};

ListGroup.propTypes = {
  className: React.PropTypes.string,
  /**
   * The element for ListGroup if children are
   * user-defined custom components.
   * @type {("ul"|"div")}
   */
  componentClass: React.PropTypes.oneOf(['ul', 'div']),
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};

export default ListGroup;
