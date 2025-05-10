import * as React from 'react';
import classNames from 'classnames';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface ModalBodyProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'modal-body'
   */
  bsPrefix?: string | undefined;
}

const ModalBody: DynamicRefForwardingComponent<'div', ModalBodyProps> =
  React.forwardRef<HTMLElement, ModalBodyProps>(
    ({ className, bsPrefix, as: Component = 'div', ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-body');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  );

ModalBody.displayName = 'ModalBody';

export default ModalBody;
