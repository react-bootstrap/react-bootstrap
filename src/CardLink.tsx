import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface CardLinkProps
  extends BsPrefixProps,
    React.AnchorHTMLAttributes<HTMLElement> {}

const CardLink: BsPrefixRefForwardingComponent<'a', CardLinkProps> =
  React.forwardRef<HTMLElement, CardLinkProps>(
    ({ className, bsPrefix, as: Component = 'a', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-link');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof CardLink;

CardLink.displayName = 'CardLink';

export default CardLink;
