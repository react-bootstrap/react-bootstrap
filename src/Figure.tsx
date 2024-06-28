import * as React from 'react';
import classNames from 'classnames';
import FigureImage from './FigureImage';
import FigureCaption from './FigureCaption';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface FigureProps
  extends BsPrefixProps,
    React.AnchorHTMLAttributes<HTMLElement> {}

const Figure: BsPrefixRefForwardingComponent<'figure', FigureProps> =
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
  ) as typeof Figure;

Figure.displayName = 'Figure';

export default Object.assign(Figure, {
  Image: FigureImage,
  Caption: FigureCaption,
});
