import classNames from 'classnames';
import React from 'react';

import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

class PageHeader extends React.Component {
  render() {
    const { className, children, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <div {...elementProps} className={classNames(className, classes)}>
        <h1>{children}</h1>
      </div>
    );
  }
}

export default bsClass('page-header', PageHeader);
