import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface CardFooterProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const CardFooter: BsPrefixRefForwardingComponent<'div', CardFooterProps> =
  React.forwardRef<HTMLElement, CardFooterProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-footer');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof CardFooter;

CardFooter.displayName = 'CardFooter';

export default CardFooter;
