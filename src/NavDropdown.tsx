import clsx from 'clsx';
import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';
import Dropdown from './Dropdown.js';
import type { DropdownMenuVariant } from './DropdownMenu.js';
import NavLink from './NavLink.js';
import type { BsDropdownProps } from './types.js';

export interface NavDropdownProps
  extends
    BsDropdownProps,
    Omit<
      React.HTMLAttributes<HTMLElement>,
      'onSelect' | 'children' | 'onToggle' | 'title'
    > {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   */
  id?: string | undefined;

  /**
   * The content of the non-toggle Button.
   */
  title: React.ReactNode;

  /**
   * Disables the toggle NavLink
   */
  disabled?: boolean | undefined;

  /**
   * Style the toggle NavLink as active
   */
  active?: boolean | undefined;

  /**
   * An ARIA accessible role applied to the Menu component.
   */
  menuRole?: string | undefined;

  /**
   * Whether to render the dropdown menu in the DOM before the first time it is shown
   */
  renderMenuOnMount?: boolean | undefined;

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent?: 'click' | 'mousedown' | undefined;

  /**
   * Menu color variant.
   *
   * Omitting this will use the default light color.
   */
  menuVariant?: DropdownMenuVariant | undefined;
}

const NavDropdown: DynamicRefForwardingComponent<'div', NavDropdownProps> =
  React.forwardRef(
    (
      {
        id,
        title,
        children,
        bsPrefix,
        className,
        rootCloseEvent,
        menuRole,
        disabled,
        active,
        renderMenuOnMount,
        menuVariant,
        ...props
      }: NavDropdownProps,
      ref,
    ) => {
      /* NavItem has no additional logic, it's purely presentational. Can set nav item class here to support "as" */
      const navItemPrefix = useBootstrapPrefix(undefined, 'nav-item');

      return (
        <Dropdown
          ref={ref}
          {...props}
          className={clsx(className, navItemPrefix)}
        >
          <Dropdown.Toggle
            id={id}
            eventKey={null}
            active={active}
            disabled={disabled}
            childBsPrefix={bsPrefix}
            as={NavLink}
          >
            {title}
          </Dropdown.Toggle>

          <Dropdown.Menu
            role={menuRole}
            renderOnMount={renderMenuOnMount}
            rootCloseEvent={rootCloseEvent}
            variant={menuVariant}
          >
            {children}
          </Dropdown.Menu>
        </Dropdown>
      );
    },
  );

NavDropdown.displayName = 'NavDropdown';

export default Object.assign(NavDropdown, {
  Item: Dropdown.Item,
  ItemText: Dropdown.ItemText,
  Divider: Dropdown.Divider,
  Header: Dropdown.Header,
});
