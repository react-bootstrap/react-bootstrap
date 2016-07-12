import React from 'react';

import Dropdown from './Dropdown';
import splitComponentProps from './utils/splitComponentProps';

const propTypes = {
  ...Dropdown.propTypes,

  // Toggle props.
  title: React.PropTypes.node.isRequired,
  noCaret: React.PropTypes.bool,

  // Override generated docs from <Dropdown>.
  children: React.PropTypes.node,
};

class NavDropdown extends React.Component {
  render() {
    const { title, className, style, children, ...props } = this.props;

    const [dropdownProps, toggleProps] =
      splitComponentProps(props, Dropdown.ControlledComponent);

    // Unlike for the other dropdowns, styling needs to go to the `<Dropdown>`
    // rather than the `<Dropdown.Toggle>`.

    return (
      <Dropdown
        {...dropdownProps}
        componentClass="li"
        className={className}
        style={style}
      >
        <Dropdown.Toggle
          {...toggleProps}
          useAnchor
        >
          {title}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

NavDropdown.propTypes = propTypes;

export default NavDropdown;
