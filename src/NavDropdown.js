import React from 'react';
import Dropdown from './Dropdown';

class NavDropdown extends React.Component {

  render() {
    let { children, title, noCaret, bsStyle, ...props } = this.props;

    return (
      <Dropdown {...props} componentClass='li'>
        <Dropdown.Toggle
          useAnchor
          bsStyle={bsStyle}
          disabled={props.disabled}
          noCaret={noCaret}
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

NavDropdown.propTypes = {
  title: React.PropTypes.node.isRequired,
  ...Dropdown.propTypes
};

export default NavDropdown;
