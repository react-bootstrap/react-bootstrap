import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class CardTitle extends React.Component {
  static propTypes = {
    /**
     * @default 'card-title'
     */
    bsPrefix: PropTypes.string,

    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'h5'
  };

  render() {
    const {
      bsPrefix,
      className,
      componentClass: Component,
      ...props
    } = this.props;

    return <Component className={classNames(bsPrefix, className)} {...props} />;
  }
}

export default createBootstrapComponent(CardTitle, 'card-title');
