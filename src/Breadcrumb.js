import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import BreadcrumbItem from './BreadcrumbItem';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * ARIA label for the nav, if no label is provided
   * it will default to "breadcrumbs".
   */
  label: PropTypes.string
};

const defaultProps = {
  label: 'breadcrumbs'
};

class Breadcrumb extends React.Component {
  render() {
    const { className, label, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    return (
      <nav aria-label={label}>
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
Breadcrumb.propTypes = propTypes;
Breadcrumb.defaultProps = defaultProps;

export default bsClass('breadcrumb', Breadcrumb);
