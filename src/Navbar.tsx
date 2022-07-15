import classNames from 'classnames';
import * as React from 'react';
import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import SelectableContext from '@restart/ui/SelectableContext';
import { SelectCallback } from '@restart/ui/types';
import { useUncontrolled } from 'uncontrollable';

import createWithBsPrefix from './createWithBsPrefix';
import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarToggle from './NavbarToggle';
import NavbarOffcanvas from './NavbarOffcanvas';
import { useBootstrapPrefix } from './ThemeProvider';
import NavbarContext, { NavbarContextType } from './NavbarContext';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

const NavbarText = createWithBsPrefix('navbar-text', {
  Component: 'span',
});

export interface NavbarProps
  extends BsPrefixProps,
    Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  variant?: 'light' | 'dark' | string;
  expand?: boolean | string | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  bg?: string;
  fixed?: 'top' | 'bottom';
  sticky?: 'top';
  onToggle?: (expanded: boolean) => void;
  onSelect?: SelectCallback;
  collapseOnSelect?: boolean;
  expanded?: boolean;
}

const propTypes = {
  /** @default 'navbar' */
  bsPrefix: PropTypes.string,

  /**
   * The general visual variant a the Navbar.
   * Use in combination with the `bg` prop, `background-color` utilities,
   * or your own background styles.
   *
   * @type {('light'|'dark')}
   */
  variant: PropTypes.string,

  /**
   * The breakpoint, below which, the Navbar will collapse.
   * When `true` the Navbar will always be expanded regardless of screen size.
   */
  expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]).isRequired,

  /**
   * A convenience prop for adding `bg-*` utility classes since they are so commonly used here.
   * `light` and `dark` are common choices but any `bg-*` class is supported, including any custom ones you might define.
   *
   * Pairs nicely with the `variant` prop.
   */
  bg: PropTypes.string,

  /**
   * Create a fixed navbar along the top or bottom of the screen, that scrolls with the
   * page. A convenience prop for the `fixed-*` positioning classes.
   */
  fixed: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Position the navbar at the top of the viewport, but only after scrolling past it.
   * A convenience prop for the `sticky-top` positioning class.
   *
   *  __Not supported in <= IE11 and other older browsers without a polyfill__
   */
  sticky: PropTypes.oneOf(['top']),

  /**
   * Set a custom element for this component.
   */
  as: PropTypes.elementType,

  /**
   * A callback fired when the `<Navbar>` body collapses or expands. Fired when
   * a `<Navbar.Toggle>` is clicked and called with the new `expanded`
   * boolean value.
   *
   * @controllable expanded
   */
  onToggle: PropTypes.func,

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
  onSelect: PropTypes.func,

  /**
   * Toggles `expanded` to `false` after the onSelect event of a descendant of a
   * child `<Nav>` fires. Does nothing if no `<Nav>` or `<Nav>` descendants exist.
   *
   * Manually controlling `expanded` via the onSelect callback is recommended instead,
   * for more complex operations that need to be executed after
   * the `select` event of `<Nav>` descendants.
   */
  collapseOnSelect: PropTypes.bool,

  /**
   * Controls the visiblity of the navbar body
   *
   * @controllable onToggle
   */
  expanded: PropTypes.bool,

  /**
   * The ARIA role for the navbar, will default to 'navigation' for
   * Navbars whose `as` is something other than `<nav>`.
   *
   * @default 'navigation'
   */
  role: PropTypes.string,
};

const defaultProps = {
  expand: true,
  variant: 'light' as const,
  collapseOnSelect: false,
};

const Navbar: BsPrefixRefForwardingComponent<'nav', NavbarProps> =
  React.forwardRef<HTMLElement, NavbarProps>((props, ref) => {
    const {
      bsPrefix: initialBsPrefix,
      expand,
      variant,
      bg,
      fixed,
      sticky,
      className,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'nav',
      expanded,
      onToggle,
      onSelect,
      collapseOnSelect,
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
            className={classNames(
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

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;
Navbar.displayName = 'Navbar';

export default Object.assign(Navbar, {
  Brand: NavbarBrand,
  Collapse: NavbarCollapse,
  Offcanvas: NavbarOffcanvas,
  Text: NavbarText,
  Toggle: NavbarToggle,
});
