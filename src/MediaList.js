import React from 'react';
import classNames from 'classnames';

const MediaList = React.createClass({
  displayName: 'Media.List',
  render() {
    const {className, ...props} = this.props;

    return (
      <ul {...props} className={classNames(className, 'media-list')}/>
    );
  }
});

export default MediaList;
