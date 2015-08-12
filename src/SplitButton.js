import React, { cloneElement } from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import CustomPropTypes from './utils/CustomPropTypes';
import DropdownBase, { singleMenuValidation, menuWithMenuItemSiblings } from './DropdownBase';
import DropdownMenu from './DropdownMenu';
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
      let { target, href, bsStyle, onClick, disabled, title } = this.props;
      return (
        <Button
          onClick={onClick}
          bsStyle={bsStyle}
          disabled={disabled}
          target={target}
          href={href}
        >
          {title}
        </Button>
      );
    }

    return cloneElement(button, {
      onClick: createChainedFunction(button.props.onClick, this.props.onClick)
    });
  }
}

function titleRequired(props, propName, component) {
  let titles = [];

  if (props.children) {
    if (props.children instanceof Array) {
      titles = props.children.filter(child => child.type === SplitButton.Button);
    } else if(props.children.type === SplitButton.Button) {
      titles.push(props.children);
    }
  }

  if (titles.length > 1) {
    return new Error(`(title|children) ${component} - Should only use one ${component}.Button child component, only the first ${component}.Toggle will be used`);
  }

  let title = titles[0];

  if (props.title !== undefined && title !== undefined) {
    return new Error(`(title|children) ${component} - Must provide either a 'title' prop or a '${component}.Button' child, not both.`);
  }

  if (props.title === undefined && title === undefined) {
    return new Error(`(title|children) ${component} - Must provide either a 'title' prop or a '${component}.Button' child`);
  }
}

SplitButton.propTypes = {
  dropup: React.PropTypes.bool,
  ...DropdownBase.propTypes,
  ...BootstrapMixin.propTypes,

  title: titleRequired,

  children: CustomPropTypes.all([
    singleMenuValidation(DropdownBase.Toggle, MenuItem, SplitButtonButton),
    menuWithMenuItemSiblings(DropdownBase.Toggle, SplitButtonButton, SplitToggle)
  ])
};

SplitButton.Toggle = SplitToggle;
SplitButton.Button = SplitButtonButton;
SplitButton.Menu = DropdownMenu;
