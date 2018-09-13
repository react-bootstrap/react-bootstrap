import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import uncontrollable from 'uncontrollable';

import createWithBsPrefix from './utils/createWithBsPrefix';
import NavbarBrand from './NavbarBrand';
import NavbarCollapse from './NavbarCollapse';
import NavbarToggle from './NavbarToggle';
import { createBootstrapComponent } from './ThemeProvider';
import NavbarContext from './NavbarContext';
import SelectableContext from './SelectableContext';

const propTypes = {
  /** @default 'navbar' */
  bsPrefix: PropTypes.string.isRequired,

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
  expand: PropTypes.oneOf([true, 'sm', 'md', 'lg', 'xl']).isRequired,

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
   * Position the navbar at the top or bottom of the viewport,
   * but only after scrolling past it. . A convenience prop for the `sticky-*` positioning classes.
   *
   *  __Not supported in <= IE11 and other older browsers without a polyfill__
   */
  sticky: PropTypes.oneOf(['top', 'bottom']),

  /**
   * Set a custom element for this component.
   */
  as: elementType,

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
  as: 'nav',
  expand: true,
  variant: 'light',
  collapseOnSelect: false,
};

class Navbar extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      navbarContext: {
        onToggle: this.handleToggle,
      },
    };
  }

  static getDerivedStateFromProps({ bsPrefix, expanded }, prevState) {
    return {
      navbarContext: {
        ...prevState.navbarContext,
        bsPrefix,
        expanded,
      },
    };
  }

  handleCollapse = (...args) => {
    const { onToggle, expanded, collapseOnSelect, onSelect } = this.props;

    if (onSelect) onSelect(...args);
    if (collapseOnSelect && expanded) {
      onToggle(false);
    }
  };

  handleToggle = () => {
    const { onToggle, expanded } = this.props;

    onToggle(!expanded);
  };

  render() {
    const {
      bsPrefix,
      expand,
      variant,
      bg,
      fixed,
      sticky,
      className,
      children,
      as: Component,
      expanded: _1,
      onToggle: _2,
      onSelect: _3,
      collapseOnSelect: _4,
      ...props
    } = this.props;

    // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one
    if (props.role === undefined && Component !== 'nav') {
      props.role = 'navigation';
    }
    let expandClass = `${bsPrefix}-expand`;
    if (typeof expand === 'string') expandClass = `${expandClass}-${expand}`;

    return (
      <NavbarContext.Provider value={this.state.navbarContext}>
        <SelectableContext.Provider value={this.handleCollapse}>
          <Component
            {...props}
            className={classNames(
              className,
              bsPrefix,
              expand && expandClass,
              variant && `${bsPrefix}-${variant}`,
              bg && `bg-${bg}`,
              sticky && `sticky-${sticky}`,
              fixed && `fixed-${fixed}`,
            )}
          >
            {children}
          </Component>
        </SelectableContext.Provider>
      </NavbarContext.Provider>
    );
  }
}

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

const DecoratedNavbar = createBootstrapComponent(
  uncontrollable(Navbar, { expanded: 'onToggle' }),
  'navbar',
);

DecoratedNavbar.Brand = NavbarBrand;
DecoratedNavbar.Toggle = NavbarToggle;
DecoratedNavbar.Collapse = NavbarCollapse;

DecoratedNavbar.Text = createWithBsPrefix('navbar-text', {
  Component: 'span',
});

export default DecoratedNavbar;
