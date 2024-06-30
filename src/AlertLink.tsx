import * as React from 'react';
import classNames from 'classnames';
import Anchor from '@restart/ui/Anchor';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface AlertLinkProps
  extends BsPrefixProps,
    React.AnchorHTMLAttributes<HTMLElement> {}

const AlertLink: BsPrefixRefForwardingComponent<'a', AlertLinkProps> =
  React.forwardRef<HTMLElement, AlertLinkProps>(
    ({ className, bsPrefix, as: Component = Anchor, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'alert-link');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof AlertLink;

AlertLink.displayName = 'AlertLink';

export default AlertLink;
