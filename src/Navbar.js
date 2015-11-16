/* eslint react/no-multi-comp: 0 */
import React, { PropTypes } from 'react';
import uncontrollable from 'uncontrollable';
import classNames from 'classnames';
import elementType from 'react-prop-types/lib/elementType';
import deprecated from 'react-prop-types/lib/deprecated';
import deprecationWarning from './utils/deprecationWarning';
import ValidComponentChildren from './utils/ValidComponentChildren';

import Grid from './Grid';
import OldNavbar from './deprecated/Navbar';
import NavbarBrand from './NavbarBrand';
import NavbarHeader from './NavbarHeader';
import NavbarToggle from './NavbarToggle';
import NavbarCollapse from './NavbarCollapse';

import tbsUtils, { bsClass as bsClasses, bsStyles } from './utils/bootstrapUtils';
import { DEFAULT, INVERSE } from './styleMaps';

let has = (obj, key) => obj && {}.hasOwnProperty.call(obj, key);

function shouldRenderOldNavbar(component) {
  let props = component.props;
  return (
    has(props, 'brand') ||
    has(props, 'toggleButton') ||
    has(props, 'toggleNavKey') ||
    has(props, 'navExpanded') ||
    has(props, 'defaultNavExpanded') ||
    // this should be safe b/c the new version requires wrapping in a Header
    ValidComponentChildren.findValidComponents(
      props.children, child => child.props.bsRole === 'brand'
    ).length > 0
  );
}

let Navbar = React.createClass({

  propTypes: {
    /**
     * Create a fixed navbar along the top of the screen, that scrolls with the page
     */
    fixedTop: React.PropTypes.bool,
    /**
     * Create a fixed navbar along the bottom of the screen, that scrolls with the page
     */
    fixedBottom: React.PropTypes.bool,
    /**
     * Create a full-width navbar that scrolls away with the page
     */
    staticTop: React.PropTypes.bool,
    /**
     * An alternative dark visual style for the Navbar
     */
    inverse: React.PropTypes.bool,
    /**
     * Allow the Navbar to fluidly adjust to the page or container width, instead of at the
     * predefined screen breakpoints
     */
    fluid: React.PropTypes.bool,

    /**
     * Set a custom element for this component.
     */
    componentClass: elementType,
    /**
     * A callback fired when the `<Navbar>` body collapses or expands.
     * Fired when a `<Navbar.Toggle>` is clicked and called with the new `navExpanded` boolean value.
     *
     * @controllable navExpanded
     */
    onToggle: React.PropTypes.func,

    /**
     * Explicitly set the visiblity of the navbar body
     *
     * @controllable onToggle
     */
    expanded: React.PropTypes.bool,

    /**
     * @deprecated
     */
    navExpanded: deprecated(React.PropTypes.bool,
      'Use `expanded` and `defaultExpanded` instead.')
  },

  childContextTypes: {
    $bs_navbar: PropTypes.bool,
    $bs_navbar_bsClass: PropTypes.string,
    $bs_navbar_onToggle: PropTypes.func,
    $bs_navbar_expanded: PropTypes.bool,
  },

  getDefaultProps() {
    return {
      componentClass: 'nav',
      fixedTop: false,
      fixedBottom: false,
      staticTop: false,
      inverse: false,
      fluid: false
    };
  },

  getChildContext() {
    return {
      $bs_navbar: true,
      $bs_navbar_bsClass: this.props.bsClass,
      $bs_navbar_onToggle: this.handleToggle,
      $bs_navbar_expanded: this.props.expanded
    };
  },

  handleToggle() {
    this.props.onToggle(!this.props.expanded);
  },

  isNavExpanded() {
    return !!this.props.expanded;
  },

  render() {
    if (shouldRenderOldNavbar(this)) {
      deprecationWarning({ message:
        'Rendering a deprecated version of the Navbar due to the use of deprecated ' +
        'props. Please use the new Navbar api, and remove `toggleButton`, ' +
        '`toggleNavKey`, `brand`, `navExpanded`, `defaultNavExpanded` props or the ' +
        'use of the `<NavBrand>` component outside of a `<Navbar.Header>`. \n\n' +
        'for more details see: http://react-bootstrap.github.io/components.html#navbars'
      });

      return <OldNavbar {...this.props}/>;
    }

    const {
      fixedTop,
      fixedBottom,
      staticTop,
      inverse,
      componentClass: ComponentClass,
      fluid,
      className,
      children,
      ...props
    } = this.props;

    // will result in some false positives but that seems better
    // than false negatives. strict `undefined` check allows explicit
    // "nulling" of the role if the user really doesn't want one
    if (props.role === undefined && ComponentClass !== 'nav') {
      props.role = 'navigation';
    }

    if (inverse) {
      props.bsStyle = INVERSE;
    }

    const classes = tbsUtils.getClassSet(props);

    classes[tbsUtils.prefix(this.props, 'fixed-top')] = fixedTop;
    classes[tbsUtils.prefix(this.props, 'fixed-bottom')] = fixedBottom;
    classes[tbsUtils.prefix(this.props, 'static-top')] = staticTop;

    return (
      <ComponentClass {...props} className={classNames(className, classes)}>
        <Grid fluid={fluid}>
          { children }
        </Grid>
      </ComponentClass>
    );
  }
});

const NAVBAR_STATES = [DEFAULT, INVERSE];

Navbar = bsStyles(NAVBAR_STATES, DEFAULT,
  bsClasses('navbar',
    uncontrollable(Navbar, { expanded: 'onToggle' })
  )
);

function createSimpleWrapper(tag, suffix, displayName) {
  let wrapper = (
    { componentClass: Tag, className, ...props },
    { $bs_navbar_bsClass: bsClass = 'navbar' }
  ) =>
    <Tag {...props}
      className={classNames(className, tbsUtils.prefix({ bsClass }, suffix), {
        [tbsUtils.prefix({ bsClass }, 'right')]: props.pullRight,
        [tbsUtils.prefix({ bsClass }, 'left')]: props.pullLeft
      })}
    />;

  wrapper.displayName = displayName;

  wrapper.propTypes = {
    componentClass: elementType,
    pullRight: React.PropTypes.bool,
    pullLeft: React.PropTypes.bool,
  };
  wrapper.defaultProps = {
    componentClass: tag,
    pullRight: false,
    pullLeft: false
  };

  wrapper.contextTypes = {
    $bs_navbar_bsClass: PropTypes.string
  };

  return wrapper;
}

Navbar.Brand = NavbarBrand;
Navbar.Header = NavbarHeader;
Navbar.Toggle = NavbarToggle;
Navbar.Collapse = NavbarCollapse;

Navbar.Form = createSimpleWrapper('div', 'form', 'NavbarForm');
Navbar.Text = createSimpleWrapper('p', 'text', 'NavbarText');
Navbar.Link = createSimpleWrapper('a', 'link', 'NavbarLink');

export default Navbar;
