import React from 'react';
import classNames from 'classnames';
import Dropdown from './Dropdown';

class NavDropdown extends React.Component {

  render() {
    let { children, title, noCaret, active, className, ...props } = this.props;
    const classes = classNames(className, { active });

    return (
      <Dropdown className={classes} {...props} componentClass="li">
        <Dropdown.Toggle
          useAnchor
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
  noCaret: React.PropTypes.bool,
  title: React.PropTypes.node.isRequired,
  active: React.PropTypes.bool,
  ...Dropdown.propTypes
};

export default NavDropdown;
