import PropTypes from 'prop-types';
import React from 'react';
import tbsUtils from './utils/bootstrapUtils';
import Collapse from './Collapse';

class NavbarCollapse extends React.Component {
  static contextTypes = {
    $bs_navbar_bsClass: PropTypes.string,
    $bs_navbar_expanded: PropTypes.bool
  };

  render() {
    let { children, ...props } = this.props;
    let {
      $bs_navbar_bsClass: bsClass = 'navbar',
      $bs_navbar_expanded: expanded,
    } = this.context;

    return (
      <Collapse in={expanded} {...props}>
        <div className={tbsUtils.prefix({ bsClass }, 'collapse')}>
          { children }
        </div>
      </Collapse>
    );
  }
}

export default NavbarCollapse;
