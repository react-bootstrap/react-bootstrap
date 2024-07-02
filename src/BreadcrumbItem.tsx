import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import SafeAnchor from './SafeAnchor';
import { useBootstrapPrefix } from './ThemeProvider';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface BreadcrumbItemProps extends BsPrefixPropsWithChildren {
  active?: boolean;
  href?: string;
  linkAs?: React.ElementType;
  target?: string;
  title?: React.ReactNode;
  linkProps?: Record<string, any>; // the generic is to much work here
}

type BreadcrumbItem = BsPrefixRefForwardingComponent<'li', BreadcrumbItemProps>;

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
   * You can use a custom element type for this component's inner link.
   */
  linkAs: PropTypes.elementType,
  /**
   * `title` attribute for the inner `a` element
   */
  title: PropTypes.node,
  /**
   * `target` attribute for the inner `a` element
   */
  target: PropTypes.string,
  /**
   * Additional props passed as-is to the underlying link for non-active items.
   */
  linkProps: PropTypes.object,

  as: PropTypes.elementType,
};

const BreadcrumbItem: BreadcrumbItem = React.forwardRef(
  (
    {
      bsPrefix,
      active = false,
      children,
      className,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'li',
      linkAs: LinkComponent = SafeAnchor,
      linkProps = {},
      href,
      title,
      target,
      ...props
    }: BreadcrumbItemProps,
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'breadcrumb-item');

    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(prefix, className, { active })}
        aria-current={active ? 'page' : undefined}
      >
        {active ? (
          children
        ) : (
          <LinkComponent
            {...linkProps}
            href={href}
            title={title}
            target={target}
          >
            {children}
          </LinkComponent>
        )}
      </Component>
    );
  },
);

BreadcrumbItem.displayName = 'BreadcrumbItem';
BreadcrumbItem.propTypes = propTypes;

export default BreadcrumbItem;
