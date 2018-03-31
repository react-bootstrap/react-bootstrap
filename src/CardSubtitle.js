import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import elementType from 'prop-types-extra/lib/elementType';

import { createBootstrapComponent } from './ThemeProvider';

class CardSubtitle extends React.Component {
  static propTypes = {
    /**
     * @default 'card-subtitle'
     */
    bsPrefix: PropTypes.string,

    componentClass: elementType
  };

  static defaultProps = {
    componentClass: 'div'
  };

  render() {
    const {
      bsPrefix,
      className,
      componentClass: Component,
      ...props
    } = this.props;

    const isDefaultComponent = Component === 'div';

    const classes = classNames(bsPrefix, className, isDefaultComponent && 'h6');

    return <Component className={classNames(classes)} {...props} />;
  }
}

export default createBootstrapComponent(CardSubtitle, 'card-subtitle');
