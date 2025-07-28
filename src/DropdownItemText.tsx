import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface DropdownItemTextProps
  extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'dropdown-item-text'
   */
  bsPrefix?: string | undefined;
}

const DropdownItemText: DynamicRefForwardingComponent<
  'span',
  DropdownItemTextProps
> = React.forwardRef<HTMLElement, DropdownItemTextProps>(
  ({ className, bsPrefix, as: Component = 'span', ...props }, ref) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'dropdown-item-text');
    return (
      <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
    );
  },
);

DropdownItemText.displayName = 'DropdownItemText';

export default DropdownItemText;
