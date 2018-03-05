import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class NavItem extends React.Component {
  static propTypes = {
    /**
     * @default 'nav-item'
     */
    bsPrefix: PropTypes.string,

    /** The ARIA role of the component */
    role: PropTypes.string,
    componentClass: elementType
  };

  static defaultProps = {
    role: 'presentaton',
    componentClass: 'li'
  };

  render() {
    const {
      bsPrefix,
      className,
      children,
      componentClass: Component,
      ...props
    } = this.props;

    return (
      <Component {...props} className={classNames(className, bsPrefix)}>
        {children}
      </Component>
    );
  }
}

export default createBootstrapComponent(NavItem, 'nav-item');
