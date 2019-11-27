import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

import { useBootstrapPrefix } from './ThemeProvider';

const propTypes = {
  /**
   * @default 'row'
   */
  bsPrefix: PropTypes.string,

  /** Removes the gutter spacing between `Col`s as well as any added negative margins. */
  noGutters: PropTypes.bool.isRequired,
  as: PropTypes.elementType,
};

const defaultProps = {
  noGutters: false,
};

const Row = React.forwardRef((props, ref) => {
  const {
    bsPrefix,
    noGutters,
    // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
    as: Component = 'div',
    className,
    ...otherProps
  } = props;

  const decoratedBsPrefix = useBootstrapPrefix(bsPrefix, 'row');

  return (
    <Component
      ref={ref}
      {...otherProps}
      className={classNames(
        className,
        decoratedBsPrefix,
        noGutters && 'no-gutters',
      )}
    />
  );
});

Row.propTypes = propTypes;
Row.defaultProps = defaultProps;

export default Row;
