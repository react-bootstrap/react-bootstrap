import React from 'react';
import classNames from 'classnames';
import tbsUtils from './utils/bootstrapUtils';

class NavbarBrand extends React.Component {

  render() {
    const {className, children, ...props} = this.props;
    let { $bs_navbar_bsClass: bsClass = 'navbar' } = this.context;
    let brandClasses = tbsUtils.prefix({ bsClass }, 'brand');

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: classNames(
          children.props.className, className, brandClasses
        )
      });
    }

    return (
      <span {...props} className={classNames(className, brandClasses)}>
        {children}
      </span>
    );
  }
}

NavbarBrand.contextTypes = {
  $bs_navbar_bsClass: React.PropTypes.string
};

export default NavbarBrand;
