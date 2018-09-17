import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import { createBootstrapComponent } from './ThemeProvider';

class NavbarBrand extends React.Component {
  static propTypes = {
    /** @default 'navbar' */
    bsPrefix: PropTypes.string,

    /**
     * An href, when provided the Brand will render as an `<a>` element (unless `as` is provided).
     */
    href: PropTypes.string,

    /**
     * Set a custom element for this component.
     */
    as: elementType,
  };

  render() {
    const { bsPrefix, className, as, ...props } = this.props;

    const Component = as || (props.href ? 'a' : 'span');
    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

export default createBootstrapComponent(NavbarBrand, 'navbar-brand');
