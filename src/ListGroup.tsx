import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import { useUncontrolled } from 'uncontrollable';
import BaseNav, { NavProps as BaseNavProps } from '@restart/ui/Nav';
import { EventKey } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';
import ListGroupItem from './ListGroupItem';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface ListGroupProps extends BsPrefixProps, BaseNavProps {
  variant?: 'flush' | string;
  horizontal?: boolean | string | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  defaultActiveKey?: EventKey;
  numbered?: boolean;
}

const propTypes = {
  /**
   * @default 'list-group'
   */
  bsPrefix: PropTypes.string,

  /**
   * Adds a variant to the list-group
   *
   * @type {('flush')}
   */
  variant: PropTypes.oneOf(['flush']),

  /**
   * Changes the flow of the list group items from vertical to horizontal.
   * A value of `null` (the default) sets it to vertical for all breakpoints;
   * Just including the prop sets it for all breakpoints, while `{sm|md|lg|xl|xxl}`
   * makes the list group horizontal starting at that breakpoint’s `min-width`.
   * @type {(true|'sm'|'md'|'lg'|'xl'|'xxl')}
   */
  horizontal: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),

  /**
   * Generate numbered list items.
   */
  numbered: PropTypes.bool,

  /**
   * You can use a custom element type for this component.
   */
  as: PropTypes.elementType,
};

const ListGroup: BsPrefixRefForwardingComponent<'div', ListGroupProps> =
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
        className={classNames(
          className,
          bsPrefix,
          variant && `${bsPrefix}-${variant}`,
          horizontalVariant && `${bsPrefix}-${horizontalVariant}`,
          numbered && `${bsPrefix}-numbered`,
        )}
      />
    );
  });

ListGroup.propTypes = propTypes;
ListGroup.displayName = 'ListGroup';

export default Object.assign(ListGroup, {
  Item: ListGroupItem,
});
