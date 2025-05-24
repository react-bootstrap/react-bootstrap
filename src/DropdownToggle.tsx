import useMergedRefs from '@restart/hooks/useMergedRefs';
import DropdownContext from '@restart/ui/DropdownContext';
import { useDropdownToggle } from '@restart/ui/DropdownToggle';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import Button, { type ButtonProps, type CommonButtonProps } from './Button';
import { useBootstrapPrefix } from './ThemeProvider';
import useWrappedRefWithWarning from './useWrappedRefWithWarning';

export interface DropdownToggleProps extends Omit<ButtonProps, 'as'> {
  /**
   * Element used to render the component.
   *
   * @default {Button}
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'dropdown-toggle'
   */
  bsPrefix?: string | undefined;

  /**
   * Renders a split button dropdown toggle.
   */
  split?: boolean;

  /**
   * To passthrough to the underlying button or whatever from DropdownButton
   * @private
   */
  childBsPrefix?: string;
}

type DropdownToggleComponent = DynamicRefForwardingComponent<
  'button',
  DropdownToggleProps
>;

export type PropsFromToggle = Partial<
  Pick<React.ComponentPropsWithRef<DropdownToggleComponent>, CommonButtonProps>
>;

const DropdownToggle: DropdownToggleComponent = React.forwardRef(
  (
    {
      bsPrefix,
      split,
      className,
      childBsPrefix,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = Button,
      ...props
    }: DropdownToggleProps,
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'dropdown-toggle');
    const dropdownContext = useContext(DropdownContext);

    if (childBsPrefix !== undefined) {
      (props as any).bsPrefix = childBsPrefix;
    }

    const [toggleProps] = useDropdownToggle();

    toggleProps.ref = useMergedRefs(
      toggleProps.ref,
      useWrappedRefWithWarning(ref, 'DropdownToggle'),
    );

    // This intentionally forwards size and variant (if set) to the
    // underlying component, to allow it to render size and style variants.
    return (
      <Component
        className={clsx(
          className,
          prefix,
          split && `${prefix}-split`,
          dropdownContext?.show && 'show',
        )}
        {...toggleProps}
        {...props}
      />
    );
  },
);

DropdownToggle.displayName = 'DropdownToggle';

export default DropdownToggle;
