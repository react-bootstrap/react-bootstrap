/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import Button         from './Button';
import BootstrapMixin from './BootstrapMixin';
import utils          from './utils';


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
    var groupClassName = classSet({
      'btn-group': true,
      'open': this.state.open
    });

    var className = classSet(this.getBsClassSet());

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
          aria-labelledby={this.props.id}>
          {utils.modifyChildren(this.props.children, this.renderMenuItem)}
        </ul>
      </div>
    );
  },

  renderMenuItem: function (child, i) {
    return utils.cloneWithProps(
        child,
        {
          onSelect: this.handleOptionSelect.bind(this, i)
        }
      );
  }
});

export default = DropdownButton;