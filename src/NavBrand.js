import React, { cloneElement } from 'react';
import BootstrapMixin from './BootstrapMixin';
import classNames from 'classnames';

const NavBrand = React.createClass({
  mixins: [BootstrapMixin],

  propTypes: {
    bsRole: React.PropTypes.string,
    navbar: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      bsRole: 'brand',
      navbar: false
    };
  },

  render() {
    let brand;

    if (React.isValidElement(this.props.children)) {
      brand = cloneElement(this.props.children, {
        className: classNames(this.props.children.props.className, 'navbar-brand'),
        bsRole: this.props.bsRole,
        navbar: this.props.navbar
      });
    } else {
      brand = <span {...this.props} className="navbar-brand">{this.props.children}</span>;
    }

    return brand;
  }

});

export default NavBrand;
