import classNames from 'classnames';
import React from 'react';

import { bsSizes, bsClass, getClassSet, omitBsProps }
  from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';

class Well extends React.Component {
  render() {
    const { className, ...props } = this.props;

    const classes = getClassSet(props);

    return (
      <div
        {...omitBsProps(props)}
        className={classNames(className, classes)}
      />
    );
  }
}

export default bsClass('well',
  bsSizes([Size.LARGE, Size.SMALL], Well)
);
