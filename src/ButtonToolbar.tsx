import clsx from 'clsx';
import * as React from 'react';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface ButtonToolbarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * @default 'btn-toolbar'
   */
  bsPrefix?: string | undefined;

  /**
   * The ARIA role describing the button toolbar. Generally the default
   * "toolbar" role is correct. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role?: string | undefined;
}

const ButtonToolbar = React.forwardRef<HTMLDivElement, ButtonToolbarProps>(
  ({ bsPrefix, className, role = 'toolbar', ...props }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'btn-toolbar');

    return (
      <div
        {...props}
        ref={ref}
        className={clsx(className, prefix)}
        role={role}
      />
    );
  },
);

ButtonToolbar.displayName = 'ButtonToolbar';

export default ButtonToolbar;
