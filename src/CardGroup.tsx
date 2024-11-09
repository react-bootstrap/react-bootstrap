import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface CardGroupProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const CardGroup: BsPrefixRefForwardingComponent<'div', CardGroupProps> =
  React.forwardRef<HTMLElement, CardGroupProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-group');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof CardGroup;

CardGroup.displayName = 'CardGroup';

export default CardGroup;
