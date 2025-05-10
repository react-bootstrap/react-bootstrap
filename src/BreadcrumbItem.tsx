import classNames from 'classnames';
import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import Anchor from '@restart/ui/Anchor';
import { useBootstrapPrefix } from './ThemeProvider';

export interface BreadcrumbItemProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'breadcrumb-item'
   */
  bsPrefix?: string | undefined;

  /**
   * Adds a visual "active" state to a Breadcrumb
   * Item and disables the link.
   */
  active?: boolean | undefined;

  /**
   * `href` attribute for the inner `a` element
   */
  href?: string | undefined;

  /**
   * You can use a custom element type for this component's inner link.
   */
  linkAs?: React.ElementType | undefined;

  /**
   * `target` attribute for the inner `a` element
   */
  target?: string | undefined;

  /**
   * `title` attribute for the inner `a` element
   */
  title?: React.ReactNode | undefined;

  /**
   * Additional props passed as-is to the underlying link for non-active items.
   */
  linkProps?: Record<string, any> | undefined; // the generic is to much work here
}

const BreadcrumbItem: DynamicRefForwardingComponent<'li', BreadcrumbItemProps> =
  React.forwardRef<HTMLElement, BreadcrumbItemProps>(
    (
      {
        bsPrefix,
        active = false,
        children,
        className,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'li',
        linkAs: LinkComponent = Anchor,
        linkProps = {},
        href,
        title,
        target,
        ...props
      },
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

export default BreadcrumbItem;
