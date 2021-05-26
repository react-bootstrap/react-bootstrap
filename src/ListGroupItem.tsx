import classNames from 'classnames';
import * as React from 'react';
import { useCallback } from 'react';
import PropTypes from 'prop-types';

import AbstractNavItem from './AbstractNavItem';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { Variant, EventKey } from './types';

export interface ListGroupItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'>,
    BsPrefixProps {
  action?: boolean;
  active?: boolean;
  disabled?: boolean;
  eventKey?: EventKey;
  href?: string;
  onClick?: React.MouseEventHandler;
  variant?: Variant;
}

const propTypes = {
  /**
   * @default 'list-group-item'
   */
  bsPrefix: PropTypes.string,

  /**
   * Sets contextual classes for list item
   * @type {('primary'|'secondary'|'success'|'danger'|'warning'|'info'|'dark'|'light')}
   */
  variant: PropTypes.string,
  /**
   * Marks a ListGroupItem as actionable, applying additional hover, active and disabled styles
   * for links and buttons.
   */
  action: PropTypes.bool,
  /**
   * Sets list item as active
   */
  active: PropTypes.bool,

  /**
   * Sets list item state as disabled
   */
  disabled: PropTypes.bool,

  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  onClick: PropTypes.func,

  href: PropTypes.string,

  /**
   * You can use a custom element type for this component. For none `action` items, items render as `li`.
   * For actions the default is an achor or button element depending on whether a `href` is provided.
   *
   * @default {'div' | 'a' | 'button'}
   */
  as: PropTypes.elementType,
};

const defaultProps = {
  variant: undefined,
  active: false,
  disabled: false,
};

const ListGroupItem: BsPrefixRefForwardingComponent<'a', ListGroupItemProps> =
  React.forwardRef<HTMLElement, ListGroupItemProps>(
    (
      {
        bsPrefix,
        active,
        disabled,
        className,
        variant,
        action,
        as,
        onClick,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'list-group-item');

      const handleClick = useCallback(
        (event) => {
          if (disabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }

          onClick?.(event);
        },
        [disabled, onClick],
      );

      if (disabled && props.tabIndex === undefined) {
        props.tabIndex = -1;
        props['aria-disabled'] = true;
      }

      return (
        <AbstractNavItem
          ref={ref}
          {...props}
          // eslint-disable-next-line no-nested-ternary
          as={as || (action ? (props.href ? 'a' : 'button') : 'div')}
          onClick={handleClick}
          className={classNames(
            className,
            bsPrefix,
            active && 'active',
            disabled && 'disabled',
            variant && `${bsPrefix}-${variant}`,
            action && `${bsPrefix}-action`,
          )}
        />
      );
    },
  );

ListGroupItem.propTypes = propTypes;
ListGroupItem.defaultProps = defaultProps;
ListGroupItem.displayName = 'ListGroupItem';

export default ListGroupItem;
