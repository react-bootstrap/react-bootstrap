import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class FigureCaption extends React.Component {
  static propTypes = {
    /**
     * @default 'figure-caption'
     */
    bsPrefix: PropTypes.string,
    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'figcaption'
  };

  render() {
    const {
      componentClass: Component,
      bsPrefix,
      className,
      ...props
    } = this.props;

    return <Component {...props} className={classNames(className, bsPrefix)} />;
  }
}

export default createBootstrapComponent(FigureCaption, 'figure-caption');
