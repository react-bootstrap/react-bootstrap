import * as React from 'react';
import clsx from 'clsx';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import divWithClassName from './divWithClassName';
import { useBootstrapPrefix } from './ThemeProvider';

const DivStyledAsH4 = divWithClassName('h4');

export interface ModalTitleProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'modal-title'
   */
  bsPrefix?: string | undefined;
}

const ModalTitle: DynamicRefForwardingComponent<'span', ModalTitleProps> =
  React.forwardRef<HTMLElement, ModalTitleProps>(
    ({ className, bsPrefix, as: Component = DivStyledAsH4, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-title');
      return (
        <Component ref={ref} className={clsx(className, bsPrefix)} {...props} />
      );
    },
  );

ModalTitle.displayName = 'ModalTitle';

export default ModalTitle;
