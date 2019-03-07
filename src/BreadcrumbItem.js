import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import SafeAnchor from './SafeAnchor';
import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'breadcrumb-item'
   */
  bsPrefix: PropTypes.string,
  /**
   * Adds a visual "active" state to a Breadcrumb
   * Item and disables the link.
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
  target: PropTypes.string,

  as: PropTypes.elementType,
};

const defaultProps = {
  active: false,
  as: 'li',
};

const BreadcrumbItem = React.forwardRef(
  ({ bsPrefix, active, className, as: Component, ...props }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb-item');

    const { href, title, target, ...elementProps } = props;
    const linkProps = { href, title, target };

    return (
      <Component
        ref={ref}
        className={classNames(prefix, className, { active })}
        aria-current={active ? 'page' : undefined}
      >
        {active ? (
          <span {...elementProps} className={classNames({ active })} />
        ) : (
          <SafeAnchor {...elementProps} {...linkProps} />
        )}
      </Component>
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = propTypes;
BreadcrumbItem.defaultProps = defaultProps;

export default BreadcrumbItem;
