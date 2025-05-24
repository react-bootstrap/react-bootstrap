import clsx from 'clsx';
import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider';

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'btn-group'
   */
  bsPrefix?: string | undefined;

  /**
   * Sets the size for all Buttons in the group.
   */
  size?: 'sm' | 'lg' | undefined;

  /**
   * Make the set of Buttons appear vertically stacked.
   */
  vertical?: boolean | undefined;

  /**
   * An ARIA role describing the button group. Usually the default
   * "group" role is fine. An `aria-label` or `aria-labelledby`
   * prop is also recommended.
   */
  role?: string | undefined;
}

const ButtonGroup: DynamicRefForwardingComponent<'div', ButtonGroupProps> =
  React.forwardRef<HTMLElement, ButtonGroupProps>(
    (
      {
        bsPrefix,
        size,
        vertical = false,
        className,
        role = 'group',
        // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
        as: Component = 'div',
        ...rest
      },
      ref,
    ) => {
      const prefix = useBootstrapPrefix(bsPrefix, 'btn-group');
      let baseClass = prefix;

      if (vertical) baseClass = `${prefix}-vertical`;

      return (
        <Component
          {...rest}
          ref={ref}
          role={role}
          className={clsx(className, baseClass, size && `${prefix}-${size}`)}
        />
      );
    },
  );

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
