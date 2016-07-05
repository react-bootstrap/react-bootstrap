import omit from 'lodash-compat/object/omit';
import pick from 'lodash-compat/object/pick';
import React from 'react';

import Button from './Button';
import Dropdown from './Dropdown';
import SplitToggle from './SplitToggle';

const propTypes = {
  ...Dropdown.propTypes,
  bsStyle: Button.propTypes.bsStyle,

  /**
   * @private
   */
  onClick() {},
  target: React.PropTypes.string,
  href: React.PropTypes.string,
  /**
   * The content of the split button.
   */
  title: React.PropTypes.node.isRequired,
  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel: React.PropTypes.string
};

const defaultProps = {
  disabled: false,
  dropup: false,
  pullRight: false
};

class SplitButton extends React.Component {
  render() {
    const {
      children,
      title,
      onClick,
      target,
      href,
      toggleLabel,
      bsSize,
      bsStyle,
      ...props,
    } = this.props;

    const dropdownProps = pick(props, Object.keys(Dropdown.ControlledComponent.propTypes));
    const buttonProps = omit(props, Object.keys(Dropdown.ControlledComponent.propTypes));

    return (
      <Dropdown {...dropdownProps}>
        <Button
          {...buttonProps}
          onClick={onClick}
          bsStyle={bsStyle}
          bsSize={bsSize}
          disabled={props.disabled}
          target={target}
          href={href}
        >
          {title}
        </Button>
        <SplitToggle
          aria-label={toggleLabel || title}
          bsStyle={bsStyle}
          bsSize={bsSize}
          disabled={props.disabled}
        />

        <Dropdown.Menu>
          {children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

SplitButton.propTypes = propTypes;
SplitButton.defaultProps = defaultProps;

SplitButton.Toggle = SplitToggle;

export default SplitButton;
