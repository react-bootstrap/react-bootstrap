import classNames from 'classnames';
import React from 'react';

import Dropdown from './Dropdown';
import splitComponentProps from './utils/splitComponentProps';

const propTypes = {
  ...Dropdown.propTypes,

  // Toggle props.
  title: React.PropTypes.node.isRequired,
  noCaret: React.PropTypes.bool,
  active: React.PropTypes.bool,

  // Override generated docs from <Dropdown>.
  /**
   * @private
   */
  children: React.PropTypes.node,
};

class NavDropdown extends React.Component {
  render() {
    const { title, active, className, style, children, ...props } = this.props;

    delete props.eventKey;

    // These are injected down by `<Nav>` for building `<SubNav>`s.
    delete props.activeKey;
    delete props.activeHref;

    const [dropdownProps, toggleProps] =
      splitComponentProps(props, Dropdown.ControlledComponent);

    // Unlike for the other dropdowns, styling needs to go to the `<Dropdown>`
    // rather than the `<Dropdown.Toggle>`.

    return (
      <Dropdown
        {...dropdownProps}
        componentClass="li"
        className={classNames(className, { active })}
        style={style}
      >
        <Dropdown.Toggle {...toggleProps} useAnchor>
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
