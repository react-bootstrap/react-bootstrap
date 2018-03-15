import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class Figure extends React.Component {
  static propTypes = {
    /**
     * @default 'figure'
     */
    bsPrefix: PropTypes.string,

    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'figure'
  };

  render() {
    const {
      componentClass: Component,
      bsPrefix,
      className,
      ...props
    } = this.props;

    const classes = classNames(`${bsPrefix}`);

    return <Component {...props} className={classNames(className, classes)} />;
  }
}

export default createBootstrapComponent(Figure, 'figure');
