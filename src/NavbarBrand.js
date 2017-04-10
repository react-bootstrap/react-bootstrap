import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { prefix } from './utils/bootstrapUtils';

const contextTypes = {
  $bs_navbar: PropTypes.shape({
    bsClass: PropTypes.string,
  }),
};

class NavbarBrand extends React.Component {
  render() {
    const { className, children, ...props } = this.props;
    const navbarProps = this.context.$bs_navbar || { bsClass: 'navbar' };

    const bsClassName = prefix(navbarProps, 'brand');

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: classNames(
          children.props.className, className, bsClassName
        )
      });
    }

    return (
      <span {...props} className={classNames(className, bsClassName)}>
        {children}
      </span>
    );
  }
}

NavbarBrand.contextTypes = contextTypes;

export default NavbarBrand;
