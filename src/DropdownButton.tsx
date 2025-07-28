import * as React from 'react';
import type { DynamicRefForwardingComponent } from '@restart/ui/types';
import Dropdown from './Dropdown.js';
import DropdownToggle, { type PropsFromToggle } from './DropdownToggle.js';
import DropdownMenu, { type DropdownMenuVariant } from './DropdownMenu.js';
import type { BsDropdownProps } from './types.js';

export interface DropdownButtonProps
  extends BsDropdownProps,
    PropsFromToggle,
    Omit<
      React.HTMLAttributes<HTMLElement>,
      'onSelect' | 'children' | 'onToggle' | 'title'
    > {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   */
  id?: string | undefined;

  /**
   * An `href` passed to the Toggle component
   */
  href?: string | undefined;

  /**
   * The content of the non-toggle Button.
   */
  title: React.ReactNode;

  /**
   * An ARIA accessible role applied to the Menu component.
   */
  menuRole?: string | undefined;

  /**
   * Whether to render the dropdown menu in the DOM before the first time it is shown
   */
  renderMenuOnMount?: boolean | undefined;

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   */
  rootCloseEvent?: 'click' | 'mousedown' | undefined;

  /**
   * Menu color variant.
   *
   * Omitting this will use the default light color.
   */
  menuVariant?: DropdownMenuVariant | undefined;

  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
   */
  flip?: boolean | undefined;
}

/**
 * A convenience component for simple or general use dropdowns. Renders a `Button` toggle and all `children`
 * are passed directly to the default `Dropdown.Menu`. This component accepts all of
 * [`Dropdown`'s props](#dropdown-props).
 *
 * _All unknown props are passed through to the `Dropdown` component._ Only
 * the Button `variant`, `size` and `bsPrefix` props are passed to the toggle,
 * along with menu-related props are passed to the `Dropdown.Menu`
 */
const DropdownButton: DynamicRefForwardingComponent<
  'div',
  DropdownButtonProps
> = React.forwardRef<HTMLDivElement, DropdownButtonProps>(
  (
    {
      title,
      children,
      bsPrefix,
      rootCloseEvent,
      variant,
      size,
      menuRole,
      renderMenuOnMount,
      disabled,
      href,
      id,
      menuVariant,
      flip,
      ...props
    },
    ref,
  ) => (
    <Dropdown ref={ref} {...props}>
      <DropdownToggle
        id={id}
        href={href}
        size={size}
        variant={variant}
        disabled={disabled}
        childBsPrefix={bsPrefix}
      >
        {title}
      </DropdownToggle>
      <DropdownMenu
        role={menuRole}
        renderOnMount={renderMenuOnMount}
        rootCloseEvent={rootCloseEvent}
        variant={menuVariant}
        flip={flip}
      >
        {children}
      </DropdownMenu>
    </Dropdown>
  ),
);

DropdownButton.displayName = 'DropdownButton';

export default DropdownButton;
