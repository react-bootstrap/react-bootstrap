import * as React from 'react';
import clsx from 'clsx';
import Anchor from '@restart/ui/Anchor';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface AlertLinkProps extends React.AnchorHTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'alert-link'
   */
  bsPrefix?: string | undefined;
}

const AlertLink: DynamicRefForwardingComponent<'a', AlertLinkProps> =
  React.forwardRef<HTMLElement, AlertLinkProps>(
    ({ className, bsPrefix, as: Component = Anchor, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'alert-link');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

AlertLink.displayName = 'AlertLink';

export default AlertLink;
