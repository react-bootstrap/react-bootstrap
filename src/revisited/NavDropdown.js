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
    let { toggle, menu } = this.extractChildren();

    const rootClasses = {
      dropdown: !this.props.dropup,
      dropup: this.props.dropup,
      open: this.state.open
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
