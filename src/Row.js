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

  render() {
    const {
      bsPrefix,
      noGutters,
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

const BootstrapRow = createBootstrapComponent(Row, 'row');

BootstrapRow.defaultProps = {
  noGutters: false,
};

export default BootstrapRow;
