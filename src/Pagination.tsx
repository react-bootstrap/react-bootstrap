import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';
import PageItem, { Ellipsis, First, Last, Next, Prev } from './PageItem';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface PaginationProps extends BsPrefixPropsWithChildren {
  size?: 'sm' | 'lg';
}

type Pagination = BsPrefixRefForwardingComponent<'ul', PaginationProps> & {
  First: typeof First;
  Prev: typeof Prev;
  Ellipsis: typeof Ellipsis;
  Item: typeof PageItem;
  Next: typeof Next;
  Last: typeof Last;
};

const propTypes = {
  /**
   * @default 'pagination'
   * */
  bsPrefix: PropTypes.string,

  /**
   * Set's the size of all PageItems.
   *
   * @type {('sm'|'lg')}
   */
  size: PropTypes.string,
};

/**
 * @property {PageItem} Item
 * @property {PageItem} First
 * @property {PageItem} Prev
 * @property {PageItem} Ellipsis
 * @property {PageItem} Next
 * @property {PageItem} Last
 */
const Pagination: Pagination = (React.forwardRef<
  HTMLUListElement,
  PaginationProps
>(({ bsPrefix, className, children, size, ...props }: PaginationProps, ref) => {
  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'pagination');
  return (
    <ul
      ref={ref}
      {...props}
      className={classNames(
        className,
        decoratedBsPrefix,
        size && `${decoratedBsPrefix}-${size}`,
      )}
    >
      {children}
    </ul>
  );
}) as unknown) as Pagination;

Pagination.propTypes = propTypes;

Pagination.First = First;
Pagination.Prev = Prev;
Pagination.Ellipsis = Ellipsis;
Pagination.Item = PageItem;
Pagination.Next = Next;
Pagination.Last = Last;

export default Pagination;
