import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import tbsUtils from './utils/bootstrapUtils';

class NavbarHeader extends React.Component {
  static contextTypes = {
    $bs_navbar_bsClass: PropTypes.string
  };

  render() {
    let { className, ...props } = this.props;
    let { $bs_navbar_bsClass: bsClass = 'navbar' } = this.context;
    let headerClasses = tbsUtils.prefix({ bsClass }, 'header');

    return (
      <div {...props} className={classNames(className, headerClasses)} />
    );
  }
}

export default NavbarHeader;
