import React, { cloneElement } from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import CustomPropTypes from './utils/CustomPropTypes';
import DropdownBase, { singleMenuValidation, menuWithMenuItemSiblings } from './DropdownBase';
import MenuItem from './MenuItem';
import SplitToggle from './SplitToggle';
import createChainedFunction from './utils/createChainedFunction';

class SplitButtonButton extends Button { }

export default class SplitButton extends DropdownBase {
  constructor(props) {
    super(props, SplitToggle);

    this.refineButton = this.refineButton.bind(this);

    this.childExtractors = [{
        key: 'button',
        matches: child => child.type === SplitButton.Button,
        refine: this.refineButton
      },
      ...this.childExtractors
    ];
  }

  render() {
    let {
      toggle,
      menu,
      button,
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
        {button}
        {toggle}
        {menu}
      </ButtonGroup>
    );
  }

  refineButton(button, children, open) {
    if (button === undefined) {
      return (
        <Button
          onClick={this.props.onClick}
          bsStyle={this.props.bsStyle}>
          {this.props.title}
        </Button>
      );
    }

    return cloneElement(button, {
      onClick: createChainedFunction(button.props.onClick, this.props.onClick)
    });
  }
}

SplitButton.propTypes = {
  dropup: React.PropTypes.bool,
  ...DropdownBase.propTypes,
  ...BootstrapMixin.propTypes,

  title: React.PropTypes.string,

  children: CustomPropTypes.all([
    singleMenuValidation(DropdownBase.Toggle, MenuItem, SplitButtonButton),
    menuWithMenuItemSiblings(DropdownBase.Toggle, SplitButtonButton, SplitToggle)
  ])
};

SplitButton.Toggle = SplitToggle;
SplitButton.Button = SplitButtonButton;
