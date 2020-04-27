import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import SelectableContext, { makeEventKey } from './SelectableContext';
import { useBootstrapPrefix } from './ThemeProvider';
import NavContext from './NavContext';
import SafeAnchor from './SafeAnchor';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
  SelectCallback,
} from './helpers';

export interface DropdownItemProps extends BsPrefixPropsWithChildren {
  active?: boolean;
  disabled?: boolean;
  eventKey?: string;
  href?: string;
  onClick?: React.MouseEventHandler<this>;
  onSelect?: SelectCallback;
}

type DropdownItem = BsPrefixRefForwardingComponent<'a', DropdownItemProps>;

const propTypes = {
  /** @default 'dropdown' */
  bsPrefix: PropTypes.string,

  /**
   * Highlight the menu item as active.
   */
  active: PropTypes.bool,

  /**
   * Disable the menu item, making it unselectable.
   */
  disabled: PropTypes.bool,

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey: PropTypes.any,

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href: PropTypes.string,

  /**
   * Callback fired when the menu item is clicked.
   */
  onClick: PropTypes.func,

  /**
   * Callback fired when the menu item is selected.
   *
   * ```js
   * (eventKey: any, event: Object) => any
   * ```
   */
  onSelect: PropTypes.func,

  as: PropTypes.elementType,
};

const defaultProps = {
  as: SafeAnchor,
  disabled: false,
};

const DropdownItem: DropdownItem = React.forwardRef(
  (
    {
      bsPrefix,
      className,
      children,
      eventKey,
      disabled,
      href,
      onClick,
      onSelect,
      active: propActive,
      as: Component,
      ...props
    }: DropdownItemProps,
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-item');
    const onSelectCtx = useContext(SelectableContext);
    const navContext = useContext(NavContext);

    const { activeKey } = navContext || {};
    const key = makeEventKey(eventKey || null, href);

    const active =
      propActive == null && key != null
        ? makeEventKey(activeKey) === key
        : propActive;

    const handleClick = useEventCallback((event) => {
      // SafeAnchor handles the disabled case, but we handle it here
      // for other components
      if (disabled) return;
      if (onClick) onClick(event);
      if (onSelectCtx) onSelectCtx(key, event);
      if (onSelect) onSelect(key, event);
    });

    return (
      // @ts-ignore
      <Component
        {...props}
        ref={ref}
        href={href}
        disabled={disabled}
        className={classNames(
          className,
          prefix,
          active && 'active',
          disabled && 'disabled',
        )}
        onClick={handleClick}
      >
        {children}
      </Component>
    );
  },
);

DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = propTypes;
DropdownItem.defaultProps = defaultProps;

export default DropdownItem;
