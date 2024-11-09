import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface CardBodyProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const CardBody: BsPrefixRefForwardingComponent<'div', CardBodyProps> =
  React.forwardRef<HTMLElement, CardBodyProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'card-body');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof CardBody;

CardBody.displayName = 'CardBody';

export default CardBody;
