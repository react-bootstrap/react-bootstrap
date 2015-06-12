import React from 'react';
import classNames from 'classnames';
import DropdownBase from './DropdownBase';
import DropdownToggle from './DropdownToggle';

export default class NavDropdown extends DropdownBase {
  constructor(props) {
    super(props);

    this.useAnchor = true;
  }

  render() {
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
      <li className={classNames(this.props.className, rootClasses)}>
        {toggle}
        {menu}
      </li>
    );
  }
}

NavDropdown.propTypes = {
  dropup: React.PropTypes.bool,
  ...DropdownBase.propTypes
};

NavDropdown.Toggle = DropdownToggle;
