import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import warning from 'warning';
import useEventCallback from '@restart/hooks/useEventCallback';
import {
  useNavItem,
  NavItemProps as BaseNavItemProps,
} from '@restart/ui/NavItem';
import { makeEventKey } from '@restart/ui/SelectableContext';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { Variant } from './types';

export interface ListGroupItemProps
  extends Omit<BaseNavItemProps, 'onSelect'>,
    BsPrefixProps {
  action?: boolean;
  onClick?: React.MouseEventHandler;
  variant?: Variant;
}

const propTypes = {
  /**
   * @default 'list-group-item'
   */
  bsPrefix: PropTypes.string,

  /**
   * Sets contextual classes for list item.
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  variant: PropTypes.string,
  /**
   * Marks a ListGroupItem as actionable, applying additional hover, active and disabled styles
   * for links and buttons.
   */
  action: PropTypes.bool,
  /**
   * Sets list item as active.
   */
  active: PropTypes.bool,

  /**
   * Sets list item state as disabled.
   */
  disabled: PropTypes.bool,

  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /** A callback function for when this component is clicked.  */
  onClick: PropTypes.func,

  /** Providing a `href` and setting `action` to `true`, it will render the ListGroup.Item as an `<a>` element (unless `as` is provided). */
  href: PropTypes.string,

  /**
   * You can use a custom element type for this component. For none `action` items, items render as `li`.
   * For actions the default is an anchor or button element depending on whether a `href` is provided.
   *
   * @default {'div' | 'a' | 'button'}
   */
  as: PropTypes.elementType,
};

const ListGroupItem: BsPrefixRefForwardingComponent<'a', ListGroupItemProps> =
  React.forwardRef<HTMLElement, ListGroupItemProps>(
    (
      {
        bsPrefix,
        active,
        disabled,
        eventKey,
        className,
        variant,
        action,
        as,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'list-group-item');
      const [navItemProps, meta] = useNavItem({
        key: makeEventKey(eventKey, props.href),
        active,
        ...props,
      });

      const handleClick = useEventCallback((event) => {
        if (disabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        navItemProps.onClick(event);
      });

      if (disabled && props.tabIndex === undefined) {
        props.tabIndex = -1;
        props['aria-disabled'] = true;
      }

      // eslint-disable-next-line no-nested-ternary
      const Component = as || (action ? (props.href ? 'a' : 'button') : 'div');

      warning(
        as || !(!action && props.href),
        '`action=false` and `href` should not be used together.',
      );

      return (
        <Component
          ref={ref}
          {...props}
          {...navItemProps}
          onClick={handleClick}
          className={classNames(
            className,
            bsPrefix,
            meta.isActive && 'active',
            disabled && 'disabled',
            variant && `${bsPrefix}-${variant}`,
            action && `${bsPrefix}-action`,
          )}
        />
      );
    },
  ) as typeof ListGroupItem;

ListGroupItem.propTypes = propTypes;
ListGroupItem.displayName = 'ListGroupItem';

export default ListGroupItem;
