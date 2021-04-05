import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useContext } from 'react';
import useEventCallback from '@restart/hooks/useEventCallback';

import SelectableContext, { makeEventKey } from './SelectableContext';
import { useBootstrapPrefix } from './ThemeProvider';
import NavContext from './NavContext';
import SafeAnchor from './SafeAnchor';
import {
  BsPrefixProps,
  BsPrefixRefForwardingComponent,
  SelectCallback,
} from './helpers';
import { EventKey } from './types';

export interface DropdownItemProps
  extends BsPrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  active?: boolean;
  disabled?: boolean;
  eventKey?: EventKey;
  href?: string;
  onSelect?: SelectCallback;
}

const propTypes = {
  /** @default 'dropdown-item' */
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
  eventKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

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

const DropdownItem: BsPrefixRefForwardingComponent<
  typeof SafeAnchor,
  DropdownItemProps
> = React.forwardRef(
  (
    {
      bsPrefix,
      className,
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
    const key = makeEventKey(eventKey, href);

    const active =
      propActive == null && key != null
        ? makeEventKey(activeKey) === key
        : propActive;

    const handleClick = useEventCallback((event) => {
      // SafeAnchor handles the disabled case, but we handle it here
      // for other components
      if (disabled) return;
      onClick?.(event);
      onSelectCtx?.(key, event);
      onSelect?.(key, event);
    });

    return (
      // "TS2604: JSX element type 'Component' does not have any construct or call signatures."
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
      />
    );
  },
);

DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = propTypes;
DropdownItem.defaultProps = defaultProps;

export default DropdownItem;
