import * as React from 'react';
import classNames from 'classnames';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface DropdownDividerProps
  extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'dropdown-divider'
   */
  bsPrefix?: string | undefined;

  /**
   * An ARIA accessible role.
   */
  role?: string | undefined;
}

const DropdownDivider: DynamicRefForwardingComponent<
  'hr',
  DropdownDividerProps
> = React.forwardRef<HTMLElement, DropdownDividerProps>(
  (
    { className, bsPrefix, as: Component = 'hr', role = 'separator', ...props },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-divider');
    return (
      <Component
        ref={ref}
        className={classNames(className, bsPrefix)}
        role={role}
        {...props}
      />
    );
  },
);

DropdownDivider.displayName = 'DropdownDivider';

export default DropdownDivider;
