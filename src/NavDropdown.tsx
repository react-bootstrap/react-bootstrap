import React from 'react';
import PropTypes from 'prop-types';

import Dropdown, { DropdownProps } from './Dropdown';
import {
  alignPropType as DropdownMenuAlignPropType,
  AlignType as DropdownMenuAlignType,
} from './DropdownMenu';
import NavItem from './NavItem';
import NavLink from './NavLink';
import { BsPrefixRefForwardingComponent } from './helpers';

export interface NavDropdownProps
  extends DropdownProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'> {
  id: string;
  title: React.ReactNode;
  disabled?: boolean;
  active?: boolean;
  menuAlign?: DropdownMenuAlignType;
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

  /**
   * Aligns the dropdown menu to the specified side of the container. You can also align
   * the menu responsively for breakpoints starting at `sm` and up. The alignment
   * direction will affect the specified breakpoint or larger.
   *
   * *Note: Using responsive alignment will disable Popper usage for positioning.*
   *
   * @type {"left"|"right"|{ sm: "left"|"right" }|{ md: "left"|"right" }|{ lg: "left"|"right" }|{ xl: "left"|"right"} }
   */
  menuAlign: DropdownMenuAlignPropType,

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

const defaultProps: Partial<NavDropdownProps> = {
  menuAlign: 'left',
};

const NavDropdown: NavDropdown = (React.forwardRef(
  (
    {
      id,
      title,
      children,
      bsPrefix,
      rootCloseEvent,
      menuRole,
      menuAlign,
      disabled,
      active,
      renderMenuOnMount,
      ...props
    }: NavDropdownProps,
    ref,
  ) => (
    <Dropdown ref={ref} {...props} as={NavItem}>
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
        align={menuAlign}
        renderOnMount={renderMenuOnMount}
        rootCloseEvent={rootCloseEvent}
      >
        {children}
      </Dropdown.Menu>
    </Dropdown>
  ),
) as unknown) as NavDropdown;

NavDropdown.displayName = 'NavDropdown';
NavDropdown.propTypes = propTypes;
NavDropdown.defaultProps = defaultProps;
NavDropdown.Item = Dropdown.Item;
NavDropdown.ItemText = Dropdown.ItemText;
NavDropdown.Divider = Dropdown.Divider;
NavDropdown.Header = Dropdown.Header;

export default NavDropdown;
