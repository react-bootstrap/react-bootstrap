import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import SafeAnchor from './SafeAnchor';
import { useBootstrapPrefix } from './ThemeProvider';

const linkPropTypes = {
  active: PropTypes.bool,
  as: PropTypes.elementType,
  href: PropTypes.string,
  target: PropTypes.string,
  title: PropTypes.node,
};

const linkDefaultProps = {};

const BreadcrumbItemLink = ({ active, as: Component, ...props }) => {
  const { href, title, target, ...elementProps } = props;
  const linkProps = { href, title, target };

  if (active) {
    return <span {...elementProps} className={classNames({ active })} />;
  }

  if (Component) {
    return <Component {...elementProps} {...linkProps} />;
  }

  return <SafeAnchor {...elementProps} {...linkProps} />;
};

BreadcrumbItemLink.displayName = 'BreadcrumbItemLink';
BreadcrumbItemLink.propTypes = linkPropTypes;
BreadcrumbItemLink.defaultProps = linkDefaultProps;

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
   * You can use a custom element type for this component's inner link.
   */
  linkAs: PropTypes.elementType,
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
};

const BreadcrumbItem = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (
    { bsPrefix, active, className, as: Component = 'li', linkAs, ...props },
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb-item');

    return (
      <Component
        ref={ref}
        className={classNames(prefix, className, { active })}
        aria-current={active ? 'page' : undefined}
      >
        <BreadcrumbItemLink active={active} as={linkAs} {...props} />
      </Component>
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = propTypes;
BreadcrumbItem.defaultProps = defaultProps;

export default BreadcrumbItem;
