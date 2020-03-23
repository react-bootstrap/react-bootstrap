import classNames from 'classnames';
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import AbstractNavItem from './AbstractNavItem';
import { makeEventKey } from './SelectableContext';
import { useBootstrapPrefix } from './ThemeProvider';

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

  eventKey: PropTypes.string,

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
  variant: null,
  active: false,
  disabled: false,
};

const ListGroupItem = React.forwardRef(
  (
    {
      bsPrefix,
      active,
      disabled,
      className,
      variant,
      action,
      as,
      eventKey,
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

        if (onClick) onClick(event);
      },
      [disabled, onClick],
    );

    return (
      <AbstractNavItem
        ref={ref}
        {...props}
        eventKey={makeEventKey(eventKey, props.href)}
        // eslint-disable-next-line
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
