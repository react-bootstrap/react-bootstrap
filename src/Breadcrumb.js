import classNames from 'classnames';
import React, { cloneElement } from 'react';

import BreadcrumbItem from './BreadcrumbItem';
import { bsClass, getClassSet, omitBsProps } from './utils/bootstrapUtils';
import ValidComponentChildren from './utils/ValidComponentChildren';

class Breadcrumb extends React.Component {
  renderBreadcrumbItem(child, index) {
    return cloneElement(child, { key: child.key || index });
  }

  render() {
    const { className, children, ...props } = this.props;

    const classes = getClassSet(props);

    return (
      <ol
        {...omitBsProps(props)}
        role="navigation"
        aria-label="breadcrumbs"
        className={classNames(className, classes)}
      >
        {ValidComponentChildren.map(children, (child, index) => (
          this.renderBreadcrumbItem(child, index))
        )}
      </ol>
    );
  }
}

Breadcrumb.Item = BreadcrumbItem;

export default bsClass('breadcrumb', Breadcrumb);
