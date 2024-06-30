import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface ToastBodyProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const ToastBody: BsPrefixRefForwardingComponent<'div', ToastBodyProps> =
  React.forwardRef<HTMLElement, ToastBodyProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'toast-body');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof ToastBody;

ToastBody.displayName = 'ToastBody';

export default ToastBody;
