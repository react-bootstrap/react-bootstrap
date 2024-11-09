import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface DropdownHeaderProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const DropdownHeader: BsPrefixRefForwardingComponent<
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
        className={classNames(className, bsPrefix)}
        role={role}
        {...props}
      />
    );
  },
) as typeof DropdownHeader;

DropdownHeader.displayName = 'DropdownHeader';

export default DropdownHeader;
