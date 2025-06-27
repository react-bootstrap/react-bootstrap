import clsx from 'clsx';
import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';
import type { Variant } from './types.js';

export interface SpinnerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'spinner'
   */
  bsPrefix?: string | undefined;

  /**
   * Changes the animation style of the spinner.
   */
  animation?: 'border' | 'grow' | undefined;

  /**
   * Component size variations.
   */
  size?: 'sm' | undefined;

  /**
   * The visual color style of the spinner
   *
   * @type {'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | undefined}
   */
  variant?: Variant | undefined;

  /**
   * An ARIA accessible role applied to the spinner component. This should generally be set to 'status'
   */
  role?: string | undefined;
}

const Spinner: DynamicRefForwardingComponent<'div', SpinnerProps> =
  React.forwardRef<HTMLElement, SpinnerProps>(
    (
      {
        bsPrefix,
        variant,
        animation = 'border',
        size,
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        className,
        ...props
      },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(bsPrefix, 'spinner');
      const bsSpinnerPrefix = `${bsPrefix}-${animation}`;
      return (
        <Component
          ref={ref}
          {...props}
          className={clsx(
            className,
            bsSpinnerPrefix,
            size && `${bsSpinnerPrefix}-${size}`,
            variant && `text-${variant}`,
          )}
        />
      );
    },
  );

Spinner.displayName = 'Spinner';

export default Spinner;
