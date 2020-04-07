import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import NavItem from './NavItem';
import NavLink from './NavLink';

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

const NavDropdown = React.forwardRef(
  (
    {
      id,
      title,
      children,
      bsPrefix,
      rootCloseEvent,
      menuRole,
      disabled,
      active,
      renderMenuOnMount,
      ...props
    },
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
        renderOnMount={renderMenuOnMount}
        rootCloseEvent={rootCloseEvent}
      >
        {children}
      </Dropdown.Menu>
    </Dropdown>
  ),
);

NavDropdown.displayName = 'NavDropdown';
NavDropdown.propTypes = propTypes;
NavDropdown.Item = Dropdown.Item;
NavDropdown.Divider = Dropdown.Divider;
NavDropdown.Header = Dropdown.Header;

export default NavDropdown;
