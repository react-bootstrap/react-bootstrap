import React from 'react';
import PropTypes from 'prop-types';

import Dropdown, { DropdownProps } from './Dropdown';
import DropdownToggle, { PropsFromToggle } from './DropdownToggle';
import DropdownMenu, { alignPropType, AlignType } from './DropdownMenu';

export interface DropdownButtonProps
  extends DropdownProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'title'>,
    React.PropsWithChildren<PropsFromToggle> {
  title: React.ReactNode;
  menuAlign?: AlignType;
  menuRole?: string;
  renderMenuOnMount?: boolean;
  rootCloseEvent?: 'click' | 'mousedown';
  bsPrefix?: string;
}

const propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string|number}
   * @required
   */
  id: PropTypes.any,

  /** An `href` passed to the Toggle component */
  href: PropTypes.string,

  /** An `onClick` handler passed to the Toggle component */
  onClick: PropTypes.func,

  /** The content of the non-toggle Button.  */
  title: PropTypes.node.isRequired,

  /** Disables both Buttons  */
  disabled: PropTypes.bool,

  /**
   * Aligns the dropdown menu responsively.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   *
   * @type {"left"|"right"|{ sm: "left"|"right" }|{ md: "left"|"right" }|{ lg: "left"|"right" }|{ xl: "left"|"right"} }
   */
  menuAlign: alignPropType,

  /** An ARIA accessible role applied to the Menu component. When set to 'menu', The dropdown */
  menuRole: PropTypes.string,

  /** Whether to render the dropdown menu in the DOM before the first time it is shown */
  renderMenuOnMount: PropTypes.bool,

  /**
   *  Which event when fired outside the component will cause it to be closed.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   */
  rootCloseEvent: PropTypes.string,

  /** @ignore */
  bsPrefix: PropTypes.string,
  /** @ignore */
  variant: PropTypes.string,
  /** @ignore */
  size: PropTypes.string,
};

/**
 * A convenience component for simple or general use dropdowns. Renders a `Button` toggle and all `children`
 * are passed directly to the default `Dropdown.Menu`.
 *
 * _All unknown props are passed through to the `Dropdown` component._ Only
 * the Button `variant`, `size` and `bsPrefix` props are passed to the toggle,
 * along with menu related props are passed to the `Dropdown.Menu`
 */
const DropdownButton = React.forwardRef<HTMLDivElement, DropdownButtonProps>(
  (
    {
      title,
      children,
      bsPrefix,
      rootCloseEvent,
      variant,
      size,
      menuAlign,
      menuRole,
      renderMenuOnMount,
      disabled,
      href,
      id,
      ...props
    }: DropdownButtonProps,
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
        align={menuAlign}
        role={menuRole}
        renderOnMount={renderMenuOnMount}
        rootCloseEvent={rootCloseEvent}
      >
        {children}
      </DropdownMenu>
    </Dropdown>
  ),
);

DropdownButton.displayName = 'DropdownButton';
DropdownButton.propTypes = propTypes as any;

export default DropdownButton;
