import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  as: PropTypes.elementType,
  /** Make the jumbotron full width, and without rounded corners */
  fluid: PropTypes.bool,
  /** @default 'jumbotron' */
  bsPrefix: PropTypes.string,
};

const defaultProps = {
  fluid: false,
};

const Jumbotron = React.forwardRef(
  (
    {
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      className,
      fluid,
      bsPrefix,
      ...props
    },
    ref,
  ) => {
    bsPrefix = useBootstrapPrefix(bsPrefix, 'jumbotron');
    const classes = {
      [bsPrefix]: true,
      [`${bsPrefix}-fluid`]: fluid,
    };
    return (
      <Component
        ref={ref}
        {...props}
        className={classNames(className, classes)}
      />
    );
  },
);

Jumbotron.propTypes = propTypes;
Jumbotron.defaultProps = defaultProps;
Jumbotron.displayName = 'Jumbotron';

export default Jumbotron;
