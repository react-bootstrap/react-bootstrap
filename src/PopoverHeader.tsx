import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface PopoverHeaderProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const PopoverHeader: BsPrefixRefForwardingComponent<'div', PopoverHeaderProps> =
  React.forwardRef<HTMLElement, PopoverHeaderProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-header');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof PopoverHeader;

PopoverHeader.displayName = 'PopoverHeader';

export default PopoverHeader;
