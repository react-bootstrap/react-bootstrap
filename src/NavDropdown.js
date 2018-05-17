import React from 'react';
import PropTypes from 'prop-types';

import Dropdown from './Dropdown';
import NavItem from './NavItem';
import NavLink from './NavLink';

const propTypes = {
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

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#menu-props) for more details_
   */
  rootCloseEvent: PropTypes.string,

  /** @ignore */
  bsPrefix: PropTypes.string
};

class NavDropdown extends React.Component {
  render() {
    const {
      title,
      children,
      bsPrefix,
      rootCloseEvent,
      menuRole,
      disabled,
      active,
      ...props
    } = this.props;

    return (
      <Dropdown {...props} as={NavItem}>
        <Dropdown.Toggle
          eventKey={null}
          active={active}
          disabled={disabled}
          childBsPrefix={bsPrefix}
          as={NavLink}
        >
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu role={menuRole} rootCloseEvent={rootCloseEvent}>
          {children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

NavDropdown.propTypes = propTypes;
NavDropdown.Item = Dropdown.Item;

export default NavDropdown;
