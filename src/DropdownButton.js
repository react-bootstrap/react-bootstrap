import React from 'react';
import Dropdown from './Dropdown';
import omit from 'lodash-compat/object/omit';
import pick from 'lodash-compat/object/pick';
import Button from './Button';

class DropdownButton extends React.Component {

  render() {
    let { bsStyle, bsSize, disabled } = this.props;
    let { title, children, ...props } = this.props;

    let dropdownProps = pick(props, Object.keys(Dropdown.ControlledComponent.propTypes));
    let toggleProps = omit(props, Object.keys(Dropdown.ControlledComponent.propTypes));

    return (
      <Dropdown {...dropdownProps}
        bsSize={bsSize}
        bsStyle={bsStyle}
      >
        <Dropdown.Toggle
          {...toggleProps}
          disabled={disabled}
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

DropdownButton.propTypes = {
  disabled: React.PropTypes.bool,
  bsStyle: Button.propTypes.bsStyle,
  bsSize: Button.propTypes.bsSize,

  /**
   * When used with the `title` prop, the noCaret option will not render a caret icon, in the toggle element.
   */
  noCaret: React.PropTypes.bool,
  title: React.PropTypes.node.isRequired,

  ...Dropdown.propTypes,
};

DropdownButton.defaultProps = {
  disabled: false,
  pullRight: false,
  dropup: false,
  navItem: false,
  noCaret: false
};

export default DropdownButton;
