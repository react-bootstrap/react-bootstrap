import React, { PropTypes } from 'react';
import tbsUtils from './utils/bootstrapUtils';
import Collapse from './Collapse';
import omit from 'lodash-compat/object/omit';

let NavbarCollapse = React.createClass({

  contextTypes: {
    $bs_navbar_bsClass: PropTypes.string,
    $bs_navbar_expanded: PropTypes.bool,
    $bs_navbar_auto_collapse: PropTypes.bool
  },

  childContextTypes: {
    $bs_navbar_auto_collapse: PropTypes.bool
  },

  propTypes: {
    autoCollapse: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      autoCollapse: false
    };
  },

  getChildContext() {
    return {
      $bs_navbar_auto_collapse: this.props.autoCollapse
    };
  },

  render() {
    let { children, ...props } = omit(this.props, ['autoCollapse']);
    let {
      $bs_navbar_bsClass: bsClass = 'navbar',
      $bs_navbar_expanded: expanded
    } = this.context;

    return (
      <Collapse in={expanded} {...props}>
        <div className={tbsUtils.prefix({ bsClass }, 'collapse')}>
          { children }
        </div>
      </Collapse>
    );
  }
});

export default NavbarCollapse;
