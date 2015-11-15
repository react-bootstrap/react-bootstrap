import React, { cloneElement } from 'react';
import classNames from 'classnames';
import all from 'react-prop-types/lib/all';
import deprecated from 'react-prop-types/lib/deprecated';
import tbsUtils, { bsStyles, bsClass as _bsClass } from './utils/bootstrapUtils';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

import Collapse from './Collapse';

class Nav extends React.Component {

  render() {
    const { className, ulClassName, id, ulId } = this.props;
    const isNavbar = this.props.navbar != null ? this.props.navbar : this.context.$bs_navbar;
    const classes = tbsUtils.getClassSet(this.props);

    classes[tbsUtils.prefix(this.props, 'stacked')] = this.props.stacked;
    classes[tbsUtils.prefix(this.props, 'justified')] = this.props.justified;

    if (isNavbar) {
      let bsClass = this.context.$bs_navbar_bsClass || 'navbar';
      const navbarRight = this.props.right != null ? this.props.right : this.props.pullRight;

      classes[tbsUtils.prefix({ bsClass }, 'nav')] = true;
      classes[tbsUtils.prefix({ bsClass }, 'right')] = navbarRight;
      classes[tbsUtils.prefix({ bsClass }, 'left')] = this.props.pullLeft;
    } else {
      classes['pull-right'] = this.props.pullRight;
      classes['pull-left'] = this.props.pullLeft;
    }

    let list = (
      <ul ref="ul"
        {...this.props}
        id={ulId || id}
        role={this.props.bsStyle === 'tabs' ? 'tablist' : null}
        className={classNames(className, ulClassName, classes)}
      >
        {ValidComponentChildren.map(this.props.children, this.renderNavItem, this)}
      </ul>
    );

    // TODO remove in 0.29
    if (this.context.$bs_deprecated_navbar && this.props.collapsible) {
      list = (
        <Collapse
          in={this.props.expanded}
          className={isNavbar ? 'navbar-collapse' : void 0}
        >
          <div>
            { list }
          </div>
        </Collapse>
      );
    }

    return list;
  }

  getChildActiveProp(child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.eventKey === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  }

  renderNavItem(child, index) {
    return cloneElement(
      child,
      {
        role: this.props.bsStyle === 'tabs' ? 'tab' : null,
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: createChainedFunction(child.props.onSelect, this.props.onSelect),
        key: child.key ? child.key : index,
        navItem: true
      }
    );
  }
}

Nav.propTypes = {
  activeHref: React.PropTypes.string,
  activeKey: React.PropTypes.any,

  stacked: React.PropTypes.bool,
  justified: all(
    React.PropTypes.bool,
    ({justified, navbar}) => (
      justified && navbar ?
        Error('justified navbar `Nav`s are not supported') : null
    )
  ),
  onSelect: React.PropTypes.func,

  /**
   * CSS classes for the wrapper `nav` element
   */
  className: React.PropTypes.string,
  /**
   * HTML id for the wrapper `nav` element
   */
  id: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ]),
  /**
   * CSS classes for the inner `ul` element
   *
   * @deprecated
   */
  ulClassName: deprecated(React.PropTypes.string,
    'The wrapping `<nav>` has been removed you can use `className` now'),
  /**
   * HTML id for the inner `ul` element
   *
   * @deprecated
   */

  ulId: deprecated(React.PropTypes.string,
    'The wrapping `<nav>` has been removed you can use `id` now'),

  /**
   * Apply styling an alignment for use in a Navbar. This prop will be set
   * automatically when the Nav is used inside a Navbar.
   */
  navbar: React.PropTypes.bool,
  eventKey: React.PropTypes.any,
  pullRight: React.PropTypes.bool,
  pullLeft: React.PropTypes.bool,

  right: deprecated(React.PropTypes.bool,
    'Use the `pullRight` prop instead'),

  /**
   * @private
   */
  expanded: React.PropTypes.bool,

  /**
   * @private
   */
  collapsible: deprecated(React.PropTypes.bool,
    'Use `Navbar.Collapse` instead, to create collapsible Navbars'),
};

Nav.contextTypes = {
  $bs_navbar: React.PropTypes.bool,
  $bs_navbar_bsClass: React.PropTypes.string,

  $bs_deprecated_navbar: React.PropTypes.bool
};

Nav.defaultProps = {
  justified: false,
  pullRight: false,
  pullLeft: false,
  stacked: false
};

export default _bsClass('nav',
  bsStyles(['tabs', 'pills'],
    Nav
  )
);
