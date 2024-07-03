import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';
import {
  BsPrefixPropsWithChildren,
  BsPrefixRefForwardingComponent,
} from './helpers';

export interface ContainerProps extends BsPrefixPropsWithChildren {
  fluid?: boolean | 'sm' | 'md' | 'lg' | 'xl';
}

type Container = BsPrefixRefForwardingComponent<'div', ContainerProps>;

const containerSizes = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
]);

const propTypes = {
  /**
   * @default 'container'
   */
  bsPrefix: PropTypes.string,

  /**
   * Allow the Container to fill all of its available horizontal space.
   * @type {(true|"sm"|"md"|"lg"|"xl")}
   */
  fluid: containerSizes,
  /**
   * You can use a custom element for this component
   */
  as: PropTypes.elementType,
};

const Container: Container = React.forwardRef(
  (
    {
      bsPrefix,
      fluid = false,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      className,
      ...props
    }: ContainerProps,
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'container');
    const suffix = typeof fluid === 'string' ? `-${fluid}` : '-fluid';
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, fluid ? `${prefix}${suffix}` : prefix)}
      />
    );
  },
);

Container.displayName = 'Container';
Container.propTypes = propTypes;

export default Container;
