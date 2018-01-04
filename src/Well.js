import classNames from 'classnames';
import React from 'react';

import {
  bsClass,
  bsSizes,
  getClassSet,
  splitBsProps
} from './utils/bootstrapUtils';
import { Size } from './utils/StyleConfig';

class Well extends React.Component {
  render() {
    const { className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return <div {...elementProps} className={classNames(className, classes)} />;
  }
}

export default bsClass('well', bsSizes([Size.LARGE, Size.SMALL], Well));
