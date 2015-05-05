import React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import uuid from 'uuid';
import DropdownMenu from './DropdownMenu';

export default class DropdownButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);

    this.state = {
      open: false,
      id: props.id || uuid.v4()
    };
  }

  toggleOpen(event) {
    let open = !this.state.open;
    this.setState({open});
  }

  handleKeyDown(event) {
    //console.log(`KEY DOWN ${event.key} [${event.keyCode}] ${event.target}`);
    switch(event.keyCode) {
      case keycode.codes.down:
        if (!this.state.open) {
          this.toggleOpen(event);
        }
        this.refs.menu.focusNext();
        event.preventDefault();
        break;
      case keycode.codes.up:
        if (this.state.open) {
          this.refs.menu.focusPrevious();
          event.preventDefault();
        }
        break;
      case keycode.codes.esc:
        if (this.state.open) {
          this.toggleOpen(event);
          this.refs['toggle-btn'].getDOMNode().focus();
          event.preventDefault();
          event.stopPropagation();
        }
        break;
      case keycode.codes.tab:
        if (this.state.open) {
          this.toggleOpen(event);
        }
        break;
    }
  }

  handleBlur(event) {
    //console.log(`Blur ${event.target}`);
    // TODO: Collapse when focus is lost on everything.
  }

  render() {
    let id = this.props.id || this.state.id;

    const rootClasses = {
      dropdown: true,
      open: this.state.open
    };

    return (
      <div className={classNames(rootClasses)}>
        <button
          ref='toggle-btn'
          className='btn btn-default dropdown-toggle'
          onClick={this.toggleOpen}
          onKeyDown={this.handleKeyDown}
          onBlur={this.handleBlur}
          type='button'
          id={id}
          tabIndex='0'
          aria-haspopup={true}
          aria-expanded={this.state.open}>
          <span>Dropdown </span>
          <span className='caret'></span>
        </button>
        <DropdownMenu
          ref='menu'
          onKeyDown={this.handleKeyDown}
          labelledBy={id}>
          {this.props.children}
        </DropdownMenu>
      </div>
    );
  }
}

DropdownButton.propTypes = {
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};
