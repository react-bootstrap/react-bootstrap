import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface FormFloatingProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const FormFloating: BsPrefixRefForwardingComponent<'div', FormFloatingProps> =
  React.forwardRef<HTMLElement, FormFloatingProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'form-floating');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof FormFloating;

FormFloating.displayName = 'FormFloating';

export default FormFloating;
