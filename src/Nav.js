import React, { cloneElement } from 'react';
import classNames from 'classnames';
import all from 'react-prop-types/lib/all';
import deprecated from 'react-prop-types/lib/deprecated';
import tbsUtils, { bsStyles, bsClass as _bsClass } from './utils/bootstrapUtils';

import ValidComponentChildren from './utils/ValidComponentChildren';
import createChainedFunction from './utils/createChainedFunction';

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
    } else {
      classes['pull-right'] = this.props.pullRight;
    }

    return (
      <ul ref="ul"
        {...this.props}
        id={ulId || id}
        role={this.props.bsStyle === 'tabs' ? 'tablist' : null}
        className={classNames(className, ulClassName, classes)}
      >
        {ValidComponentChildren.map(this.props.children, this.renderNavItem, this)}
      </ul>
    );
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

  expanded: React.PropTypes.bool,

  navbar: React.PropTypes.bool,
  eventKey: React.PropTypes.any,
  pullRight: React.PropTypes.bool,
  right: deprecated(React.PropTypes.bool, 'Use the `pullRight` prop instead')
};

Nav.contextTypes = {
  $bs_navbar: React.PropTypes.bool,
  $bs_navbar_bsClass: React.PropTypes.string
};

Nav.defaultProps = {
  justified: false,
  pullRight: false,
  right: false,
  stacked: false
};

export default _bsClass('nav',
  bsStyles(['tabs', 'pills'],
    Nav
  )
);
