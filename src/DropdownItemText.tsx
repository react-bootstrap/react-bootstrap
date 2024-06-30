import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface DropdownItemTextProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const DropdownItemText: BsPrefixRefForwardingComponent<
  'span',
  DropdownItemTextProps
> = React.forwardRef<HTMLElement, DropdownItemTextProps>(
  ({ className, bsPrefix, as: Component = 'span', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-item-text');
    return (
      <Component
        ref={ref}
        className={classNames(className, bsPrefix)}
        {...props}
      />
    );
  },
) as typeof DropdownItemText;

DropdownItemText.displayName = 'DropdownItemText';

export default DropdownItemText;
