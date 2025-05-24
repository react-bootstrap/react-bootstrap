import * as React from 'react';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface OffcanvasBodyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'offcanvas-body'
   */
  bsPrefix?: string | undefined;
}

const OffcanvasBody: DynamicRefForwardingComponent<'div', OffcanvasBodyProps> =
  React.forwardRef<HTMLElement, OffcanvasBodyProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-body');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

OffcanvasBody.displayName = 'OffcanvasBody';

export default OffcanvasBody;
