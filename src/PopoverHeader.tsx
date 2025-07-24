import * as React from 'react';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface PopoverHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'popover-header'
   */
  bsPrefix?: string | undefined;
}

const PopoverHeader: DynamicRefForwardingComponent<'div', PopoverHeaderProps> =
  React.forwardRef<HTMLElement, PopoverHeaderProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'popover-header');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

PopoverHeader.displayName = 'PopoverHeader';

export default PopoverHeader;
