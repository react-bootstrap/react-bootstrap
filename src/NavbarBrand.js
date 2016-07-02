import classNames from 'classnames';
import React from 'react';

import { prefix } from './utils/bootstrapUtils';

import ensureDomProps from './utils/ensureDomProps';

class NavbarBrand extends React.Component {

  render() {
    const {className, children, ...props} = this.props;
    let { $bs_navbar_bsClass: bsClass = 'navbar' } = this.context;
    let brandClasses = prefix({ bsClass }, 'brand');

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: classNames(
          children.props.className, className, brandClasses
        )
      });
    }

    const domProps = ensureDomProps(props, 'span');

    return (
      <span {...domProps} className={classNames(className, brandClasses)}>
        {children}
      </span>
    );
  }
}

NavbarBrand.contextTypes = {
  $bs_navbar_bsClass: React.PropTypes.string
};

export default NavbarBrand;
