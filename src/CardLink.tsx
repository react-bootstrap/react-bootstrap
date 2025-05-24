import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface CardLinkProps extends React.AnchorHTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'card-link'
   */
  bsPrefix?: string | undefined;
}

const CardLink: DynamicRefForwardingComponent<'a', CardLinkProps> =
  React.forwardRef<HTMLElement, CardLinkProps>(
    ({ className, bsPrefix, as: Component = 'a', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-link');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

CardLink.displayName = 'CardLink';

export default CardLink;
