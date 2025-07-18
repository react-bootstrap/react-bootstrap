import classNames from 'classnames';
import React from 'react';

import PaginationItem, {
  First,
  Prev,
  Ellipsis,
  Next,
  Last
} from './PaginationItem';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

class Pagination extends React.Component {
  render() {
    const { className, children, ...props } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <ul {...elementProps} className={classNames(className, classes)}>
        {children}
      </ul>
    );
  }
}

bsClass('pagination', Pagination);

Pagination.First = First;
Pagination.Prev = Prev;
Pagination.Ellipsis = Ellipsis;
Pagination.Item = PaginationItem;
Pagination.Next = Next;
Pagination.Last = Last;

export default Pagination;
