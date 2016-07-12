import React from 'react';

import Dropdown from './Dropdown';
import splitComponentProps from './utils/splitComponentProps';

const propTypes = {
  ...Dropdown.propTypes,

  // Toggle props.
  bsStyle: React.PropTypes.string,
  bsSize: React.PropTypes.string,
  title: React.PropTypes.node.isRequired,
  noCaret: React.PropTypes.bool,

  // Override generated docs from <Dropdown>.
  /**
   * @private
   */
  children: React.PropTypes.node,
};

class DropdownButton extends React.Component {
  render() {
    const { bsSize, bsStyle, title, children, ...props } = this.props;

    const [dropdownProps, toggleProps] =
      splitComponentProps(props, Dropdown.ControlledComponent);

    return (
      <Dropdown
        {...dropdownProps}
        bsSize={bsSize}
        bsStyle={bsStyle}
      >
        <Dropdown.Toggle
          {...toggleProps}
          bsSize={bsSize}
          bsStyle={bsStyle}
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

DropdownButton.propTypes = propTypes;

export default DropdownButton;
