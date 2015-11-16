import React from 'react';
import Button from './Button';
import Dropdown from './Dropdown';
import SplitToggle from './SplitToggle';
import omit from 'lodash-compat/object/omit';
import pick from 'lodash-compat/object/pick';

class SplitButton extends React.Component {

  render() {
    let {
      children,
      title,
      onClick,
      target,
      href,
      bsSize,
      bsStyle,
      ...props } = this.props;

    let { disabled } = props;

    let dropdownProps = pick(props, Object.keys(Dropdown.ControlledComponent.propTypes));
    let buttonProps = omit(props, Object.keys(Dropdown.ControlledComponent.propTypes));

    return (
      <Dropdown {...dropdownProps}>
        <Button
          {...buttonProps}
          onClick={onClick}
          bsStyle={bsStyle}
          bsSize={bsSize}
          disabled={disabled}
          target={target}
          href={href}
        >
          {title}
        </Button>
        <SplitToggle
          aria-label={title}
          bsStyle={bsStyle}
          bsSize={bsSize}
          disabled={disabled}
        />
        <Dropdown.Menu>
          {children}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

SplitButton.propTypes = {
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
  title: React.PropTypes.node.isRequired
};

SplitButton.defaultProps = {
  disabled: false,
  dropup: false,
  pullRight: false
};

SplitButton.Toggle = SplitToggle;

export default SplitButton;
