import React, { PropTypes } from 'react';
import tbsUtils from './utils/bootstrapUtils';

let NavbarHeader = React.createClass({

  contextTypes: {
    $bs_navbar_bsClass: PropTypes.string
  },

  render() {
    let { children, ...props } = this.props;
    let {
      $bs_navbar_bsClass: bsClass = 'navbar',
    } = this.context;

    return (
      <div className={tbsUtils.prefix({ bsClass }, 'header')}>
        { children }
      </div>
    );
  }
});

export default NavbarHeader;
