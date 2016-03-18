import React, {Component} from 'react';

export default class MediaListItem extends Component {
  render() {
    const {className, children} = this.props;
    return (
      <li className={`media ${className}`}>
        {children}
      </li>
    );
  }
}
