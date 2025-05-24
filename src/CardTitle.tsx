import * as React from 'react';
import clsx from 'clsx';
import { useBootstrapPrefix } from './ThemeProvider';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import divWithClassName from './divWithClassName';

const DivStyledAsH5 = divWithClassName('h5');

export interface CardTitleProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'card-title'
   */
  bsPrefix?: string | undefined;
}

const CardTitle: DynamicRefForwardingComponent<'div', CardTitleProps> =
  React.forwardRef<HTMLElement, CardTitleProps>(
    ({ className, bsPrefix, as: Component = DivStyledAsH5, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-title');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

CardTitle.displayName = 'CardTitle';

export default CardTitle;
