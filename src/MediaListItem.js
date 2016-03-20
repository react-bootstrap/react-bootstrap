import React from 'react';
import classNames from 'classnames';

const MediaListItem = React.createClass({
  displayName: 'Media.ListItem',
  render() {
    const {className, ...props} = this.props;
    return (
      <li {...props} className={classNames(className, 'media')}/>
    );
  }
});

export default MediaListItem;
