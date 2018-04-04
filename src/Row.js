import classNames from 'classnames';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';
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
    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div',
    noGutters: false
  };

  render() {
    const {
      bsPrefix,
      noGutters,
      componentClass: Component,
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
