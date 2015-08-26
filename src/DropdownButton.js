import React from 'react';
import BootstrapMixin from './BootstrapMixin';
import Dropdown from './Dropdown';
import NavDropdown from './NavDropdown';
import CustomPropTypes from './utils/CustomPropTypes';
import deprecationWarning from './utils/deprecationWarning';
import omit from 'lodash/object/omit';

class DropdownButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { title, navItem, ...props } = this.props;

    let toggleProps = omit(props, Dropdown.ControlledComponent.propTypes);

    if (navItem){
      return <NavDropdown {...this.props}/>;
    }

    return (
      <Dropdown {...props}>
        <Dropdown.Toggle {...toggleProps}>
          {title}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {this.props.children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

DropdownButton.propTypes = {
  /**
   * When used with the `title` prop, the noCaret option will not render a caret icon, in the toggle element.
   */
  noCaret: React.PropTypes.bool,

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
  title: React.PropTypes.node.isRequired,
  ...Dropdown.propTypes,
  ...BootstrapMixin.propTypes
};

DropdownButton.defaultProps = {
  pullRight: false,
  dropup: false,
  navItem: false,
  noCaret: false
};

export default DropdownButton;
