import React from 'react';

export default class DropdownMenuTitle extends React.Component {
  render() {
    if (typeof(this.props.children) !== 'string' &&
        this.props.className === undefined &&
        React.Children.count(this.props.children) === 1) {
      return React.Children.only(this.props.children);
    }

    return <span {...this.props}>{this.props.children}</span>;
  }
}
