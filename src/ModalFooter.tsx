import * as React from 'react';
import classNames from 'classnames';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface ModalFooterProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const ModalFooter: BsPrefixRefForwardingComponent<'div', ModalFooterProps> =
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
  ) as typeof ModalFooter;

ModalFooter.displayName = 'ModalFooter';

export default ModalFooter;
