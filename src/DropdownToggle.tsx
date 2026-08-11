import useMergedRefs from '@restart/hooks/useMergedRefs';
import useEventCallback from '@restart/hooks/useEventCallback';
import DropdownContext from '@restart/ui/DropdownContext';
import { useDropdownToggle } from '@restart/ui/DropdownToggle';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import Button, { type ButtonProps, type CommonButtonProps } from './Button.js';
import { useBootstrapPrefix } from './ThemeProvider.js';
import useWrappedRefWithWarning from './useWrappedRefWithWarning.js';

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

    // Prevent a Ctrl/Cmd+click from opening the dropdown menu. Holding a
    // modifier key (Ctrl on Windows/Linux, Cmd on macOS) signals an intent to
    // open the target in a new tab/window rather than interact with the
    // control itself, so it should not toggle the menu. Without this guard,
    // Ctrl+clicking several toggles on the same page leaves every menu open
    // simultaneously (https://github.com/react-bootstrap/react-bootstrap/issues/6834).
    const originalOnClick = toggleProps.onClick;
    const handleClick = useEventCallback(
      (e: React.MouseEvent<Element, MouseEvent>) => {
        if (e.ctrlKey || e.metaKey) return;
        originalOnClick?.(e);
      },
    );
    toggleProps.onClick = handleClick;

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
