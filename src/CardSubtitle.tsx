import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';
import divWithClassName from './divWithClassName.js';

const DivStyledAsH6 = divWithClassName('h6');

export interface CardSubtitleProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'card-subtitle'
   */
  bsPrefix?: string | undefined;
}

const CardSubtitle: DynamicRefForwardingComponent<'div', CardSubtitleProps> =
  React.forwardRef<HTMLElement, CardSubtitleProps>(
    ({ className, bsPrefix, as: Component = DivStyledAsH6, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-subtitle');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

CardSubtitle.displayName = 'CardSubtitle';

export default CardSubtitle;
