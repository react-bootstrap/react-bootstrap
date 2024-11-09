import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface OffcanvasBodyProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const OffcanvasBody: BsPrefixRefForwardingComponent<'div', OffcanvasBodyProps> =
  React.forwardRef<HTMLElement, OffcanvasBodyProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'offcanvas-body');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof OffcanvasBody;

OffcanvasBody.displayName = 'OffcanvasBody';

export default OffcanvasBody;
