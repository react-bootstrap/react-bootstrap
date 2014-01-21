/** @jsx React.DOM */

var React              = require('react/addons');
var Button             = require('./Button');
var BootstrapMixin     = require('./BootstrapMixin');
var utils              = require('./utils');


var DropdownButton = React.createClass({
  mixins: [BootstrapMixin],

  getInitialState: function () {
    return {
      open: false
    };
  },

  getDefaultProps: function () {
    return {
      options: [],
      bsClass: 'button',
      className: 'dropdown-toggle'
    }
  },

  toggle: function (open) {
    var newState = (open === undefined) ?
          !this.state.open : open;

    if (newState) {
      this.bindCloseHandlers();
    } else {
      this.unbindCloseHandlers();
    }

    this.setState({
      open: newState
    });
  },

  handleClick: function (e) {
    this.toggle();
  },

  handleOptionSelect: function (i) {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(i);
    }
  },

  handleKeyUp: function (e) {
    if (e.keyCode === 27) {
      this.toggle(false);
    }
  },

  handleClickOutside: function (e) {
    this.toggle(false);
  },

  bindCloseHandlers: function () {
    document.addEventListener('click', this.handleClickOutside);
    document.addEventListener('keyup', this.handleKeyUp);
  },

  unbindCloseHandlers: function () {
    document.removeEventListener('click', this.handleClickOutside);
    document.removeEventListener('keyup', this.handleKeyUp);
  },

  componentWillUnmount: function () {
    this.unbindCloseHandlers();
  },

  render: function () {
    var groupClassName = React.addons.classSet({
      'btn-group': true,
      'open': this.state.open
    });

    var className = this.extendClassName();

    var menuItems = [];

    this.props.children.forEach(function (child, i) {
      menuItems.push(
        utils.cloneWithProps(
          child,
          {
            onSelect: this.handleOptionSelect.bind(this, i)
          }
        )
      );
    }.bind(this));


    var title = this.props.isTitleHidden ?
      <span className="sr-only">{this.props.title}</span> : this.props.title;

    return (
      <div className={groupClassName}>
          <Button
            id={this.props.id}
            ref="button"
            className={className}
            onClick={this.handleClick}>
            {title}{' '}<span className="caret" />
          </Button>
          <ul
            className="dropdown-menu"
            role="menu"
            ref="menu"
            aria-labelledby={this.props.id}
          >
            {menuItems}
          </ul>
      </div>
    );
  }
});

module.exports = DropdownButton;