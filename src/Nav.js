import classNames from 'classnames';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
import all from 'prop-types-extra/lib/all';
import React from 'react';
import mapContextToProps from 'react-context-toolbox/mapContextToProps';
import uncontrollable from 'uncontrollable';

import { createBootstrapComponent } from './ThemeProvider';
import NavbarContext from './NavbarContext';
import CardContext from './CardContext';
import AbstractNav from './AbstractNav';
import NavItem from './NavItem';
import NavLink from './NavLink';

class Nav extends React.Component {
  static propTypes = {
    /**
     * @default 'nav'
     */
    bsPrefix: PropTypes.string,

    /** @private */
    navbarBsPrefix: PropTypes.string,
    /** @private */
    cardHeaderBsPrefix: PropTypes.string,

    /**
     * The visual variant of the nav items.
     *
     * @type {('tabs'|'pills')}
     */
    variant: PropTypes.string,

    /**
     * Marks the NavItem with a matching `eventKey` (or `href` if present) as active.
     *
     * @type {string}
     */
    activeKey: PropTypes.any,

    /**
     * Have all `NavItem`s to proportionatly fill all available width.
     */
    fill: PropTypes.bool,

    /**
     * Have all `NavItem`s to evenly fill all available width.
     *
     * @type {boolean}
     */
    justify: all(PropTypes.bool, ({ justify, navbar }) =>
      justify && navbar
        ? Error('justify navbar `Nav`s are not supported')
        : null,
    ),

    /**
     * A callback fired when a NavItem is selected.
     *
     * ```js
     * function (
     *  Any eventKey,
     *  SyntheticEvent event?
     * )
     * ```
     */
    onSelect: PropTypes.func,

    /**
     * ARIA role for the Nav, in the context of a TabContainer, the default will
     * be set to "tablist", but can be overridden by the Nav when set explicitly.
     *
     * When the role is "tablist", NavLink focus is managed according to
     * the ARIA authoring practices for tabs:
     * https://www.w3.org/TR/2013/WD-wai-aria-practices-20130307/#tabpanel
     */
    role: PropTypes.string,

    /**
     * Apply styling an alignment for use in a Navbar. This prop will be set
     * automatically when the Nav is used inside a Navbar.
     */
    navbar: PropTypes.bool,

    as: elementType,

    /** @private */
    onKeyDown: PropTypes.func,
  };

  static defaultProps = {
    justify: false,
    fill: false,
    as: 'div',
  };

  render() {
    const {
      as,
      bsPrefix,
      navbarBsPrefix,
      cardHeaderBsPrefix,
      variant,
      fill,
      justify,
      navbar,
      className,
      children,
      activeKey,
      ...props
    } = this.props;

    return (
      <AbstractNav
        as={as}
        activeKey={activeKey}
        className={classNames(className, {
          [bsPrefix]: !navbar,
          [`${navbarBsPrefix}-nav`]: navbar,
          [`${cardHeaderBsPrefix}-${variant}`]: !!cardHeaderBsPrefix,
          [`${bsPrefix}-${variant}`]: !!variant,
          [`${bsPrefix}-fill`]: fill,
          [`${bsPrefix}-justified`]: justify,
        })}
        {...props}
      >
        {children}
      </AbstractNav>
    );
  }
}

const UncontrolledNav = uncontrollable(createBootstrapComponent(Nav, 'nav'), {
  activeKey: 'onSelect',
});

const DecoratedNav = mapContextToProps(
  [NavbarContext, CardContext],
  (navbarContext, cardContext, { navbar }) => {
    if (!navbarContext && !cardContext) return {};

    if (navbarContext)
      return {
        navbarBsPrefix: navbarContext.bsPrefix,
        navbar: navbar == null ? true : navbar,
      };

    return { cardHeaderBsPrefix: cardContext.cardHeaderBsPrefix };
  },
  UncontrolledNav,
);

DecoratedNav.Item = NavItem;
DecoratedNav.Link = NavLink;

DecoratedNav._Nav = Nav; // for Testing until enzyme is working with context

export default DecoratedNav;
