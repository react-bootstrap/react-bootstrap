import React from 'react';
import classNames from 'classnames';

import ensureDomProps from './utils/ensureDomProps';

const MediaListItem = React.createClass({
  displayName: 'Media.ListItem',
  render() {
    const {className, ...props} = this.props;
    const domProps = ensureDomProps(props, 'li');
    return (
      <li {...domProps} className={classNames(className, 'media')}/>
    );
  }
});

export default MediaListItem;
