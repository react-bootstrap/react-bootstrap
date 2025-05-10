import classNames from 'classnames';
import * as React from 'react';
import { useDropdownItem } from '@restart/ui/DropdownItem';
import Anchor from '@restart/ui/Anchor';
import type {
  DynamicRefForwardingComponent,
  EventKey,
} from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface DropdownItemProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'dropdown-item'
   */
  bsPrefix?: string | undefined;

  /**
   * Highlight the menu item as active.
   */
  active?: boolean | undefined;

  /**
   * Disable the menu item, making it unselectable.
   */
  disabled?: boolean | undefined;

  /**
   * Value passed to the `onSelect` handler, useful for identifying the selected menu item.
   */
  eventKey?: EventKey | undefined;

  /**
   * HTML `href` attribute corresponding to `a.href`.
   */
  href?: string | undefined;
}

const DropdownItem: DynamicRefForwardingComponent<'a', DropdownItemProps> =
  React.forwardRef<HTMLElement, DropdownItemProps>(
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
  );

DropdownItem.displayName = 'DropdownItem';

export default DropdownItem;
