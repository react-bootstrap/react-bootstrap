import classNames from 'classnames';
import React, { cloneElement } from 'react';
import elementType from 'prop-types-extra/lib/elementType';

import ListGroupItem from './ListGroupItem';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

const propTypes = {
  /**
   * You can use a custom element type for this component.
   *
   * If not specified, it will be treated as `'li'` if every child is a
   * non-actionable `<ListGroupItem>`, and `'div'` otherwise.
   */
  componentClass: elementType
};

function getDefaultComponent(children) {
  if (!children) {
    // FIXME: This is the old behavior. Is this right?
    return 'div';
  }

  if (
    ValidComponentChildren.some(
      children,
      child =>
        child.type !== ListGroupItem || child.props.href || child.props.onClick
    )
  ) {
    return 'div';
  }

  return 'ul';
}

class ListGroup extends React.Component {
  render() {
    const {
      children,
      componentClass: Component = getDefaultComponent(children),
      className,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    const useListItem =
      Component === 'ul' &&
      ValidComponentChildren.every(
        children,
        child => child.type === ListGroupItem
      );

    return (
      <Component {...elementProps} className={classNames(className, classes)}>
        {useListItem
          ? ValidComponentChildren.map(children, child =>
              cloneElement(child, { listItem: true })
            )
          : children}
      </Component>
    );
  }
}

ListGroup.propTypes = propTypes;

export default bsClass('list-group', ListGroup);
