import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface PopoverBodyProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const PopoverBody: BsPrefixRefForwardingComponent<'div', PopoverBodyProps> =
  React.forwardRef<HTMLElement, PopoverBodyProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-body');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof PopoverBody;

PopoverBody.displayName = 'PopoverBody';

export default PopoverBody;
