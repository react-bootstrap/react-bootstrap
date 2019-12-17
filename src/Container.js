import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

const brkPoints = PropTypes.oneOfType([
  PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
]);

const propTypes = {
  /**
   * @default 'container'
   */
  bsPrefix: PropTypes.string,

  /**
   * Allow the Container to fill all of its available horizontal space.
   */
  fluid: PropTypes.bool,
  /**
   * You can use a custom element for this component
   */
  as: PropTypes.elementType,
  /**
   * You can set responsive container width.
   * @type {("sm"|"md"|"lg"|"xl")}
   */
  breakpoint: brkPoints,
};

const defaultProps = {
  fluid: false,
};

const Container = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  (
    { bsPrefix, fluid, breakpoint, as: Component = 'div', className, ...props },
    ref,
  ) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'container');
    let suffix = breakpoint != null ? `-${breakpoint}` : '';
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(
          className,
          fluid ? `${prefix}-fluid` : `${prefix}${suffix}`,
        )}
      />
    );
  },
);

Container.displayName = 'Container';
Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
