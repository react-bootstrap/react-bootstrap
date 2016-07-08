import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, omitBsProps } from './utils/bootstrapUtils';

class MediaListItem extends React.Component {
  render() {
    const { className, ...props } = this.props;

    const classes = getClassSet(props);

    return (
      <li
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );
  }
}

export default bsClass('media', MediaListItem);
