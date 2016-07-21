import classNames from 'classnames';
import React from 'react';

import BreadcrumbItem from './BreadcrumbItem';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

class Breadcrumb extends React.Component {
  render() {
    const { className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <ol
        {...elementProps}
        role="navigation"
        aria-label="breadcrumbs"
        className={classNames(className, classes)}
      />
    );
  }
}

Breadcrumb.Item = BreadcrumbItem;

export default bsClass('breadcrumb', Breadcrumb);
