import React from 'react';

// TODO: Dividers

export default class MenuItem extends React.Component {
  render() {
    return (
      <li role='presentation'>
        <a
          role='menuitem'
          tabIndex='-1'
          href={this.props.href}
          onKeyDown={this.props.onKeyDown}>
          {this.props.children}
        </a>
      </li>
    );
  }
}

MenuItem.propTypes = {
  href: React.PropTypes.string,
  onKeyDown: React.PropTypes.func
};
