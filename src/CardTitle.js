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

    const classes = classNames(bsPrefix, className, isDefaultComponent && 'h5');

    return <Component className={classNames(classes)} {...props} />;
  }
}

export default createBootstrapComponent(CardTitle, 'card-title');
