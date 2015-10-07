import classNames from 'classnames';
import React from 'react';

class NavBrand extends React.Component {
  render() {
    const {className, children, ...props} = this.props;

    if (React.isValidElement(children)) {
      return React.cloneElement(children, {
        className: classNames(
          children.props.className, className, 'navbar-brand'
        )
      });
    }

    return (
      <span {...props} className={classNames(className, 'navbar-brand')}>
        {children}
      </span>
    );
  }
}

NavBrand.propTypes = {
  bsRole: React.PropTypes.string
};

NavBrand.defaultProps = {
  bsRole: 'brand'
};

export default NavBrand;
