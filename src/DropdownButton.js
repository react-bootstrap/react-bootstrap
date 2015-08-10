/* eslint react/prop-types: [2, {ignore: "bsSize"}] */
/* BootstrapMixin contains `bsSize` type validation */

import React, { cloneElement } from 'react';
import classNames from 'classnames';

import createChainedFunction from './utils/createChainedFunction';
import BootstrapMixin from './BootstrapMixin';
import DropdownStateMixin from './DropdownStateMixin';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import DropdownMenu from './DropdownMenu';
import ValidComponentChildren from './utils/ValidComponentChildren';

const DropdownButton = React.createClass({
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight: React.PropTypes.bool,
    dropup:    React.PropTypes.bool,
    title:     React.PropTypes.node,
    href:      React.PropTypes.string,
    id:        React.PropTypes.string,
    onClick:   React.PropTypes.func,
    onSelect:  React.PropTypes.func,
    navItem:   React.PropTypes.bool,
    noCaret:   React.PropTypes.bool,
    buttonClassName: React.PropTypes.string,
    className: React.PropTypes.string,
    children:  React.PropTypes.node,
    disabled:  React.PropTypes.bool
  },

  render() {
    let renderMethod = this.props.navItem ?
      'renderNavItem' : 'renderButtonGroup';

    let caret = this.props.noCaret ?
        null : (<span className="caret" />);

    return this[renderMethod]([
      <Button
        {...this.props}
        ref="dropdownButton"
        className={classNames('dropdown-toggle', this.props.buttonClassName)}
        onClick={createChainedFunction(this.props.onClick, this.handleDropdownClick)}
        key={0}
        navDropdown={this.props.navItem}
        navItem={null}
        title={null}
        pullRight={null}
        dropup={null}>
        {this.props.title}{' '}
        {caret}
      </Button>,
      <DropdownMenu
        ref="menu"
        aria-labelledby={this.props.id}
        pullRight={this.props.pullRight}
        key={1}>
        {ValidComponentChildren.map(this.props.children, this.renderMenuItem)}
      </DropdownMenu>
    ]);
  },

  renderButtonGroup(children) {
    let groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      <ButtonGroup
        bsSize={this.props.bsSize}
        className={classNames(this.props.className, groupClasses)}>
        {children}
      </ButtonGroup>
    );
  },

  renderNavItem(children) {
    let classes = {
        'dropdown': true,
        'open': this.state.open,
        'dropup': this.props.dropup,
        'disabled': this.props.disabled
      };

    return (
      <li className={classNames(this.props.className, classes)}>
        {children}
      </li>
    );
  },

  renderMenuItem(child, index) {
    // Only handle the option selection if an onSelect prop has been set on the
    // component or it's child, this allows a user not to pass an onSelect
    // handler and have the browser preform the default action.
    let handleOptionSelect = this.props.onSelect || child.props.onSelect ?
      this.handleOptionSelect : null;

    return cloneElement(
      child,
      {
        // Capture onSelect events
        onSelect: createChainedFunction(child.props.onSelect, handleOptionSelect),
        key: child.key ? child.key : index
      }
    );
  },

  handleDropdownClick(e) {
    e.preventDefault();

    if (!this.props.disabled) {
      this.setDropdownState(!this.state.open);
    }
  },

  handleOptionSelect(key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

export default DropdownButton;
