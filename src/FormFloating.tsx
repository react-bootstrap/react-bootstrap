import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface FormFloatingProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'form-floating'
   */
  bsPrefix?: string | undefined;
}

const FormFloating: DynamicRefForwardingComponent<'div', FormFloatingProps> =
  React.forwardRef<HTMLElement, FormFloatingProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'form-floating');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

FormFloating.displayName = 'FormFloating';

export default FormFloating;
