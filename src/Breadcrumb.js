import classNames from 'classnames';
import React from 'react';

import BreadcrumbItem from './BreadcrumbItem';
import { bsClass, getClassSet, omitBsProps } from './utils/bootstrapUtils';

class Breadcrumb extends React.Component {
  render() {
    const { className, ...props } = this.props;

    const classes = getClassSet(props);

    return (
      <ol
        {...omitBsProps(props)}
        role="navigation"
        aria-label="breadcrumbs"
        className={classNames(className, classes)}
      />
    );
  }
}

Breadcrumb.Item = BreadcrumbItem;

export default bsClass('breadcrumb', Breadcrumb);
