import React from 'react';
import classNames from 'classnames';
import uncontrollable from 'uncontrollable';
import BootstrapMixin from './BootstrapMixin';
import ButtonGroup from './ButtonGroup';
import DropdownBase from './DropdownBase';
import DropdownToggle from './DropdownToggle';
import DropdownMenu from './DropdownMenu';
import NavDropdown from './NavDropdown';
import CustomPropTypes from './utils/CustomPropTypes';
import deprecationWarning from './utils/deprecationWarning';

class DropdownButton extends DropdownBase {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.navItem) {
      return <NavDropdown {...this.props} />;
    }

    let {
      toggle,
      menu,
      open
    } = this.extractChildren();

    const rootClasses = {
      open,
      dropdown: !this.props.dropup,
      dropup: this.props.dropup
    };

    return (
      <ButtonGroup
        bsSize={this.props.bsSize}
        className={classNames(this.props.className, rootClasses)}>
        {toggle}
        {menu}
      </ButtonGroup>
    );
  }
}

DropdownButton.propTypes = {
  /**
   * Specify whether this Dropdown is part of a Nav component
   *
   * @type {bool}
   * @deprecated Use the `NavDropdown` instead.
   */
  navItem: CustomPropTypes.all([
    React.PropTypes.bool,
    function(props, propName, componentName) {
      if (props.navItem) {
        deprecationWarning('navItem', 'NavDropdown component', 'https://github.com/react-bootstrap/react-bootstrap/issues/526');
      }
    }
  ]),
  dropup: React.PropTypes.bool,
  ...DropdownBase.propTypes,
  ...BootstrapMixin.propTypes
};

let UncontrolledDropdown = uncontrollable(DropdownButton, { open: 'onToggle' })

UncontrolledDropdown.Toggle = DropdownToggle;
UncontrolledDropdown.Menu = DropdownMenu;

export default UncontrolledDropdown
