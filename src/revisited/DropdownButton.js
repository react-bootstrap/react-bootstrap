import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from '../BootstrapMixin';
import ButtonGroup from '../ButtonGroup';
import DropdownBase from './DropdownBase';
import DropdownToggle from './DropdownToggle';
import NavDropdown from './NavDropdown';
import CustomPropTypes from '../utils/CustomPropTypes';
import deprecationWarning from '../utils/deprecationWarning';

export default class DropdownButton extends DropdownBase {
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

DropdownButton.Toggle = DropdownToggle;
