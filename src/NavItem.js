import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { bsClass, prefix, splitBsProps } from './utils/bootstrapUtils';

class NavItem extends React.Component {
  static propTypes = {
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
      className,
      children,
      componentClass: Component,
      ...props
    } = this.props;

    const [bsProps, elementProps] = splitBsProps(props);

    return (
      <Component
        {...elementProps}
        className={classNames(className, prefix(bsProps, 'item'))}
      >
        {children}
      </Component>
    );
  }
}

export default bsClass('nav', NavItem);
