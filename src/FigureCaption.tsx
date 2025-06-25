import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface FigureCaptionProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'figure-caption'
   */
  bsPrefix?: string | undefined;
}

const FigureCaption: DynamicRefForwardingComponent<
  'figcaption',
  FigureCaptionProps
> = React.forwardRef<HTMLElement, FigureCaptionProps>(
  ({ className, bsPrefix, as: Component = 'figcaption', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'figure-caption');
    return (
      <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
    );
  },
);

FigureCaption.displayName = 'FigureCaption';

export default FigureCaption;
