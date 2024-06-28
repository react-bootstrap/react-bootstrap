import classNames from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';
import {
  useDropdownItem,
  DropdownItemProps as BaseDropdownItemProps,
} from '@restart/ui/DropdownItem';
import Anchor from '@restart/ui/Anchor';
import { useBootstrapPrefix } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface DropdownItemProps
  extends BaseDropdownItemProps,
    BsPrefixProps {}

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

  as: PropTypes.elementType,
};

const DropdownItem: BsPrefixRefForwardingComponent<'a', DropdownItemProps> =
  React.forwardRef(
    (
      {
        bsPrefix,
        className,
        eventKey,
        disabled = false,
        onClick,
        active,
        as: Component = Anchor,
        ...props
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-item');
      const [dropdownItemProps, meta] = useDropdownItem({
        key: eventKey,
        href: props.href,
        disabled,
        onClick,
        active,
      });

      return (
        <Component
          {...props}
          {...dropdownItemProps}
          ref={ref}
          className={classNames(
            className,
            prefix,
            meta.isActive && 'active',
            disabled && 'disabled',
          )}
        />
      );
    },
  ) as typeof DropdownItem;

DropdownItem.displayName = 'DropdownItem';
DropdownItem.propTypes = propTypes;

export default DropdownItem;
