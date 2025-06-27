import * as React from 'react';
import clsx from 'clsx';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';

export interface TabContentProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'tab-content'
   */
  bsPrefix?: string | undefined;
}

const TabContent: DynamicRefForwardingComponent<'div', TabContentProps> =
  React.forwardRef<HTMLElement, TabContentProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'tab-content');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

TabContent.displayName = 'TabContent';

export default TabContent;
