import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface FigureCaptionProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const FigureCaption: BsPrefixRefForwardingComponent<
  'figcaption',
  FigureCaptionProps
> = React.forwardRef<HTMLElement, FigureCaptionProps>(
  ({ className, bsPrefix, as: Component = 'figcaption', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'figure-caption');
    return (
      <Component
        ref={ref}
        className={classNames(className, bsPrefix)}
        {...props}
      />
    );
  },
) as typeof FigureCaption;

FigureCaption.displayName = 'FigureCaption';

export default FigureCaption;
