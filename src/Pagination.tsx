import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';
import PageItem, { Ellipsis, First, Last, Next, Prev } from './PageItem';
import { BsPrefixComponent } from './helpers';

export interface PaginationProps {
  size?: 'sm' | 'lg';
}

declare class Pagination extends BsPrefixComponent<'ul', PaginationProps> {
  static First: typeof First;
  static Prev: typeof Prev;
  static Ellipsis: typeof Ellipsis;
  static Item: typeof PageItem;
  static Next: typeof Next;
  static Last: typeof Last;
}

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
const Pagination = React.forwardRef(
  ({ bsPrefix, className, children, size, ...props }, ref) => {
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
  },
);

Pagination.propTypes = propTypes;

Pagination.First = First;
Pagination.Prev = Prev;
Pagination.Ellipsis = Ellipsis;
Pagination.Item = PageItem;
Pagination.Next = Next;
Pagination.Last = Last;

export default Pagination;
