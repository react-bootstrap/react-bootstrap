import classNames from 'classnames';
import * as React from 'react';
import warning from 'warning';
import useEventCallback from '@restart/hooks/useEventCallback';
import { useNavItem } from '@restart/ui/NavItem';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { makeEventKey } from '@restart/ui/SelectableContext';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BaseNavItemProps, Variant } from './types';

export interface ListGroupItemProps extends BaseNavItemProps {
  /**
   * You can use a custom element type for this component. For none `action` items, items render as `li`.
   * For actions the default is an anchor or button element depending on whether a `href` is provided.
   *
   * @default 'div' | 'a' | 'button'
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'list-group-item'
   */
  bsPrefix?: string | undefined;

  /**
   * Marks a ListGroupItem as actionable, applying additional hover, active and disabled styles
   * for links and buttons.
   */
  action?: boolean | undefined;

  /**
   * A callback function for when this component is clicked.
   */
  onClick?: React.MouseEventHandler;

  /**
   * Sets contextual classes for list item.
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | undefined}
   */
  variant?: Variant | undefined;

  /**
   * Providing a `href` and setting `action` to `true`, it will render the ListGroup.Item as
   * an `<a>` element (unless `as` is provided).
   */
  href?: string | undefined;
}

const ListGroupItem: DynamicRefForwardingComponent<'a', ListGroupItemProps> =
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
  );

ListGroupItem.displayName = 'ListGroupItem';

export default ListGroupItem;
