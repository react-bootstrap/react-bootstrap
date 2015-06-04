import React, { cloneElement } from 'react';
import classNames from 'classnames';
import keycode from 'keycode';
import uuid from 'uuid';
import DropdownButtonTitle from './DropdownButtonTitle';
import DropdownMenu from './DropdownMenu';
import MenuItem from './MenuItem';
import CustomPropTypes from '../utils/CustomPropTypes';
import createChainedFunction from '../utils/createChainedFunction';

export default class DropdownButton extends React.Component {
  constructor(props) {
    super(props);

    this.toggleOpen = this.toggleOpen.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.extractChildren = this.extractChildren.bind(this);

    this.state = {
      open: false,
      id: props.id || uuid.v4()
    };
  }

  toggleOpen() {
    let open = !this.state.open;
    this.setState({open});
  }

  handleClick(event) {
    if (event.defaultPrevented) {
      return;
    }

    this.toggleOpen();
  }

  handleKeyDown(event) {
    switch(event.keyCode) {
      case keycode.codes.down:
        if (!this.state.open) {
          this.toggleOpen();
        }
        if (this.refs.menu.focusNext) {
          this.refs.menu.focusNext();
        }
        event.preventDefault();
        break;
      case keycode.codes.esc:
      case keycode.codes.tab:
        if (this.state.open) {
          this.handleRequestClose(event);
        }
        break;
    }
  }

  handleRequestClose(event) {
    if (!this.state.open) {
      return;
    }

    this.toggleOpen();

    if (event && event.type === 'keydown' && event.keyCode === keycode.codes.esc) {
      event.preventDefault();
      event.stopPropagation();
      React.findDOMNode(this.refs['toggle-btn']).focus();
    }
  }

  handleSelect(event, selectEvent) {
    if (selectEvent.isSelectionPrevented()) {
      return;
    }

    this.handleRequestClose(event);
  }

  render() {
    const id = this.props.id || this.state.id;
    let { title, menu, children } = this.extractChildren();

    const rootClasses = {
      dropdown: true,
      open: this.state.open
    };

    const menuProps = {
      ref: 'menu',
      open: this.state.open,
      pullRight: this.props.pullRight,
      requestClose: this.handleRequestClose,
      onSelect: createChainedFunction(this.props.onSelect, this.handleSelect),
      labelledBy: id
    };

    if (menu === undefined) {
      menu = (
        <DropdownMenu {...menuProps}>
          {children}
        </DropdownMenu>
      );
    } else {
      menu = cloneElement(menu, menuProps, menu.props.children);
    }

    return (
      <div className={classNames(rootClasses)}>
        <button
          ref='toggle-btn'
          className='btn btn-default dropdown-toggle'
          onClick={createChainedFunction(this.props.onClick, this.handleClick)}
          onKeyDown={this.handleKeyDown}
          type='button'
          id={id}
          tabIndex='0'
          aria-haspopup={true}
          aria-expanded={this.state.open}>
          {title} <span className='caret'></span>
        </button>
        {menu}
      </div>
    );
  }

  extractChildren() {
    let title = this.props.title;
    let children = [];
    let menu;

    React.Children.forEach(this.props.children, child => {
      if (child.type === DropdownButtonTitle) {
        title = title || child;
      } else if (child.type === DropdownMenu || child.type !== MenuItem) {
        menu = menu || child;
      } else {
        children.push(child);
      }
    });

    return {
      title,
      menu,
      children
    };
  }
}

DropdownButton.Title = DropdownButtonTitle;

function titleRequired(props, propName, component) {
  let titles = [];

  if (props.children) {
    if (props.children instanceof Array) {
      titles = props.children.filter(child => child.type === DropdownButtonTitle);
    } else if(props.children.type === DropdownButtonTitle) {
      titles.push(props.children);
    }
  }

  if (titles.length > 1) {
    return new Error(`(title|children) ${component} - Should only use one DropdownButton.Title child component, only the first DropdownButton.Title will be used`);
  }

  let title = titles[0];

  if (props.title !== undefined && title !== undefined) {
    return new Error(`(title|children) ${component} - Must provide either a 'title' prop or a 'DropdownButton.Title' child, not both.`);
  }

  if (props.title === undefined && title === undefined) {
    return new Error(`(title|children) ${component} - Must provide either a 'title' prop or a 'DropdownButton.Title' child`);
  }
}

function singleMenuValidation(props, propName, component) {
  let menus = [];

  if (props.children) {
    if (props.children instanceof Array) {
      menus = props.children.filter(child => child.type !== DropdownButton.Title && child.type !== MenuItem);
    } else if(props.children.type === DropdownButton.Title) {
      menus.push(props.children);
    }
  }

  if (menus.length > 1) {
    return new Error(`(children) ${component} - Only one menu permitted (Either DropdownMenu or a custom menu)`);
  }
}

DropdownButton.propTypes = {
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),

  title: titleRequired,

  children: CustomPropTypes.all([
    titleRequired,
    singleMenuValidation
  ]),

  pullRight: React.PropTypes.bool,

  onClick: React.PropTypes.func,
  onSelect: React.PropTypes.func
};
