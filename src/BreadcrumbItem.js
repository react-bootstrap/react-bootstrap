import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import SafeAnchor from './SafeAnchor';
import { bsClass, getClassSet, splitBsProps } from './utils/bootstrapUtils';

const propTypes = {
  /**
   * If set to true, renders `span` instead of `a`
   */
  active: PropTypes.bool,
  /**
   * `href` attribute for the inner `a` element
   */
  href: PropTypes.string,
  /**
   * `title` attribute for the inner `a` element
   */
  title: PropTypes.node,
  /**
   * `target` attribute for the inner `a` element
   */
  target: PropTypes.string
};

const defaultProps = {
  active: false
};

class BreadcrumbItem extends React.Component {
  render() {
    const { active, href, title, target, className, ...props } = this.props;
    const [bsProps, elementProps] = splitBsProps(props);

    const classes = getClassSet(bsProps);

    // Don't try to render these props on non-active <span>.
    const linkProps = { href, title, target };

    return (
      <li className={classNames(className, classes, { active })}>
        {active ? (
          <span {...elementProps} />
        ) : (
          <SafeAnchor {...elementProps} {...linkProps} />
        )}
      </li>
    );
  }
}

BreadcrumbItem.propTypes = propTypes;
BreadcrumbItem.defaultProps = defaultProps;

export default bsClass('breadcrumb-item', BreadcrumbItem);
