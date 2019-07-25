import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix } from './ThemeProvider';

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
};

const defaultProps = {
  fluid: false,
};

const Container = React.forwardRef(
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  ({ bsPrefix, fluid, as: Component = 'div', className, ...props }, ref) => {
    const prefix = useBootstrapPrefix(bsPrefix, 'container');
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, fluid ? `${prefix}-fluid` : prefix)}
      />
    );
  },
);

Container.displayName = 'Container';
Container.propTypes = propTypes;
Container.defaultProps = defaultProps;

export default Container;
