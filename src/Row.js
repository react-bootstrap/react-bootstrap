import classNames from 'classnames';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';
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
    as: elementType,
  };

  static defaultProps = {
    as: 'div',
    noGutters: false,
  };

  render() {
    const {
      bsPrefix,
      noGutters,
      as: Component,
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
