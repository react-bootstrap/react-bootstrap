import classNames from 'classnames';
import PropTypes from 'prop-types';

import React from 'react';

import { createBootstrapComponent } from './ThemeProvider';

class Row extends React.Component {
  static propTypes = {
    /**
     * @default 'row'
     */
    bsPrefix: PropTypes.string.isRequired,

    /** Removes the gutter spacing between `Col`s as well as any added negative margins. */
    noGutters: PropTypes.bool.isRequired,
    as: PropTypes.elementType,
  };

  static defaultProps = {
    noGutters: false,
  };

  render() {
    const {
      bsPrefix,
      noGutters,
      // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
      as: Component = 'div',
      className,
      ...props
    } = this.props;

    return (
      <Component
        {...props}
        className={classNames(className, bsPrefix, noGutters && 'no-gutters')}
      />
    );
  }
}

export default createBootstrapComponent(Row, 'row');
