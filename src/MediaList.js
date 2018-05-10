import React from 'react';
import classNames from 'classnames';

class MediaList extends React.Component {
  static displayName = 'Media.List';

  render() {
    const {className, ...props} = this.props;

    return (
      <ul {...props} className={classNames(className, 'media-list')}/>
    );
  }
}

export default MediaList;
