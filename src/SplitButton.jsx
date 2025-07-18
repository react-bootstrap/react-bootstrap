import React from 'react';
import PropTypes from 'prop-types';

import Button from './Button';
import Dropdown from './Dropdown';
import SplitToggle from './SplitToggle';
import splitComponentProps from './utils/splitComponentProps';

const propTypes = {
  ...Dropdown.propTypes,

  // Toggle props.
  bsStyle: PropTypes.string,
  bsSize: PropTypes.string,
  href: PropTypes.string,
  onClick: PropTypes.func,
  /**
   * The content of the split button.
   */
  title: PropTypes.node.isRequired,
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: PropTypes.string,

  // Override generated docs from <Dropdown>.
  /**
   * @private
   */
  children: PropTypes.node
};

class SplitButton extends React.Component {
  render() {
    const {
      bsSize,
      bsStyle,
      title,
      toggleLabel,
      children,
      ...props
    } = this.props;

    const [dropdownProps, buttonProps] = splitComponentProps(
      props,
      Dropdown.ControlledComponent
    );

    return (
      <Dropdown {...dropdownProps} bsSize={bsSize} bsStyle={bsStyle}>
        <Button
          {...buttonProps}
          disabled={props.disabled}
          bsSize={bsSize}
          bsStyle={bsStyle}
        >
          {title}
        </Button>
        <SplitToggle
          aria-label={toggleLabel || title}
          bsSize={bsSize}
          bsStyle={bsStyle}
        />

        <Dropdown.Menu>{children}</Dropdown.Menu>
      </Dropdown>
    );
  }
}

SplitButton.propTypes = propTypes;

SplitButton.Toggle = SplitToggle;

export default SplitButton;
