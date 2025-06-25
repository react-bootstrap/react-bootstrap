import * as React from 'react';
import Button from './Button.js';
import ButtonGroup from './ButtonGroup.js';
import Dropdown from './Dropdown.js';
import type { PropsFromToggle } from './DropdownToggle.js';
import { BsDropdownProps } from './types.js';

export interface SplitButtonProps
  extends BsDropdownProps,
    PropsFromToggle,
    Omit<
      React.HTMLAttributes<HTMLElement>,
      'onSelect' | 'children' | 'onToggle' | 'title'
    > {
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
   * An `href` passed to the non-toggle Button
   */
  href?: string | undefined;

  /**
   * An anchor `target` passed to the non-toggle Button
   */
  target?: string | undefined;

  /**
   * The content of the non-toggle Button.
   */
  title: React.ReactNode;

  /**
   * Accessible label for the toggle; the value of `title` if not specified.
   */
  toggleLabel?: string | undefined;

  /*
   * A `type` passed to the non-toggle Button
   */
  type?: 'submit' | 'reset' | 'button' | undefined;

  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
   */
  flip?: boolean | undefined;
}

/**
 * A convenience component for simple or general use split button dropdowns. Renders a
 * `ButtonGroup` containing a `Button` and a `Button` toggle for the `Dropdown`. All `children`
 * are passed directly to the default `Dropdown.Menu`. This component accepts all of [`Dropdown`'s
 * props](#dropdown-props).
 *
 * _All unknown props are passed through to the `Dropdown` component._
 * The Button `variant`, `size` and `bsPrefix` props are passed to the button and toggle,
 * and menu-related props are passed to the `Dropdown.Menu`
 */
const SplitButton = React.forwardRef<HTMLElement, SplitButtonProps>(
  (
    {
      id,
      bsPrefix,
      size,
      variant,
      title,
      type = 'button',
      toggleLabel = 'Toggle dropdown',
      children,
      onClick,
      href,
      target,
      menuRole,
      renderMenuOnMount,
      rootCloseEvent,
      flip,
      ...props
    },
    ref,
  ) => (
    <Dropdown ref={ref} {...props} as={ButtonGroup}>
      <Button
        size={size}
        variant={variant}
        disabled={props.disabled}
        bsPrefix={bsPrefix}
        href={href}
        target={target}
        onClick={onClick}
        type={type}
      >
        {title}
      </Button>
      <Dropdown.Toggle
        split
        id={id}
        size={size}
        variant={variant}
        disabled={props.disabled}
        childBsPrefix={bsPrefix}
      >
        <span className="visually-hidden">{toggleLabel}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu
        role={menuRole}
        renderOnMount={renderMenuOnMount}
        rootCloseEvent={rootCloseEvent}
        flip={flip}
      >
        {children}
      </Dropdown.Menu>
    </Dropdown>
  ),
);

SplitButton.displayName = 'SplitButton';

export default SplitButton;
