import * as React from 'react';
import classNames from 'classnames';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface PopoverBodyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'popover-body'
   */
  bsPrefix?: string | undefined;
}

const PopoverBody: DynamicRefForwardingComponent<'div', PopoverBodyProps> =
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
  );

PopoverBody.displayName = 'PopoverBody';

export default PopoverBody;
