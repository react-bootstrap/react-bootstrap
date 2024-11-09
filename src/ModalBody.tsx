import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface ModalBodyProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const ModalBody: BsPrefixRefForwardingComponent<'div', ModalBodyProps> =
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
  ) as typeof ModalBody;

ModalBody.displayName = 'ModalBody';

export default ModalBody;
