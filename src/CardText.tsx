import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface CardTextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'card-text'
   */
  bsPrefix?: string | undefined;
}

const CardText: DynamicRefForwardingComponent<'p', CardTextProps> =
  React.forwardRef<HTMLElement, CardTextProps>(
    ({ className, bsPrefix, as: Component = 'p', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-text');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

CardText.displayName = 'CardText';

export default CardText;
