import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  useBootstrapPrefix,
  useBootstrapBreakpoints,
  useBootstrapMinBreakpoint,
} from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { GapValue } from './types';
import createUtilityClassName, {
  ResponsiveUtilityValue,
  responsivePropType,
} from './createUtilityClasses';

export interface StackProps
  extends BsPrefixProps,
    React.HTMLAttributes<HTMLElement> {
  horizontal?: boolean;
  gap?: ResponsiveUtilityValue<GapValue>;
}

const propTypes = {
  /**
   * Change the underlying component CSS base class name and modifier class names prefix.
   * **This is an escape hatch** for working with heavily customized bootstrap css.
   *
   * Defaults to `hstack` if horizontal is present or true, or `vstack` if horizontal is absent or false.
   *
   * @default 'hstack | vstack'
   */
  bsPrefix: PropTypes.string,

  /**
   * Sets the spacing between each item. Valid values are `0-5`.
   */
  gap: responsivePropType(PropTypes.number),
};

const Stack: BsPrefixRefForwardingComponent<'span', StackProps> =
  React.forwardRef<HTMLElement, StackProps>(
    (
      { as: Component = 'div', bsPrefix, className, horizontal, gap, ...props },
      ref,
    ) => {
      bsPrefix = useBootstrapPrefix(
        bsPrefix,
        horizontal ? 'hstack' : 'vstack',
      );
      const breakpoints = useBootstrapBreakpoints();
      const minBreakpoint = useBootstrapMinBreakpoint();

      return (
        <Component
          {...props}
          ref={ref}
          className={classNames(
            className,
            bsPrefix,
            ...createUtilityClassName({
              gap,
              breakpoints,
              minBreakpoint,
            }),
          )}
        />
      );
    },
  );

Stack.displayName = 'Stack';
Stack.propTypes = propTypes;

export default Stack;
