import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface TabContentProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const TabContent: BsPrefixRefForwardingComponent<'div', TabContentProps> =
  React.forwardRef<HTMLElement, TabContentProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'tab-content');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof TabContent;

TabContent.displayName = 'TabContent';

export default TabContent;
