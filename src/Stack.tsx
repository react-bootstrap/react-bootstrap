import clsx from 'clsx';
import * as React from 'react';
import { DynamicRefForwardingComponent } from '@restart/ui/types';
import {
  useBootstrapPrefix,
  useBootstrapBreakpoints,
  useBootstrapMinBreakpoint,
} from './ThemeProvider.js';
import type { GapValue } from './types.js';
import createUtilityClassName, {
  type ResponsiveUtilityValue,
} from './createUtilityClasses.js';

export type StackDirection = 'horizontal' | 'vertical';

export interface StackProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * Change the underlying component CSS base class name and modifier class names prefix.
   * **This is an escape hatch** for working with heavily customized bootstrap css.
   *
   * Defaults to `hstack` if direction is `horizontal` or `vstack` if direction
   * is `vertical`.
   *
   * @default 'hstack | vstack'
   */
  bsPrefix?: string | undefined;

  /**
   * Flex direction.
   */
  direction?: StackDirection | undefined;

  /**
   * Sets the spacing between each item. Valid values are `0-5`.
   */
  gap?: ResponsiveUtilityValue<GapValue> | undefined;
}

const Stack: DynamicRefForwardingComponent<'span', StackProps> =
  React.forwardRef<HTMLElement, StackProps>(
    (
      { as: Component = 'div', bsPrefix, className, direction, gap, ...props },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(
        bsPrefix,
        direction === 'horizontal' ? 'hstack' : 'vstack',
      );
      const breakpoints = useBootstrapBreakpoints();
      const minBreakpoint = useBootstrapMinBreakpoint();

      return (
        <Component
          {...props}
          ref={ref}
          className={clsx(
            className,
            bsPrefix,
            ...createUtilityClassName(
              {
                gap,
              },
              breakpoints,
              minBreakpoint,
            ),
          )}
        />
      );
    },
  );

Stack.displayName = 'Stack';

export default Stack;
