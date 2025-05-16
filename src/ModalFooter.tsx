import * as React from 'react';
import classNames from 'classnames';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface ModalFooterProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'modal-footer'
   */
  bsPrefix?: string | undefined;
}

const ModalFooter: DynamicRefForwardingComponent<'div', ModalFooterProps> =
  React.forwardRef<HTMLElement, ModalFooterProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-footer');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  );

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
