import React from 'react';

export default class MenuItem extends React.Component {
  render() {
    if (this.props.divider) {
      return <li role='separator' className='divider' />;
    }

    if (this.props.header) {
      return (
        <li role='heading' className='dropdown-header'>{this.props.children}</li>
      );
    }

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
  divider(props, propName, componentName) {
    if (props.divider && props.children) {
      return new Error('Children will not be rendered for dividers');
    }

    return React.PropTypes.bool(props, propName, componentName);
  },
  header: React.PropTypes.bool,
  href: React.PropTypes.string,
  onKeyDown: React.PropTypes.func
};
