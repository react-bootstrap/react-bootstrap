import React, {Component} from 'react';

export default class MediaList extends Component {
  render() {
    const {children, className} = this.props;
    return (
      <ul className={`media-list ${className}`}>
        {children}
      </ul>
    );
  }
}
