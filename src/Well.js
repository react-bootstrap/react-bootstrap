import classNames from 'classnames';
import React from 'react';

import { Sizes } from './styleMaps';
import { bsSizes, bsClass, getClassSet, omitBsProps }
  from './utils/bootstrapUtils';

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
  bsSizes([Sizes.LARGE, Sizes.SMALL], Well)
);
