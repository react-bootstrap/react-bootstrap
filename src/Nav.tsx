import clsx from 'clsx';
import * as React from 'react';
import { useContext } from 'react';
import { useUncontrolled } from 'uncontrollable';
import BaseNav from '@restart/ui/Nav';
import TabContext from '@restart/ui/TabContext';
import { DynamicRefForwardingComponent, EventKey } from '@restart/ui/types';
import { useBootstrapPrefix } from './ThemeProvider.js';
import NavbarContext from './NavbarContext.js';
import CardHeaderContext from './CardHeaderContext.js';
import NavItem from './NavItem.js';
import NavLink from './NavLink.js';
import type { BaseNavProps } from './types.js';

const EVENT_KEY_ATTR = 'data-rr-ui-event-key';
const SELECTABLE_TAB_SELECTOR = `[${EVENT_KEY_ATTR}]:not([aria-disabled=true])`;

function getNextFocusedTab(
  currentTarget: HTMLElement,
  eventTarget: EventTarget | null,
  offset: number,
) {
  if (!(eventTarget instanceof Element)) {
    return null;
  }

  const currentTab = eventTarget.closest<HTMLElement>(SELECTABLE_TAB_SELECTOR);
  if (!currentTab || !currentTarget.contains(currentTab)) {
    return null;
  }

  const items = Array.from(
    currentTarget.querySelectorAll<HTMLElement>(SELECTABLE_TAB_SELECTOR),
  );
  const index = items.indexOf(currentTab);
  if (index === -1) {
    return null;
  }

  let nextIndex = index + offset;
  if (nextIndex >= items.length) nextIndex = 0;
  if (nextIndex < 0) nextIndex = items.length - 1;

  return items[nextIndex];
}

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
   * Move focus with arrow keys without selecting the focused tab when the Nav
   * has a tablist role. The focused tab can still be selected with Enter or
   * Space.
   */
  manualActivation?: boolean | undefined;

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
    role,
    manualActivation = false,
    onKeyDown,
    onKeyDownCapture,
    ...props
  } = useUncontrolled(uncontrolledProps, { activeKey: 'onSelect' });

  const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'nav');

  let navbarBsPrefix;
  let cardHeaderBsPrefix;
  let isNavbar = false;

  const navbarContext = useContext(NavbarContext);
  const cardHeaderContext = useContext(CardHeaderContext);
  const tabContext = useContext(TabContext);

  if (navbarContext) {
    navbarBsPrefix = navbarContext.bsPrefix;
    isNavbar = navbar == null ? true : navbar;
  } else if (cardHeaderContext) {
    ({ cardHeaderBsPrefix } = cardHeaderContext);
  }

  const handleKeyDownCapture: React.KeyboardEventHandler<HTMLElement> = (
    event,
  ) => {
    onKeyDownCapture?.(event);

    if (
      !manualActivation ||
      event.isPropagationStopped() ||
      (role !== 'tablist' && !tabContext)
    ) {
      return;
    }

    let nextTab;
    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        nextTab = getNextFocusedTab(event.currentTarget, event.target, -1);
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        nextTab = getNextFocusedTab(event.currentTarget, event.target, 1);
        break;
      default:
        return;
    }

    if (!nextTab) {
      return;
    }

    onKeyDown?.(event);
    if (event.isPropagationStopped()) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    nextTab.focus();
  };

  return (
    <BaseNav
      as={as}
      ref={ref}
      activeKey={activeKey}
      role={role}
      onKeyDown={onKeyDown}
      onKeyDownCapture={handleKeyDownCapture}
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
