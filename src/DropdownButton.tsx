import * as React from 'react';
import PropTypes from 'prop-types';

import Dropdown, { DropdownProps } from './Dropdown';
import DropdownToggle, { PropsFromToggle } from './DropdownToggle';
import DropdownMenu, { DropdownMenuVariant } from './DropdownMenu';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';
import { alignPropType } from './types';

export interface DropdownButtonProps
  extends Omit<DropdownProps, 'title'>,
    PropsFromToggle,
    BsPrefixProps {
  title: React.ReactNode;
  menuRole?: string;
  renderMenuOnMount?: boolean;
  rootCloseEvent?: 'click' | 'mousedown';
  menuVariant?: DropdownMenuVariant;
  flip?: boolean;
}

const propTypes = {
  /**
   * An html id attribute for the Toggle button, necessary for assistive technologies, such as screen readers.
   * @type {string}
   */
  id: PropTypes.string,

  /** An `href` passed to the Toggle component */
  href: PropTypes.string,

  /** An `onClick` handler passed to the Toggle component */
  onClick: PropTypes.func,

  /** The content of the non-toggle Button.  */
  title: PropTypes.node.isRequired,

  /** Disables both Buttons  */
  disabled: PropTypes.bool,

  /**
   * Aligns the dropdown menu.
   *
   * _see [DropdownMenu](#dropdown-menu-props) for more details_
   *
   * @type {"start"|"end"|{ sm: "start"|"end" }|{ md: "start"|"end" }|{ lg: "start"|"end" }|{ xl: "start"|"end"}|{ xxl: "start"|"end"} }
   */
  align: alignPropType,

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

  /**
   * Menu color variant.
   *
   * Omitting this will use the default light color.
   */
  menuVariant: PropTypes.oneOf<DropdownMenuVariant>(['dark']),

  /**
   * Allow Dropdown to flip in case of an overlapping on the reference element. For more information refer to
   * Popper.js's flip [docs](https://popper.js.org/docs/v2/modifiers/flip/).
   *
   */
  flip: PropTypes.bool,

  /** @ignore */
  bsPrefix: PropTypes.string,
  /** @ignore */
  variant: PropTypes.string,
  /** @ignore */
  size: PropTypes.string,
};

/**
 * A convenience component for simple or general use dropdowns. Renders a `Button` toggle and all `children`
 * are passed directly to the default `Dropdown.Menu`. This component accepts all of
 * [`Dropdown`'s props](#dropdown-props).
 *
 * _All unknown props are passed through to the `Dropdown` component._ Only
 * the Button `variant`, `size` and `bsPrefix` props are passed to the toggle,
 * along with menu-related props are passed to the `Dropdown.Menu`
 */
const DropdownButton: BsPrefixRefForwardingComponent<
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
DropdownButton.propTypes = propTypes;

export default DropdownButton;
