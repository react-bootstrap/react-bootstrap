/** @jsx React.DOM */

import React              from './react-es6';
import classSet           from './react-es6/lib/cx';
import BootstrapMixin     from './BootstrapMixin';
import DropdownStateMixin from './DropdownStateMixin';
import Button             from './Button';
import ButtonGroup        from './ButtonGroup';
import DropdownMenu       from './DropdownMenu';


var DropdownButton = React.createClass({
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight:    React.PropTypes.bool,
    title:    React.PropTypes.renderable,
    href:     React.PropTypes.string,
    onClick:  React.PropTypes.func,
    onSelect: React.PropTypes.func,
    navItem:  React.PropTypes.bool
  },

  render: function () {
    var className = this.props.className ?
      this.props.className + ' dropdown-toggle' : 'dropdown-toggle';

    var renderMethod = this.props.navItem ?
      'renderNavItem' : 'renderButtonGroup';

    return this[renderMethod]([
      <Button
        ref="dropdownButton"
        href={this.props.href}
        bsStyle={this.props.bsStyle}
        className={className}
        onClick={this.handleDropdownClick}
        id={this.props.id}
        key={0}
        navDropdown={this.props.navItem}>
        {this.props.title}{' '}
        <span className="caret" />
      </Button>,
      <DropdownMenu
        ref="menu"
        aria-labelledby={this.props.id}
        onSelect={this.handleOptionSelect}
        pullRight={this.props.pullRight}
        key={1}>
        {this.props.children}
      </DropdownMenu>
    ]);
  },

  renderButtonGroup: function (children) {
    var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      <ButtonGroup
        bsSize={this.props.bsSize}
        className={classSet(groupClasses)}>
        {children}
      </ButtonGroup>
    );
  },

  renderNavItem: function (children) {
    var classes = {
        'dropdown': true,
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      <li className={classSet(classes)}>
        {children}
      </li>
    );
  },

  handleDropdownClick: function (e) {
    e.preventDefault();

    this.setDropdownState(!this.state.open);
  },

  handleOptionSelect: function (key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

export default = DropdownButton;