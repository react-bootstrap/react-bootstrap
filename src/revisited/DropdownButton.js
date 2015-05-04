import React from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import uuid from 'uuid';

export default class DropdownButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.getFocusableMenuItems = this.getFocusableMenuItems.bind(this);
    this.getItemsAndActiveIndex = this.getItemsAndActiveIndex.bind(this);

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
        this.focusNext();
        event.preventDefault();
        break;
      case keycode.codes.up:
        if (this.state.open) {
          this.focusPrevious();
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

  focusNext() {
    let { items, activeItemIndex } = this.getItemsAndActiveIndex();

    if (activeItemIndex === items.length - 1) {
      items[0].focus();
      return;
    }

    items[activeItemIndex + 1].focus();
  }

  focusPrevious() {
    let { items, activeItemIndex } = this.getItemsAndActiveIndex();

    if (activeItemIndex === 0) {
      items[items.length - 1].focus();
      return;
    }

    items[activeItemIndex - 1].focus();
  }

  getItemsAndActiveIndex() {
    let items = this.getFocusableMenuItems();
    let activeElement = document.activeElement;
    let activeItemIndex = items.indexOf(activeElement);

    return {items, activeItemIndex};
  }

  getFocusableMenuItems() {
    return [].slice.call(this.refs.menu.getDOMNode().querySelectorAll('[tabIndex="-1"]'), 0);
  }

  render() {
    let id = this.props.id || this.state.id;

    const rootClasses = {
      dropdown: true,
      open: this.state.open
    };

    let children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { onKeyDown: this.handleKeyDown }, child.children);
    });

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
        <ul ref='menu' className='dropdown-menu' role='menu' aria-labelledby={id}>
          {children}
        </ul>
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
