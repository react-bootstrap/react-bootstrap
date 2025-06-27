import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface DropdownHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'dropdown-header'
   */
  bsPrefix?: string | undefined;

  /**
   * An ARIA accessible role.
   */
  role?: string | undefined;
}

const DropdownHeader: DynamicRefForwardingComponent<
  'div',
  DropdownHeaderProps
> = React.forwardRef<HTMLElement, DropdownHeaderProps>(
  (
    { className, bsPrefix, as: Component = 'div', role = 'heading', ...props },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-header');
    return (
      <Component
        ref={ref}
        className={clsx(className, bsPrefix)}
        role={role}
        {...props}
      />
    );
  },
);

DropdownHeader.displayName = 'DropdownHeader';

export default DropdownHeader;
