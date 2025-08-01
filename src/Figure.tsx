import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import FigureImage from './FigureImage.js';
import FigureCaption from './FigureCaption.js';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface FigureProps extends React.AnchorHTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'figure'
   */
  bsPrefix?: string | undefined;
}

const Figure: DynamicRefForwardingComponent<'figure', FigureProps> =
  React.forwardRef<HTMLElement, FigureProps>(
    ({ className, bsPrefix, as: Component = 'figure', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'figure');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

Figure.displayName = 'Figure';

export default Object.assign(Figure, {
  Image: FigureImage,
  Caption: FigureCaption,
});
