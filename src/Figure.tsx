import * as React from 'react';
import classNames from 'classnames';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import FigureImage from './FigureImage';
import FigureCaption from './FigureCaption';
import { useBootstrapPrefix } from './ThemeProvider';

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
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  );

Figure.displayName = 'Figure';

export default Object.assign(Figure, {
  Image: FigureImage,
  Caption: FigureCaption,
});
