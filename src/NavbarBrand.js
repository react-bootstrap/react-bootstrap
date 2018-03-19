import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class NavbarBrand extends React.Component {
  static propTypes = {
    /** @default 'navbar' */
    bsPrefix: PropTypes.string,

    /**
     * An href, when provided the Brand will render as an `<a>` element (unless `componentClass` is provided)
     */
    href: PropTypes.string,

    /**
     * The toggle content, if left empty it will render the default toggle (seen above).
     */
    children: PropTypes.node,

    /**
     * Set a custom element for this component.
     */
    componentClass: elementType
  };

  render() {
    const { bsPrefix, className, componentClass, ...props } = this.props;

    const Component = componentClass || (props.href ? 'a' : 'span');
    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

export default createBootstrapComponent(NavbarBrand, 'navbar-brand');
