import React from 'react';
import PropTypes from 'prop-types';

import { useBootstrapPrefix, useClassNameMapper } from './ThemeProvider';
import { BsPrefixProps, BsPrefixRefForwardingComponent } from './helpers';

export interface JumbotronProps extends BsPrefixProps {
  fluid?: boolean;
}

type Jumbotron = BsPrefixRefForwardingComponent<'div', JumbotronProps>;

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

const Jumbotron: Jumbotron = React.forwardRef(
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
    const classNames = useClassNameMapper();
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
