import clsx from 'clsx';
import * as React from 'react';
import warning from 'warning';
import { useUncontrolled } from 'uncontrollable';
import BaseNav from '@restart/ui/Nav';
import type {
  DynamicRefForwardingComponent,
  EventKey,
} from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import ListGroupItem from './ListGroupItem';
import type { BaseNavProps } from './types';

export interface ListGroupProps extends BaseNavProps {
  /**
   * Element used to render the component.
   *
   * @default 'div'
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'list-group'
   */
  bsPrefix?: string | undefined;

  /**
   * Adds a variant to the list-group
   */
  variant?: 'flush' | string | undefined;

  /**
   * Changes the flow of the list group items from vertical to horizontal.
   * A value of `null` (the default) sets it to vertical for all breakpoints;
   * Just including the prop sets it for all breakpoints, while `{sm|md|lg|xl|xxl}`
   * makes the list group horizontal starting at that breakpoint’s `min-width`.
   */
  horizontal?: boolean | string | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | undefined;

  /**
   * The default active key of the list group.
   */
  defaultActiveKey?: EventKey | undefined;

  /**
   * Generate numbered list items.
   */
  numbered?: boolean | undefined;
}

const ListGroup: DynamicRefForwardingComponent<'div', ListGroupProps> =
  React.forwardRef<HTMLElement, ListGroupProps>((props, ref) => {
    const {
      className,
      bsPrefix: initialBsPrefix,
      variant,
      horizontal,
      numbered,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as = 'div',
      ...controlledProps
    } = useUncontrolled(props, {
      activeKey: 'onSelect',
    });

    const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'list-group');

    let horizontalVariant: string | undefined;
    if (horizontal) {
      horizontalVariant =
        horizontal === true ? 'horizontal' : `horizontal-${horizontal}`;
    }

    warning(
      !(horizontal && variant === 'flush'),
      '`variant="flush"` and `horizontal` should not be used together.',
    );

    return (
      <BaseNav
        ref={ref}
        {...controlledProps}
        as={as}
        className={clsx(
          className,
          bsPrefix,
          variant && `${bsPrefix}-${variant}`,
          horizontalVariant && `${bsPrefix}-${horizontalVariant}`,
          numbered && `${bsPrefix}-numbered`,
        )}
      />
    );
  });

ListGroup.displayName = 'ListGroup';

export default Object.assign(ListGroup, {
  Item: ListGroupItem,
});
