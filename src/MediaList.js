import React from 'react';
import classNames from 'classnames';

const MediaList = React.createClass({
  displayName: 'Media.List',
  render() {
    return (
      <ul {...this.props} className={classNames(this.props.className, 'media-list')}>
        {this.props.children}
      </ul>
    );
  }
});

export default MediaList;
