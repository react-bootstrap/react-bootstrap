import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface DropdownDividerProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const DropdownDivider: BsPrefixRefForwardingComponent<
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
) as typeof DropdownDivider;

DropdownDivider.displayName = 'DropdownDivider';

export default DropdownDivider;
