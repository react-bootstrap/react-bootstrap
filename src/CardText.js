import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class CardText extends React.Component {
  static propTypes = {
    /**
     * @default 'card-text'
     */
    bsPrefix: PropTypes.string,

    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'p'
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

export default createBootstrapComponent(CardText, 'card-text');
