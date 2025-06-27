import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface CardFooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'card-footer'
   */
  bsPrefix?: string | undefined;
}

const CardFooter: DynamicRefForwardingComponent<'div', CardFooterProps> =
  React.forwardRef<HTMLElement, CardFooterProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-footer');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

CardFooter.displayName = 'CardFooter';

export default CardFooter;
