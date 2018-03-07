import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import BreadcrumbItem from './BreadcrumbItem';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * ARIA label for the nav element
   * https://www.w3.org/TR/wai-aria-practices/#breadcrumb
   */
  label: PropTypes.string,
  /**
   * Additional props passed as-is to the underlying `<ul>` element
   */
  listProps: PropTypes.object
};

const defaultProps = {
  label: 'breadcrumbs',
  listProps: {}
};

class Breadcrumb extends React.Component {
  render() {
    const {
      bsClass: bsClassName,
      listProps,
      children,
      className,
      label,
      ...props
    } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <nav
        aria-label={label}
        className={classNames(className, classes)}
        {...elementProps}
      >
        <ol
          role="navigation"
          {...listProps}
          className={classNames(bsClassName, listProps.className)}
        >
          {children}
        </ol>
      </nav>
    );
  }
}

Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default bsClass('breadcrumb', Breadcrumb);
