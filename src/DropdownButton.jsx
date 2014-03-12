/** @jsx React.DOM */
/* global document */

import React              from './react-es6';
import classSet           from './react-es6/lib/cx';
import BootstrapMixin     from './BootstrapMixin';
import DropdownStateMixin from './DropdownStateMixin';
import utils              from './utils';
import Button             from './Button';
import ButtonGroup        from './ButtonGroup';
import DropdownMenu       from './DropdownMenu';


var DropdownButton = React.createClass({
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    right:    React.PropTypes.bool,
    title:    React.PropTypes.string,
    href:     React.PropTypes.string,
    onClick:  React.PropTypes.func,
    onSelect: React.PropTypes.func
  },

  render: function () {
    var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      <ButtonGroup
        bsSize={this.props.bsSize}
        className={classSet(groupClasses)}>
        <Button
          ref="dropdownButton"
          href={this.props.href}
          bsStyle={this.props.bsStyle}
          className="dropdown-toggle"
          onClick={this.handleOpenClick}>
          {this.props.title + ' '}
          <span className="caret" />
        </Button>

        <DropdownMenu
          ref="menu"
          aria-labelledby={this.props.id}
          onSelect={this.handleOptionSelect}
          right={this.props.right}>
          {this.props.children}
        </DropdownMenu>
      </ButtonGroup>
    );
  },

  handleOpenClick: function () {
    this.setDropdownState(true);
  },

  handleOptionSelect: function (key) {
    if (this.props.onSelect) {
      this.props.onSelect(key);
    }

    this.setDropdownState(false);
  }
});

export default = DropdownButton;