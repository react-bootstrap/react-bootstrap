var React = require('react');
var joinClasses = require('./utils/joinClasses');
var classSet = require('./utils/classSet');
var BootstrapMixin = require('./BootstrapMixin');
var DropdownStateMixin = require('./DropdownStateMixin');
var Button = require('./Button');
var ButtonGroup = require('./ButtonGroup');
var DropdownMenu = require('./DropdownMenu');

var SplitButton = React.createClass({
  mixins: [BootstrapMixin, DropdownStateMixin],

  propTypes: {
    pullRight:     React.PropTypes.bool,
    title:         React.PropTypes.node,
    href:          React.PropTypes.string,
    target:        React.PropTypes.string,
    dropdownTitle: React.PropTypes.node,
    onClick:       React.PropTypes.func,
    onSelect:      React.PropTypes.func,
    disabled:      React.PropTypes.bool
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

    var button = (
      <Button
        {...this.props}
        ref="button"
        onClick={this.handleButtonClick}
        title={null}
        id={null}>
        {this.props.title}
      </Button>
    );

    var dropdownButton = (
      <Button
        {...this.props}
        ref="dropdownButton"
        className={joinClasses(this.props.className, 'dropdown-toggle')}
        onClick={this.handleDropdownClick}
        title={null}
        href={null}
        target={null}
        id={null}>
        <span className="sr-only">{this.props.dropdownTitle}</span>
        <span className="caret" />
      </Button>
    );

    return (
      <ButtonGroup
        bsSize={this.props.bsSize}
        className={classSet(groupClasses)}
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

  handleButtonClick: function (e) {
    if (this.state.open) {
      this.setDropdownState(false);
    }

    if (this.props.onClick) {
      this.props.onClick(e, this.props.href, this.props.target);
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

module.exports = SplitButton;
