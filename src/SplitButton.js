/* eslint react/prop-types: [1, {ignore: ["children", "className", "bsSize"]}]*/
/* BootstrapMixin contains `bsSize` type validation */
import React from 'react';
import classNames from 'classnames';
import BootstrapMixin from './BootstrapMixin';
import DropdownStateMixin from './DropdownStateMixin';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import DropdownMenu from './DropdownMenu';

const SplitButton = React.createClass({
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight:     React.PropTypes.bool,
    title:         React.PropTypes.node,
    href:          React.PropTypes.string,
    id:            React.PropTypes.string,
    target:        React.PropTypes.string,
    dropdownTitle: React.PropTypes.node,
    dropup:        React.PropTypes.bool,
    onClick:       React.PropTypes.func,
    onSelect:      React.PropTypes.func,
    disabled:      React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      dropdownTitle: 'Toggle dropdown'
    };
  },

  render() {
    let groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    let button = (
      <Button
        {...this.props}
        ref="button"
        onClick={this.handleButtonClick}
        title={null}
        id={null}>
        {this.props.title}
      </Button>
    );

    let dropdownButton = (
      <Button
        {...this.props}
        ref="dropdownButton"
        className={classNames(this.props.className, 'dropdown-toggle')}
        onClick={this.handleDropdownClick}
        title={null}
        href={null}
        target={null}
        id={null}>
        <span className="sr-only">{this.props.dropdownTitle}</span>
        <span className="caret" />
        <span style={{letterSpacing: '-.3em'}}>&nbsp;</span>
      </Button>
    );

    return (
      <ButtonGroup
        bsSize={this.props.bsSize}
        className={classNames(groupClasses)}
        id={this.props.id}>
        {button}
        {dropdownButton}
        <DropdownMenu
          ref="menu"
          onSelect={this.handleOptionSelect}
          aria-labelledby={this.props.id}
          pullRight={this.props.pullRight}>
          {this.props.children}
        </DropdownMenu>
      </ButtonGroup>
    );
  },

  handleButtonClick(e) {
    if (this.state.open) {
      this.setDropdownState(false);
    }

    if (this.props.onClick) {
      this.props.onClick(e, this.props.href, this.props.target);
    }
  },

  handleDropdownClick(e) {
    e.preventDefault();

    this.setDropdownState(!this.state.open);
  },

  handleOptionSelect(key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

export default SplitButton;
