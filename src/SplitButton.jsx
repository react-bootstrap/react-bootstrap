/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import Button         from './Button';
import BootstrapMixin from './BootstrapMixin';
import utils          from './utils';


var SplitButton = React.createClass({
  mixins: [BootstrapMixin],

  getInitialState: function () {
    return {
      open: false
    };
  },

  getDefaultProps: function () {
    return {
      options: [],
      dropdownTitle: 'Toggle dropdown'
    };
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
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  },

  handleDropdownClick: function (e) {
    this.toggle();
  },

  handleOptionSelect: function (key) {
    if (typeof this.props.onSelect === 'function') {
      this.props.onSelect(key);
    }

    this.toggle(false);
  },

  handleKeyUp: function (e) {
    if (e.keyCode === 27) {
      this.toggle(false);
    }
  },

  handleClickOutside: function (e) {
    if (!this._clickedInside) {
      this.toggle(false);
    }

    delete this._clickedInside;
  },

  killClick: function (e) {
    // e.stopPropagation() doesn't prevent `handleClickOutside` from being called
    this._clickedInside = true;
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

    var button = this.transferPropsTo(
        <Button
          ref="button"
          onClick={this.handleClick}>
          {this.props.title}
        </Button>
    );

    var dropdownButton = this.transferPropsTo(
        <Button
          ref="dropdownButton"
          className="dropdown-toggle"
          onClick={this.handleDropdownClick}>
          <span className="sr-only">{this.props.dropdownTitle}</span><span className="caret" />
        </Button>
    );

    return (
      <div className={groupClassName}>
        {button}
        {dropdownButton}
        <ul
          className="dropdown-menu"
          role="menu"
          ref="menu"
          aria-labelledby={this.props.id}
          onClick={this.killClick}
        >
          {utils.modifyChildren(this.props.children, this.renderMenuItem)}
        </ul>
      </div>
    );
  },

  renderMenuItem: function (child, i) {
    return utils.cloneWithProps(
        child,
        {
          ref: child.props.ref || 'menuItem' + (i + 1),
          key: child.props.key,
          onSelect: this.handleOptionSelect.bind(this, child.props.key)
        }
      );
  }
});

export default = SplitButton;