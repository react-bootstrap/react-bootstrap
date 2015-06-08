import React from 'react';
import classNames from 'classnames';
import ButtonGroup from '../ButtonGroup';
import DropdownBase from './DropdownBase';
import DropdownToggle from './DropdownToggle';

export default class DropdownButton extends DropdownBase {
  constructor(props) {
    super(props);
  }

  render() {
    let { toggle, menu } = this.extractChildren();

    const rootClasses = {
      dropdown: !this.props.dropup,
      dropup: this.props.dropup,
      open: this.state.open
    };

    return (
      <ButtonGroup
        className={classNames(this.props.className, rootClasses)}>
        {toggle}
        {menu}
      </ButtonGroup>
    );
  }
}

DropdownButton.propTypes = {
  dropup: React.PropTypes.bool,
  ...DropdownBase.propTypes
};

DropdownButton.Toggle = DropdownToggle;
