import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import divWithClassName from './divWithClassName';

const DivStyledAsH6 = divWithClassName('h6');

export interface CardSubtitleProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const CardSubtitle: BsPrefixRefForwardingComponent<'div', CardSubtitleProps> =
  React.forwardRef<HTMLElement, CardSubtitleProps>(
    ({ className, bsPrefix, as: Component = DivStyledAsH6, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-subtitle');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof CardSubtitle;

CardSubtitle.displayName = 'CardSubtitle';

export default CardSubtitle;
