import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import Dropdown, { DropdownProps } from './Dropdown';
import NavLink from './NavLink';
import { BsPrefixRefForwardingComponent } from './helpers';

export interface NavDropdownProps
  extends DropdownProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
  id: string;
  title: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  menuRole?: string;
  renderMenuOnMount?: boolean;
  rootCloseEvent?: 'click' | 'mousedown';
}

type NavDropdown = BsPrefixRefForwardingComponent<'div', NavDropdownProps> & {
  Item: typeof Dropdown.Item;
  ItemText: typeof Dropdown.ItemText;
  Divider: typeof Dropdown.Divider;
  Header: typeof Dropdown.Header;
};

const propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: PropTypes.any,

  /** An `onClick` handler passed to the Toggle component */
  onClick: PropTypes.func,

  /** The content of the non-toggle Button.  */
  title: PropTypes.node.isRequired,

  /** Disables the toggle NavLink  */
  disabled: PropTypes.bool,

  /** Style the toggle NavLink as active  */
  active: PropTypes.bool,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: PropTypes.string,

  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: PropTypes.bool,

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent: PropTypes.string,

  /** @ignore */
  bsPrefix: PropTypes.string,
};

const NavDropdown: NavDropdown = (React.forwardRef(
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
        className={classNames(className, navItemPrefix)}
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
        >
          {children}
        </Dropdown.Menu>
      </Dropdown>
    );
  },
) as unknown) as NavDropdown;

NavDropdown.displayName = 'NavDropdown';
NavDropdown.propTypes = propTypes;
NavDropdown.Item = Dropdown.Item;
NavDropdown.ItemText = Dropdown.ItemText;
NavDropdown.Divider = Dropdown.Divider;
NavDropdown.Header = Dropdown.Header;

export default NavDropdown;
