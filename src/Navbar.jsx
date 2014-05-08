/** @jsx React.DOM */

import React          from './react-es6';
import classSet       from './react-es6/lib/cx';
import BootstrapMixin from './BootstrapMixin';
import PropTypes      from './PropTypes';
import utils          from './utils';


var Navbar = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    fixedTop: React.PropTypes.bool,
    fixedBottom: React.PropTypes.bool,
    staticTop: React.PropTypes.bool,
    inverse: React.PropTypes.bool,
    role: React.PropTypes.string,
    componentClass: PropTypes.componentClass,
    brand: React.PropTypes.renderable
  },

  getDefaultProps: function () {
    return {
      bsClass: 'navbar',
      bsStyle: 'default',
      role: 'navigation',
      componentClass: React.DOM.nav
    };
  },

  render: function () {
    var classes = this.getBsClassSet();
    var componentClass = this.props.componentClass;

    classes['navbar-fixed-top'] = this.props.fixedTop;
    classes['navbar-fixed-bottom'] = this.props.fixedBottom;
    classes['navbar-static-top'] = this.props.staticTop;
    classes['navbar-inverse'] = this.props.inverse;

    return this.transferPropsTo(
      <componentClass className={classSet(classes)} role={this.props.role}>
        {this.props.brand ? this.renderHeader() : null}
        {this.props.children}
      </componentClass>
    );
  },

  renderHeader: function () {
    var brand;

    if (this.props.brand) {
      brand = React.isValidComponent(this.props.brand) ?
          utils.cloneWithProps(this.props.brand, {
            className: 'navbar-brand'
          }) : <span className="navbar-brand">{this.props.brand}</span>;
    }

    return (
      <div className="navbar-header">
        {brand}
      </div>
    );
  }
});

export default = Navbar;