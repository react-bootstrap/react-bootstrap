import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import { elementType } from 'prop-types-extra';

import { createBootstrapComponent } from './ThemeProvider';

class FigureCaption extends React.Component {
  static propTypes = {
    /**
     * @default 'figure-caption'
     */
    bsPrefix: PropTypes.string,
    as: elementType,
  };

  static defaultProps = {
    as: 'figcaption',
  };

  render() {
    const { as: Component, bsPrefix, className, ...props } = this.props;

    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

export default createBootstrapComponent(FigureCaption, 'figure-caption');
