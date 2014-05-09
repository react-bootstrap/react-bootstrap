/** @jsx React.DOM */

import React            from './react-es6';
import classSet         from './react-es6/lib/cx';
import BootstrapMixin   from './BootstrapMixin';
import CollapsableMixin from './CollapsableMixin';
import utils            from './utils';
import domUtils         from './domUtils';


var Nav = React.createClass({
  mixins: [BootstrapMixin, CollapsableMixin],

  propTypes: {
    bsStyle: React.PropTypes.oneOf(['tabs','pills']),
    stacked: React.PropTypes.bool,
    justified: React.PropTypes.bool,
    onSelect: React.PropTypes.func,
    isCollapsable: React.PropTypes.bool,
    isOpen: React.PropTypes.bool,
    inNavbar: React.PropTypes.bool
  },

  getDefaultProps: function () {
    return {
      bsClass: 'nav'
    };
  },

  getCollapsableDOMNode: function () {
    return this.getDOMNode();
  },

  getCollapsableDimensionValue: function () {
    var node = this.refs.ul.getDOMNode(),
        height = node.offsetHeight,
        computedStyles = domUtils.getComputedStyles(node);

    return height + parseInt(computedStyles.marginTop, 10) + parseInt(computedStyles.marginBottom, 10);
  },

  render: function () {
    var classes = this.getCollapsableClassSet(),
        ulClasses = this.getBsClassSet();

    classes['navbar-collapse'] = this.props.isCollapsable;

    ulClasses['nav-stacked'] = this.props.stacked;
    ulClasses['nav-justified'] = this.props.justified;
    ulClasses['navbar-nav'] = this.props.inNavbar;

    return this.transferPropsTo(
      <nav className={classSet(classes)}>
        <ul className={classSet(ulClasses)} ref="ul">
          {utils.modifyChildren(this.props.children, this.renderNavItem)}
        </ul>
      </nav>
    );
  },

  getChildActiveProp: function (child) {
    if (child.props.active) {
      return true;
    }
    if (this.props.activeKey != null) {
      if (child.props.key === this.props.activeKey) {
        return true;
      }
    }
    if (this.props.activeHref != null) {
      if (child.props.href === this.props.activeHref) {
        return true;
      }
    }

    return child.props.active;
  },

  renderNavItem: function (child) {
    return utils.cloneWithProps(
      child,
      {
        active: this.getChildActiveProp(child),
        activeKey: this.props.activeKey,
        activeHref: this.props.activeHref,
        onSelect: utils.createChainedFunction(child.props.onSelect, this.props.onSelect),
        ref: child.props.ref,
        key: child.props.key
      }
    );
  }
});

export default = Nav;