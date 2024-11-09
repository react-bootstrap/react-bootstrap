import * as React from 'react';
import classNames from 'classnames';
import divWithClassName from './divWithClassName';
import { useBootstrapPrefix } from './ThemeProvider';
import type { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

const DivStyledAsH4 = divWithClassName('h4');

export interface ModalTitleProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {}

const ModalTitle: BsPrefixRefForwardingComponent<'span', ModalTitleProps> =
  React.forwardRef<HTMLElement, ModalTitleProps>(
    ({ className, bsPrefix, as: Component = DivStyledAsH4, ...props }, ref) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'modal-title');
      return (
        <Component
          ref={ref}
          className={classNames(className, bsPrefix)}
          {...props}
        />
      );
    },
  ) as typeof ModalTitle;

ModalTitle.displayName = 'ModalTitle';

export default ModalTitle;
