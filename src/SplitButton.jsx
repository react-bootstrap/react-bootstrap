/** @jsx React.DOM */

import React              from './react-es6';
import classSet           from './react-es6/lib/cx';
import BootstrapMixin     from './BootstrapMixin';
import DropdownStateMixin from './DropdownStateMixin';
import Button             from './Button';
import ButtonGroup        from './ButtonGroup';
import DropdownMenu       from './DropdownMenu';

var SplitButton = React.createClass({
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight:     React.PropTypes.bool,
    title:         React.PropTypes.renderable,
    href:          React.PropTypes.string,
    dropdownTitle: React.PropTypes.renderable,
    onClick:       React.PropTypes.func,
    onSelect:      React.PropTypes.func
  },

  getDefaultProps: function () {
    return {
      dropdownTitle: 'Toggle dropdown'
    };
  },

  render: function () {
    var groupClasses = {
        'open': this.state.open,
        'dropup': this.props.dropup
      };

    return (
      <ButtonGroup
        bsSize={this.props.bsSize}
        className={classSet(groupClasses)}
        id={this.props.id}>
        <Button
          ref="button"
          href={this.props.href}
          bsStyle={this.props.bsStyle}
          onClick={this.handleButtonClick}>
          {this.props.title}
        </Button>

        <Button
          ref="dropdownButton"
          bsStyle={this.props.bsStyle}
          className="dropdown-toggle"
          onClick={this.handleDropdownClick}>
          <span className="sr-only">{this.props.dropdownTitle}</span>
          <span className="caret" />
        </Button>

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

  handleButtonClick: function (e) {
    if (this.state.open) {
      this.setDropdownState(false);
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
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

export default = SplitButton;