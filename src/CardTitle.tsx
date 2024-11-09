import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import divWithClassName from './divWithClassName';

const DivStyledAsH5 = divWithClassName('h5');

export interface CardTitleProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const CardTitle: BsPrefixRefForwardingComponent<'div', CardTitleProps> =
  React.forwardRef<HTMLElement, CardTitleProps>(
    ({ className, bsPrefix, as: Component = DivStyledAsH5, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-title');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof CardTitle;

CardTitle.displayName = 'CardTitle';

export default CardTitle;
