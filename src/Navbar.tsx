import clsx from 'clsx';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import SelectableContext from '@restart/ui/SelectableContext';
import {
  DynamicRefForwardingComponent,
  SelectCallback,
} from '@restart/ui/types';
import { useUncontrolled } from 'uncontrollable';
import NavbarBrand from './NavbarBrand.js';
import NavbarCollapse from './NavbarCollapse.js';
import NavbarToggle from './NavbarToggle.js';
import NavbarOffcanvas from './NavbarOffcanvas.js';
import { useBootstrapPrefix } from './ThemeProvider.js';
import NavbarContext, { type NavbarContextType } from './NavbarContext.js';
import NavbarText from './NavbarText.js';

export interface NavbarProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect' | 'onToggle'> {
  /**
   * Element used to render the component.
   */
  as?: React.ElementType | undefined;

  /**
   * @default 'navbar'
   */
  bsPrefix?: string | undefined;

  /**
   * The general visual variant of the Navbar.
   * Use in combination with the `bg` prop, `background-color` utilities,
   * or your own background styles.
   */
  variant?: 'light' | 'dark' | string | undefined;

  /**
   * The breakpoint, below which, the Navbar will collapse.
   * When `true` the Navbar will always be expanded regardless of screen size.
   */
  expand?: boolean | string | 'sm' | 'md' | 'lg' | 'xl' | 'xxl' | undefined;

  /**
   * Default expanded state of the Navbar.
   */
  defaultExpand?:
    | boolean
    | string
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | undefined;

  /**
   * A convenience prop for adding `bg-*` utility classes since they are so commonly used here.
   * `light` and `dark` are common choices but any `bg-*` class is supported, including any custom ones you might define.
   *
   * Pairs nicely with the `variant` prop.
   */
  bg?: string | undefined;

  /**
   * Create a fixed navbar along the top or bottom of the screen, that scrolls with the
   * page. A convenience prop for the `fixed-*` positioning classes.
   */
  fixed?: 'top' | 'bottom' | undefined;

  /**
   * Position the navbar at the top or bottom of the viewport, but only after scrolling past it.
   * A convenience prop for the `sticky-*` positioning classes.
   */
  sticky?: 'top' | 'bottom' | undefined;

  /**
   * A callback fired when the `<Navbar>` body collapses or expands. Fired when
   * a `<Navbar.Toggle>` is clicked and called with the new `expanded`
   * boolean value.
   *
   * @type {((expanded: boolean) => void) | undefined}
   * @controllable expanded
   */
  onToggle?: ((expanded: boolean) => void) | undefined;

  /**
   * A callback fired when a descendant of a child `<Nav>` is selected. Should
   * be used to execute complex closing or other miscellaneous actions desired
   * after selecting a descendant of `<Nav>`. Does nothing if no `<Nav>` or `<Nav>`
   * descendants exist. The callback is called with an eventKey, which is a
   * prop from the selected `<Nav>` descendant, and an event.
   *
   * ```js
   * function (
   *  eventKey: mixed,
   *  event?: SyntheticEvent
   * )
   * ```
   *
   * For basic closing behavior after all `<Nav>` descendant onSelect events in
   * mobile viewports, try using collapseOnSelect.
   *
   * Note: If you are manually closing the navbar using this `OnSelect` prop,
   * ensure that you are setting `expanded` to false and not *toggling* between
   * true and false.
   */
  onSelect?: SelectCallback | undefined;

  /**
   * Toggles `expanded` to `false` after the onSelect event of a descendant of a
   * child `<Nav>` fires. Does nothing if no `<Nav>` or `<Nav>` descendants exist.
   *
   * `<NavLink>` descendants of `<Nav>` will not trigger the `onSelect` event unless
   * an `eventKey` or `href` prop is defined.
   *
   * Manually controlling `expanded` via the onSelect callback is recommended instead,
   * for more complex operations that need to be executed after
   * the `select` event of `<Nav>` descendants.
   */
  collapseOnSelect?: boolean | undefined;

  /**
   * Controls the visibility of the navbar body
   *
   * @controllable onToggle
   */
  expanded?: boolean | undefined;

  /**
   * The ARIA role for the navbar, will default to 'navigation' for
   * Navbars whose `as` is something other than `<nav>`.
   *
   * @default 'navigation'
   */
  role?: string | undefined;
}

const Navbar: DynamicRefForwardingComponent<'nav', NavbarProps> =
  React.forwardRef<HTMLElement, NavbarProps>((props, ref) => {
    const {
      bsPrefix: initialBsPrefix,
      expand = true,
      variant = 'light',
      bg,
      fixed,
      sticky,
      className,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'nav',
      expanded,
      onToggle,
      onSelect,
      collapseOnSelect = false,
      ...controlledProps
    } = useUncontrolled(props, {
      expanded: 'onToggle',
    });

    const bsPrefix = useBootstrapPrefix(initialBsPrefix, 'navbar');

    const handleCollapse = useCallback<SelectCallback>(
      (...args) => {
        onSelect?.(...args);
        if (collapseOnSelect && expanded) {
          onToggle?.(false);
        }
      },
      [onSelect, collapseOnSelect, expanded, onToggle],
    );

    // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one
    if (controlledProps.role === undefined && Component !== 'nav') {
      controlledProps.role = 'navigation';
    }
    let expandClass = `${bsPrefix}-expand`;
    if (typeof expand === 'string') expandClass = `${expandClass}-${expand}`;

    const navbarContext = useMemo<NavbarContextType>(
      () => ({
        onToggle: () => onToggle?.(!expanded),
        bsPrefix,
        expanded: !!expanded,
        expand,
      }),
      [bsPrefix, expanded, expand, onToggle],
    );

    return (
      <NavbarContext.Provider value={navbarContext}>
        <SelectableContext.Provider value={handleCollapse}>
          <Component
            ref={ref}
            {...controlledProps}
            className={clsx(
              className,
              bsPrefix,
              expand && expandClass,
              variant && `${bsPrefix}-${variant}`,
              bg && `bg-${bg}`,
              sticky && `sticky-${sticky}`,
              fixed && `fixed-${fixed}`,
            )}
          />
        </SelectableContext.Provider>
      </NavbarContext.Provider>
    );
  });

Navbar.displayName = 'Navbar';

export default Object.assign(Navbar, {
  Brand: NavbarBrand,
  Collapse: NavbarCollapse,
  Offcanvas: NavbarOffcanvas,
  Text: NavbarText,
  Toggle: NavbarToggle,
});
