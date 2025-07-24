import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import { useUncontrolled } from 'uncontrollable';
import BaseNav from '@restart/ui/Nav';
import { DynamicRefForwardingComponent, EventKey } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';
import NavbarContext from './NavbarContext.js';
import CardHeaderContext from './CardHeaderContext.js';
import NavItem from './NavItem.js';
import NavLink from './NavLink.js';
import type { BaseNavProps } from './types.js';

export interface NavProps extends BaseNavProps {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'nav'
   */
  bsPrefix?: string | undefined;

  /**
   * The visual variant of the nav items.
   */
  variant?: 'tabs' | 'pills' | 'underline' | string | undefined;

  /**
   * The default active key that is selected on start.
   */
  defaultActiveKey?: EventKey | undefined;

  /**
   * Have all `NavItem`s proportionately fill all available width.
   */
  fill?: boolean | undefined;

  /**
   * Have all `NavItem`s evenly fill all available width.
   */
  justify?: boolean | undefined;

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar?: boolean | undefined;

  /**
   * Enable vertical scrolling within the toggleable contents of a collapsed Navbar.
   */
  navbarScroll?: boolean | undefined;

  /**
   * ARIA role for the Nav, in the context of a TabContainer, the default will
   * be set to "tablist", but can be overridden by the Nav when set explicitly.
   *
   * When the role is "tablist", NavLink focus is managed according to
   * the ARIA authoring practices for tabs:
   * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
   */
  role?: string | undefined;
}

const Nav: DynamicRefForwardingComponent<'div', NavProps> = React.forwardRef<
  HTMLElement,
  NavProps
>((uncontrolledProps, ref) => {
  const {
    as = 'div',
    bsPrefix: initialBsPrefix,
    variant,
    fill = false,
    justify = false,
    navbar,
    navbarScroll,
    className,
    activeKey,
    ...props
  } = useUncontrolled(uncontrolledProps, { activeKey: 'onSelect' });

  const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'nav');

  let navbarBsPrefix;
  let cardHeaderBsPrefix;
  let isNavbar = false;

  const navbarContext = useContext(NavbarContext);
  const cardHeaderContext = useContext(CardHeaderContext);

  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    isNavbar = navbar == null ? true : navbar;
  } else if (cardHeaderContext) {
    ({ cardHeaderBsPrefix } = cardHeaderContext);
  }

  return (
    <BaseNav
      as={as}
      ref={ref}
      activeKey={activeKey}
      className={clsx(className, {
        [bsPrefix]: !isNavbar,
        [`${navbarBsPrefix}-nav`]: isNavbar,
        [`${navbarBsPrefix}-nav-scroll`]: isNavbar && navbarScroll,
        [`${cardHeaderBsPrefix}-${variant}`]: !!cardHeaderBsPrefix,
        [`${bsPrefix}-${variant}`]: !!variant,
        [`${bsPrefix}-fill`]: fill,
        [`${bsPrefix}-justified`]: justify,
      })}
      {...props}
    />
  );
});

Nav.displayName = 'Nav';

export default Object.assign(Nav, {
  Item: NavItem,
  Link: NavLink,
});
