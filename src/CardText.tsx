import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface CardTextProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const CardText: BsPrefixRefForwardingComponent<'p', CardTextProps> =
  React.forwardRef<HTMLElement, CardTextProps>(
    ({ className, bsPrefix, as: Component = 'p', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-text');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof CardText;

CardText.displayName = 'CardText';

export default CardText;
