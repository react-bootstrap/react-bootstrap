import React from 'react';
import classNames from 'classnames';

import ensureDomProps from './utils/ensureDomProps';

const MediaList = React.createClass({
  displayName: 'Media.List',
  render() {
    const {className, ...props} = this.props;
    const domProps = ensureDomProps(props, 'ul');
    return (
      <ul {...domProps} className={classNames(className, 'media-list')}/>
    );
  }
});

export default MediaList;
