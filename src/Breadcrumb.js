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
      <nav aria-label="breadcrumbs">
        <ol
          role="navigation"
          {...elementProps}
          className={classNames(className, classes)}
        />
      </nav>
    );
  }
}

Breadcrumb.Item = BreadcrumbItem;

export default bsClass('breadcrumb', Breadcrumb);
