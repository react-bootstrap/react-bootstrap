import React from 'react';
import classNames from 'classnames';

const MediaListItem = React.createClass({
  displayName: 'Media.ListItem',
  render() {
    return (
      <li {...this.props} className={classNames(this.props.className, 'media')}>
        {this.props.children}
      </li>
    );
  }
});

export default MediaListItem;
