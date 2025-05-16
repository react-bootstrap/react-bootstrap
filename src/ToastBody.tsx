import * as React from 'react';
import classNames from 'classnames';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface ToastBodyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'toast-body'
   */
  bsPrefix?: string | undefined;
}

const ToastBody: DynamicRefForwardingComponent<'div', ToastBodyProps> =
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
  );

ToastBody.displayName = 'ToastBody';

export default ToastBody;
